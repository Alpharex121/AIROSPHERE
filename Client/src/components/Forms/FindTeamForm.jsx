import React, { useState } from "react";
import {
  FaFileAlt,
  FaInfoCircle,
  FaUserFriends,
  FaTools,
  FaLink,
} from "react-icons/fa"; // Importing icons
import { api } from "../../utils/constant";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTeam } from "../../store/studentConnectSlice";
import { toast } from "react-toastify";

const FindTeamForm = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const data = useSelector((store) => store?.user);
  if (data?.role === "demo") Navigate("/studentconnect/findteammates");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    opening: "",
    skills: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted", formData);
      const title = formData.title;
      const description = formData.description;
      const opening = formData.opening;
      const skills = formData.skills;
      const link = formData.link;
      const data = await api.post(
        "http://localhost:3000/studentconnect/postteam",
        {
          title,
          description,
          opening,
          skills,
          link,
        }
      );
      console.log(data);
      dispatch(addTeam(data?.data));
      toast.success("Find team request added successfully!");
      Navigate("/studentconnect/findteammates");
    } catch (error) {
      console.log(error);
      toast.error("Erro occured while adding find team request");
    }

    // Add form submission logic here (API call)
  };

  return (
    <div className=" bg-gray-50 flex items-center justify-center  ">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a Team Request
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Post a request to find the perfect teammates!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Title */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className=" text-sm font-medium text-gray-700 flex items-center"
              >
                <FaFileAlt className="mr-2 text-indigo-500" /> Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Project title"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className=" text-sm font-medium text-gray-700 flex items-center"
              >
                <FaInfoCircle className="mr-2 text-indigo-500" /> Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Describe the project"
              ></textarea>
            </div>

            {/* Openings */}
            <div className="mb-4">
              <label
                htmlFor="opening"
                className=" text-sm font-medium text-gray-700 flex items-center"
              >
                <FaUserFriends className="mr-2 text-indigo-500" /> Openings
              </label>
              <input
                id="opening"
                name="opening"
                type="number"
                required
                value={formData.opening}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Number of openings"
              />
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label
                htmlFor="skills"
                className=" text-sm font-medium text-gray-700 flex items-center"
              >
                <FaTools className="mr-2 text-indigo-500" /> Required Skills
              </label>
              <input
                id="skills"
                name="skills"
                type="text"
                required
                value={formData.skills}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Comma separated skills, e.g., JavaScript, React"
              />
            </div>

            {/* Link */}
            <div className="mb-4">
              <label
                htmlFor="link"
                className=" text-sm font-medium text-gray-700 flex items-center"
              >
                <FaLink className="mr-2 text-indigo-500" /> Project Link
              </label>
              <input
                id="link"
                name="link"
                type="url"
                required
                value={formData.link}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Link to project or resources"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
            >
              Post Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindTeamForm;
