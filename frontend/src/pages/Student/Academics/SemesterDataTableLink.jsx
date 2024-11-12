import React, { useState } from "react";

function SemesterDataTableLink({ title, data }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4">
      <button
        className="w-full text-left px-4 py-2 shadow dark:bg-blue-900 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>

      {/* Conditionally rendering the table based on isOpen state */}

      {isOpen && (
        <div className="mt-4 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="divide-x divide-gray-200">
                    {Object.keys(data[0]).map((key) => (
                      <th
                        key={key}
                        className="px-4 py-3.5 text-center text-sm font-normal text-gray-500"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((row, index) => (
                    <tr key={index} className="divide-x divide-gray-200">
                      {Object.values(row).map((value, i) => (
                        <td
                          key={i}
                          className="whitespace-nowrap px-4 py-4 text-sm text-gray-500"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SemesterDataTableLink;
