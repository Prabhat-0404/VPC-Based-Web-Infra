const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// CloudWatch metrics
const cloudwatch = new AWS.CloudWatch({
    region: 'us-east-1'
});

// Database configuration
const dbConfig = {
    host: 'YOUR_RDS_ENDPOINT', // Replace with your RDS endpoint
    user: 'admin',
    password: 'YourSecurePassword123!',
    database: 'userdata',
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000
};

// Create connection pool
const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise();

// Create users table if not exists
async function initializeDatabase() {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                age INT NOT NULL,
                gender ENUM('Male', 'Female', 'Other') NOT NULL,
                phone VARCHAR(20),
                address TEXT,
                occupation VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;
        
        await promisePool.execute(createTableQuery);
        console.log('Database initialized successfully');
        
        // Send metric to CloudWatch
        await sendMetric('DatabaseConnection', 1, 'Count');
        
    } catch (error) {
        console.error('Database initialization error:', error);
        await sendMetric('DatabaseError', 1, 'Count');
    }
}

// Function to send metrics to CloudWatch
async function sendMetric(metricName, value, unit) {
    const params = {
        Namespace: 'MyProject/API',
        MetricData: [{
            MetricName: metricName,
            Value: value,
            Unit: unit,
            Timestamp: new Date()
        }]
    };
    
    try {
        await cloudwatch.putMetricData(params).promise();
    } catch (error) {
        console.error('CloudWatch metric error:', error);
    }
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await promisePool.execute('SELECT * FROM users ORDER BY created_at DESC');
        await sendMetric('GetUsers', 1, 'Count');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        await sendMetric('APIError', 1, 'Count');
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const [rows] = await promisePool.execute('SELECT * FROM users WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        await sendMetric('GetUserById', 1, 'Count');
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        await sendMetric('APIError', 1, 'Count');
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create new user
app.post('/api/users', async (req, res) => {
    try {
        const { name, email, age, gender, phone, address, occupation } = req.body;
        
        // Validation
        if (!name || !email || !age || !gender) {
            return res.status(400).json({ error: 'Name, email, age, and gender are required' });
        }
        
        if (age < 1 || age > 120) {
            return res.status(400).json({ error: 'Age must be between 1 and 120' });
        }
        
        const insertQuery = `
            INSERT INTO users (name, email, age, gender, phone, address, occupation) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        const [result] = await promisePool.execute(insertQuery, [
            name, email, age, gender, phone || null, address || null, occupation || null
        ]);
        
        await sendMetric('CreateUser', 1, 'Count');
        
        res.status(201).json({
            message: 'User created successfully',
            userId: result.insertId
        });
        
    } catch (error) {
        console.error('Error creating user:', error);
        await sendMetric('APIError', 1, 'Count');
        
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
    try {
        const { name, email, age, gender, phone, address, occupation } = req.body;
        
        const updateQuery = `
            UPDATE users 
            SET name = ?, email = ?, age = ?, gender = ?, phone = ?, address = ?, occupation = ?
            WHERE id = ?
        `;
        
        const [result] = await promisePool.execute(updateQuery, [
            name, email, age, gender, phone || null, address || null, occupation || null, req.params.id
        ]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        await sendMetric('UpdateUser', 1, 'Count');
        res.json({ message: 'User updated successfully' });
        
    } catch (error) {
        console.error('Error updating user:', error);
        await sendMetric('APIError', 1, 'Count');
        
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
    try {
        const [result] = await promisePool.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        await sendMetric('DeleteUser', 1, 'Count');
        res.json({ message: 'User deleted successfully' });
        
    } catch (error) {
        console.error('Error deleting user:', error);
        await sendMetric('APIError', 1, 'Count');
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(port, '0.0.0.0', async () => {
    console.log(`Server running on port ${port}`);
    await initializeDatabase();
    await sendMetric('ServerStart', 1, 'Count');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await sendMetric('ServerShutdown', 1, 'Count');
    pool.end();
    process.exit(0);
});