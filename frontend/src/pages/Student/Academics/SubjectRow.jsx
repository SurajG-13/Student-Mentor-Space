// src/components/SubjectRow.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const SubjectRow = ({ subject, semesterNo, onMarksUpdate }) => {
   const [marks, setMarks] = useState(subject);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setMarks({ ...marks, [name]: value });
   };

   const handleSave = () => {
      onMarksUpdate(semesterNo, subject.subjectName, marks);
   };

   return (
      <motion.tr
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
         className="border-t"
      >
         <td className="px-6 py-3">{subject.subjectName}</td>
         <td className="px-6 py-3">
            <input
               type="number"
               name="ca1"
               value={marks.ca1 || ""}
               onChange={handleInputChange}
               className="input input-bordered w-full"
            />
         </td>
         <td className="px-6 py-3">
            <input
               type="number"
               name="ca2"
               value={marks.ca2 || ""}
               onChange={handleInputChange}
               className="input input-bordered w-full"
            />
         </td>
         <td className="px-6 py-3">
            <input
               type="number"
               name="ca3"
               value={marks.ca3 || ""}
               onChange={handleInputChange}
               className="input input-bordered w-full"
            />
         </td>
         <td className="px-6 py-3">
            <input
               type="number"
               name="ca4"
               value={marks.ca4 || ""}
               onChange={handleInputChange}
               className="input input-bordered w-full"
            />
         </td>
         <td className="px-6 py-3">
            <input
               type="number"
               name="pca1"
               value={marks.pca1 || ""}
               onChange={handleInputChange}
               className="input input-bordered w-full"
            />
         </td>
         <td className="px-6 py-3">
            <input
               type="number"
               name="pca2"
               value={marks.pca2 || ""}
               onChange={handleInputChange}
               className="input input-bordered w-full"
            />
         </td>
         <td className="px-6 py-3">
            <input
               type="number"
               name="final"
               value={marks.final || ""}
               onChange={handleInputChange}
               className="input input-bordered w-full"
            />
         </td>
         <td className="px-6 py-3">
            <button
               onClick={handleSave}
               className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
               Save
            </button>
         </td>
      </motion.tr>
   );
};

export default SubjectRow;
