import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaKey, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import getStudents from "../../../utils/getStudents";
import { api } from "../../../utils/constant";

const handleDeleteUser = async (studentid) => {
  const deleteResult = await api.delete(
    "http://localhost:3000/user/" + studentid
  );
  console.log("User deleted successfully");
};

const ManageStudents = () => {
  const Navigate = useNavigate();
  const data = useSelector((store) => store?.user);
  const allowedRoles = ["admin", "studentmanagemod", "modhead", "professor"];
  if (!allowedRoles.includes(data?.role)) {
    Navigate("/"); // Navigate if the user is not authorized
  }
  const studentData = useSelector((store) => store?.student?.studentData);
  console.log(studentData);
  getStudents();

  return (
    studentData && (
      <section className="py-12 bg-gray-100 min-h-screen">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Manage Students
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {studentData.map((student, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 transition-transform hover:shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center rounded-full text-lg font-semibold">
                  {student.name[0]}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-700">
                    {student.name}
                  </h3>
                  <p className="text-sm text-gray-500">@{student.username}</p>
                </div>
              </div>
              <div className="text-gray-600 mb-4">
                <p className="mb-2">
                  <span className="font-semibold">Enrollment No: </span>
                  {student.enrollmentno}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Branch: </span>
                  AIR
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Semester: </span>
                  {student.semester}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Email: </span>
                  {student.mail}
                </p>
              </div>
              {(data?.role === "admin" ||
                data?.role === "modhead" ||
                data?.role === "studentmanagemod") && (
                <div className="flex justify-around mt-4 space-x-2">
                  <Link
                    to={
                      student.role !== "admin"
                        ? "/edituser/" + student.username + "/" + student._id
                        : null
                    }
                  >
                    <button
                      className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold ${
                        student.role === "admin" ? "cursor-not-allowed" : null
                      } py-2 px-4 rounded-lg flex items-center justify-center w-full`}
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                  </Link>
                  <Link
                    to={
                      student.role !== "admin"
                        ? "/updatepassword/" + student.username
                        : null
                    }
                  >
                    <button
                      className={`bg-green-500 hover:bg-green-600 text-white font-semibold ${
                        student.role === "admin" ? "cursor-not-allowed " : null
                      } py-2 px-4 rounded-lg flex items-center justify-center w-full`}
                    >
                      <FaKey className="mr-2" /> Change
                    </button>
                  </Link>

                  <button
                    className={`bg-red-500 hover:bg-red-600 text-white font-semibold ${
                      student.role === "admin"
                        ? "cursor-not-allowed disabled:"
                        : null
                    } py-2 px-4 rounded-lg flex items-center justify-center w-full`}
                    onClick={() => {
                      handleDeleteUser(student._id);
                    }}
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    )
  );
};

export default ManageStudents;
