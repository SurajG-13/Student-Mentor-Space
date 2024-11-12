# Student Mentor Space - Backend

This is the **Backend** part of the **Student Mentor Space** application, built with **Node.js**, **Express.js**, and **MongoDB**. It handles the API for storing and managing academic data, user authentication, and facilitating communication between students and faculty.

## Features

- **User Authentication**: JWT-based authentication for student and faculty logins.

- **Student Data Management**: Students can store their academic information, such as marks and curriculum data.

- **Faculty Dashboard**: Faculty can view student records, provide evaluations, and give feedback.

- **Secure Data Storage**: All data is securely stored in **MongoDB** with proper data validation and handling.

- **RESTful API**: Provides endpoints for student and faculty data, including authentication, fetching student information, adding marks, etc.

- **Role-based Access**: Different access levels for students and faculty, ensuring proper data protection and functionality.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side logic.

- **Express.js**: Web framework for building the RESTful API.

- **MongoDB**: NoSQL database for storing academic records and user data.

- **JWT (JSON Web Tokens)**: For secure user authentication and session management.

- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

- **Bcrypt.js**: For hashing and salting passwords securely.

- **dotenv**: For managing environment variables (e.g., database connection strings, JWT secret).

## Installation

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/) (v12 or higher)

- [MongoDB](https://www.mongodb.com/) (either locally or via a service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Steps to Run the Backend

1. **Clone the repository**:

   ```bash
   git clone
   cd student-mentor-space/backend
   ```

2. **Install dependencies**:

   Inside the `backend` directory, run:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the `backend` directory with the following values:

   ```plaintext
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   PORT=8000
   ```

   Replace `<your_mongodb_connection_string>` with your MongoDB URI and `<your_jwt_secret_key>` with a secret key for JWT authentication.

4. **Run the server**:

   To start the backend server, run:

   ```bash
   npm run dev
   ```

   The API server will be running at `http://localhost:8000`.

## API Endpoints

For detailed API documentation, refer to the `/docs` folder or the API documentation section in the project.

## Deployment

To deploy the backend to production, you can use services like **Heroku**, **AWS**, or **DigitalOcean**. Before deployment, make sure you set the appropriate environment variables for the production environment.

### Build for Production

If you're deploying to a cloud server, you can build and run the production version of your server with:

```bash
npm run build
```

## Contributing

If you'd like to contribute to the backend, follow these steps:

- Fork the repository

- Create a new branch (`git checkout -b feature-name`)

- Make changes and commit (`git commit -am 'Add feature'`)

- Push to your branch (`git push origin feature-name`)

- Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---
