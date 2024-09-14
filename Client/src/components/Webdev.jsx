import React, { useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa"; // Icons for completion status

const learningPath = [
  {
    id: 1,
    topic: "HTML",
    duration: "3 days",
    resource: {
      type: "YouTube",
      title: "HTML Full Course for Beginners | HTML Tutorial",
      url: "https://youtu.be/k7ELO356Npo?si=p_rq-2fxq0usc0Wp",
    },
    isCompleted: false,
  },
  {
    id: 2,
    topic: "CSS Fundamentals",
    duration: "6 days",
    resource: {
      type: "YouTube",
      title: "CSS Crash Course For Beginners",
      url: "https://www.youtube.com/watch?v=ESnrn1kAD4E",
    },
    isCompleted: false,
  },
  {
    id: 3,
    topic: "Tailwind css",
    duration: "3 days",
    resource: {
      type: "YouTube",
      title: "Tailwind CSS Crash Course For Beginners",
      url: "https://youtu.be/6a8CNTk9yo4?si=c6g-MXxULD8fv99K",
    },
    isCompleted: false,
  },
  {
    id: 4,
    topic: "JavaScript full Playlist",
    duration: "30 days",
    resource: {
      type: "YouTube",
      title: "JavaScript full playlist Zero to hero",
      url: "https://youtube.com/playlist?list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37&si=amsUfBUS5gmqTCYI",
    },
    isCompleted: false,
  },
  {
    id: 5,
    topic: "Version Control with Git and GitHub",
    duration: "2 days",
    resource: {
      type: "YouTube",
      title: "Git & GitHub Crash Course For Beginners",
      url: "https://youtu.be/q8EevlEpQ2A?si=GuoUtVE06DANXQdt",
    },
    isCompleted: false,
  },
  {
    id: 6,
    topic: "Frontend Framework: React",
    duration: "18 days",
    resource: {
      type: "YouTube",
      title: "React JS full playlist",
      url: "https://youtube.com/playlist?list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&si=56euGstSNhznn11J",
    },
    isCompleted: false,
  },
  {
    id: 7,
    topic: "BackEnd",
    duration: "30 days",
    resource: {
      type: "YouTube",
      title: "Node js full playlist",
      url: "https://youtube.com/playlist?list=PLinedj3B30sDby4Al-i13hQJGQoRQDfPo&si=htQ8sSk_jyGMBHyF",
    },
    isCompleted: false,
  },
  {
    id: 8,
    topic: "Next js : full stack framework",
    duration: "20 days",
    resource: {
      type: "YouTube",
      title: "Node js full playlist",
      url: "https://youtube.com/playlist?list=PLinedj3B30sDP2CHN5P0lDD64yYZ0Nn4J&si=uo9CsprZ8TBK5Ufr",
    },
    isCompleted: false,
  },
];

const Webdev = () => {
  const [path, setPath] = useState(learningPath);

  const handleComplete = (id) => {
    setPath(
      path.map((milestone) =>
        milestone.id === id ? { ...milestone, isCompleted: true } : milestone
      )
    );
  };

  return (
    <div className="max-w-4xl m-4 mx-auto p-8 bg-gray-50 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">
        Web Development Learning Path
      </h1>
      <div className="space-y-8">
        {path.map((milestone) => (
          <div
            key={milestone.id}
            className={`p-6 bg-white rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl border-l-8 ${
              milestone.isCompleted ? "border-green-500" : "border-indigo-500"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                {milestone.topic}
              </h2>
              <div className="text-3xl">
                {milestone.isCompleted ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaRegCircle className="text-gray-400" />
                )}
              </div>
            </div>
            <p className="text-gray-500 mt-2">
              Complete in:{" "}
              <span className="font-medium">{milestone.duration}</span>
            </p>
            <a
              href={milestone.resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-lg text-blue-600 hover:text-blue-800 underline"
            >
              {milestone.resource.title} ({milestone.resource.type})
            </a>
            <button
              onClick={() => handleComplete(milestone.id)}
              className={`mt-6 w-full px-4 py-2 text-white font-semibold rounded-lg transition-colors duration-300 ${
                milestone.isCompleted
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600"
              }`}
              disabled={milestone.isCompleted}
            >
              {milestone.isCompleted ? "Completed" : "Mark as Complete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Webdev;
