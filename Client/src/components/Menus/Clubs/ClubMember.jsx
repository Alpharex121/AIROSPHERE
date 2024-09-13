import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import profile from "../../../assets/profile.png";
import { api } from "../../../utils/constant";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import css for toastify
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css for confirm alert

// Shimmer Effect Styles using Tailwind CSS
const shimmerStyles = `
  relative overflow-hidden bg-gray-100
  before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full 
  before:bg-gradient-to-r before:from-transparent before:via-gray-300 before:to-transparent
  before:animate-shimmer
`;

const ClubMemberList = ({ currClubMember }) => {
  const { clubname } = useParams();
  const [loading, setLoading] = useState(true); // Loading state
  const data = useSelector((store) => store?.user);
  const currclubDetail = useSelector((store) => store?.club?.clubdetail);

  const handleOnDelete = async (username) => {
    try {
      const response = await api.delete(
        `http://localhost:3000/club/deletemember/${clubname}/${username}`
      );
      toast.success(
        "Member deleted successfully! Please refresh to see changes."
      );
      console.log(response);
    } catch (error) {
      toast.error("Error occurred while deleting the member.");
      console.error(error);
    }
  };

  const confirmDelete = (member) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white rounded-lg p-8 shadow-lg w-80 mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-red-600 text-center">
              Confirm Delete
            </h2>
            <p className="text-center mb-6 text-gray-700">
              Are you sure you want to delete the member{" "}
              <span className="font-bold">{member.name}</span>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                onClick={() => {
                  handleOnDelete(member.username);
                  onClose();
                }}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      },
    });
  };

  // Simulate data fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay
      setLoading(false);
    };

    fetchData();
  }, [clubname]);

  return (
    <div className="mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Club Members
      </h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`p-6 rounded-lg shadow-md ${shimmerStyles}`}
            >
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currClubMember.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
            >
              {/* Member Avatar */}
              <div className="flex justify-center">
                <img
                  src={profile}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-600 shadow-lg mb-4"
                />
              </div>

              {/* Member Info */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-indigo-600 font-medium">{member.clubpost}</p>
                <p className="text-gray-500 mt-2">{member.clubrole}</p>
              </div>

              {/* Delete Button - Only visible if user is an admin */}
              {(data?.role === "admin" ||
                (data?.role === "clubhead" &&
                  currclubDetail?.head === data?.username) ||
                data?.role === "modhead") && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => confirmDelete(member)} // Trigger confirmation
                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-6 rounded-full transition-transform hover:scale-105 shadow-lg"
                  >
                    Delete Member
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClubMemberList;
