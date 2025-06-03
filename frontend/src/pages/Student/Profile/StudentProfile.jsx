// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useSelector } from "react-redux";
// import S_Sidebar from "../S_Sidebar";
// import axios from "axios";

// function StudentProfile() {
//    const [formData, setFormData] = useState({
//       studentName: "",
//       eMail: "",
//       contactNumber: "",
//       dateOfBirth: "",
//       registrationNumber: "",
//       rollNumber: "",
//       department: "",
//       localArea: "",
//       postOffice: "",
//       pinCode: "",
//       xMarks: "",
//       xiiMarks: "",
//       diplomaMarks: "",
//       admissionYear: "",
//    });

//    const [loading, setLoading] = useState(true);

//    // Assuming the rollNumber is available in the URL or local storage
//    const rollNumber = useSelector((state) => state.user.studentInfo.roll);

//    // Fetch student data when component mounts
//    useEffect(() => {
//       const fetchStudentData = async () => {
//          try {
//             const response = await axios.get(
//                `http://localhost:8000/api/v1/students/profile/${rollNumber}`
//             );
//             setFormData(response.data); // Assuming the API returns student data
//             setLoading(false);
//          } catch (error) {
//             console.error("Error fetching student data:", error);
//             setLoading(false);
//          }
//       };

//       fetchStudentData();
//    }, [rollNumber]);

//    const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({ ...formData, [name]: value });
//    };

//    const handleSubmit = async (e) => {
//       e.preventDefault();

//       try {
//          const response = await axios.put(
//             `http://localhost:8000/api/v1/students/update/${rollNumber}`,
//             formData
//          );
//          alert("Profile updated successfully!");
//       } catch (error) {
//          console.error("Error updating profile:", error);
//          alert("Error updating profile.");
//       }
//    };

//    if (loading) {
//       return <div>Loading...</div>;
//    }

//    return (
//       <main className="w-full h-screen flex flex-row relative  bg-lightBackground dark:bg-darkBackground text-primaryBlack dark:text-primaryWhite">
//          <S_Sidebar />

//          <article className="w-screen h-screen flex justify-evenly items-center overflow-hidden mt-20">
//             <section>
//                <div className="items-center justify-center w-[90vw] grid grid-cols-1 md:grid-cols-2 px-2 ml-20">
//                   <motion.form
//                      onSubmit={handleSubmit}
//                      className="px-8 rounded-lg h-screen"
//                      initial={{ scale: 0.9 }}
//                      animate={{ scale: 1 }}
//                      transition={{ duration: 0.3 }}
//                   >
//                      {/* Personal Details Section */}

//                      <section className="py-2 space-y-2">
//                         <h3 className="text-lg font-semibold">Basic Details</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                            <div>
//                               <label
//                                  className="block text-gray-700 mb-1"
//                                  htmlFor="studentName"
//                               >
//                                  Full Name
//                               </label>
//                               <input
//                                  type="text"
//                                  id="studentName"
//                                  name="studentName"
//                                  value={formData.studentName}
//                                  onChange={handleChange}
//                                  required
//                                  disabled
//                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                  placeholder="Enter your full name"
//                               />
//                            </div>
//                            <div>
//                               <label
//                                  className="block text-gray-700 mb-1"
//                                  htmlFor="dateOfBirth"
//                               >
//                                  Date of Birth
//                               </label>
//                               <input
//                                  type="date"
//                                  id="dateOfBirth"
//                                  name="dateOfBirth"
//                                  value={formData.dateOfBirth}
//                                  onChange={handleChange}
//                                  required
//                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                            </div>
//                         </div>
//                      </section>

//                      {/* Contact Information Section */}

//                      <section className="py-2 space-y-2">
//                         <h3 className="text-lg font-semibold">
//                            Contact Information
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                            <div>
//                               <label
//                                  className="block text-gray-700 mb-1"
//                                  htmlFor="eMail"
//                               >
//                                  Email
//                               </label>
//                               <input
//                                  type="email"
//                                  id="eMail"
//                                  name="eMail"
//                                  value={formData.eMail}
//                                  onChange={handleChange}
//                                  required
//                                  disabled
//                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                  placeholder="Enter your email"
//                               />
//                            </div>
//                            <div>
//                               <label
//                                  className="block text-gray-700 mb-1"
//                                  htmlFor="contactNumber"
//                               >
//                                  Phone Number
//                               </label>
//                               <input
//                                  type="tel"
//                                  id="contactNumber"
//                                  name="contactNumber"
//                                  value={formData.contactNumber}
//                                  onChange={handleChange}
//                                  required
//                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                  placeholder="Enter your phone number"
//                               />
//                            </div>
//                         </div>
//                      </section>

