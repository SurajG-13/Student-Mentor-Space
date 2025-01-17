import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "../context/Theme";
import NoAccessPage from "../utilities/NoAccessPage";

const StudentLayout = ({ children }) => {
   const { isLoggedIn } = useSelector((state) => state.auth);
   const { role } = useSelector((state) => state.user);

   if (!isLoggedIn || role !== "Student") {
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

export default StudentLayout;
