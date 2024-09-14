import React, { useState, useRef, useEffect } from "react";
import { semestersData } from "../../helpers/SemesterData";
import { subjectCode } from "../../helpers/SubjectCode";
import {
  FaBook,
  FaPenAlt,
  FaLaptopCode,
  FaFlask,
  FaCalculator,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const NotesComponent = () => {
  const [selectedSemester, setSelectedSemester] = useState("Semester 1");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const semesterRefs = useRef([]);

  useEffect(() => {
    const selectedIndex = Object.keys(semestersData).findIndex(
      (sem) => sem === selectedSemester
    );
    const selectedElement = semesterRefs.current[selectedIndex];
    if (selectedElement) {
      const rect = selectedElement.getBoundingClientRect();
      setUnderlineStyle({
        left:
          rect.left - selectedElement.parentNode.getBoundingClientRect().left,
        width: rect.width,
      });
    }
  }, [selectedSemester]);

  return (
    <div className="mt-10 mx-auto px-4 sm:px-6 lg:px-8">
      {/* Semester Selector */}
      <div className="relative ">
        <div className="flex sm:justify-center rounded-lg sm:p-4 shadow-lg bg-indigo-600 overflow-x-auto scrollbar-hide no-scrollbar">
          <div className="relative flex ">
            {Object.keys(semestersData).map((semester, index) => (
              <div
                key={semester}
                ref={(el) => (semesterRefs.current[index] = el)}
                className={`text-lg font-semibold cursor-pointer px-4 py-2 transition-colors mx-3 duration-300 rounded-lg ${
                  selectedSemester === semester
                    ? "text-white bg-indigo-800"
                    : "text-gray-200 hover:text-white hover:bg-indigo-700"
                } `}
                onClick={() => setSelectedSemester(semester)}
              >
                {semester}
              </div>
            ))}
            <div
              className="absolute bottom-0 h-1 bg-white transition-all duration-300"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="mt-8 p-6 bg-indigo-100 rounded-lg shadow-xl backdrop-blur-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
          Notes for {selectedSemester}
        </h2>
        {parseInt(selectedSemester[9]) < 6 && (
          <div className="flex flex-col gap-4 mb-6">
            {semestersData[selectedSemester].map((subject, idx) => (
              <div
                key={idx}
                className="p-4 bg-white shadow-md rounded-lg transition transform hover:shadow-xl flex justify-between items-center"
              >
                {/* Icon based on subject index */}
                <div className="flex items-center space-x-4">
                  <div className="text-indigo-600 text-2xl">
                    {idx % 5 === 0 && <FaBook />}
                    {idx % 5 === 1 && <FaPenAlt />}
                    {idx % 5 === 2 && <FaLaptopCode />}
                    {idx % 5 === 3 && <FaFlask />}
                    {idx % 5 === 4 && <FaCalculator />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {subject} - ({subjectCode[selectedSemester][idx]})
                  </h3>
                </div>

                <Link
                  to={
                    "/notes/semester/" +
                    selectedSemester[9] +
                    "/" +
                    subjectCode[selectedSemester][idx]
                  }
                >
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition w-full sm:w-auto">
                    View
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesComponent;
