// import React, { useState, useEffect } from "react";
// import T_Sidebar from "../T_Sidebar";
// import { motion } from "framer-motion";
// import axios from "axios";

// function SearchProfile() {
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

//    const rollNumber = localStorage.getItem("inputValue");

//    // Fetch student data when component mounts
//    useEffect(() => {
//       const fetchStudentData = async () => {
//          try {
//             const response = await axios.get(
//                `http://localhost:8000/api/v1/students/profile/${rollNumber}`
//             );
//             setFormData(response.data);
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
//       <>
//          <main className="h-full w-full bg-lightBackground dark:bg-darkBackground">
//             <section>
//                <article className="flex justify-evenly items-center overflow-hidden mt-20">
//                   <section>
//                      <div className="items-center justify-center w-[90vw] grid grid-cols-1 md:grid-cols-2 px-2">
//                         <motion.form
//                            onSubmit={handleSubmit}
//                            className="px-8 rounded-lg h-screen"
//                            initial={{ scale: 0.9 }}
//                            animate={{ scale: 1 }}
//                            transition={{ duration: 0.3 }}
//                         >
//                            {/* Personal Details Section */}

//                            <section className="py-2 space-y-2">
//                               <h3 className="text-lg font-semibold">
//                                  Basic Details
//                               </h3>
//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                  <div>
//                                     <label
//                                        className="block text-gray-700 mb-1"
//                                        htmlFor="studentName"
//                                     >
//                                        Full Name
//                                     </label>
//                                     <input
//                                        type="text"
//                                        id="studentName"
//                                        name="studentName"
//                                        value={formData.studentName}
//                                        onChange={handleChange}
//                                        required
//                                        disabled
//                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                        placeholder="Enter your full name"
//                                     />
//                                  </div>
//                                  <div>
//                                     <label
//                                        className="block text-gray-700 mb-1"
//                                        htmlFor="dateOfBirth"
//                                     >
//                                        Date of Birth
//                                     </label>
//                                     <input
//                                        type="date"
//                                        id="dateOfBirth"
//                                        name="dateOfBirth"
//                                        value={formData.dateOfBirth}
//                                        onChange={handleChange}
//                                        required
//                                        disabled
//                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                  </div>
//                               </div>
//                            </section>

//                            {/* Contact Information Section */}

//                            <section className="py-2 space-y-2">
//                               <h3 className="text-lg font-semibold">
//                                  Contact Information
//                               </h3>
//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                  <div>
//                                     <label
//                                        className="block text-gray-700 mb-1"
//                                        htmlFor="eMail"
//                                     >
//                                        Email
//                                     </label>
//                                     <input
//                                        type="email"
//                                        id="eMail"
//                                        name="eMail"
//                                        value={formData.eMail}
//                                        onChange={handleChange}
//                                        required
//                                        disabled
//                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                        placeholder="Enter your email"
//                                     />
//                                  </div>
//                                  <div>
//                                     <label
//                                        className="block text-gray-700 mb-1"
//                                        htmlFor="contactNumber"
//                                     >
//                                        Phone Number
//                                     </label>
//                                     <input
//                                        type="tel"
//                                        id="contactNumber"
//                                        name="contactNumber"
//                                        value={formData.contactNumber}
//                                        onChange={handleChange}
//                                        required
//                                        disabled
//                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                        placeholder="Enter your phone number"
//                                     />
//                                  </div>
//                               </div>
//                            </section>

//                            {/* College Information */}

//                            <section className="py-2 space-y-2">
//                               <h3 className="text-lg font-semibold">
//                                  Address Information
//                               </h3>
//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                  <div>
//                                     <label
//                                        className="block text-gray-700 mb-1"
//                                        htmlFor="eMail"
//                                     >
//                                        City
//                                     </label>
//                                     <input
//                                        type="text"
//                                        id="localArea"
//                                        name="localArea"
//                                        value={formData.localArea}
//                                        onChange={handleChange}
//                                        required
//                                        disabled
//                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                        placeholder="Enter your email"
//                                     />
//                                  </div>
//                                  <div>
//                                     <label
//                                        className="block text-gray-700 mb-1"
//                                        htmlFor="contactNumber"
//                                     >
//                                        Pin Code
//                                     </label>
//                                     <input
//                                        type="tel"
//                                        id="pinCode"
//                                        name="pinCode"
//                                        value={formData.pinCode}
//                                        onChange={handleChange}
//                                        required
//                                        disabled
//                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                        placeholder="Enter your phone number"
//                                     />
//                                  </div>

