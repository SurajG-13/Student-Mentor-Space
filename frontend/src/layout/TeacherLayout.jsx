import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { ThemeProvider } from "../context/Theme";
import NoAccessPage from "../utilities/NoAccessPage";

const TeacherLayout = ({ children }) => {
   const { isLoggedIn } = useSelector((state) => state.auth); // Get isLoggedIn from authSlice
   const { role } = useSelector((state) => state.user); // Get role from userSlice

   // Check if the user is logged in and has the "Teacher" role
   if (!isLoggedIn || role !== "Teacher") {
      return <NoAccessPage />; // If not logged in or not a teacher, show NoAccessPage
   }

   return (
      <>
         <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
         </ThemeProvider>
      </>
   );
};

export default TeacherLayout;