//                      {/* College Information */}

//                      <section className="py-2 space-y-2">
//                         <h3 className="text-lg font-semibold">
//                            Address Information
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                            <div>
//                               <label
//                                  className="block text-gray-700 mb-1"
//                                  htmlFor="eMail"
//                               >
//                                  City
//                               </label>
//                               <input
//                                  type="text"
//                                  id="localArea"
//                                  name="localArea"
//                                  value={formData.localArea}
//                                  onChange={handleChange}
//                                  required
//                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                  placeholder="Enter your email"
//                               />
//                            </div>
//                            <div>
//                               <label
//                                  className="block text-gray-700 mb-1"
//                                  htmlFor="contactNumber"
//                               >
//                                  Pin Code
//                               </label>
//                               <input
//                                  type="tel"
//                                  id="pinCode"
//                                  name="pinCode"
//                                  value={formData.pinCode}
//                                  onChange={handleChange}
//                                  required
//                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                  placeholder="Enter your phone number"
//                               />
//                            </div>

//                            <div>
//                               <label
//                                  className="block text-gray-700 mb-1"
//                                  htmlFor="postOffice"
//                               >
//                                  Post Office
//                               </label>
//                               <input
//                                  type="text"
//                                  id="postOffice"
//                                  name="postOffice"
//                                  value={formData.postOffice}
//                                  onChange={handleChange}
//                                  required
//                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                  placeholder="Enter your phone number"
//                               />
//                            </div>
//                         </div>
//                      </section>

//                      {/* Submit Button */}
//                      <div className="flex justify-end">
//                         <button
//                            type="submit"
//                            className="mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
//                         >
//                            Update Profile
//                         </button>
//                      </div>
//                   </motion.form>

//                   <motion.form
//                      onSubmit={handleSubmit}
//                      className="px-8 rounded-lg h-screen"
//                      initial={{ scale: 0.9 }}
//                      animate={{ scale: 1 }}
//                      transition={{ duration: 0.3 }}
//                   >
//                      {/* Personal Details Section */}

//                      <section className="py-2 space-y-2">
//                         <h3 className="text-lg font-semibold">
//                            MAKAUT Information
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                            <div>
//                               <label
//                                  className="block text-gray-700 mb-1"
//                                  htmlFor="rollNumber"
//                               >
//                                  Roll Number
//                               </label>
//                               <input
//                                  type="tel"
//                                  id="rollNumber"
//                                  name="rollNumber"
//                                  value={formData.rollNumber}
//                                  onChange={handleChange}
//                                  required
//                                  disabled
//                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                  placeholder="Enter your full name"
//                               />
//                            </div>
//                            <div>
//                               <label
//                                  className="block text-gray-700 mb-1"
//                                  htmlFor="registrationNumber"
//                               >
//                                  Registration Number
//                               </label>
//                               <input
//                                  type="tel"
//                                  id="registrationNumber"
//                                  name="registrationNumber"
//                                  value={formData.registrationNumber}
//                                  onChange={handleChange}
//                                  required
//                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               />
//                            </div>
//                         </div>
//                      </section>

//                      {/* Contact Information Section */}

//                      <section className="py-2 space-y-2">
//                         <h3 className="text-lg font-semibold">
//                            Marks Information
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                            <div>
//                               <label
//                                  className="block text-gray-700 mb-1"
//                                  htmlFor="xMarks"
//                               >
//                                  X Marks
//                               </label>
//                               <input
//                                  type="number"
//                                  id="xMarks"
//                                  name="xMarks"
//                                  value={formData.xMarks}
//                                  onChange={handleChange}
//                                  required
//                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                  placeholder="Enter your email"
//                               />
//                            </div>
//                            <div>
//                               <label
//                                  className="block text-gray-700 mb-1"
//                                  htmlFor="xiiMarks"
//                               >
//                                  XII Marks
//                               </label>
//                               <input
//                                  type="number"
//                                  id="xiiMarks"
//                                  name="xiiMarks"
//                                  value={formData.xiiMarks}
//                                  onChange={handleChange}
//                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                  placeholder="Enter your phone number"
//                               />
//                            </div>
//                            <div>
//                               <label
//                                  className="block text-gray-700 mb-1"
//                                  htmlFor="diplomaMarks"
//                               >
//                                  Diploma Marks
//                               </label>
//                               <input
//                                  type="number"
//                                  id="diplomaMarks"
//                                  name="diplomaMarks"
//                                  value={formData.diplomaMarks}
//                                  onChange={handleChange}
//                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                  placeholder="Enter your phone number"
//                               />
//                            </div>
//                         </div>
//                      </section>

