// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";

// import {
//    createBrowserRouter,
//    createRoutesFromElements,
//    Route,
//    RouterProvider,
// } from "react-router-dom";

// import { Provider, useSelector } from "react-redux";
// import store from "./redux/store.js";

// // Global Interface Imports:

// import Home from "./pages/Home/Home.jsx";
// import About from "./pages/About/About.jsx";
// import SignIn from "./pages/SignIn/SignIn.jsx";
// import GetStarted from "./pages/SignIn/GetStarted.jsx";
// import StudentLogIn from "./pages/SignIn/StudentLogIn.jsx";
// import TeacherLogIn from "./pages/SignIn/TeacherLogIn.jsx";

// // Student Interface Imports :

// import S_Home from "./pages/Student/HomePage/S_Home.jsx";

// import S_Academics from "./pages/Student/Academics/S_Academics.jsx";
// import Sem1 from "./pages/Student/Academics/Sem1.jsx";
// import Project from "./pages/Student/Projects/Project.jsx";

// // Teacher Interface Imports :

// import T_Home from "./pages/Teacher/HomePage/T_Home.jsx";
// import SearchStudent from "./pages/Teacher/Search/SearchStudent.jsx";

// // Layouts:

// import Layout from "./layout/Layout.jsx";
// import StudentLayout from "./layout/StudentLayout.jsx";
// import TeacherLayout from "./layout/TeacherLayout.jsx";
// import StudentProfile from "./pages/Student/Profile/StudentProfile.jsx";

// const router = createBrowserRouter(
//    createRoutesFromElements(
//       <Route path="/" element={<Layout />}>
//          <Route path="" element={<Home />} />
//          <Route path="About" element={<About />} />
//          <Route path="signin" element={<SignIn />} />
//          <Route path="getstarted" element={<GetStarted />} />
//          <Route path="studentlogin" element={<StudentLogIn />} />
//          <Route path="teacherlogin" element={<TeacherLogIn />} />

//          <Route
//             path="s_home"
//             element={
//                <StudentLayout>
//                   {" "}
//                   <S_Home />{" "}
//                </StudentLayout>
//             }
//          />
//          <Route
//             path="s_basicdetails"
//             element={
//                <StudentLayout>
//                   <StudentProfile />
//                </StudentLayout>
//             }
//          />
//          <Route
//             path="s_academics"
//             element={
//                <StudentLayout>
//                   <S_Academics />
//                </StudentLayout>
//             }
//          />
//          <Route
//             path="sem1"
//             element={
//                <StudentLayout>
//                   <Sem1 />
//                </StudentLayout>
//             }
//          />

//          <Route
//             path="Project"
//             element={
//                <StudentLayout>
//                   {" "}
//                   <Project />{" "}
//                </StudentLayout>
//             }
//          />

//          <Route
//             path="t_home"
//             element={
//                <TeacherLayout>
//                   {" "}
//                   <T_Home />{" "}
//                </TeacherLayout>
//             }
//          />
//          <Route
//             path="SearchStudent"
//             element={
//                <TeacherLayout>
//                   {" "}
//                   <SearchStudent />{" "}
//                </TeacherLayout>
//             }
//          />
//       </Route>
//    )
// );

// createRoot(document.getElementById("root")).render(
//    <StrictMode>
//       <Provider store={store}>
//          <RouterProvider router={router} />
//       </Provider>
//    </StrictMode>
// );

// // import { StrictMode } from "react";
// // import { createRoot } from "react-dom/client";
// // import "./index.css";

// // import {
// //    createBrowserRouter,
// //    createRoutesFromElements,
// //    Route,
// //    RouterProvider,
// // } from "react-router-dom";

// // import { Provider } from "react-redux";
// // import store from "./redux/store.js";

// // import Layout from "./Layout.jsx";
// // import Home from "./pages/Home/Home.jsx";
// // import About from "./pages/About/About.jsx";
// // import SignIn from "./pages/SignIn/SignIn.jsx";
// // import GetStarted from "./pages/SignIn/GetStarted.jsx";
// // import StudentLogIn from "./pages/SignIn/StudentLogIn.jsx";
// // import TeacherLogIn from "./pages/SignIn/TeacherLogIn.jsx";

// // // Student Interface Imports :

// // import S_Home from "./components/Student/HomePage/S_Home.jsx";
// // import S_Profile from "./components/Student/Profile/S_Profile.jsx";
// // import S_Academics from "./components/Student/Academics/S_Academics.jsx";
// // import Sem1 from "./components/Student/Academics/Sem1.jsx";

