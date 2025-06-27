import React from "react";

// Marks fields for subjects (without pca1, pca2)
const marksFields = [
   { key: "ca1", label: "CA1" },
   { key: "ca2", label: "CA2" },
   { key: "ca3", label: "CA3" },
   { key: "ca4", label: "CA4" },
   { key: "final", label: "Final" },
];

export default function SubjectsMarksTable({
   subjects,
   marksData,
   onMarksChange,
}) {
   return (
      <div>
         <h2 className="text-xl font-semibold mb-4">Subjects Marks</h2>
         <table className="border border-gray-300 rounded w-full">
            <thead className="bg-gray-100">
               <tr>
                  <th className="border px-4 py-2 text-left">Subject</th>
                  {marksFields.map(({ key, label }) => (
                     <th key={key} className="border px-4 py-2 text-center">
                        {label}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {subjects.map((subject) => (
                  <tr key={subject._id} className="hover:bg-gray-50">
                     <td className="border px-4 py-2 font-semibold">
                        {subject.subjectName}
                     </td>
                     {marksFields.map(({ key }) => (
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
