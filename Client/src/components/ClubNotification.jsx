import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const NotificationList = ({ currClubNotifications }) => {
  return (
    <div className="mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Notifications
      </h2>
      <div className="space-y-4">
        {currClubNotifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-gray-100 border-l-4 border-gray-800 p-4 rounded-lg shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {notification.title}
                </h3>
                <p className="text-gray-600 mt-1">{notification.description}</p>
              </div>
              <span className="text-sm text-gray-500">
                {notification.uploadtime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