//                      {/* College Information */}

//                      <section className="py-2 space-y-2">
//                         <h3 className="text-lg font-semibold">
//                            College Information
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                            <div>
//                               <label
//                                  className="block text-gray-700 mb-1"
//                                  htmlFor="admissionYear"
//                               >
//                                  Admission Year
//                               </label>
//                               <input
//                                  type="admissionYear"
//                                  id="admissionYear"
//                                  name="admissionYear"
//                                  value={formData.admissionYear}
//                                  onChange={handleChange}
//                                  required
//                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                  placeholder="Your Admission Year in TECB"
//                               />
//                            </div>
//                            <div>
//                               <label
//                                  className="block text-gray-700 mb-1"
//                                  htmlFor="department"
//                               >
//                                  Department
//                               </label>
//                               <select
//                                  id="department"
//                                  name="department"
//                                  value={formData.department}
//                                  onChange={handleChange}
//                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                               >
//                                  <option value="">Select Department</option>
//                                  <option value="6825817b2bc785a66f319295">
//                                     Mechanical Engineering
//                                  </option>
//                                  <option value="6825817b2bc785a66f319294">
//                                     Computer Science and Engineering
//                                  </option>
//                                  <option value="674a06d644a7a5348575cd77">
//                                     Information Technology
//                                  </option>
//                                  <option value="6825817b2bc785a66f319296">
//                                     Electronics Communication Engineering
//                                  </option>
//                               </select>
//                            </div>
//                         </div>
//                      </section>

//                      {/* Submit Button */}
//                      <div className="flex justify-end">
//                         <button
//                            type="submit"
//                            className="mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
//                         >
//                            Update Profile
//                         </button>
//                      </div>
//                   </motion.form>
//                </div>
//             </section>
//          </article>
//       </main>
//    );
// }

// export default StudentProfile;

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useSelector } from "react-redux";
// import S_Sidebar from "../S_Sidebar";
// import axios from "axios";

// function StudentProfile() {
//    const [formData, setFormData] = useState({
//       studentName: "",
//       eMail: "",
//       contactNumber: "",
//       dateOfBirth: "",
//       registrationNumber: "",
//       rollNumber: "",
//       department: "",
//       localArea: "",
//       postOffice: "",
//       pinCode: "",
//       xMarks: "",
//       xiiMarks: "",
//       diplomaMarks: "",
//       admissionYear: "",
//    });

//    const [loading, setLoading] = useState(true);
//    const rollNumber = useSelector((state) => state.user.studentInfo.roll);

//    useEffect(() => {
//       const fetchStudentData = async () => {
//          try {
//             const response = await axios.get(
//                `http://localhost:8000/api/v1/students/profile/${rollNumber}`
//             );
//             const data = response.data;

//             setFormData({
//                ...data,
//                department: data.department?._id || "",
//                dateOfBirth: data.dateOfBirth
//                   ? data.dateOfBirth.substring(0, 10)
//                   : "",
//                xMarks: data.xMarks || "",
//                xiiMarks: data.xiiMarks || "",
//                diplomaMarks: data.diplomaMarks || "",
//                admissionYear: data.admissionYear || "",
//                localArea: data.localArea || "",
//                postOffice: data.postOffice || "",
//                pinCode: data.pinCode || "",
//                registrationNumber: data.registrationNumber || "",
//                contactNumber: data.contactNumber || "",
//                studentName: data.studentName || "",
//                eMail: data.eMail || "",
//                rollNumber: data.rollNumber || "",
//             });
//             setLoading(false);
//          } catch (error) {
//             console.error("Error fetching student data:", error);
//             setLoading(false);
//          }
//       };

//       if (rollNumber) {
//          fetchStudentData();
//       }
//    }, [rollNumber]);

//    const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prev) => ({ ...prev, [name]: value }));
//    };

//    const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//          await axios.put(
//             `http://localhost:8000/api/v1/students/update/${rollNumber}`,
//             formData
//          );
//          alert("Profile updated successfully!");
//       } catch (error) {
//          console.error("Error updating profile:", error);
//          alert("Error updating profile.");
//       }
//    };

//    if (loading) return <div className="p-10">Loading...</div>;

