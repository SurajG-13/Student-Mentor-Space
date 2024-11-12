# Student Mentor Space

**Student Mentor Space** is a web-based platform designed to streamline academic management, offering a unified system for tracking student performance and fostering seamless communication between students and faculty. Built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), this platform allows students to input their marks and curriculum-related data, securely store it, and provide teachers with easy access for evaluation and feedback.

The platform aims to eliminate manual tracking and ensure effective, real-time communication between students and faculty. It serves as a digital bridge to help mentor-student relationships and academic progress monitoring.

## Features

- **Student Dashboard**: Students can input and track their academic progress, including marks and curriculum-related information.

- **Faculty Dashboard**: Teachers can access student data for evaluation, feedback, and academic advising.

- **Secure Data Storage**: All academic data is securely stored in a MongoDB database, ensuring privacy and integrity.

- **Real-Time Communication**: The platform facilitates direct communication between students and faculty for mentoring and academic discussions.

- **User Authentication**: Role-based authentication for students and faculty, ensuring only authorized access to relevant data.

- **Responsive UI**: Built with React for a smooth, user-friendly interface that works seamlessly across devices.

## Technologies Used

- **MongoDB**: NoSQL database for storing student data, marks, curriculum, and academic records.

- **Express.js**: Web framework for handling HTTP requests and building RESTful APIs.

- **React.js**: Front-end JavaScript library for building dynamic and interactive user interfaces.

- **Node.js**: JavaScript runtime for running server-side logic.

- **JWT Authentication**: Secure user authentication with JSON Web Tokens to protect user data.

## Installation

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/) (v12 or higher)

- [MongoDB](https://www.mongodb.com/) (either locally or via a service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Steps to Run the Application

1. **Clone the repository**:

   ```bash
   git clone
   cd student-mentor-space
   ```

2. **Install server-side dependencies**:

   Navigate to the `backend` folder and install dependencies:

   ```bash
   cd backend
   npm install
   ```

3. **Install client-side dependencies**:

   Navigate to the `frontend` folder and install dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**:

   In the `backend` directory, create a `.env` file and add the following configuration:

   ```plaintext
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   ```

   Replace `<your_mongodb_connection_string>` with your MongoDB URI and `<your_jwt_secret_key>` with a secret key for JWT authentication.

5. **Run the development server**:

   To run the backend:

   ```bash
   cd backend
   npm run dev
   ```

   To run the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

   The server will be running on `http://localhost:8000`, and the frontend will be available at `http://localhost:3000`.

## Usage

- **Student**: Log in to track your academic progress, input your marks, and view feedback from your mentors.

- **Faculty**: Log in to evaluate student performance, provide feedback, and guide academic development.

## Contributing

Feel free to fork the repository, make improvements, and submit pull requests. Contributions are always welcome!

- **Issues**: If you encounter any issues or have feature suggestions, please create a new issue in the repository.

- **Pull Requests**: Ensure that your pull request adheres to the coding standards, and include clear explanations of changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Inspired by the need for better academic management and communication between students and faculty.

- Thanks to the open-source community for providing the tools and libraries that make this project possible.

---

**Student Mentor Space** provides a modern and efficient way to manage academic performance and mentor-student interactions. It aims to simplify the academic journey for both students and faculty, helping them to stay organized, communicate more effectively, and focus on learning and teaching.