//                                  <div>
//                                     <label
//                                        className="block text-gray-700 mb-1"
//                                        htmlFor="postOffice"
//                                     >
//                                        Post Office
//                                     </label>
//                                     <input
//                                        type="text"
//                                        id="postOffice"
//                                        name="postOffice"
//                                        value={formData.postOffice}
//                                        onChange={handleChange}
//                                        required
//                                        disabled
//                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                        placeholder="Enter your phone number"
//                                     />
//                                  </div>
//                               </div>
//                            </section>
//                         </motion.form>

//                         <motion.form
//                            onSubmit={handleSubmit}
//                            className="px-8 rounded-lg h-screen"
//                            initial={{ scale: 0.9 }}
//                            animate={{ scale: 1 }}
//                            transition={{ duration: 0.3 }}
//                         >
//                            {/* Personal Details Section */}

//                            <section className="py-2 space-y-2">
//                               <h3 className="text-lg font-semibold">
//                                  MAKAUT Information
//                               </h3>
//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                  <div>
//                                     <label
//                                        className="block text-gray-700 mb-1"
//                                        htmlFor="rollNumber"
//                                     >
//                                        Roll Number
//                                     </label>
//                                     <input
//                                        type="tel"
//                                        id="rollNumber"
//                                        name="rollNumber"
//                                        value={formData.rollNumber}
//                                        onChange={handleChange}
//                                        required
//                                        disabled
//                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                        placeholder="Enter your full name"
//                                     />
//                                  </div>
//                                  <div>
//                                     <label
//                                        className="block text-gray-700 mb-1"
//                                        htmlFor="registrationNumber"
//                                     >
//                                        Registration Number
//                                     </label>
//                                     <input
//                                        type="tel"
//                                        id="registrationNumber"
//                                        name="registrationNumber"
//                                        value={formData.registrationNumber}
//                                        onChange={handleChange}
//                                        required
//                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                  </div>
//                               </div>
//                            </section>

//                            {/* Contact Information Section */}

//                            <section className="py-2 space-y-2">
//                               <h3 className="text-lg font-semibold">
//                                  Marks Information
//                               </h3>
//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                  <div>
//                                     <label
//                                        className="block text-gray-700 mb-1"
//                                        htmlFor="xMarks"
//                                     >
//                                        X Marks
//                                     </label>
//                                     <input
//                                        type="number"
//                                        id="xMarks"
//                                        name="xMarks"
//                                        value={formData.xMarks}
//                                        onChange={handleChange}
//                                        required
//                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                        placeholder="Enter your email"
//                                     />
//                                  </div>
//                                  <div>
//                                     <label
//                                        className="block text-gray-700 mb-1"
//                                        htmlFor="xiiMarks"
//                                     >
//                                        XII Marks
//                                     </label>
//                                     <input
//                                        type="number"
//                                        id="xiiMarks"
//                                        name="xiiMarks"
//                                        value={formData.xiiMarks}
//                                        onChange={handleChange}
//                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                        placeholder="Enter your phone number"
//                                     />
//                                  </div>
//                                  <div>
//                                     <label
//                                        className="block text-gray-700 mb-1"
//                                        htmlFor="diplomaMarks"
//                                     >
//                                        Diploma Marks
//                                     </label>
//                                     <input
//                                        type="number"
//                                        id="diplomaMarks"
//                                        name="diplomaMarks"
//                                        value={formData.diplomaMarks}
//                                        onChange={handleChange}
//                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                        placeholder="Enter your phone number"
//                                     />
//                                  </div>
//                               </div>
//                            </section>

//                            {/* College Information */}

