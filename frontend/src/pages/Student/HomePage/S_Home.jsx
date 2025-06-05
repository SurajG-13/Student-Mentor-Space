import React from "react";
import { motion } from "framer-motion";
import S_Sidebar from "../S_Sidebar";

import {
   AcademicCapIcon,
   ClipboardDocumentListIcon,
   ChartBarIcon,
   ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import StudentHeader from "../HeaderLinks/StudentHeader";

const stats = [
   {
      id: 1,
      label: "Courses Enrolled",
      value: 6,
      icon: AcademicCapIcon,
      bg: "bg-indigo-100",
      iconColor: "text-indigo-600",
   },
   {
      id: 2,
      label: "Assignments Pending",
      value: 3,
      icon: ClipboardDocumentListIcon,
      bg: "bg-yellow-100",
      iconColor: "text-yellow-600",
   },
   {
      id: 3,
      label: "Overall Grade",
      value: "A-",
      icon: ChartBarIcon,
      bg: "bg-green-100",
      iconColor: "text-green-600",
   },
   {
      id: 4,
      label: "Messages",
      value: 5,
      icon: ChatBubbleLeftRightIcon,
      bg: "bg-pink-100",
      iconColor: "text-pink-600",
   },
];

const announcements = [
   {
      id: 1,
      title: "Midterm Exams Schedule Released",
      date: "May 10, 2025",
      description:
         "Check your exam dates and prepare accordingly. Reach out to mentors for guidance.",
   },
   {
      id: 2,
      title: "New Course Material Uploaded",
      date: "May 8, 2025",
      description:
         "Latest lecture notes and assignments are now available in your courses.",
   },
];

const upcomingEvents = [
   { id: 1, title: "Project Submission Deadline", date: "May 20, 2025" },
   { id: 2, title: "Guest Lecture: AI in Education", date: "May 22, 2025" },
   { id: 3, title: "Parent-Teacher Meeting", date: "May 25, 2025" },
];

const containerVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, ease: "easeOut" },
   },
};

const itemVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: { opacity: 1, y: 0 },
};

export default function S_Home() {
   return (
      <div className="min-w-screen min-h-screen border-4 border-blue-500">
         {/* Sidebar */}
         {/* <S_Sidebar /> */}
         <StudentHeader />

         {/* Main content */}
         <main className="flex-grow overflow-y-auto p-8 min-h-screen">
            <motion.div
               className="max-w-7xl mx-auto"
               initial="hidden"
               animate="visible"
               variants={containerVariants}
            >
               {/* Welcome Section */}
               <motion.section variants={itemVariants} className="mb-10">
                  <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                     Welcome back, Student!
                  </h1>
                  <p className="text-gray-700 text-lg max-w-xl">
                     Here’s a quick overview of your academic progress and
                     upcoming activities.
                  </p>
               </motion.section>

               {/* Stats Cards */}
               <motion.section
                  variants={itemVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
               >
                  {stats.map(
                     ({ id, label, value, icon: Icon, bg, iconColor }) => (
                        <div
                           key={id}
                           className="flex items-center space-x-4 bg-white rounded-xl p-6 shadow-md"
                        >
                           <div
                              className={`${bg} p-3 rounded-lg flex-shrink-0`}
                           >
                              <Icon className={`h-8 w-8 ${iconColor}`} />
                           </div>
                           <div>
                              <p className="text-2xl font-semibold">{value}</p>
                              <p className="text-gray-600">{label}</p>
                           </div>
                        </div>
                     )
                  )}
               </motion.section>

               {/* Main Content Grid */}
               <motion.section
                  variants={itemVariants}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
               >
                  {/* Announcements */}
                  <section className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                     <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-200">
                        Latest Announcements
                     </h2>
                     <ul className="space-y-4 max-h-72 overflow-y-auto">
                        {announcements.map(
                           ({ id, title, date, description }) => (
                              <li
                                 key={id}
                                 className="border-b border-gray-100 pb-3 last:border-none"
                              >
                                 <h3 className="text-lg font-medium text-indigo-700">
                                    {title}
                                 </h3>
                                 <time className="text-sm text-gray-500">
                                    {date}
                                 </time>
                                 <p className="text-gray-700 mt-1">
                                    {description}
                                 </p>
                              </li>
                           )
                        )}
                     </ul>
                  </section>

                  {/* Upcoming Events */}
                  <section className="bg-white rounded-xl shadow-md p-6">
                     <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-200">
                        Upcoming Events
                     </h2>
                     <ul className="space-y-3 text-gray-800">
                        {upcomingEvents.map(({ id, title, date }) => (
                           <li
                              key={id}
                              className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-none"
                           >
                              <span>{title}</span>
                              <time className="text-sm text-gray-500">
                                 {date}
                              </time>
                           </li>
                        ))}
                     </ul>
                  </section>
               </motion.section>
            </motion.div>
         </main>
      </div>
   );
}
