# Enterprise Resource Management Portal

## 🚀 Overview

A high-performance, full-stack enterprise web application designed to handle complex administrative workflows. This system features a decoupled reporting service, dynamic task scheduling, and legacy system integration, serving as a robust platform for employee management, reporting, and bulk data processing.

The project demonstrates advanced backend engineering concepts, including **Java ProcessBuilder** for orchestrating external scripts, **Spring Dynamic Scheduling** for runtime-configurable background tasks, and **Direct Web Remoting (DWR)** for low-latency client-server communication.

---

## 🏗 System Architecture

The application is built on a **Spring Boot** backend with a hybrid frontend architecture using **ExtJS** for dynamic grids and **JSP/HTML** for standard interfaces.

### Key Modules

- **Decoupled PDF Service**  
  Java `ProcessBuilder` triggers an isolated Node.js (Puppeteer) environment to render pixel-perfect PDF reports from HTML data without blocking the main JVM thread.

- **Dynamic Scheduler Service**  
  Leverages Spring’s `ThreadPoolTaskScheduler` to manage background jobs. Unlike static schedulers, this module allows runtime reconfiguration of cron expressions without restarting the application.

- **Bulk Data Engine**  
  Optimized Excel parsing module using **Apache POI** to handle large-scale data ingestion and export.

- **High-Speed AJAX Layer**  
  Utilizes **DWR (Direct Web Remoting)** to expose Java service methods directly to JavaScript, achieving sub-200ms latency for dynamic UI components.

---

## 🛠 Tech Stack

### Backend
- Java 17 (Core Logic)
- Spring Boot (MVC, DI, Scheduling)
- ThreadPoolTaskScheduler (Dynamic Job Management)
- Hibernate / JPA (ORM & Database Abstraction)
- Apache POI (Excel Processing)
- DWR 3.x (AJAX Remoting)

### Frontend
- ExtJS 4.2 (Advanced Data Grids & UI Components)
- HTML5 / CSS3 (Responsive Layouts)
- JSP (Server-Side Rendering)

### Infrastructure & Tools
- Maven (Build Management)
- Node.js & Puppeteer (Headless Browser for PDF Generation)
- MySQL (Relational Database)

---

## ✨ Key Features & Tabs

The application is organized into **8 distinct functional modules ("Tabs")**:

1. **Dynamic Dropdowns**  
   Hybrid HTML/ExtJS selection tools with real-time data binding.

2. **Modal Popups**  
   Context-aware popup editors for modifying complex entity relationships.

3. **Advanced Grids**  
   Searchable, paginated data tables with server-side sorting and filtering.

4. **DWR Entry Screen**  
   Fast data entry forms leveraging Direct Web Remoting for instant validation.

5. **Excel Processor**  
   Bulk upload/download facility capable of parsing complex spreadsheets.

6. **Web Services**  
   RESTful API endpoints for external system integration.

7. **PDF Reporting Engine**
   - Generates HTML reports from live database records  
   - Orchestrates a headless Chrome instance (Puppeteer) to convert HTML to PDF  
   - Streams binary PDF data back to the client browser

8. **Dynamic Cron Manager**
   - Real-time dashboard to monitor internal Java background tasks  
   - Hot-swappable scheduling with instant cron expression updates at runtime  
   - Visual execution logs with success, error, and configuration-change indicators

---

## ⚙️ Installation & Setup

### Prerequisites
- Java JDK 8 or higher (JDK 17 recommended)
- Maven 3.x
- Node.js (for Puppeteer module)
- MySQL Database

---

### 1. Database Setup

Create a MySQL database and configure your `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mednet_db
spring.datasource.username=root
spring.datasource.password=yourpassword
```

---

### 2. Puppeteer Setup

Navigate to the local Puppeteer directory and install dependencies:

```bash
cd C:/mednet_puppeteer
npm install puppeteer
```

---

### 3. Build & Run

Since the scheduler is internal to Spring, **no OS-level cron configuration is required**.

```bash
mvn clean install
mvn spring-boot:run
```
---

## 👨‍💻 Author

**Devansh Prakash Dhopte**  
LinkedIn: https://www.linkedin.com/in/devansh-dhopte/  
Email: devanshdhopte@gmail.com  

Developed as a capstone project demonstrating full-stack enterprise capabilities.
