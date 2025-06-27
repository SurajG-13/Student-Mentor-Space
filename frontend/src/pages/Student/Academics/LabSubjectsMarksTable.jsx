import React from "react";

// Marks fields for lab subjects (with pca1, pca2)
const labMarksFields = [
   { key: "pca1", label: "PCA1" },
   { key: "pca2", label: "PCA2" },
   { key: "final", label: "Final" },
];

export default function LabSubjectsMarksTable({
   labSubjects,
   marksData,
   onMarksChange,
}) {
   return (
      <div>
         <h2 className="text-xl font-semibold mb-4">Lab Subjects Marks</h2>
         <table className="border border-gray-300 rounded w-full">
            <thead className="bg-gray-100">
               <tr>
                  <th className="border px-4 py-2 text-left">Lab Subject</th>
                  {labMarksFields.map(({ key, label }) => (
                     <th key={key} className="border px-4 py-2 text-center">
                        {label}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {labSubjects.map((subject) => (
                  <tr key={subject._id} className="hover:bg-gray-50">
                     <td className="border px-4 py-2 font-semibold">
                        {subject.labSubjectName}
                     </td>
                     {labMarksFields.map(({ key }) => (
                        <td key={key} className="border px-2 py-1 text-center">
                           <input
                              type="number"
                              min="0"
                              max="25"
                              className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              value={marksData[subject._id]?.[key] ?? ""}
                              onChange={(e) =>
                                 onMarksChange(subject._id, key, e.target.value)
                              }
                              placeholder="0"
                           />
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
