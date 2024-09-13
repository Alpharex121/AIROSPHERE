import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

const NotificationList = ({ currClubNotifications, onDeleteNotification }) => {
  const { clubname } = useParams();
  const data = useSelector((store) => store?.user);
  const [loading, setLoading] = useState(true); // Loading state
  const currclubDetail = useSelector((store) => store?.club?.clubdetail);

  const handleOnDelete = async (notiid) => {
    try {
      const response = await api.delete(
        "https://airosphere-ggits.vercel.app/club/notificationdelete/" +
          clubname +
          "/" +
          notiid
      );
      toast.success(
        "Notification deleted successfully! Please refresh to see changes."
      );
      if (onDeleteNotification) {
        onDeleteNotification(notiid); // Notify parent component if needed
      }
      console.log(response);
    } catch (error) {
      toast.error("Error occurred while deleting the notification.");
      console.error(error);
    }
  };

  const confirmDelete = (notification) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white rounded-lg p-8 shadow-lg w-80 mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-red-600 text-center">
              Confirm Delete
            </h2>
            <p className="text-center mb-6 text-gray-700">
              Are you sure you want to delete the notification{" "}
              <span className="font-bold">{notification.title}</span>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                onClick={() => {
                  handleOnDelete(notification._id);
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
        Notifications
      </h2>
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg shadow-lg ${shimmerStyles}`}
            >
              <div className="flex flex-col space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {currClubNotifications.map((notification) => (
            <div
              key={notification._id}
              className="bg-gray-100 border-l-4 border-gray-800 p-4 rounded-lg shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {notification.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {notification.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Uploaded on: {notification.uploadtime}
                  </p>
                </div>

                {/* Delete Button - Only visible if user is an admin */}
                {(data?.role === "admin" ||
                  (data?.role === "clubhead" &&
                    currclubDetail?.head === data?.username) ||
                  data?.role === "modhead") && (
                  <button
                    onClick={() => confirmDelete(notification)}
                    className="ml-4 bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-full transition-transform hover:scale-105 shadow-lg"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
