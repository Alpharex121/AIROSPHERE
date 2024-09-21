import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import getClubData from "../../../utils/getClub";
import { api } from "../../../utils/constant";
import clubimage from "../../../assets/club.png";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import CSS for confirm dialog

const ClubPage = () => {
  const Navigate = useNavigate();
  const data = useSelector((store) => store?.user);

  // Redirect to homepage if no user data
  if (!data) Navigate("/");

  const currclub = useSelector((store) => store?.club?.clubdata);

  // Fetch club data
  getClubData();

  // Function to handle adding a club
  const handleAddClub = () => {
    Navigate("/addclub"); // Example: Navigating to Add Club form
  };

  // Function to handle club deletion
  const handleDeleteClub = async (clubname) => {
    try {
      const data = await api.delete(
        "https://airosphere-ggits.vercel.app/club/" + clubname
      );
      console.log(data);
      toast.success(
        "Club deleted successfully! Please refresh to see Changes."
      );
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while deleting club");
    }
  };

  // Custom confirm dialog for club deletion
  const confirmDeleteClub = (clubname) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: `Are you sure you want to delete the club "${clubname}"?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeleteClub(clubname),
          className:
            "bg-red-600 hover:bg-red-500 text-white rounded-md px-4 py-2",
        },
        {
          label: "No",
          className:
            "bg-gray-600 hover:bg-gray-500 text-white rounded-md px-4 py-2",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  return (
    currclub && (
      <>
        <div className="bg-gray-100 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Our Clubs
            </h1>

            {/* Add Club Button - Only visible to admins */}
            {(data?.role === "admin" || data?.role === "modhead") && (
              <div className="flex justify-end ">
                <button
                  onClick={handleAddClub}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
                >
                  Add Club
                </button>
              </div>
            )}

            <div className="sm:flex flex-col sm:flex-row sm:justify-center sm:gap-10 flex-wrap ">
              {currclub.map((club, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg w-[100%] mt-2 sm:w-[30%] rounded-lg overflow-hidden hover:scale-105 transform transition-transform duration-300"
                >
                  <img
                    src={club.bannerLink}
                    alt={club.name}
                    className="w-full h-56 object-fill"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                      {club.name}
                    </h2>
                    <p className="text-gray-600">
                      Club Head:{" "}
                      <span className="font-medium">{club.headname}</span>
                    </p>
                    <Link to={`/club/${club.name}`}>
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        View Details
                      </button>
                    </Link>

                    {/* Delete Club Button - Only visible to admins */}
                    {(data?.role === "admin" || data?.role === "modhead") && (
                      <button
                        onClick={() => confirmDeleteClub(club.name)}
                        className="mt-4 ml-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
                      >
                        Delete Club
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ClubPage;
