import React, { useState } from 'react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'; // Icons for completion status

const aiMlLearningPath = [
  {
    id: 1,
    topic: 'Introduction to Artificial Intelligence',
    duration: '3 days',
    resource: {
      type: 'YouTube (Great Learning)',
      title: 'Introduction to Artificial Intelligence',
      url: 'https://www.youtube.com/watch?v=JMUxmLyrhSk'
    },
    isCompleted: false
  },
  {
    id: 2,
    topic: 'Linear Algebra for Machine Learning',
    duration: '7 days',
    resource: {
      type: 'YouTube (3Blue1Brown)',
      title: 'Essence of Linear Algebra',
      url: 'https://www.youtube.com/watch?v=kjBOesZCoqc&list=PLRDl2W3P1B2dS7N-3m-XDfyYJH0MGwiZr'
    },
    isCompleted: false
  },
  {
    id: 3,
    topic: 'Supervised Learning: Regression and Classification',
    duration: '10 days',
    resource: {
      type: 'Coursera (Andrew Ng)',
      title: 'Machine Learning - Week 2',
      url: 'https://www.coursera.org/learn/machine-learning'
    },
    isCompleted: false
  },
  {
    id: 4,
    topic: 'Unsupervised Learning: Clustering & Dimensionality Reduction',
    duration: '7 days',
    resource: {
      type: 'Coursera (Andrew Ng)',
      title: 'Machine Learning - Week 8 (Clustering)',
      url: 'https://www.coursera.org/learn/machine-learning'
    },
    isCompleted: false
  },
  {
    id: 5,
    topic: 'Neural Networks and Deep Learning',
    duration: '10 days',
    resource: {
      type: 'YouTube (DeepLearning.ai)',
      title: 'Neural Networks and Deep Learning',
      url: 'https://www.youtube.com/watch?v=aircAruvnKk'
    },
    isCompleted: false
  },
  {
    id: 6,
    topic: 'Convolutional Neural Networks (CNNs)',
    duration: '7 days',
    resource: {
      type: 'Coursera (DeepLearning.ai)',
      title: 'Convolutional Neural Networks',
      url: 'https://www.coursera.org/learn/convolutional-neural-networks'
    },
    isCompleted: false
  },
  {
    id: 7,
    topic: 'Natural Language Processing (NLP)',
    duration: '10 days',
    resource: {
      type: 'YouTube (Stanford CS224N)',
      title: 'Natural Language Processing with Deep Learning',
      url: 'https://www.youtube.com/watch?v=8rXD5-xhemo'
    },
    isCompleted: false
  },
  {
    id: 8,
    topic: 'Reinforcement Learning',
    duration: '10 days',
    resource: {
      type: 'YouTube (DeepMind)',
      title: 'Introduction to Reinforcement Learning',
      url: 'https://www.youtube.com/watch?v=2pWv7GOvuf0'
    },
    isCompleted: false
  },
  {
    id: 9,
    topic: 'Model Evaluation and Tuning',
    duration: '5 days',
    resource: {
      type: 'YouTube (StatQuest)',
      title: 'Cross Validation and Model Evaluation',
      url: 'https://www.youtube.com/watch?v=fSytzGwwBVw'
    },
    isCompleted: false
  },
  {
    id: 10,
    topic: 'Deploying Machine Learning Models',
    duration: '7 days',
    resource: {
      type: 'YouTube (StatQuest)',
      title: 'Deploying Models – A Complete Guide',
      url: 'https://www.youtube.com/watch?v=OY8iJDzOgQA'
    },
    isCompleted: false
  },
];

const Ai = () => {
  const [path, setPath] = useState(aiMlLearningPath);

  const handleComplete = (id) => {
    setPath(
      path.map((milestone) =>
        milestone.id === id ? { ...milestone, isCompleted: true } : milestone
      )
    );
  };

  return (
    <div className="max-w-4xl m-4 mx-auto p-8 bg-gray-50 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">AI & ML Learning Path</h1>
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

export default Ai;
