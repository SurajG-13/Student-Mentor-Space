import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "../context/Theme";
import NoAccessPage from "../utilities/NoAccessPage";

const TeacherLayout = ({ children }) => {
   const { isLoggedIn } = useSelector((state) => state.auth);
   const { role } = useSelector((state) => state.user);

   if (!isLoggedIn || role !== "Teacher") {
      return <NoAccessPage />;
   }

   return (
      <>
         <ThemeProvider>
            <main>{children}</main>
         </ThemeProvider>
      </>
   );
};

export default TeacherLayout;
