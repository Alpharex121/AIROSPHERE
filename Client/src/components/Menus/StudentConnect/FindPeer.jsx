import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Importing user icon

// Dummy Peer Programming Requests Data
const peerRequests = [
  {
    id: 1,
    title: "React Peer Programming",
    description:
      "Looking for a peer to collaborate on a React project and practice together.",
    poster: "John Doe",
    contactUrl: "mailto:john@example.com",
  },
  {
    id: 2,
    title: "JavaScript Algorithm Challenges",
    description:
      "Seeking a peer to work on daily JavaScript challenges for interview prep.",
    poster: "Jane Smith",
    contactUrl: "mailto:jane@example.com",
  },
  {
    id: 3,
    title: "Python Data Structures & Algorithms",
    description:
      "Interested in solving Python data structures problems with a peer.",
    poster: "Alice Brown",
    contactUrl: "mailto:alice@example.com",
  },
];

// Banner Component
const PeerBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold">Find a Peer for Programming</h1>
        <p className="mt-4 text-lg">
          Join forces with a peer to solve coding challenges, build projects, or
          improve your skills.
        </p>
      </div>
    </div>
  );
};

// Main Peer Programming Component
const FindPeer = () => {
  return (
    <div className="bg-gray-100">
      {/* Banner */}
      <PeerBanner />

      {/* Peer Requests */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
            Available Peers
          </h2>

          {/* List of Peer Requests */}
          <div className="space-y-8">
            {peerRequests.map((request) => (
              <div
                key={request.id}
                className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Row Layout with Poster Info and Details */}
                <div className="flex items-center space-x-6 p-6">
                  {/* Poster Avatar */}
                  <div className="flex-shrink-0">
                    <FaUserCircle className="text-gray-400 text-6xl" />
                  </div>

                  {/* Request Details */}
                  <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-800">
                      {request.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mt-2">{request.description}</p>

                    {/* Poster Name */}
                    <p className="text-gray-500 mt-1">
                      Posted by:{" "}
                      <span className="font-medium">{request.poster}</span>
                    </p>
                  </div>

                  {/* Contact Button */}
                  <div className="flex-shrink-0">
                    <a
                      href={request.contactUrl}
                      className="inline-block bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300"
                    >
                      Contact Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPeer;
