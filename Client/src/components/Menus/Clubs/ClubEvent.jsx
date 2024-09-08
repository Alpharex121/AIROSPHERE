import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../../utils/constant";

const EventList = ({ clubEvent }) => {
  const { clubname } = useParams();
  const currentUser = useSelector((store) => store?.user);
  const isAdmin = currentUser?.role === "admin"; // Assuming there's a role field to identify admin

  const handleOnDelete = async (eventid) => {
    const data = await api.delete(
      "http://localhost:3000/club/eventdelete/" + clubname + "/" + eventid
    );
    console.log(data);
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubEvent.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover border-b-2 border-black p-3"
                src="https://img.freepik.com/free-vector/colleagues-preparing-corporate-party-time-management-deadline-brand-event_335657-3083.jpg"
                alt={event.title}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  <span className="font-bold">Start From: </span>
                  {event?.startfrom}
                </p>
                <p className="text-gray-600  mt-2">
                  <span className="font-bold">Venue: </span>
                  {event?.venue}
                </p>
                <p className="mt-4 text-gray-700">
                  <span className="font-bold">Description: </span>
                  {event?.description}
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800">
                    Event Incharge:
                  </h4>
                  <p className="text-gray-600">{event?.eventincharge}</p>
                </div>

                {/* Delete Button - Only visible if user is an admin */}
                {isAdmin && (
                  <div className="mt-6 text-right">
                    <button
                      onClick={() => handleOnDelete(event._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-full transition-transform hover:scale-105 shadow-lg"
                    >
                      Delete Event
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;
