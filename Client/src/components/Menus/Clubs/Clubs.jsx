import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import getClubData from "../../../utils/getClub";
import { api } from "../../../utils/constant";
import clubimage from "../../../assets/club.png";
import { toast } from "react-toastify";

const ClubPage = () => {
  const Navigate = useNavigate();
  const data = useSelector((store) => store?.user);

  // Redirect to homepage if no user data
  if (!data) Navigate("/");

  const currclub = useSelector((store) => store?.club?.clubdata);
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const allowedRoles = ["admin", "modhead"];
    if (allowedRoles.includes(data?.role)) {
      setAllowed(true);
    }
  }, []);

  // Fetch club data
  getClubData();

  // Function to handle adding a club
  const handleAddClub = () => {
    Navigate("/addclub"); // Example: Navigating to Add Club form
  };

  // Function to handle club deletion
  const handleDeleteClub = async (clubname) => {
    try {
      const data = await api.delete("http://localhost:3000/club/" + clubname);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Error occured while deleting club");
    }
  };
  // Perform API call here to delete club

  return (
    currclub && (
      <>
        <div className="bg-gray-100 h-[82vh] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Our Clubs
            </h1>

            {/* Add Club Button - Only visible to admins */}
            {allowed && (
              <div className="flex justify-end ">
                <button
                  onClick={handleAddClub}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
                >
                  Add Club
                </button>
              </div>
            )}

            <div className="flex justify-center gap-10">
              {currclub.map((club, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg w-[30%] rounded-lg overflow-hidden hover:scale-105 transform transition-transform duration-300"
                >
                  <img
                    src={clubimage}
                    alt={club.name}
                    className="w-full h-56 object-cover"
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
                    {allowed && (
                      <button
                        onClick={() => handleDeleteClub(club.name)}
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