//                            <section className="py-2 space-y-2">
//                               <h3 className="text-lg font-semibold">
//                                  College Information
//                               </h3>
//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                  <div>
//                                     <label
//                                        className="block text-gray-700 mb-1"
//                                        htmlFor="admissionYear"
//                                     >
//                                        Admission Year
//                                     </label>
//                                     <input
//                                        type="admissionYear"
//                                        id="admissionYear"
//                                        name="admissionYear"
//                                        value={formData.admissionYear}
//                                        onChange={handleChange}
//                                        required
//                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                        placeholder="Your Admission Year in TECB"
//                                     />
//                                  </div>
//                                  <div>
//                                     <label
//                                        className="block text-gray-700 mb-1"
//                                        htmlFor="department"
//                                     >
//                                        Department
//                                     </label>
//                                     <select
//                                        id="department"
//                                        name="department"
//                                        value={formData.department}
//                                        onChange={handleChange}
//                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     >
//                                        <option value="">
//                                           Select Department
//                                        </option>
//                                        <option value="674a0b9f89882f3877c0e0ae">
//                                           Mechanical Engineering
//                                        </option>
//                                        <option value="674a0a6744a7a5348575cd82">
//                                           Computer Science and Engineering
//                                        </option>
//                                        <option value="674a06d644a7a5348575cd77">
//                                           Information Technology
//                                        </option>
//                                        <option value="675c4bc077a4be96f8b77cbe">
//                                           Electronics Communication Engineering
//                                        </option>
//                                     </select>
//                                  </div>
//                               </div>
//                            </section>

//                            {/* Submit Button */}
//                            <div className="flex justify-end">
//                               <button
//                                  type="submit"
//                                  className="mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
//                               >
//                                  Update Profile
//                               </button>
//                            </div>
//                         </motion.form>
//                      </div>
//                   </section>
//                </article>
//             </section>
//          </main>
//       </>
//    );
// }

// export default SearchProfile;

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// function SearchProfile() {
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

//    const rollNumber = localStorage.getItem("inputValue");

//    // Fetch student data when component mounts
//    useEffect(() => {
//       const fetchStudentData = async () => {
//          try {
//             const response = await axios.get(
//                `http://localhost:8000/api/v1/students/profile/${rollNumber}`
//             );
//             setFormData(response.data);
//             setLoading(false);
//          } catch (error) {
//             console.error("Error fetching student data:", error);
//             setLoading(false);
//          }
//       };

//       fetchStudentData();
//    }, [rollNumber]);

//    if (loading) {
//       return (
//          <div className="flex items-center justify-center h-screen text-gray-600 text-xl">
//             Loading student profile...
//          </div>
//       );
//    }

//    return (
//       <main className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 p-4 md:p-10">
//          <section className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-10">
//             <motion.div
//                initial={{ opacity: 0, y: 10 }}
//                animate={{ opacity: 1, y: 0 }}
//                transition={{ duration: 0.4 }}
//                className="grid grid-cols-1 md:grid-cols-2 gap-10"
//             >
//                {/* Basic Details */}
//                <section>
//                   <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
//                      Basic Details
//                   </h3>
//                   <div className="space-y-6">
//                      <div>
//                         <label
//                            htmlFor="studentName"
//                            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
//                         >
//                            Full Name
//                         </label>
//                         <input
//                            type="text"
//                            id="studentName"
//                            name="studentName"
//                            value={formData.studentName}
//                            disabled
//                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
//                            placeholder="Full Name"
//                         />
//                      </div>

//                      <div>
//                         <label
//                            htmlFor="dateOfBirth"
//                            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
//                         >
//                            Date of Birth
//                         </label>
//                         <input
//                            type="date"
//                            id="dateOfBirth"
//                            name="dateOfBirth"
//                            value={formData.dateOfBirth?.slice(0, 10) || ""}
//                            disabled
//                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
//                         />
//                      </div>
//                   </div>
//                </section>

//                {/* Contact Information */}
//                <section>
//                   <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
//                      Contact Information
//                   </h3>
//                   <div className="space-y-6">
//                      <div>
//                         <label
//                            htmlFor="eMail"
//                            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
//                         >
//                            Email
//                         </label>
//                         <input
//                            type="email"
//                            id="eMail"
//                            name="eMail"
//                            value={formData.eMail}
//                            disabled
//                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
//                            placeholder="Email"
//                         />
//                      </div>

