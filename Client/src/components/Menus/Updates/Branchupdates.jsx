import React from "react";
import { FaCalendarAlt } from "react-icons/fa"; // Importing calendar icon
import getBranchUpdates from "../../../utils/getBranchUpdates";
import { useDispatch, useSelector } from "react-redux";

const BranchUpdate = () => {
  const branchUpdates = useSelector((store) => store?.updates?.branchData);
  getBranchUpdates();
  return (
    branchUpdates && (
      <div className="bg-gray-50 ">
        {/* Banner */}
        <div className="relative bg-indigo-900">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-indigo-900 opacity-50"></div>
          </div>
          <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-extrabold text-white tracking-wide">
              Stay Updated with Your Branch
            </h1>
            <p className="mt-4 text-lg text-indigo-100">
              Keep track of the latest news, curriculum changes, and exciting
              opportunities.
            </p>
          </div>
        </div>

        {/* Updates Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
            Latest Branch Updates
          </h2>

          {/* Grid of Updates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branchUpdates.map((update) => (
              <div
                key={update.id}
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
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default BranchUpdate;