// // // Teacher Interface Imports :

// // import T_Home from "./components/Teacher/HomePage/T_Home.jsx";

// // const router = createBrowserRouter(
// //    createRoutesFromElements(
// //       <Route path="/" element={<Layout />}>
// //          <Route path="" element={<Home />} />
// //          <Route path="About" element={<About />} />
// //          <Route path="signin" element={<SignIn />} />
// //          <Route path="getstarted" element={<GetStarted />} />
// //          <Route path="studentlogin" element={<StudentLogIn />} />
// //          <Route path="teacherlogin" element={<TeacherLogIn />} />

// //          {/* Student  Interface Route */}

// //          <Route path="s_home" element={<S_Home />} />
// //          <Route path="s_basicdetails" element={<S_Profile />} />
// //          <Route path="s_academics" element={<S_Academics />} />
// //          <Route path="sem1" element={<Sem1 />} />

// //          {/* Teacher Interface Route */}

// //          <Route path="t_home" element={<T_Home />} />
// //       </Route>
// //    )
// // );

// // createRoot(document.getElementById("root")).render(
// //    <StrictMode>
// //       <Provider store={store}>
// //          <RouterProvider router={router} />
// //       </Provider>
// //    </StrictMode>
// // );

// index.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store.js";

// Global Interface Imports
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import GetStarted from "./pages/SignIn/GetStarted.jsx";
import StudentLogIn from "./pages/SignIn/StudentLogIn.jsx";
import TeacherLogIn from "./pages/SignIn/TeacherLogIn.jsx";

// Student Interface Imports
import S_Home from "./pages/Student/HomePage/S_Home.jsx";
import S_Academics from "./pages/Student/Academics/S_Academics.jsx";
import Sem1 from "./pages/Student/Academics/Sem1.jsx";
import Project from "./pages/Student/Projects/Project.jsx";
import StudentProfile from "./pages/Student/Profile/StudentProfile.jsx";
import S_Certificate from "./pages/Student/Certification/S_Certifications.jsx";

// Teacher Interface Imports
import T_Home from "./pages/Teacher/HomePage/T_Home.jsx";
import SearchStudent from "./pages/Teacher/Search/SearchStudent.jsx";

// Layouts
import StudentLayout from "./layout/StudentLayout.jsx";
import TeacherLayout from "./layout/TeacherLayout.jsx";

import { useSelector } from "react-redux";
import S_Internship from "./pages/Student/Internship/S_Internship.jsx";

// Wrapper component to use `useSelector` correctly
function S_AcademicsWithToken() {
   const token = useSelector((state) => state.auth.token);
   return (
      <StudentLayout>
                  <S_Academics token={token} />     {" "}
      </StudentLayout>
   );
}

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<Layout />}>
                  <Route path="" element={<Home />} />
                  <Route path="About" element={<About />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="getstarted" element={<GetStarted />} />
                  <Route path="studentlogin" element={<StudentLogIn />} />
                  <Route path="teacherlogin" element={<TeacherLogIn />} />     
            {/* Student Routes */}
                  
         <Route
            path="s_home"
            element={
               <StudentLayout>
                  <S_Home />
               </StudentLayout>
            }
         />
                  
         <Route
            path="s_basicdetails"
            element={
               <StudentLayout>
                  <StudentProfile />
               </StudentLayout>
            }
         />
                  
         <Route path="s_academics" element={<S_AcademicsWithToken />} />
                  
         <Route
            path="sem1"
            element={
               <StudentLayout>
                  <Sem1 />
               </StudentLayout>
            }
         />
                  
         <Route
            path="S_Certificate"
            element={
               <StudentLayout>
                  <S_Certificate />
               </StudentLayout>
            }
         />
                  
         <Route
            path="Project"
            element={
               <StudentLayout>
                  <Project />
               </StudentLayout>
            }
         />
         <Route
            path="s_internship"
            element={
               <StudentLayout>
                  <S_Internship />
               </StudentLayout>
            }
         />
                  {/* Teacher Routes */}
                  
         <Route
            path="t_home"
            element={
               <TeacherLayout>
                  <T_Home />
               </TeacherLayout>
            }
         />
                  
         <Route
            path="SearchStudent"
            element={
               <TeacherLayout>
                  <SearchStudent />
               </TeacherLayout>
            }
         />
              {" "}
      </Route>
   )
);

createRoot(document.getElementById("root")).render(
   <StrictMode>
           {" "}
      <Provider store={store}>
                  <RouterProvider router={router} />     {" "}
      </Provider>
         
   </StrictMode>
);
