import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import getNotesData from "../../../utils/getNotes";
import { api } from "../../../utils/constant";

const UnitBoxList = () => {
  const { subcode, type } = useParams();
  const Navigate = useNavigate();
  const data = useSelector((store) => store?.user);
  if (!data) Navigate("/");
  const dispatch = useDispatch();
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const allowedRoles = ["admin", "professor", "academicmod", "modhead"];
    if (allowedRoles.includes(data?.role)) {
      setAllowed(true);
    }
  }, []);

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

  const handleDelete = async (unitId) => {
    // Dispatch an action to delete the unit
    const data = await api.delete("http://localhost:3000/academic/" + unitId);
    console.log(data);
  };

  return (
    units && (
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        {/* Enhanced Notes Banner */}
        <div className="bg-indigo-600 text-white text-center p-4 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold">{currtype} Section</h1>
          <p className="text-lg mt-2">{currdescription}</p>
        </div>

        {units.map((unit, index) => (
          <div
            key={index}
            className="bg-indigo-600 rounded-lg shadow-lg mb-6 transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="bg-indigo-500 p-4 text-white">
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
                <Link
                  to={
                    data?.role === "demo" ||
                    (data?.role === "obfy" && unit.semester > 2)
                      ? null
                      : unit.link
                  }
                >
                  <button
                    className={`inline-block bg-indigo-900 text-white px-4 py-2 rounded-full shadow-md
                  hover:shadow-xl hover:from-gray-700 hover:to-gray-600
                  transition-all ${
                    data?.role === "demo" && "cursor-not-allowed"
                  } duration-300 transform hover:scale-105  ${
                      data?.role === "obfy" &&
                      Number(unit.semester) > 2 &&
                      "cursor-not-allowed"
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Notes
                  </button>
                </Link>

                {/* Display delete button if the user is an admin */}
                {allowed && (
                  <button
                    onClick={() => handleDelete(unit._id)}
                    className="inline-block bg-red-600 text-white px-4 py-2 rounded-full shadow-md ml-4
                    hover:bg-red-700 transition-all duration-300"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default UnitBoxList;
