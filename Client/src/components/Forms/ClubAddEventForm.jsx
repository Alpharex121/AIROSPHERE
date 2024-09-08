import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/constant";

const AddEventForm = () => {
  const data = useSelector((store) => store?.user);
  const Navigate = useNavigate();
  if (!data || data?.role !== "admin") Navigate("/");
  const { clubname } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startfrom: "",
    eventincharge: "",
    venue: "",
    uploadtime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const title = formData.title;
    const description = formData.description;
    const startfrom = formData.startfrom;
    const eventincharge = formData.eventincharge;
    const venue = formData.venue;
    const data = await api.post(
      "http://localhost:3000/club/addevents/" + clubname,
      { title, description, startfrom, eventincharge, venue }
    );
    console.log(data);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-8 border-2 mb-6">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Add Club Event
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
            placeholder="Enter event title"
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
            placeholder="Enter event description"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Start From (Date) */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Start From
          </label>
          <input
            type="date"
            name="startfrom"
            value={formData.startfrom}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>

        {/* Event In-Charge */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Event In-Charge
          </label>
          <input
            type="text"
            name="eventincharge"
            value={formData.eventincharge}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter event in-charge name"
            required
          />
        </div>

        {/* Venue */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Venue</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter event venue"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-8 rounded-full transition-transform hover:scale-105 shadow-lg"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEventForm;
