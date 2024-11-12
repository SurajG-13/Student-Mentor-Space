import React from "react";
import { useSelector } from "react-redux";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { ThemeProvider } from "../context/Theme";

const TeacherLayout = ({ children }) => {
   const role = useSelector((state) => state.user.role); // Get the user role from Redux state

   if (role !== "teacher") {
      return <div>You are not authorized to view this page</div>;
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
