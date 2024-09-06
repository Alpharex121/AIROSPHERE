import React, { useEffect } from "react";
import { api } from "../../../utils/constant";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import getClubData from "../../../utils/getClub";
import clubimage from "../../../assets/club.png";

const ClubPage = () => {
  const Navigate = useNavigate();
  const data = useSelector((store) => store?.user);
  if (!data) Navigate("/");
  const currclub = useSelector((store) => store?.club?.clubdata);
  getClubData();

  return (
    currclub && (
      <>
        <div className="bg-gray-100 h-[82vh]  py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Our Clubs
            </h1>
            <div className="flex justify-center  gap-10">
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
                    <Link to={"/club/" + club.name}>
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        View Details
                      </button>
                    </Link>
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
