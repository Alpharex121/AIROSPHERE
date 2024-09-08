import React, { useState } from 'react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'; // Icons for completion status

const expoAppDevPath = [
  {
    id: 1,
    topic: 'Introduction to React Native and Expo',
    duration: '3 days',
    resource: {
      type: 'YouTube (Academind)',
      title: 'React Native Crash Course',
      url: 'https://www.youtube.com/watch?v=mLMfxpLzSZA'
    },
    isCompleted: false
  },
  {
    id: 2,
    topic: 'Setting Up Expo Development Environment',
    duration: '2 days',
    resource: {
      type: 'Official Documentation',
      title: 'Setting Up the Development Environment',
      url: 'https://docs.expo.dev/get-started/installation/'
    },
    isCompleted: false
  },
  {
    id: 3,
    topic: 'Basics of React Native Components',
    duration: '5 days',
    resource: {
      type: 'YouTube (Net Ninja)',
      title: 'React Native Tutorial for Beginners',
      url: 'https://www.youtube.com/watch?v=0-S5a0eXPoc'
    },
    isCompleted: false
  },
  {
    id: 4,
    topic: 'Navigation in React Native (React Navigation)',
    duration: '4 days',
    resource: {
      type: 'Official Documentation',
      title: 'React Navigation Basics',
      url: 'https://reactnavigation.org/docs/getting-started'
    },
    isCompleted: false
  },
  {
    id: 5,
    topic: 'Working with Forms and User Input',
    duration: '5 days',
    resource: {
      type: 'YouTube (Academind)',
      title: 'React Native & Forms - TextInput, Pickers & More',
      url: 'https://www.youtube.com/watch?v=XT4Jct5AnjM'
    },
    isCompleted: false
  },
  {
    id: 6,
    topic: 'Using Expo’s APIs (Camera, Sensors, etc.)',
    duration: '6 days',
    resource: {
      type: 'Official Documentation',
      title: 'Using Expo’s Built-in APIs',
      url: 'https://docs.expo.dev/versions/latest/'
    },
    isCompleted: false
  },
  {
    id: 7,
    topic: 'Managing State in React Native (Redux or Context API)',
    duration: '7 days',
    resource: {
      type: 'YouTube (Academind)',
      title: 'React Native Redux Tutorial',
      url: 'https://www.youtube.com/watch?v=m8JAlwKeQZo'
    },
    isCompleted: false
  },
  {
    id: 8,
    topic: 'Handling Offline Functionality (AsyncStorage, SQLite)',
    duration: '5 days',
    resource: {
      type: 'Official Documentation',
      title: 'Offline Data with AsyncStorage',
      url: 'https://docs.expo.dev/versions/latest/sdk/async-storage/'
    },
    isCompleted: false
  },
  {
    id: 9,
    topic: 'Building and Deploying Your App',
    duration: '5 days',
    resource: {
      type: 'Official Documentation',
      title: 'Building Standalone Apps',
      url: 'https://docs.expo.dev/distribution/building-standalone-apps/'
    },
    isCompleted: false
  },
  {
    id: 10,
    topic: 'Optimizing Performance and Debugging',
    duration: '4 days',
    resource: {
      type: 'YouTube (Academind)',
      title: 'Optimizing Performance in React Native Apps',
      url: 'https://www.youtube.com/watch?v=9dAUO5YjvO4'
    },
    isCompleted: false
  }
];

const Appdev = () => {
  const [path, setPath] = useState(expoAppDevPath);

  const handleComplete = (id) => {
    setPath(
      path.map((milestone) =>
        milestone.id === id ? { ...milestone, isCompleted: true } : milestone
      )
    );
  };

  return (
    <div className="max-w-4xl m-4 mx-auto p-8 bg-gray-50 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">Expo App Development Learning Path</h1>
      <div className="space-y-8">
        {path.map((milestone) => (
          <div
            key={milestone.id}
            className={`p-6 bg-white rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl border-l-8 ${
              milestone.isCompleted ? 'border-green-500' : 'border-blue-500'
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
                milestone.isCompleted ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
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

export default Appdev;
