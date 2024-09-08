import React, { useState } from 'react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'; // Icons for completion status

const dsaLearningPath = [
  {
    id: 1,
    topic: 'Introduction to Data Structures & Algorithms',
    duration: '2 days',
    resource: {
      type: 'YouTube (Striver)',
      title: 'Introduction to DSA',
      url: 'https://www.youtube.com/watch?v=BBpAmxU_NQo'
    },
    isCompleted: false
  },
  {
    id: 2,
    topic: 'Arrays & Basic Problems',
    duration: '5 days',
    resource: {
      type: 'YouTube (Striver)',
      title: 'Arrays – Placement Series',
      url: 'https://www.youtube.com/watch?v=EjnVFGzVg_4'
    },
    isCompleted: false
  },
  {
    id: 3,
    topic: 'Strings',
    duration: '4 days',
    resource: {
      type: 'YouTube (Striver)',
      title: 'String Algorithms – Placement Series',
      url: 'https://www.youtube.com/watch?v=Zaa1XRQa0aM'
    },
    isCompleted: false
  },
  {
    id: 4,
    topic: 'Recursion & Backtracking',
    duration: '7 days',
    resource: {
      type: 'YouTube (Striver)',
      title: 'Recursion & Backtracking – Placement Series',
      url: 'https://www.youtube.com/watch?v=ZGQq-cSLF_M'
    },
    isCompleted: false
  },
  {
    id: 5,
    topic: 'Linked List',
    duration: '5 days',
    resource: {
      type: 'YouTube (Striver)',
      title: 'Linked List – Placement Series',
      url: 'https://www.youtube.com/watch?v=Y0n86K43GO4'
    },
    isCompleted: false
  },
  {
    id: 6,
    topic: 'Stacks and Queues',
    duration: '5 days',
    resource: {
      type: 'YouTube (Striver)',
      title: 'Stacks and Queues – Placement Series',
      url: 'https://www.youtube.com/watch?v=r57NBrCk7ZA'
    },
    isCompleted: false
  },
  {
    id: 7,
    topic: 'Binary Search',
    duration: '5 days',
    resource: {
      type: 'YouTube (Striver)',
      title: 'Binary Search – Placement Series',
      url: 'https://www.youtube.com/watch?v=W9QJ8HaRvJQ'
    },
    isCompleted: false
  },
  {
    id: 8,
    topic: 'Dynamic Programming',
    duration: '10 days',
    resource: {
      type: 'YouTube (Striver)',
      title: 'Dynamic Programming Playlist',
      url: 'https://www.youtube.com/watch?v=FfXoiwwnxFw&list=PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY'
    },
    isCompleted: false
  },
  {
    id: 9,
    topic: 'Graph Algorithms',
    duration: '10 days',
    resource: {
      type: 'YouTube (Striver)',
      title: 'Graph Algorithms – Placement Series',
      url: 'https://www.youtube.com/watch?v=AfSk24UTFS8'
    },
    isCompleted: false
  },
  {
    id: 10,
    topic: 'Greedy Algorithms',
    duration: '5 days',
    resource: {
      type: 'YouTube (Striver)',
      title: 'Greedy Algorithms – Placement Series',
      url: 'https://www.youtube.com/watch?v=ARkl69eBzhY'
    },
    isCompleted: false
  },
  {
    id: 11,
    topic: 'Trie Data Structure',
    duration: '3 days',
    resource: {
      type: 'YouTube (Striver)',
      title: 'Trie Data Structure – Placement Series',
      url: 'https://www.youtube.com/watch?v=oobqoCJlHA0'
    },
    isCompleted: false
  },
];

const Dsa = () => {
  const [path, setPath] = useState(dsaLearningPath);

  const handleComplete = (id) => {
    setPath(
      path.map((milestone) =>
        milestone.id === id ? { ...milestone, isCompleted: true } : milestone
      )
    );
  };

  return (
    <div className="max-w-4xl m-4 mx-auto p-8 bg-gray-50 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">DSA Learning Path</h1>
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

export default Dsa;
