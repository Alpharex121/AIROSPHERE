import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

  getClubDetails({ clubname });
  const currclubDetail = useSelector((store) => store?.club?.clubdetail);
  console.log(currclubDetail);
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
    currMenu = <ClubMemberList currClubMember={currclubDetail?.members} />;
  } else if (selectedMenu === "Notifications") {
    currMenu = (
      <NotificationList currClubNotifications={currclubDetail?.notification} />
    );
  } else if (selectedMenu === "Events") {
    currMenu = <ClubEvent clubEvent={currclubDetail?.events} />;
  }

  return (
    currclubDetail && (
      <>
        <div className="min-h-screen bg-gray-100">
          {/* Upper Section: Club Logo and Details */}
          <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 shadow-lg py-8 px-6">
            <div className="flex justify-center items-center max-w-6xl mx-auto">
              {/* Club Logo */}
              <div className="flex-shrink-0 mr-8">
                <img
                  src={roboclub}
                  alt="Club Logo"
                  className="w-48 h-48 object-contain rounded-full border-4 border-white"
                />
              </div>
              {/* Club Details */}
              <div className="flex flex-col justify-center text-white">
                <h1 className="text-4xl font-bold mb-4">
                  {currclubDetail.name}
                </h1>
                <p className="mb-2">{currclubDetail.description}</p>
                <p className="mb-1">
                  Club Head:{" "}
                  <span className="font-medium">{currclubDetail.headname}</span>
                </p>
                <p>
                  Number of Members: <span className="font-medium">10</span>
                </p>
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
