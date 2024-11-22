import React, { useState } from "react";
import { api } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "../ToastContext";
import { toast } from "react-toastify";

const AddAcademicForm = () => {
  const data = useSelector((store) => store?.user);
  const Navigate = useNavigate();
  const allowedRoles = ["admin", "academicmod", "professor", "modhead"];
  if (!allowedRoles.includes(data?.role)) {
    Navigate("/"); // Navigate if the user is not authorized
  }
  const [academicData, setAcademicData] = useState({
    title: "",
    description: "",
    subject: "",
    semester: "", // Dropdown for semester
    subcode: "",
    type: "", // Notes, PYQ, or Important Question
    link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcademicData({
      ...academicData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to backend)
    try {
      const title = academicData.title;
      const description = academicData.description;
      const subject = academicData.subject;
      const semester = academicData.semester; // Dropdown for semester
      const subcode = academicData.subcode;
      const type = academicData.type; // Notes, PYQ, or Important Question
      const link = academicData.link;

      const data = await api.post(
        "https://airosphere-ggits.vercel.app/academic",
        {
          title,
          description,
          subject,
          semester,
          subcode,
          type,
          link,
        }
      );
      toast(
        "New " +
          type +
          "  added successfully! for " +
          subject +
          " semester " +
          semester
      );
      Navigate("/academic/" + type);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Error occured while adding toast");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-[5vh] mb-12 bg-white rounded-lg shadow-xl border-2">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Add Academic Content
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={academicData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={academicData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={academicData.subject}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Semester
          </label>
          <select
            name="semester"
            value={academicData.semester}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Subject Code
          </label>
          <input
            type="text"
            name="subcode"
            value={academicData.subcode}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            name="type"
            value={academicData.type}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Type</option>
            <option value="notes">Notes</option>
            <option value="pyq">PYQ</option>
            <option value="important">Important Question</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Link
          </label>
          <input
            type="url"
            name="link"
            value={academicData.link}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Academic Content
        </button>
      </form>
    </div>
  );
};

export default AddAcademicForm;
