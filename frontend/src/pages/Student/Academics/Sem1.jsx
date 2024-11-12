import React, { useState } from "react";
import SemesterDataTableLink from "./SemesterDataTableLink";
import S_Sidebar from "../S_Sidebar";
// import Message from "./Message";
// import { ArrowDownIcon } from "@heroicons/react/24/outline";

export default function Sem1() {
  const InternalExamData = [
    {
      UPID: "",
      "Paper Code": "",
      "Paper Name": "",
      Marks: "",
      Examiner: "",
    },
  ];

  const ExternalExamData = [
    {
      UPID: "",
      "Paper Code": "",
      "Paper Name": "",
      Grade: "",
      Point: "",
      Credit: "",
      "Credit Points": "",
    },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <section className="w-full h-screen flex flex-row relative">
        <S_Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div
          className={`transition-all duration-300 p-8 ${
            isSidebarOpen ? "ml-80" : "ml-20"
          } w-full`}
        >
          <div className="m-4 flex flex-col justify-center text-center dark:text-white">
            <div className="mb-8 text-3xl">Semester Result</div>

            <div className="mb-4 text-xl dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              nisi consequuntur enim provident atque suscipit dignissimos
              aliquam dolor hic veniam, numquam dolorum maxime esse a
              asperiores, praesentium quos eos nostrum!
            </div>
          </div>
          <SemesterDataTableLink
            title="Continuous Assesment - 01"
            data={InternalExamData}
          />
          <SemesterDataTableLink
            title="Continuous Assesment - 02"
            data={InternalExamData}
          />
          <SemesterDataTableLink
            title="Continuous Assesment - 03"
            data={InternalExamData}
          />
          <SemesterDataTableLink
            title="Continuous Assesment - 04"
            data={InternalExamData}
          />
          <SemesterDataTableLink
            title="Practical Continuous Assesment - 01"
            data={InternalExamData}
          />
          <SemesterDataTableLink
            title="Practical Continuous Assesment - 02"
            data={InternalExamData}
          />
          <SemesterDataTableLink
            title="Semester Final"
            data={ExternalExamData}
          />
        </div>
      </section>
    </>
  );
}
