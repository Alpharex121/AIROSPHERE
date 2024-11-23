# **Airosphere – Branch Community Platform**

Airosphere is a MERN stack-based community platform designed for students and faculty. It features a robust **Role-Based Access Control (RBAC)** system, ensuring secure, role-specific access to different sections and functionalities.

---

## Features

1. **Role-Based Access Control (RBAC):**
   - **Roles Supported:** Admin, Professor, Club Head, Student.
   - **Access Control:**
     - **Professors** can manage academic resources, such as notes, previous year questions (PYQs), and important questions.
     - **Club Heads** can oversee club activities, including member management, notifications, and events.
     - **Admins** have access to system-wide features like user management and role assignment.
     - **Students** can access study materials, participate in discussions, and explore learning roadmaps.

2. **Academic Resources Management:**
   - Professors can upload and manage notes, PYQs, and important questions.
   - Students can view and download these academic resources.

3. **Student Connect:**
   - A platform for students to connect, find teammates for projects, hackathons, and more.
   - **Anonymous Doubts:** Students can ask doubts anonymously with only usernames visible.
   - **Peer Development:** Students can find peers to collaborate with on personal development.

4. **Club Management:**
   - **Club Heads** can manage their club's activities, including members, notifications, and events.
   - Students can join clubs and participate in events and activities.

5. **Roadmaps & Resources:**
   - Provides learning roadmaps for various technologies, including web development, DSA, app development, and AI.
   - Roadmaps include estimated completion times and a feature to mark progress as "complete."

6. **Updates Section:**
   - Displays branch-specific updates related to academics and website content.
   - Allows admins to post updates for students and faculty to stay informed.

7. **Quick Links:**
   - Provides easy access to essential links required during the course period, such as exam schedules, course materials, and other resources.

8. **User Authentication & Authorization:**
   - **JWT tokens** ensure secure user authentication.
   - **RBAC** ensures that users only have access to areas and functionalities based on their roles.

9. **Admin Dashboard:**
   - Allows admins to manage users, assign roles, and control system-wide settings.
   - Ensures smooth operation of the platform with role-based restrictions and secure access control.

10. **Modern & Responsive UI:**
    - Built with **React.js** and **Tailwind CSS**, ensuring a responsive and modern design that adapts to different screen sizes.
    - The UI is clean, intuitive, and user-friendly, providing a seamless experience for students, faculty, and administrators.

11. **State Management with Redux:**
    - **Redux** is used for handling complex state transitions, providing a smooth and consistent user experience across the platform.

12. **Secure Backend:**
    - The backend is developed using **Node.js** and **Express.js**, ensuring modularity, maintainability, and security.
    - **MongoDB** is used for efficient data management.


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
    ```
   git clone https://github.com/Alpharex121/AIROSPHERE.git
    ```

2. **Navigate to the repository**:
   ```
   cd AIROSPHERE
   ```
3. **Install dependencies for the backend:**
   ```
   cd backend
   npm install
   ```

4. **Install dependencies for the frontend:**
    ```
   cd ../frontend
   npm install
    ```

5.  **Configure environment variables:**

     ->Create a .env file in the backend folder with:
       ```
           URI=your-mongodb-connection-string
           SECRET_KEY=your-secret-key-for-JWT
       ```
   
     ->Create a .env file in the frontend folder with:
       ```
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
       ```
   
6. **Start the backend server:**
    ```
    cd ../backend
    npm run start
    ```

7. **Start the frontend development server:**
    ```
    cd ../frontend
    npm start
    ```





