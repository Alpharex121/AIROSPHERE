import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { api } from "../../utils/constant";

const ClubAddMemberForm = () => {
  const data = useSelector((store) => store?.user);
  const Navigate = useNavigate();
  if (!data || data?.role !== "admin") Navigate("/");
  const { clubname } = useParams();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    clubpost: "",
    clubrole: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = formData.username;
    const name = formData.name;
    const clubpost = formData.clubpost;
    const clubrole = formData.clubrole;
    console.log(formData);
    const data = await api.post(
      "http://localhost:3000/club/addmember/" + clubname,
      {
        username,
        name,
        clubpost,
        clubrole,
      }
    );
    console.log(data);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg border border-black rounded-lg p-8 mb-6">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Add Club Member
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter username"
            required
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter full name"
            required
          />
        </div>

        {/* Club Post */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Post</label>
          <input
            type="text"
            name="clubpost"
            value={formData.clubpost}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter club post (e.g., President, Tech Head, Design Head)"
            required
          />
        </div>

        {/* Club Role */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Role</label>
          <input
            type="text"
            name="clubrole"
            value={formData.clubrole}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter role (UI/UX Designer, Frontend Developer)"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-2 px-8 rounded-full transition-transform hover:scale-105 shadow-lg"
          >
            Add Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClubAddMemberForm;
