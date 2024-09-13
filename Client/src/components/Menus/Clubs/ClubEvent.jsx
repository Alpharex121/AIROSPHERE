import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../../utils/constant";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css for confirm alert
import "react-toastify/dist/ReactToastify.css"; // Import css for toastify

// Shimmer Component for loading state
const Shimmer = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse"
      >
        <div className="w-full h-48 bg-gray-200 border-b-2 border-black p-3"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

const EventList = ({ clubEvent }) => {
  const { clubname } = useParams();
  const [loading, setLoading] = useState(true);
  const data = useSelector((store) => store?.user);
  const currclubDetail = useSelector((store) => store?.club?.clubdetail);

  const handleOnDelete = async (eventid) => {
    try {
      const response = await api.delete(
        "https://airosphere-ggits.vercel.app/club/eventdelete/" +
          clubname +
          "/" +
          eventid
      );
      toast.success(
        "Event deleted successfully! Please refresh to see changes."
      );
      console.log(response);
    } catch (error) {
      toast.error("Error occurred while deleting event.");
      console.log(error);
    }
  };

  const confirmDelete = (event) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white rounded-lg p-8 shadow-lg w-80 mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-red-600 text-center">
              Confirm Delete
            </h2>
            <p className="text-center mb-6 text-gray-700">
              Are you sure you want to delete the event{" "}
              <span className="font-bold">{event.title}</span>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                onClick={() => {
                  handleOnDelete(event._id);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay
      setLoading(false);
    };

    fetchData();
  }, [clubname]);

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          Upcoming Events
        </h2>
        {loading ? (
          <Shimmer />
        ) : (
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
                  <p className="text-gray-600 mt-2">
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
                  {(data?.role === "admin" ||
                    (data?.role === "clubhead" &&
                      currclubDetail?.head === data?.username) ||
                    data?.role === "modhead") && (
                    <div className="mt-6 text-right">
                      <button
                        onClick={() => confirmDelete(event)}
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
        )}
      </div>
    </div>
  );
};

export default EventList;
