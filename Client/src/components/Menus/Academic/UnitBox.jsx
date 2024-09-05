import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import getNotesData from "../../../utils/getNotes";

const UnitBoxList = () => {
  const { subcode, type } = useParams();
  const Navigate = useNavigate();
  const data = useSelector((store) => store?.user);
  if (!data) Navigate("/");
  let units;
  if (type === "notes")
    units = useSelector((store) => store?.academic?.notesdata);
  if (type === "pyq") units = useSelector((store) => store?.academic?.pyqdata);
  if (type === "important")
    units = useSelector((store) => store?.academic?.importantquesdata);
  console.log(units);
  getNotesData({ subcode, type });

  let currtype;
  let currdescription;
  if (type === "notes") {
    currtype = "Notes";
    currdescription =
      "Here you can find notes for each unit to enhance your learning experience.";
  } else if (type === "pyq") {
    currtype = "PYQ";
    currdescription = "Get all the Previous Year Question in one place";
  } else if (type === "important") {
    currtype = "Important Question";
  }

  return (
    units && (
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        {/* Enhanced Notes Banner */}
        <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white text-center p-4 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold">{currtype} Section</h1>
          <p className="text-lg mt-2">{currdescription}</p>
        </div>

        {units.map((unit, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 rounded-lg shadow-lg mb-6 transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 p-4 text-white">
                <h2 className="text-2xl font-bold mb-2">{unit.title}</h2>
                <p className="text-gray-200">{unit.description}</p>
              </div>
              <div className="p-6 bg-white">
                <div className="text-gray-700 mb-3">
                  <span className="font-semibold">Subject Code: </span>
                  {unit.subcode}
                </div>
                <div className="text-gray-700 mb-3">
                  <span className="font-semibold">Subject: </span>
                  {unit.subject}
                </div>
                <div className="text-gray-700 mb-4">
                  <span className="font-semibold">Semester: </span>
                  {unit.semester}
                </div>
                <Link to={unit.link}>
                  <button
                    className="inline-block bg-gradient-to-r from-gray-600
                  to-gray-800 text-white px-4 py-2 rounded-full shadow-md
                  hover:shadow-xl hover:from-gray-700 hover:to-gray-600
                  transition-all duration-300 transform hover:scale-105"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Notes
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default UnitBoxList;
