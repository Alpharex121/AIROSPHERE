import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import getClubData from "../../../utils/getClub";
import ClubMemberList from "./ClubMember";
import NotificationList from "./ClubNotification";
import roboclub from "../../../assets/roboclub.jpg";
import getClubDetails from "../../../utils/getClubDetails";
import ClubEvent from "./ClubEvent";

const ClubDetailPage = () => {
  const { clubname } = useParams();
  const Navigate = useNavigate();
  const data = useSelector((store) => store?.user);
  if (!data) Navigate("/");
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const allowedRoles = ["admin", "clubhead"];
    if (allowedRoles.includes(data?.role)) {
      setAllowed(true);
    }
  }, []);

  getClubDetails({ clubname });
  const currclubDetail = useSelector((store) => store?.club?.clubdetail);
  const userdata = useSelector((store) => store?.user);

  const [selectedMenu, setSelectedMenu] = useState("Members");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const menuRefs = useRef([]);

  const menuItems = ["Members", "Notifications", "Events"];

  // Update the underline style dynamically
  useEffect(() => {
    const currentMenuItem = menuRefs.current[menuItems.indexOf(selectedMenu)];
    if (currentMenuItem) {
      const { offsetLeft, offsetWidth } = currentMenuItem;
      setUnderlineStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [selectedMenu]);

  let currMenu;
  if (selectedMenu === "Members") {
    currMenu = (
      <div>
        {/* Add Member Button Aligned */}
        <div className="flex  justify-end items-center pt-2 w-2/3 mx-auto">
          {(data?.role === "admin" ||
            (data?.role === "clubhead" &&
              currclubDetail?.head === data?.username) ||
            data?.role === "modhead") && (
            <Link to={"/addmember/" + currclubDetail?.name}>
              <button className="bg-indigo-500 text-white py-2 px-6 rounded-full transition-transform hover:scale-105 hover:bg-indigo-600 shadow-lg">
                Add Member
              </button>
            </Link>
          )}
        </div>
        <ClubMemberList currClubMember={currclubDetail?.members} />
      </div>
    );
  } else if (selectedMenu === "Notifications") {
    currMenu = (
      <div>
        <div className="flex  justify-end items-center pt-2 w-2/3 mx-auto">
          {(data?.role === "admin" ||
            (data?.role === "clubhead" &&
              currclubDetail?.head === data?.username) ||
            data?.role === "modhead") && (
            <Link to={"/addnotification/" + currclubDetail?.name}>
              <button className="bg-green-500 text-white py-2 px-6 rounded-full transition-transform hover:scale-105 hover:bg-green-600 shadow-lg">
                Add Notification
              </button>
            </Link>
          )}
        </div>
        <NotificationList
          currClubNotifications={currclubDetail?.notification}
        />
      </div>
    );
  } else if (selectedMenu === "Events") {
    currMenu = (
      <div>
        <div className="flex  justify-end items-center pt-2 w-2/3 mx-auto">
          {(data?.role === "admin" ||
            (data?.role === "clubhead" &&
              currclubDetail?.head === data?.username) ||
            data?.role === "modhead") && (
            <Link to={"/addevent/" + currclubDetail?.name}>
              <button className="bg-purple-500 text-white py-2 px-6 rounded-full transition-transform hover:scale-105 hover:bg-purple-600 shadow-lg">
                Add Event
              </button>
            </Link>
          )}
        </div>
        <ClubEvent clubEvent={currclubDetail?.events} />
      </div>
    );
  }

  return (
    currclubDetail && (
      <>
        <div className="min-h-screen bg-gray-100">
          {/* Upper Section: Club Logo and Details */}
          <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 shadow-lg py-8 px-6">
            <div className="flex justify-center items-center max-w-6xl mx-auto">
              {/* Club Logo */}
              <div className="flex-shrink-0 mr-8 ">
                <img
                  src={roboclub}
                  alt="Club Logo"
                  className="w-48 h-48 object-contain rounded-full border-4 border-white"
                />
              </div>
              {/* Club Details */}
              <div className="flex flex-col">
                <div className="flex flex-col justify-center text-white ">
                  <h1 className="text-4xl font-bold mb-4">
                    {currclubDetail.name}
                  </h1>
                  <p className="mb-2">{currclubDetail.description}</p>
                  <p className="mb-1">
                    Club Head:{" "}
                    <span className="font-medium">
                      {currclubDetail.headname}
                    </span>
                  </p>
                  <p>
                    Number of Members:{" "}
                    <span className="font-medium">
                      {currclubDetail.members.length}
                    </span>
                  </p>
                  {/* Apply Button */}
                </div>
                <button
                  to={data?.role !== "demo" ? "#apply" : null}
                  className={`bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-700 hover:to-teal-600 text-white font-bold ${
                    data?.role === "demo" && "cursor-not-allowed"
                  }  py-2 w-[11vw] px-8 mt-4 rounded-full transition-transform hover:scale-105 shadow-lg`}
                >
                  Apply to Join
                </button>
              </div>
            </div>
          </div>

          {/* Second Section: Menu Styled with Underline Animation */}
          <div className="mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-center">
              {menuItems.map((item, index) => (
                <div
                  key={item}
                  ref={(el) => (menuRefs.current[index] = el)} // Attach ref to each menu item
                  className={`text-lg font-semibold cursor-pointer px-6 transition-colors duration-300 ${
                    selectedMenu === item ? "text-indigo-600" : "text-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedMenu(item);
                    currMenu = item;
                  }}
                >
                  {item}
                </div>
              ))}
              {/* Animated underline */}
              <div
                className="absolute bottom-0 h-1 bg-indigo-600 transition-all duration-300"
                style={{
                  ...underlineStyle,
                  left: `${underlineStyle.left}px`,
                  width: `${underlineStyle.width}px`,
                }}
              />
            </div>
          </div>
          {currMenu}
        </div>
      </>
    )
  );
};

export default ClubDetailPage;