//    return (
//       <main className="w-full min-h-screen flex flex-row bg-lightBackground dark:bg-darkBackground text-primaryBlack dark:text-primaryWhite">
//          <S_Sidebar />

//          <article className="flex-1 overflow-y-auto p-4 pt-20">
//             <section className="max-w-6xl mx-auto">
//                <motion.form
//                   onSubmit={handleSubmit}
//                   className="space-y-6"
//                   initial={{ scale: 0.95 }}
//                   animate={{ scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                >
//                   {/* Basic Details */}
//                   <FormSection title="Basic Details">
//                      <TwoColumn>
//                         <InputField
//                            label="Full Name"
//                            name="studentName"
//                            value={formData.studentName}
//                            onChange={handleChange}
//                            disabled
//                         />
//                         <InputField
//                            label="Date of Birth"
//                            name="dateOfBirth"
//                            value={formData.dateOfBirth}
//                            onChange={handleChange}
//                            type="date"
//                         />
//                      </TwoColumn>
//                   </FormSection>

//                   {/* Contact Info */}
//                   <FormSection title="Contact Information">
//                      <TwoColumn>
//                         <InputField
//                            label="Email"
//                            name="eMail"
//                            value={formData.eMail}
//                            onChange={handleChange}
//                            type="email"
//                            disabled
//                         />
//                         <InputField
//                            label="Phone Number"
//                            name="contactNumber"
//                            value={formData.contactNumber}
//                            onChange={handleChange}
//                         />
//                      </TwoColumn>
//                   </FormSection>

//                   {/* Address Info */}
//                   <FormSection title="Address Information">
//                      <TwoColumn>
//                         <InputField
//                            label="City"
//                            name="localArea"
//                            value={formData.localArea}
//                            onChange={handleChange}
//                         />
//                         <InputField
//                            label="Pin Code"
//                            name="pinCode"
//                            value={formData.pinCode}
//                            onChange={handleChange}
//                         />
//                         <InputField
//                            label="Post Office"
//                            name="postOffice"
//                            value={formData.postOffice}
//                            onChange={handleChange}
//                         />
//                      </TwoColumn>
//                   </FormSection>

//                   {/* MAKAUT Info */}
//                   <FormSection title="MAKAUT Information">
//                      <TwoColumn>
//                         <InputField
//                            label="Roll Number"
//                            name="rollNumber"
//                            value={formData.rollNumber}
//                            onChange={handleChange}
//                            disabled
//                         />
//                         <InputField
//                            label="Registration Number"
//                            name="registrationNumber"
//                            value={formData.registrationNumber}
//                            onChange={handleChange}
//                         />
//                      </TwoColumn>
//                   </FormSection>

//                   {/* Marks */}
//                   <FormSection title="Marks Information">
//                      <TwoColumn>
//                         <InputField
//                            label="X Marks"
//                            name="xMarks"
//                            value={formData.xMarks}
//                            onChange={handleChange}
//                            type="number"
//                         />
//                         <InputField
//                            label="XII Marks"
//                            name="xiiMarks"
//                            value={formData.xiiMarks}
//                            onChange={handleChange}
//                            type="number"
//                         />
//                         <InputField
//                            label="Diploma Marks"
//                            name="diplomaMarks"
//                            value={formData.diplomaMarks}
//                            onChange={handleChange}
//                            type="number"
//                         />
//                      </TwoColumn>
//                   </FormSection>

//                   {/* College Info */}
//                   <FormSection title="College Information">
//                      <TwoColumn>
//                         <InputField
//                            label="Admission Year"
//                            name="admissionYear"
//                            value={formData.admissionYear}
//                            onChange={handleChange}
//                            type="number"
//                         />
//                         <div>
//                            <label className="block mb-1">Department</label>
//                            <select
//                               id="department"
//                               name="department"
//                               value={formData.department}
//                               onChange={handleChange}
//                               required
//                               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                            >
//                               <option value="">Select Department</option>
//                               <option value={import.meta.env.VITE_ME_ID}>
//                                  Mechanical Engineering
//                               </option>
//                               <option value={import.meta.env.VITE_CSE_ID}>
//                                  Computer Science and Engineering
//                               </option>
//                               <option value={import.meta.env.VITE_ECE_ID}>
//                                  Electronics Communication Engineering
//                               </option>
//                               <option value={import.meta.env.VITE_IT_ID}>
//                                  Information Technology
//                               </option>
//                               <option value={import.meta.env.VITE_AIML_ID}>
//                                  Artificial Intelligence & Machine Learning
//                               </option>
//                            </select>
//                         </div>
//                      </TwoColumn>
//                   </FormSection>

