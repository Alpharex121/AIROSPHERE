import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../../utils/constant";

const AddStudent = () => {
  const data = useSelector((store) => store?.user);
  const Navigate = useNavigate();
  if (data?.role !== "admin") {
    Navigate("/");
  }
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    semester: "",
    mail: "",
    role: "",
    enrollmentno: "",
    password: "",
    confirmpassword: "",
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

  // Array to represent the semester dropdown options from 1 to 8
  const semesters = Array.from({ length: 8 }, (_, index) =>
    (index + 1).toString()
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle form submission logic (e.g., sending data to the server)
    const username = formData.username;
    const name = formData.name;
    const enrollmentno = formData.enrollmentno;
    const semester = formData.semester;
    const mail = formData.mail;
    const role = formData.role;
    const password = formData.password;
    const confirmpassword = formData.confirmpassword;

    // const username = formData.username,
    const posted = await api.post("http://localhost:3000/user/adduser", {
      username,
      name,
      enrollmentno,
      semester,
      mail,
      role,
      password,
      confirmpassword,
    });
    console.log(posted);
  };

  return (
    <section className="py-12 bg-gray-100 min-h-screen text-center">
      <div className="relative max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-lg border-t-4 border-blue-500">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Add Student</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-left font-semibold text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-left font-semibold text-gray-700">
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Semester */}
          <div>
            <label className="block text-left font-semibold text-gray-700">
              Semester:
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

          {/* Email */}
          <div>
            <label className="block text-left font-semibold text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-left font-semibold text-gray-700">
              Role:
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

          {/* Enrollment Number */}
          <div>
            <label className="block text-left font-semibold text-gray-700">
              Enrollment Number:
            </label>
            <input
              type="text"
              name="enrollmentno"
              value={formData.enrollmentno}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-left font-semibold text-gray-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-left font-semibold text-gray-700">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Student
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddStudent;
