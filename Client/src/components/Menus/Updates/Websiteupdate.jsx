import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa"; // Importing calendar icon
import { useDispatch, useSelector } from "react-redux";
import getWebsiteUpdates from "../../../utils/getWebsiteUpdate";
import { api } from "../../../utils/constant";

const WebsiteUpdate = () => {
  const user = useSelector((store) => store?.user);
  const websiteUpdates = useSelector((store) => store?.updates?.websiteData);
  console.log(websiteUpdates);
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const allowedRoles = ["admin", "professor", "updatemod", "modhead"];
    if (allowedRoles.includes(user?.role)) {
      setAllowed(true);
    }
  }, []);
  getWebsiteUpdates();

  const handleDelete = async (updateId) => {
    const data = await api.delete(
      "https://airosphere-ggits.vercel.app/notification/" + updateId
    );
    console.log(data);
  };
  return (
    websiteUpdates && (
      <div className="bg-gray-50 ">
        {/* Banner */}
        <div className="relative bg-blue-900">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
          </div>
          <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-extrabold text-white tracking-wide">
              Website Updates & Announcements
            </h1>
            <p className="mt-4 text-lg text-blue-100">
              Discover the latest changes, features, and improvements on our
              platform.
            </p>
          </div>
        </div>

        {/* Updates Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
            Latest Website Updates
          </h2>

          {/* Grid of Updates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websiteUpdates.map((update) => (
              <div
                key={update._id}
                className="relative bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* Card Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-2">
                    {update.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4">{update.description}</p>

                  {/* Upload Date with Icon */}
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FaCalendarAlt />
                    <span>{update.uploaddate}</span>
                  </div>
                  {/* Display delete button if user is an admin */}
                  {allowed && (
                    <button
                      onClick={() => handleDelete(update._id)}
                      className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition-all duration-300"
                    >
                      Delete
                    </button>
                  )}
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default WebsiteUpdate;
