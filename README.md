# 🚀 AWS Full-Stack User Management System

A complete cloud-based web application for managing user data, built entirely on Amazon Web Services (AWS) infrastructure with real-time monitoring capabilities.

---

## 📖 What This Project Does

This is a **User Management System** where you can:

* ✅ **Add** new users with their personal information (name, email, age, gender, phone, occupation, address)
* 👀 **View** all users in a clean, organized list
* ✏️ **Edit** existing users to update their information
* 🗑️ **Delete** users when no longer needed
* 📊 **Monitor** the system in real-time to see how it's performing

Think of it like a **digital address book** or customer database that runs entirely in the cloud!

---

## 🏗️ Project Architecture

**Simple explanation:**

1. Users visit a website hosted on **Amazon S3**.
2. The website talks to an **API server** running on **Amazon EC2**.
3. The API server saves data in a **MySQL database** on **Amazon RDS**.
4. Everything is monitored using **Amazon CloudWatch**.
5. You can see beautiful charts on your local **Grafana dashboard**.

---

## 🛠️ Technologies & Tools Used

### **Frontend (What Users See)**

* **HTML5** – Structure of the web pages
* **CSS3** – Beautiful styling with gradients and animations
* **JavaScript** – Interactive functionality
* **Amazon S3** – Hosts the website files

### **Backend (Server & Logic)**

* **Node.js** – Server-side JavaScript runtime
* **Express.js** – Web framework for building APIs
* **PM2** – Process manager to keep the server running
* **Amazon EC2** – Virtual server in the cloud

### **Database**

* **MySQL 8.0** – Stores all user information
* **Amazon RDS** – Managed database service

### **Infrastructure & Networking**

* **Amazon VPC** – Private network in the cloud
* **Security Groups** – Firewall rules
* **Subnets** – Network segments (public for web, private for database)
* **Internet Gateway** – Connects to the internet

### **Monitoring & Analytics**

* **Amazon CloudWatch** – Collects performance metrics
* **Grafana** – Creates beautiful monitoring dashboards
* **Docker** – Runs Grafana on your local machine

### **Development Tools**

* **AWS Console** – Web interface to manage AWS services
* **SSH** – Secure connection to the server
* **npm** – Package manager for Node.js

---

## ✨ Key Features

### 🌐 **Modern Web Interface**

* Clean, responsive design that works on all devices
* Real-time updates without page refresh
* User-friendly forms with validation
* Professional gradient-based styling

### 🔧 **Robust API**

* RESTful endpoints for all operations
* Input validation and error handling
* CORS support for web browsers
* Automatic database connection management

### 🔒 **Secure Architecture**

* Database isolated in private network
* Proper firewall rules
* Secure communication between components
* Environment-based configuration

### 📊 **Real-Time Monitoring**

* Track API requests and errors
* Monitor server performance (CPU, memory, disk)
* Database connection monitoring
* Custom business metrics
* Beautiful Grafana dashboards

---

## 🎯 Who Can Use This Project

* Students learning cloud computing and full-stack development
* Developers wanting to understand AWS infrastructure
* Small businesses needing a simple user management system
* Anyone interested in modern web application architecture

---

## 💡 What You'll Learn

By setting up this project, you'll gain hands-on experience with:

* **Cloud Infrastructure**: How to set up networking, servers, and databases in AWS
* **Full-Stack Development**: Building complete web applications
* **DevOps Practices**: Application deployment and monitoring
* **Database Design**: Storing and retrieving data efficiently
* **API Development**: Creating backend services
* **System Monitoring**: Keeping track of application health

---

## 🚀 Getting Started

### **Prerequisites**

* An **AWS Account** (Free tier eligible)
* Basic understanding of web development
* **Docker** installed on your computer
* A **web browser**

### **Quick Setup Overview**

1. Set up AWS infrastructure (VPC, subnets, security groups)
2. Create and configure the database (RDS MySQL)
3. Launch and setup the web server (EC2 with Node.js)
4. Deploy the website (Upload to S3)
5. Configure monitoring (CloudWatch and Grafana)

*For detailed step-by-step instructions, please see the setup guide.*

---

## 📁 Project Structure

```bash
aws-fullstack-project/
├── frontend/
│   └── index.html          # Complete web application
├── backend/
│   ├── server.js           # Node.js API server
│   └── package.json        # Dependencies
├── monitoring/
│   └── docker-compose.yml  # Grafana configuration
├── docs/
│   └── setup-guide.md      # Detailed setup instructions
└── README.md               # This file
```

---

## 🔍 API Endpoints

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/users`     | Get all users       |
| GET    | `/api/users/:id` | Get a specific user |
| POST   | `/api/users`     | Create a new user   |
| PUT    | `/api/users/:id` | Update a user       |
| DELETE | `/api/users/:id` | Delete a user       |
| GET    | `/health`        | Check API health    |

---

## 📊 Sample Data Structure

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "gender": "Male",
  "phone": "+1234567890",
  "occupation": "Software Engineer",
  "address": "123 Main St, City, State",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

## 💰 Cost Estimation

This project is designed to use **AWS Free Tier resources**:

* **EC2 t2.micro**: 750 hours/month free
* **RDS db.t3.micro**: 750 hours/month free
* **S3**: 5GB storage free
* **CloudWatch**: Basic monitoring free

**Estimated monthly cost:** \$0–5 (if staying within free tier limits)

---

## 🛡️ Security Features

* Database in a private subnet (not accessible from the internet)
* Proper security group configurations
* Input validation and sanitization
* Error handling without sensitive data exposure
* Secure communication between components

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 🙋‍♂️ Support

If you have questions or need help:

* Check the detailed setup guide in `/docs/setup-guide.md`
* Review **AWS documentation** for specific services
* Open an issue in this repository
* Contact the project maintainer

---

## 🌟 Acknowledgments

* **AWS** for providing excellent cloud services
* The **Node.js** and **Express.js** communities
* **Grafana** team for the amazing monitoring tool
* All contributors and users of this project

---

## 🔮 Future Enhancements

* [ ] User authentication and authorization
* [ ] File upload functionality
* [ ] Email notifications
* [ ] Data export features
* [ ] Mobile app version
* [ ] Advanced analytics
* [ ] Automated backups
* [ ] Multi-region deployment

---

⭐ If you found this project helpful, please give it a star! ⭐
