import React from "react";
import { useSelector } from "react-redux";
import profile from "../assets/profile.png";

const ClubMemberList = ({ currClubMember }) => {
  return (
    currClubMember && (
      <div className="mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Club Members
        </h2>
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
              {/* Call to Action */}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default ClubMemberList;
