import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../../utils/constant";
import { addStudentData } from "../../../store/studentDataSlice";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const AddStudent = () => {
  const data = useSelector((store) => store?.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const allowedRoles = ["admin", "studentmanagemod", "modhead", "professor"];
  if (!allowedRoles.includes(data?.role)) {
    Navigate("/"); // Navigate if the user is not authorized
  }

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    branch: "",
    semester: "",
    mail: "",
    role: "",
    enrollmentno: "",
    password: "",
    confirmpassword: "",
  });

  const roles = [
    {
      role: "First Year",
      value: "obfy",
    },
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
      role: "Update Mod",
      value: "updatemod",
    },
    {
      role: "Resource Mod",
      value: "resourcemod",
    },
    {
      role: "Professor",
      value: "professor",
    },
    {
      role: "Demo",
      value: "demo",
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
    try {
      if (formData.password !== formData.confirmpassword) {
        alert("Passwords do not match!");
        return;
      }
      // Handle form submission logic (e.g., sending data to the server)
      const username = formData.username;
      const name = formData.name;
      const enrollmentno = formData.enrollmentno;
      const branch = formData.branch;
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
        branch,
        semester,
        mail,
        role,
        password,
        confirmpassword,
      });
      console.log(posted);
      dispatch(addStudentData(posted?.data));
      toast.success("Member added successully");
      var signupdata = {
        username: e.target.username.value,
        name: e.target.name.value,
        mail: e.target.mail.value,
        receiver: e.target.mail.value,
        password: e.target.password.value,
      };
      emailjs
        .send(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_REGISTER_TEMPLATE_ID,
          signupdata,
          import.meta.env.VITE_PUBLIC_KEY
        )
        .then(
          (result) => {
            if (result.status === 200) {
              handleCloseModal();
              toast.success("Email sent successfully!", {
                theme: "colored",
              });
            }
          },
          (error) => {
            console.log(error);
            console.log(error.text);
          }
        );
      Navigate("/manage/students");
      console.log(posted);
    } catch (error) {
      console.log(error);
      toast.success("Error occured while adding member");
    }
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
          {/* branch */}
          <div>
            <label className="block text-left font-semibold text-gray-700">
              Branch:
            </label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
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
              {data?.role === "admin" && (
                <option value="modhead">Modhead</option>
              )}
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
