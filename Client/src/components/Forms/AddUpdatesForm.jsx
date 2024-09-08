import React, { useState } from "react";
import { api } from "../../utils/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddUpdatesForm = () => {
  const data = useSelector((store) => store?.user);
  const Navigate = useNavigate();
  if (!data || data?.role !== "admin") Navigate("/");
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
    type: "", // Default is empty
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to backend)
    const title = updateData.title;
    const description = updateData.description;
    const type = updateData.type;
    const data = await api.post("http://localhost:3000/notification", {
      title,
      description,
      type,
    });
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-[13vh] mb-[14vh] border-2 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Update</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={updateData.title}
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
            value={updateData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            name="type"
            value={updateData.type}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Type</option>
            <option value="branch">Branch</option>
            <option value="website">Website</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Update
        </button>
      </form>
    </div>
  );
};

export default AddUpdatesForm;
