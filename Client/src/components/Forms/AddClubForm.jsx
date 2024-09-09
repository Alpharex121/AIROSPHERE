import React, { useState } from "react";
import { api } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "../ToastContext";

const AddClubForm = () => {
  const data = useSelector((store) => store?.user);
  const Navigate = useNavigate();
  const showToast = useToast();

  if (!data || data?.role !== "admin") Navigate("/");

  const [clubData, setClubData] = useState({
    name: "",
    description: "",
    head: "",
    headname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubData({
      ...clubData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, head, headname } = clubData;

    try {
      const response = await api.post("http://localhost:3000/club", {
        name,
        description,
        head,
        headname,
      });
      
      if (response.status === 200) {
        showToast("success", "Club added successfully!");
        Navigate("/clubs");
      } else {
        showToast("error", "Failed to add club. Please try again.");
      }
    } catch (error) {
      console.error("Error adding club:", error);
      showToast("error", "Failed to add club. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white mt-[10vh] mb-12 rounded-lg shadow-xl border-2">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Club</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Club Name</label>
          <input
            type="text"
            name="name"
            value={clubData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={clubData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Head Username</label>
          <input
            type="text"
            name="head"
            value={clubData.head}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Head Name</label>
          <input
            type="text"
            name="headname"
            value={clubData.headname}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Club
        </button>
      </form>
    </div>
  );
};

export default AddClubForm;
