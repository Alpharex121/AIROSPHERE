import React, { useState, useRef, useEffect } from "react";
import {
  FaBook,
  FaPenAlt,
  FaLaptopCode,
  FaFlask,
  FaCalculator,
  FaClipboardList,
} from "react-icons/fa";

// Array of semesters and subjects
const semestersData = {
  "Semester 1": [
    "Mathematics I",
    "Physics",
    "Introduction to Programming",
    "English",
    "Basic Electrical Engineering",
  ],
  "Semester 2": [
    "Mathematics II",
    "Chemistry",
    "Data Structures",
    "Electronics",
    "Communication Skills",
  ],
  "Semester 3": [
    "Mathematics III",
    "Object-Oriented Programming",
    "Digital Logic",
    "Microprocessor",
    "Operating Systems",
  ],
  "Semester 4": [
    "Discrete Mathematics",
    "Algorithm Design",
    "Database Management",
    "Software Engineering",
    "Signals & Systems",
  ],
  "Semester 5": [
    "Linear Algebra",
    "Computer Networks",
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
  ],
  "Semester 6": [
    "Probability & Statistics",
    "Cryptography",
    "Mobile Computing",
    "Data Mining",
    "Cloud Computing",
  ],
  "Semester 7": [
    "Distributed Systems",
    "Big Data Analytics",
    "Advanced Algorithms",
    "Cybersecurity",
    "IoT",
  ],
  "Semester 8": [
    "Project Management",
    "Blockchain Technology",
    "Quantum Computing",
    "Augmented Reality",
    "Final Year Project",
  ],
};

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
      <div className="relative">
        <div className="flex justify-center rounded-lg p-4 shadow-lg bg-gradient-to-r from-gray-500 via-gray-600 to-gray-800">
          <div className="relative flex">
            {Object.keys(semestersData).map((semester, index) => (
              <div
                key={semester}
                ref={(el) => (semesterRefs.current[index] = el)}
                className={`text-lg font-semibold cursor-pointer px-4 py-2 transition-colors duration-300 rounded-lg mx-3 ${
                  selectedSemester === semester
                    ? "text-white bg-blue-900"
                    : "text-gray-200 hover:text-white hover:bg-blue-700"
                }`}
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
      <div className="mt-8 p-6 bg-gradient-to-r bg-slate-500  rounded-lg shadow-xl backdrop-blur-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Subjects for {selectedSemester}
        </h2>
        <div className="flex flex-col justify-center items-center gap-6 mb-10">
          {semestersData[selectedSemester].map((subject, idx) => (
            <div
              key={idx}
              className="p-4 bg-white shadow-md rounded-lg transition w-[90%] hover:cursor-pointer transform hover:scale-105 hover:shadow-xl flex items-center space-x-4"
            >
              {/* Icon based on subject index */}
              <div className="text-blue-500 text-2xl">
                {idx % 5 === 0 && <FaBook />}
                {idx % 5 === 1 && <FaPenAlt />}
                {idx % 5 === 2 && <FaLaptopCode />}
                {idx % 5 === 3 && <FaFlask />}
                {idx % 5 === 4 && <FaCalculator />}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {subject}
                </h3>
                <p className="text-gray-600">
                  Tap to explore notes and resources.
                </p>
              </div>
              <FaClipboardList className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesComponent;
