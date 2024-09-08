import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../../utils/constant";

const NotificationList = ({ currClubNotifications, onDeleteNotification }) => {
  const { clubname } = useParams();
  const currentUser = useSelector((store) => store?.user);
  const isAdmin = currentUser?.role === "admin"; // Assuming there's a role field to identify admin

  const handleOnDelete = async (notiid) => {
    const data = await api.delete(
      "http://localhost:3000/club/notificationdelete/" + clubname + "/" + notiid
    );
    console.log(data);
  };

  return (
    <div className="mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Notifications
      </h2>
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
                <p className="text-gray-600 mt-1">{notification.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Uploaded on: {notification.uploadtime}
                </p>
              </div>

              {/* Delete Button - Only visible if user is an admin */}
              {isAdmin && (
                <button
                  onClick={() => handleOnDelete(notification._id)}
                  className="ml-4 bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-full transition-transform hover:scale-105 shadow-lg"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
