import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaKey, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import getStudents from "../../../utils/getStudents";
import { api } from "../../../utils/constant";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css for the alert

const handleDeleteUser = async (studentid) => {
  try {
    const deleteResult = await api.delete(
      "http://localhost:3000/user/" + studentid
    );
    toast.success("User deleted successfully! Please refresh to see changes.");
    console.log("User deleted successfully");
  } catch (error) {
    console.log(error);
    toast.error("Error occurred while deleting member.");
  }
};

const ManageStudents = () => {
  const [deleting, setDeleting] = useState(false);
  const Navigate = useNavigate();
  const data = useSelector((store) => store?.user);
  const allowedRoles = ["admin", "studentmanagemod", "modhead", "professor"];
  if (!allowedRoles.includes(data?.role)) {
    Navigate("/"); // Navigate if the user is not authorized
  }
  const studentData = useSelector((store) => store?.student?.studentData);
  console.log(studentData);
  getStudents();

  const confirmDelete = (student) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-lg p-8 shadow-lg w-80 mx-auto"
          >
            <h2 className="text-xl font-semibold mb-4 text-red-600 text-center">
              Confirm Delete
            </h2>
            <p className="text-center mb-6 text-gray-700">
              Are you sure you want to delete{" "}
              <span className="font-bold">{student.name}</span>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                onClick={() => {
                  setDeleting(true);
                  handleDeleteUser(student._id);
                  setDeleting(false);
                  onClose();
                }}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        );
      },
    });
  };

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
                      confirmDelete(student);
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
