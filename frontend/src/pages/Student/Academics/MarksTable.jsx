// src/components/MarksTable.jsx
import React from "react";
import SubjectRow from "./SubjectRow";
import { motion } from "framer-motion";

const MarksTable = ({ semesters, onMarksUpdate }) => {
   return (
      <div className="overflow-x-auto w-full">
         <motion.table
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-w-full bg-white border-collapse shadow-md rounded-lg"
         >
            <thead>
               <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-left text-gray-600">
                     Semester
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600">Subject</th>
                  <th className="px-6 py-3 text-left text-gray-600">CA1</th>
                  <th className="px-6 py-3 text-left text-gray-600">CA2</th>
                  <th className="px-6 py-3 text-left text-gray-600">CA3</th>
                  <th className="px-6 py-3 text-left text-gray-600">CA4</th>
                  <th className="px-6 py-3 text-left text-gray-600">PCA1</th>
                  <th className="px-6 py-3 text-left text-gray-600">PCA2</th>
                  <th className="px-6 py-3 text-left text-gray-600">Final</th>
               </tr>
            </thead>
            <tbody>
               {semesters.map((semester) => (
                  <React.Fragment key={semester.semesterNo}>
                     <tr>
                        <td
                           colSpan="9"
                           className="text-xl text-center font-semibold"
                        >
                           Semester {semester.semesterNo}
                        </td>
                     </tr>
                     {semester.subjects.map((subject) => (
                        <SubjectRow
                           key={subject.subjectName}
                           subject={subject}
                           semesterNo={semester.semesterNo}
                           onMarksUpdate={onMarksUpdate}
                        />
                     ))}
                  </React.Fragment>
               ))}
            </tbody>
         </motion.table>
      </div>
   );
};

export default MarksTable;
