import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/constant";

const ClubAddNotificationForm = () => {
  const data = useSelector((store) => store?.user);
  const Navigate = useNavigate();
  if (!data || data?.role !== "admin") Navigate("/");
  const { clubname } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = formData.title;
    const description = formData.description;
    const data = await api.post(
      "http://localhost:3000/club/addnotification/" + clubname,
      {
        title,
        description,
      }
    );
    console.log(data);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-8 border-2 mb-12">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Add Club Notification
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter notification title"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter detailed description"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-2 px-8 rounded-full transition-transform hover:scale-105 shadow-lg"
          >
            Add Notification
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClubAddNotificationForm;