//                   <div className="flex justify-end">
//                      <button
//                         type="submit"
//                         className="mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                      >
//                         Update Profile
//                      </button>
//                   </div>
//                </motion.form>
//             </section>
//          </article>
//       </main>
//    );
// }

// export default StudentProfile;

// /** --------------------------
//  * 📦 Reusable Components
//  ----------------------------*/

// const FormSection = ({ title, children }) => (
//    <section className="space-y-2">
//       <h3 className="text-lg font-semibold">{title}</h3>
//       {children}
//    </section>
// );

// const TwoColumn = ({ children }) => (
//    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
// );

// const InputField = ({
//    label,
//    name,
//    value,
//    onChange,
//    type = "text",
//    disabled = false,
// }) => (
//    <div>
//       <label className="block text-gray-700 mb-1" htmlFor={name}>
//          {label}
//       </label>
//       <input
//          type={type}
//          id={name}
//          name={name}
//          value={value}
//          onChange={onChange}
//          required
//          disabled={disabled}
//          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//    </div>
// );
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import S_Sidebar from "../S_Sidebar";
import axios from "axios";

function StudentProfile() {
   const [formData, setFormData] = useState({
      studentName: "",
      eMail: "",
      contactNumber: "",
      dateOfBirth: "",
      registrationNumber: "",
      rollNumber: "",
      department: "",
      localArea: "",
      postOffice: "",
      pinCode: "",
      xMarks: "",
      xiiMarks: "",
      diplomaMarks: "",
      admissionYear: "",
      currentSemester: "",
   });

   const [departments, setDepartments] = useState([]);
   const [loading, setLoading] = useState(true);
   const rollNumber = useSelector((state) => state.user.studentInfo.roll);

   useEffect(() => {
      const fetchStudentData = async () => {
         try {
            const [studentRes, departmentsRes] = await Promise.all([
               axios.get(
                  `http://localhost:8000/api/v1/students/profile/${rollNumber}`
               ),
               axios.get("http://localhost:8000/api/v1/departments/"),
            ]);

            const studentData = studentRes.data;
            const departmentList = departmentsRes.data;

            setFormData({
               ...studentData,
               department: studentData.department?._id || "",
               dateOfBirth: studentData.dateOfBirth?.substring(0, 10) || "",
               xMarks: studentData.xMarks || "",
               xiiMarks: studentData.xiiMarks || "",
               diplomaMarks: studentData.diplomaMarks || "",
               admissionYear: studentData.admissionYear || "",
               localArea: studentData.localArea || "",
               postOffice: studentData.postOffice || "",
               pinCode: studentData.pinCode || "",
               registrationNumber: studentData.registrationNumber || "",
               contactNumber: studentData.contactNumber || "",
               studentName: studentData.studentName || "",
               eMail: studentData.eMail || "",
               rollNumber: studentData.rollNumber || "",
               currentSemester: studentData.currentSemester || "",
            });

            setDepartments(departmentList);
            setLoading(false);
         } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
         }
      };

      if (rollNumber) {
         fetchStudentData();
      }
   }, [rollNumber]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios.put(
            `http://localhost:8000/api/v1/students/update/${rollNumber}`,
            formData
         );
         alert("Profile updated successfully!");
      } catch (error) {
         console.error("Error updating profile:", error);
         alert("Error updating profile.");
      }
   };

   if (loading) return <div className="p-10">Loading...</div>;

   return (
      <main className="w-full min-h-screen flex flex-row bg-lightBackground dark:bg-darkBackground text-primaryBlack dark:text-primaryWhite">
               <S_Sidebar />     {" "}
         <article className="flex-1 overflow-y-auto p-4 pt-20">
                   {" "}
            <section className="max-w-6xl mx-auto">
                        {" "}
               <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
               >
                             {" "}
                  <FormSection title="Basic Details">
                                  {" "}
                     <TwoColumn>
                                       {" "}
                        <InputField
                           label="Full Name"
                           name="studentName"
                           value={formData.studentName}
                           onChange={handleChange}
                           disabled
                        />
                                       {" "}
                        <InputField
                           label="Date of Birth"
                           name="dateOfBirth"
                           value={formData.dateOfBirth}
                           onChange={handleChange}
                           type="date"
                        />
                                     {" "}
                     </TwoColumn>
                                {" "}
                  </FormSection>
                             {" "}
                  <FormSection title="Contact Information">
                                  {" "}
                     <TwoColumn>
                                       {" "}
                        <InputField
                           label="Email"
                           name="eMail"
                           value={formData.eMail}
                           onChange={handleChange}
                           type="email"
                           disabled
                        />
                                       {" "}
                        <InputField
                           label="Phone Number"
                           name="contactNumber"
                           value={formData.contactNumber}
                           onChange={handleChange}
                        />
                                     {" "}
                     </TwoColumn>
                                {" "}
                  </FormSection>
                             {" "}
                  <FormSection title="Address Information">
                                  {" "}
                     <TwoColumn>
                                       {" "}
                        <InputField
                           label="City"
                           name="localArea"
                           value={formData.localArea}
                           onChange={handleChange}
                        />
                                       {" "}
                        <InputField
                           label="Pin Code"
                           name="pinCode"
                           value={formData.pinCode}
                           onChange={handleChange}
                        />
                                       {" "}
                        <InputField
                           label="Post Office"
                           name="postOffice"
                           value={formData.postOffice}
                           onChange={handleChange}
                        />
                                     {" "}
                     </TwoColumn>
                                {" "}
                  </FormSection>
                             {" "}
                  <FormSection title="MAKAUT Information">
                                  {" "}
                     <TwoColumn>
                                       {" "}
                        <InputField
                           label="Roll Number"
                           name="rollNumber"
                           value={formData.rollNumber}
                           onChange={handleChange}
                           disabled
                        />
                                       {" "}
                        <InputField
                           label="Registration Number"
                           name="registrationNumber"
                           value={formData.registrationNumber}
                           onChange={handleChange}
                        />
                                     {" "}
                     </TwoColumn>
                                {" "}
                  </FormSection>
                             {" "}
                  <FormSection title="Marks Information">
                                  {" "}
                     <TwoColumn>
                                       {" "}
                        <InputField
                           label="X Marks"
                           name="xMarks"
                           value={formData.xMarks}
                           onChange={handleChange}
                           type="number"
                        />
                                       {" "}
                        <InputField
                           label="XII Marks"
                           name="xiiMarks"
                           value={formData.xiiMarks}
                           onChange={handleChange}
                           type="number"
                        />
                                       {" "}
                        <InputField
                           label="Diploma Marks"
                           name="diplomaMarks"
                           value={formData.diplomaMarks}
                           onChange={handleChange}
                           type="number"
                        />
                                     {" "}
                     </TwoColumn>
                                {" "}
                  </FormSection>
                             {" "}
                  <FormSection title="College Information">
                                  {" "}
                     <TwoColumn>
                                       {" "}
                        <InputField
                           label="Admission Year"
                           name="admissionYear"
                           value={formData.admissionYear}
                           onChange={handleChange}
                           type="number"
                        />
                        <InputField
                           label="Current Semester"
                           name="currentSemester"
                           value={formData.currentSemester}
                           onChange={handleChange}
                           type="number"
                        />
                                       {" "}
                        <div>
                                            {" "}
                           <label className="block mb-1">Department</label>     
                                      {" "}
                           <select
                              id="department"
                              name="department"
                              value={formData.department}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           >
                                                 {" "}
                              <option value="">Select Department</option>       
                                         {" "}
                              {departments.map((dept) => (
                                 <option key={dept._id} value={dept._id}>
                                                           {" "}
                                    {dept.departmentName}                     {" "}
                                 </option>
                              ))}
                                               {" "}
                           </select>
                                          {" "}
                        </div>
                                     {" "}
                     </TwoColumn>
                                {" "}
                  </FormSection>
                             {" "}
                  <div className="flex justify-end">
                                  {" "}
                     <button
                        type="submit"
                        className="mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                     >
                                        Update Profile              {" "}
                     </button>
                                {" "}
                  </div>
                           {" "}
               </motion.form>
                      {" "}
            </section>
                 {" "}
         </article>
            {" "}
      </main>
   );
}

export default StudentProfile;

// Reusable Layout Components
const FormSection = ({ title, children }) => (
   <section className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>    {children} {" "}
   </section>
);

const TwoColumn = ({ children }) => (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

const InputField = ({
   label,
   name,
   value,
   onChange,
   type = "text",
   disabled = false,
}) => (
   <div>
         {" "}
      <label className="block text-gray-700 mb-1" htmlFor={name}>
               {label}   {" "}
      </label>
         {" "}
      <input
         type={type}
         id={name}
         name={name}
         value={value}
         onChange={onChange}
         required
         disabled={disabled}
         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
       {" "}
   </div>
);