//                      <div>
//                         <label
//                            htmlFor="contactNumber"
//                            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
//                         >
//                            Phone Number
//                         </label>
//                         <input
//                            type="tel"
//                            id="contactNumber"
//                            name="contactNumber"
//                            value={formData.contactNumber}
//                            disabled
//                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
//                            placeholder="Phone Number"
//                         />
//                      </div>
//                   </div>
//                </section>

//                {/* Address Information */}
//                <section>
//                   <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
//                      Address Information
//                   </h3>
//                   <div className="space-y-6">
//                      <div>
//                         <label
//                            htmlFor="localArea"
//                            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
//                         >
//                            City
//                         </label>
//                         <input
//                            type="text"
//                            id="localArea"
//                            name="localArea"
//                            value={formData.localArea}
//                            disabled
//                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
//                            placeholder="City"
//                         />
//                      </div>

//                      <div>
//                         <label
//                            htmlFor="pinCode"
//                            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
//                         >
//                            Pin Code
//                         </label>
//                         <input
//                            type="text"
//                            id="pinCode"
//                            name="pinCode"
//                            value={formData.pinCode}
//                            disabled
//                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
//                            placeholder="Pin Code"
//                         />
//                      </div>

//                      <div>
//                         <label
//                            htmlFor="postOffice"
//                            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
//                         >
//                            Post Office
//                         </label>
//                         <input
//                            type="text"
//                            id="postOffice"
//                            name="postOffice"
//                            value={formData.postOffice}
//                            disabled
//                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
//                            placeholder="Post Office"
//                         />
//                      </div>
//                   </div>
//                </section>

//                {/* MAKAUT Information */}
//                <section>
//                   <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
//                      MAKAUT Information
//                   </h3>
//                   <div className="space-y-6">
//                      <div>
//                         <label
//                            htmlFor="rollNumber"
//                            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
//                         >
//                            Roll Number
//                         </label>
//                         <input
//                            type="text"
//                            id="rollNumber"
//                            name="rollNumber"
//                            value={formData.rollNumber}
//                            disabled
//                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
//                            placeholder="Roll Number"
//                         />
//                      </div>

//                      <div>
//                         <label
//                            htmlFor="registrationNumber"
//                            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
//                         >
//                            Registration Number
//                         </label>
//                         <input
//                            type="text"
//                            id="registrationNumber"
//                            name="registrationNumber"
//                            value={formData.registrationNumber}
//                            disabled
//                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
//                            placeholder="Registration Number"
//                         />
//                      </div>
//                   </div>
//                </section>

//                {/* Marks Information */}
//                <section>
//                   <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
//                      Marks Information
//                   </h3>
//                   <div className="space-y-6">
//                      <div>
//                         <label
//                            htmlFor="xMarks"
//                            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
//                         >
//                            X Marks
//                         </label>
//                         <input
//                            type="number"
//                            id="xMarks"
//                            name="xMarks"
//                            value={formData.xMarks}
//                            disabled
//                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
//                            placeholder="X Marks"
//                         />
//                      </div>

//                      <div>
//                         <label
//                            htmlFor="xiiMarks"
//                            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
//                         >
//                            XII Marks
//                         </label>
//                         <input
//                            type="number"
//                            id="xiiMarks"
//                            name="xiiMarks"
//                            value={formData.xiiMarks}
//                            disabled
//                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
//                            placeholder="XII Marks"
//                         />
//                      </div>

//                      <div>
//                         <label
//                            htmlFor="diplomaMarks"
//                            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
//                         >
//                            Diploma Marks
//                         </label>
//                         <input
//                            type="number"
//                            id="diplomaMarks"
//                            name="diplomaMarks"
//                            value={formData.diplomaMarks}
//                            disabled
//                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
//                            placeholder="Diploma Marks"
//                         />
//                      </div>
//                   </div>
//                </section>

