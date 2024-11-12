# Student Mentor Space - Frontend

This is the **Frontend** part of the **Student Mentor Space** application, built with **React.js**. It provides a dynamic and user-friendly interface for students and faculty to interact with the academic management system.

## Features

- **Student Dashboard**: Students can enter their academic data, track their marks, and view feedback from mentors.

- **Faculty Dashboard**: Faculty can view student progress, provide evaluations, and offer mentoring.

- **Authentication**: Secure login and role-based access for students and faculty using JWT authentication.

- **Responsive UI**: Built using React and Tailwind CSS, the frontend is designed to be responsive across various devices.

- **Real-Time Communication**: Allows students and faculty to communicate directly via the platform for academic discussions.

## Technologies Used

- **React.js**: Front-end JavaScript library for building the user interface.

- **Axios**: HTTP client for making requests to the backend API.

- **React Router**: For managing routing between different pages (student and faculty dashboards, login, etc.).

- **JWT**: Token-based authentication for managing user sessions.

- **Redux** : For global state management across the application.

## Installation

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/) (v12 or higher)

### Steps to Run the Frontend

1. **Clone the repository**:

   ```bash
   git clone
   cd student-mentor-space/frontend
   ```

2. **Install dependencies**:

   Inside the `frontend` directory, run:

   ```bash
   npm install
   ```

3. **Run the development server**:

   Start the React development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

4. **Setup API endpoint**:

   Ensure that the frontend is configured to make requests to the backend API. The API endpoint URL is typically configured in your `src` folder (usually in an `api.js` or `config.js` file). Set it to match your backend server (e.g., `http://localhost:8000`).

## Usage

Once the app is running, you can:

- **Log in** as either a student or a faculty member.

- **Students** can input their academic data, view their marks, and communicate with their mentors.

- **Faculty** can view student records, provide evaluations, and send feedback.

## Deployment

To deploy this frontend to production, you can run:

```bash
npm run build
```

This will generate an optimized build of the app, which you can then deploy to services like **Netlify**, **Vercel**, or **GitHub Pages**.

## Contributing

If you’d like to contribute to the frontend, follow these steps:

- Fork the repository

- Create a new branch (`git checkout -b feature-name`)

- Make changes and commit (`git commit -am 'Add feature'`)

- Push to your branch (`git push origin feature-name`)

- Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---
