import React, { useState } from "react";
import { api } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "../ToastContext";

const AddClubForm = () => {
  const data = useSelector((store) => store?.user);
  const Navigate = useNavigate();
  const showToast = useToast();
  const allowedRoles = ["admin", "modhead"];
  if (!allowedRoles.includes(data?.role)) {
    Navigate("/"); // Navigate if the user is not authorized
  }
  const [clubData, setClubData] = useState({
    name: "",
    description: "",
    head: "",
    headname: "",
    logolink: "",
    formlink: "",
    bannerlink: "",
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
    try {
      const name = clubData.name;
      const description = clubData.description;
      const head = clubData.head;
      const headname = clubData.headname;
      const logolink = clubData.logolink;
      const formlink = clubData.formlink;
      const bannerlink = clubData.bannerlink;
      const data = await api.post("https://airosphere-ggits.vercel.app/club", {
        name,
        description,
        head,
        headname,
        logolink,
        formlink,
        bannerlink,
      });

      if (data.status === 200) {
        showToast("success", "Club added successfully!");
        Navigate("/club");
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
          <label className="block text-sm font-medium text-gray-700">
            Club Name
          </label>
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
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={clubData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Head Username
          </label>
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
          <label className="block text-sm font-medium text-gray-700">
            Head Name
          </label>
          <input
            type="text"
            name="headname"
            value={clubData.headname}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Club Banner Link
          </label>
          <input
            type="text"
            name="bannerlink"
            value={clubData.bannerlink}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Logo Link
          </label>
          <input
            type="text"
            name="logolink"
            value={clubData.logolink}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Google Form Link
          </label>
          <input
            type="text"
            name="formlink"
            value={clubData.formlink}
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
