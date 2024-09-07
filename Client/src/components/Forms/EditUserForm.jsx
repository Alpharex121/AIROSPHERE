import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { api } from "../../utils/constant";
import { useSelector } from "react-redux";

const EditUserForm = () => {
  const { username, userid } = useParams();
  if (username === "Alpha" || username === "Zoro") Navigate("/");

  const [currStudent, setCurrStudent] = useState();
  let studentData = useSelector((store) => store?.student?.studentData);
  if (studentData) {
    studentData = studentData.filter((student) => {
      if (student.username === username) setCurrStudent(student);
    });
  }

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    semester: "",
    mail: "",
    role: "",
    enrollmentno: "",
  });

  const roles = [
    {
      role: "User",
      value: "user",
    },
    {
      role: "Clubhead",
      value: "clubhead",
    },
    {
      role: "Student Manage Mod",
      value: "studentmanagemod",
    },
    {
      role: "Academic Mod",
      value: "academicmod",
    },
    {
      role: "Branch Mod",
      value: "branchmod",
    },
    {
      role: "Resource Mod",
      value: "resourcemod",
    },
    {
      role: "Miscellaneous mod",
      value: "miscellaneousmod",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const semesters = Array.from({ length: 8 }, (_, index) =>
    (index + 1).toString()
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const formusername = formData.username;
    const name = formData.name;
    const enrollmentno = formData.enrollmentno;
    const semester = formData.semester;
    const mail = formData.mail;
    const role = formData.role;
    const editReponse = await api.put(
      "http://localhost:3000/user/update/" + username + "/" + userid,
      {
        formusername,
        name,
        enrollmentno,
        semester,
        mail,
        role,
      }
    );
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Edit User Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="mail"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="enrollmentNo"
            >
              Enrollment No.
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="enrollmentNo"
              name="enrollmentno"
              value={formData.enrollmentno}
              onChange={handleChange}
              placeholder="Enter enrollment number"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Role</option>
              {roles.map((role, index) => (
                <option key={index} value={role.value}>
                  {role.role}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="semester"
            >
              Semester
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Semester</option>
              {semesters.map((semester, index) => (
                <option key={index} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </div>

          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
