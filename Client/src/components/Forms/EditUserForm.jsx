import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/constant";
import { useSelector } from "react-redux";
import { useToast } from "../ToastContext"; // Adjust the path as needed
import { toast } from "react-toastify";

const EditUserForm = () => {
  const { username, userid } = useParams();
  const showToast = useToast();
  const Navigate = useNavigate();

  // Redirect if username is "Alpha" or "Zoro"
  if (username === "Alpha" || username === "Zoro") {
    return <Navigate to="/" />;
  }
  const data = useSelector((store) => store?.user);
  const allowedRoles = ["admin", "modhead", "studentmanagemod", "professor"];
  if (!allowedRoles.includes(data?.role)) {
    Navigate("/"); // Navigate if the user is not authorized
  }

  const [currStudent, setCurrStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    semester: "",
    mail: "",
    role: "",
    enrollmentno: "",
  });

  let studentData = useSelector((store) => store?.student?.studentData);

  // useEffect to set the current student data
  useEffect(() => {
    if (studentData) {
      const student = studentData.find(
        (student) => student.username === username
      );

      if (student) {
        setCurrStudent(student);
        setFormData({
          name: student.name || "",
          username: student.username || "",
          semester: student.semester || "",
          mail: student.mail || "",
          role: student.role || "",
          enrollmentno: student.enrollmentno || "",
        });
      }
    }
  }, [studentData, username]);

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
    try {
      const { username, name, enrollmentno, semester, mail, role } = formData;

      const editReponse = await api.put(
        `https://airosphere-ggits.vercel.app/user/update/${username}/${userid}`,
        { username, name, enrollmentno, semester, mail, role }
      );

      if (editReponse.status === 200) {
        toast.success(
          "User detail updated successfully! Please refresh to see changes."
        );
        Navigate("/manage/students");
      } else {
        showToast("error", "Failed to update user details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      showToast("error", "Failed to update user details. Please try again.");
    }
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
              htmlFor="mail"
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
