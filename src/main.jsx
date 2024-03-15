import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Firstpage from "./components/Firstpage";
import TeacherRegistration from "./components/TeacherRegistration"
import TeacherLogin from "./components/TeacherLogin";
import TeacherInterface from "./components/TeacherInterface";
import StudentLogin from "./components/StudentLogin";
import BiometricAttendanceData from "./components/Biometric";
import AttendanceReport from "./components/AttendanceReport";
import StudentReport from "./components/StudentReport";
import ManualAttendance from "./components/ManualAttendance";
import AddCourse from "./components/AddCourse";
import Admin from "./components/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Firstpage />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/teacherRegister",
    element: <TeacherRegistration />
  },
  {
    path: "/teacherLogin",
    element: <TeacherLogin />
  },
  {
    path: "/teacher",
    element: <TeacherInterface />
  },
  {
    path: "/studentLogin",
    element: <StudentLogin />
  },
  {
    path: "/biometric",
    element: <BiometricAttendanceData />
  },
  {
    path: "/attendance",
    element: <AttendanceReport />
  },
  {
    path: "/report",
    element: <StudentReport />
  },
  {
    path: "/manual",
    element: <ManualAttendance />
  },
  {
    path: "/add",
    element: <AddCourse />
  }
]);

ReactDOM.render(
  <React.StrictMode>
    {" "}
    {/* Correct JSX syntax */}
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);