//                {/* College Information */}
//                <section>
//                   <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
//                      College Information
//                   </h3>
//                   <div className="space-y-6">
//                      <div>
//                         <label
//                            htmlFor="admissionYear"
//                            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
//                         >
//                            Admission Year
//                         </label>
//                         <input
//                            type="text"
//                            id="admissionYear"
//                            name="admissionYear"
//                            value={formData.admissionYear}
//                            disabled
//                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
//                            placeholder="Admission Year"
//                         />
//                      </div>

//                      <div>
//                         <label
//                            htmlFor="department"
//                            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
//                         >
//                            Department
//                         </label>
//                         <input
//                            type="text"
//                            id="department"
//                            name="department"
//                            value={formData.department?.departmentName || ""}
//                            disabled
//                            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-primaryBlack dark:text-primaryWhite cursor-not-allowed"
//                            placeholder="Department"
//                         />
//                      </div>
//                   </div>
//                </section>
//             </motion.div>
//          </section>
//       </main>
//    );
// }

// export default SearchProfile;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function SearchProfile() {
   const [formData, setFormData] = useState({
      studentName: "",
      eMail: "",
      contactNumber: "",
      dateOfBirth: "",
      registrationNumber: "",
      rollNumber: "",
      department: {},
      localArea: "",
      postOffice: "",
      pinCode: "",
      xMarks: "",
      xiiMarks: "",
      diplomaMarks: "",
      admissionYear: "",
   });

   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const rollNumber = localStorage.getItem("inputValue");

   useEffect(() => {
      const fetchStudentData = async () => {
         setLoading(true);
         setError(null);

         try {
            if (!rollNumber) {
               setError("No roll number provided.");
               setLoading(false);
               return;
            }

            const response = await axios.get(
               `http://localhost:8000/api/v1/students/profile/${rollNumber}`
            );
            setFormData(response.data);
         } catch (error) {
            console.error("Error fetching student data:", error);

            if (error.response?.status === 404) {
               setError("Student Does Not Exist.");
            } else {
               setError("Failed to fetch student data. Please try again.");
            }
            setFormData({
               studentName: "",
               eMail: "",
               contactNumber: "",
               dateOfBirth: "",
               registrationNumber: "",
               rollNumber: "",
               department: {},
               localArea: "",
               postOffice: "",
               pinCode: "",
               xMarks: "",
               xiiMarks: "",
               diplomaMarks: "",
               admissionYear: "",
            });
         } finally {
            setLoading(false);
         }
      };

      fetchStudentData();
   }, [rollNumber]);

   if (loading) {
      return (
         <div className="flex items-center justify-center h-screen text-gray-600 text-xl">
            Loading student profile...
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex items-start justify-center text-red-600 text-2xl font-semibold">
            {error}
         </div>
      );
   }

   return (
      <main className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 p-4 md:p-10">
         <section className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-10">
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.4 }}
               className="grid grid-cols-1 md:grid-cols-2 gap-10"
            >
               {/* Basic Details */}
               <section>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                     Basic Details
                  </h3>
                  <div className="space-y-6">
                     <div>
                        <label
                           htmlFor="studentName"
                           className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                           Full Name
                        </label>
                        <input
                           type="text"
                           id="studentName"
                           name="studentName"
                           value={formData.studentName || ""}
                           disabled
                           className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                           placeholder="Full Name"
                        />
                     </div>

                     <div>
                        <label
                           htmlFor="dateOfBirth"
                           className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                           Date of Birth
                        </label>
                        <input
                           type="date"
                           id="dateOfBirth"
                           name="dateOfBirth"
                           value={formData.dateOfBirth?.slice(0, 10) || ""}
                           disabled
                           className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                        />
                     </div>
                  </div>
               </section>

               {/* Contact Information */}
               <section>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                     Contact Information
                  </h3>
                  <div className="space-y-6">
                     <div>
                        <label
                           htmlFor="eMail"
                           className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                           Email
                        </label>
                        <input
                           type="email"
                           id="eMail"
                           name="eMail"
                           value={formData.eMail || ""}
                           disabled
                           className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                           placeholder="Email"
                        />
                     </div>

                     <div>
                        <label
                           htmlFor="contactNumber"
                           className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                           Phone Number
                        </label>
                        <input
                           type="tel"
                           id="contactNumber"
                           name="contactNumber"
                           value={formData.contactNumber || ""}
                           disabled
                           className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                           placeholder="Phone Number"
                        />
                     </div>
                  </div>
               </section>

               {/* Address Information */}
               <section>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                     Address Information
                  </h3>
                  <div className="space-y-6">
                     <div>
                        <label
                           htmlFor="localArea"
                           className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                           City
                        </label>
                        <input
                           type="text"
                           id="localArea"
                           name="localArea"
                           value={formData.localArea || ""}
                           disabled
                           className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                           placeholder="City"
                        />
                     </div>

                     <div>
                        <label
                           htmlFor="pinCode"
                           className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                           Pin Code
                        </label>
                        <input
                           type="text"
                           id="pinCode"
                           name="pinCode"
                           value={formData.pinCode || ""}
                           disabled
                           className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                           placeholder="Pin Code"
                        />
                     </div>

                     <div>
                        <label
                           htmlFor="postOffice"
                           className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                           Post Office
                        </label>
                        <input
                           type="text"
                           id="postOffice"
                           name="postOffice"
                           value={formData.postOffice || ""}
                           disabled
                           className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                           placeholder="Post Office"
                        />
                     </div>
                  </div>
               </section>

               {/* MAKAUT Information */}
               <section>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                     MAKAUT Information
                  </h3>
                  <div className="space-y-6">
                     <div>
                        <label
                           htmlFor="rollNumber"
                           className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                           Roll Number
                        </label>
                        <input
                           type="text"
                           id="rollNumber"
                           name="rollNumber"
                           value={formData.rollNumber || ""}
                           disabled
                           className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                           placeholder="Roll Number"
                        />
                     </div>

                     <div>
                        <label
                           htmlFor="registrationNumber"
                           className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                           Registration Number
                        </label>
                        <input
                           type="text"
                           id="registrationNumber"
                           name="registrationNumber"
                           value={formData.registrationNumber || ""}
                           disabled
                           className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                           placeholder="Registration Number"
                        />
                     </div>
                  </div>
               </section>

               {/* Marks Information */}
               <section>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                     Marks Information
                  </h3>
                  <div className="space-y-6">
                     <div>
                        <label
                           htmlFor="xMarks"
                           className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                           X Marks
                        </label>
                        <input
                           type="number"
                           id="xMarks"
                           name="xMarks"
                           value={formData.xMarks || ""}
                           disabled
                           className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                           placeholder="X Marks"
                        />
                     </div>

                     <div>
                        <label
                           htmlFor="xiiMarks"
                           className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                           XII Marks
                        </label>
                        <input
                           type="number"
                           id="xiiMarks"
                           name="xiiMarks"
                           value={formData.xiiMarks || ""}
                           disabled
                           className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                           placeholder="XII Marks"
                        />
                     </div>

                     <div>
                        <label
                           htmlFor="diplomaMarks"
                           className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                           Diploma Marks
                        </label>
                        <input
                           type="number"
                           id="diplomaMarks"
                           name="diplomaMarks"
                           value={formData.diplomaMarks || ""}
                           disabled
                           className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                           placeholder="Diploma Marks"
                        />
                     </div>
                  </div>
               </section>

               {/* College Information */}
               <section>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                     College Information
                  </h3>
                  <div className="space-y-6">
                     <div>
                        <label
                           htmlFor="admissionYear"
                           className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                           Admission Year
                        </label>
                        <input
                           type="text"
                           id="admissionYear"
                           name="admissionYear"
                           value={formData.admissionYear || ""}
                           disabled
                           className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                           placeholder="Admission Year"
                        />
                     </div>

                     <div>
                        <label
                           htmlFor="department"
                           className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                        >
                           Department
                        </label>
                        <input
                           type="text"
                           id="department"
                           name="department"
                           value={formData.department?.departmentName || ""}
                           disabled
                           className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-primaryBlack dark:text-primaryWhite cursor-not-allowed"
                           placeholder="Department"
                        />
                     </div>
                  </div>
               </section>
            </motion.div>
         </section>
      </main>
   );
}

export default SearchProfile;
