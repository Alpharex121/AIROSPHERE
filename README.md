# **Airosphere – Branch Community Platform**

Airosphere is a MERN stack-based community platform designed for students and faculty in the AI and Robotics domain. It features a robust **Role-Based Access Control (RBAC)** system, ensuring secure, role-specific access to different sections and functionalities.

---

## **Features**

### **Role-Based Access Control (RBAC):**
- **Roles Supported**: Admin, Professor, Club Head, Student.  
- **Access Control**:
  - **Professors**: Manage academic resources such as notes, previous year questions (PYQs), and important questions.  
  - **Club Heads**: Oversee club activities, including member management, notifications, and events.  
  - **Admins**: Access system-wide features like user management and role assignment.  
  - **Students**: Access study materials, participate in discussions, and explore roadmaps.

---

## **Technology Stack**

- **Frontend**: React.js with Tailwind CSS for responsive, modern UI design.  
- **Backend**: Node.js and Express.js for a modular and secure server.  
- **Database**: MongoDB for efficient data management.  
- **State Management**: Redux for handling complex state transitions.  
- **Security**: Role-Based Access Control implemented with JWT tokens and conditional rendering.

---

## **How to Run the Project**

### **Prerequisites**
1. **Node.js** and **npm** installed.  
2. A **MongoDB** instance running locally or on a cloud service.

---

### **Steps to Run**

1. **Clone the repository**:
   git clone https://github.com/Alpharex121/AIROSPHERE.git

2. **Navigate to the repository**:
   cd AIROSPHERE
3. **Install dependencies for the backend:**
   cd backend
   npm install

4. **Install dependencies for the frontend:**
   cd ../frontend
   npm install

5. **Configure environment variables:**
   ->Create a .env file in the backend folder with:
       URI=your-mongodb-connection-string
       SECRET_KEY=your-secret-key-for-JWT
   
   ->Create a .env file in the frontend folder with:
      VITE_SERVICE_ID=your-emailjs-service-id
      VITE_TEMPLATE_ID=your-emailjs-template-id
      VITE_PUBLIC_KEY=your-emailjs-public-key
      VITE_FIREBASE_API_KEY=your-firebase-api-key
      VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
      VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
      VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
      VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
      VITE_FIREBASE_APP_ID=your-firebase-app-id
      VITE_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
   
7. **Start the backend server:**
    cd ../backend
    npm run start

8. **Start the frontend development server:**
    cd ../frontend
    npm start





