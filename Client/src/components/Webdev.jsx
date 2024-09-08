import React, { useState } from 'react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'; // Icons for completion status

const learningPath = [
  {
    id: 1,
    topic: 'HTML Basics',
    duration: '3 days',
    resource: {
      type: 'YouTube',
      title: 'HTML Full Course for Beginners | HTML Tutorial',
      url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg'
    },
    isCompleted: false
  },
  {
    id: 2,
    topic: 'CSS Fundamentals',
    duration: '7 days',
    resource: {
      type: 'YouTube',
      title: 'CSS Crash Course For Beginners',
      url: 'https://www.youtube.com/watch?v=yfoY53QXEnI'
    },
    isCompleted: false
  },
  {
    id: 3,
    topic: 'JavaScript Basics',
    duration: '10 days',
    resource: {
      type: 'YouTube',
      title: 'JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour',
      url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk'
    },
    isCompleted: false
  },
  {
    id: 4,
    topic: 'Version Control with Git and GitHub',
    duration: '5 days',
    resource: {
      type: 'YouTube',
      title: 'Git & GitHub Crash Course For Beginners',
      url: 'https://www.youtube.com/watch?v=SWYqp7iY_Tc'
    },
    isCompleted: false
  },
  {
    id: 5,
    topic: 'Responsive Web Design',
    duration: '7 days',
    resource: {
      type: 'FreeCodeCamp',
      title: 'Responsive Web Design Certification (FreeCodeCamp)',
      url: 'https://www.freecodecamp.org/learn/responsive-web-design/'
    },
    isCompleted: false
  },
  {
    id: 6,
    topic: 'JavaScript DOM Manipulation',
    duration: '5 days',
    resource: {
      type: 'YouTube',
      title: 'JavaScript DOM Manipulation Crash Course',
      url: 'https://www.youtube.com/watch?v=0ik6X4DJKCc'
    },
    isCompleted: false
  },
  {
    id: 7,
    topic: 'Frontend Framework: React Basics',
    duration: '10 days',
    resource: {
      type: 'YouTube',
      title: 'React JS Crash Course',
      url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8'
    },
    isCompleted: false
  },
  {
    id: 8,
    topic: 'Deployment and Hosting with Netlify',
    duration: '2 days',
    resource: {
      type: 'YouTube',
      title: 'How to Deploy Websites Using Netlify (Free and Easy)',
      url: 'https://www.youtube.com/watch?v=sGBvZEOWm7s'
    },
    isCompleted: false
  }
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
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">Web Development Learning Path</h1>
      <div className="space-y-8">
        {path.map((milestone) => (
          <div
            key={milestone.id}
            className={`p-6 bg-white rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl border-l-8 ${
              milestone.isCompleted ? 'border-green-500' : 'border-indigo-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">{milestone.topic}</h2>
              <div className="text-3xl">
                {milestone.isCompleted ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaRegCircle className="text-gray-400" />
                )}
              </div>
            </div>
            <p className="text-gray-500 mt-2">Complete in: <span className="font-medium">{milestone.duration}</span></p>
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
                milestone.isCompleted ? 'bg-green-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
              }`}
              disabled={milestone.isCompleted}
            >
              {milestone.isCompleted ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Webdev;
