import React, { useState } from "react";
import { FaCode, FaLink, FaFileAlt } from "react-icons/fa"; // Icons for styling
import { api } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { addPeer } from "../../store/studentConnectSlice";

const FindPeerForm = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const data = useSelector((store) => store?.user);
  if (data?.role === "demo") Navigate("/studentconnect/findteammates");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    link: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const title = formData.title;
      const description = formData.description;
      const skills = formData.skills;
      const link = formData.link;

      const response = await api.post(
        "https://airosphere-ggits.vercel.app/studentconnect/postpeer",
        {
          title,
          description,
          skills,
          link,
        }
      );
      if (response.status === 200) {
        setMessage("Peer request added successfully!");
        dispatch(addPeer(response?.data));
        Navigate("/studentconnect/findpeer");
        setFormData({
          title: "",
          description: "",
          skills: "",
          link: "",
        });
      } else {
        setMessage("Failed to add peer request. Try again.");
      }
    } catch (error) {
      console.error("Error submitting peer request:", error);
      setMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Create a Peer Request
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700"
            >
              <FaFileAlt className="inline-block mr-2 text-indigo-600" />
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter a title for your peer request"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              <FaFileAlt className="inline-block mr-2 text-indigo-600" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              required
              value={formData.description}
              onChange={handleInputChange}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Describe what you're looking for in a peer"
            ></textarea>
          </div>

          {/* Skills */}
          <div>
            <label
              htmlFor="skills"
              className="block text-lg font-medium text-gray-700"
            >
              <FaCode className="inline-block mr-2 text-indigo-600" />
              Skills Required
            </label>
            <input
              id="skills"
              name="skills"
              type="text"
              required
              value={formData.skills}
              onChange={handleInputChange}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="List required skills, separated by commas"
            />
          </div>

          {/* Link */}
          <div>
            <label
              htmlFor="link"
              className="block text-lg font-medium text-gray-700"
            >
              <FaLink className="inline-block mr-2 text-indigo-600" />
              Link to Your Profile/Project
            </label>
            <input
              id="link"
              name="link"
              type="url"
              required
              value={formData.link}
              onChange={handleInputChange}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Paste the link to your project or profile"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <div
              className={`text-center font-medium ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FindPeerForm;
