import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { ThemeProvider } from "../context/Theme";

function Layout() {
   return (
      <>
         <ThemeProvider>
            <Header />
            <Outlet />
            <Footer />
         </ThemeProvider>
      </>
   );
}

export default Layout;
