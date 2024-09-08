import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDoubt } from '../../../store/studentConnectSlice';

const AskDoubt = () => {
  const data = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const doubtsdata = useSelector((store) => store.studentconnect.doubtsdata);
  const [newDoubt, setNewDoubt] = useState('');
  const [doubts, setDoubts] = useState([]);
  const currentUser = 'currentUserId'; // Replace with logic to get the current user's ID

  useEffect(() => {
    if (!doubtsdata) {
      fetchDoubts();
    } else {
      setDoubts(doubtsdata);
    }
  }, [doubtsdata]);

  const fetchDoubts = async () => {
    try {
      const response = await fetch("http://localhost:3000/studentconnect/getdoubt");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.length > 0) {
        dispatch(addDoubt(data));
        console.log('Fetched Doubts:', data);
      }
    } catch (error) {
      console.error('Error fetching doubts:', error);
    }
  };

  const addNewDoubt = () => {
    if (newDoubt.trim()) {
      const newDoubtObj = { 
        doubt: newDoubt.trim(), 
        answers: [], 
        isExpanded: false, 
        username: data?.username // Add the username or user ID here
      };
      const updatedDoubts = [...doubts, newDoubtObj];
      dispatch(addDoubt(updatedDoubts));
      setDoubts(updatedDoubts);
      setNewDoubt('');
    }
  };

  const handleKeyDownDoubt = (e) => {
    if (e.key === 'Enter' && newDoubt.trim()) {
      e.preventDefault();
      addNewDoubt();
    }
  };

  const addAnswerToDoubt = (index, answer) => {
    if (answer.trim()) {
      const updatedDoubts = doubts.map((doubt, i) => {
        if (i === index) {
          return { 
            ...doubt, 
            answers: [...doubt.answers, { text: answer.trim(), username: data?.username  }] 
          };
        }
        return doubt;
      });
      dispatch(addDoubt(updatedDoubts));
      setDoubts(updatedDoubts);
    }
  };

  const toggleAnswers = (index) => {
    const updatedDoubts = doubts.map((doubt, i) =>
      i === index ? { ...doubt, isExpanded: !doubt.isExpanded } : doubt
    );
    setDoubts(updatedDoubts);
  };

  const deleteDoubt = (index) => {
    const updatedDoubts = doubts.filter((_, i) => i !== index);
    dispatch(addDoubt(updatedDoubts)); // Assuming `addDoubt` updates the store with new list
    setDoubts(updatedDoubts);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Ask Your Doubt</h2>
        <div className="flex space-x-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
            placeholder="Type your doubt..."
            value={newDoubt}
            onChange={(e) => setNewDoubt(e.target.value)}
            onKeyDown={handleKeyDownDoubt}
          />
          <button
            className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 shadow-lg transition duration-300"
            onClick={addNewDoubt}
            disabled={!newDoubt.trim()}
          >
            Submit Doubt
          </button>
        </div>
      </div>

      <div>
        {doubts.map((doubt, index) => (
          <DoubtCard
            key={index}
            doubt={doubt}
            doubtIndex={index}
            currentUser={currentUser}
            onAnswer={addAnswerToDoubt}
            toggleAnswers={toggleAnswers}
            onDelete={deleteDoubt}
          />
        ))}
      </div>
    </div>
  );
};

const DoubtCard = ({ doubt, doubtIndex, onAnswer, toggleAnswers, onDelete, currentUser }) => {
  const [newAnswer, setNewAnswer] = useState('');

  const handleKeyDownAnswer = (e) => {
    if (e.key === 'Enter' && newAnswer.trim()) {
      e.preventDefault();
      onAnswer(doubtIndex, newAnswer);
      setNewAnswer('');
    }
  };

  return (
    <div className="mb-6 p-6 border border-gray-300 rounded-lg bg-white shadow-lg transition duration-300">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-semibold text-gray-700">{doubt.doubt}</p>
        {doubt.username === currentUser && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            onClick={() => onDelete(doubtIndex)}
          >
            Delete
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-4">Asked by: {doubt.username}</p>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={() => toggleAnswers(doubtIndex)}
      >
        {doubt.isExpanded ? 'Hide Answers' : 'Show Answers'}
      </button>

      {doubt.isExpanded && (
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Type your answer..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            onKeyDown={handleKeyDownAnswer}
          />
          <button
            className="mt-3 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow-lg transition duration-300"
            onClick={() => {
              onAnswer(doubtIndex, newAnswer);
              setNewAnswer('');
            }}
            disabled={!newAnswer.trim()}
          >
            Submit Answer
          </button>

          <AnswerThread doubt={doubt} />
        </div>
      )}
    </div>
  );
};

const AnswerThread = ({ doubt }) => {
  return (
    <div className="mt-4">
      {doubt.answers.length > 0 ? (
        doubt.answers.map((answer, answerIndex) => (
          <div
            key={answerIndex}
            className="mb-2 p-4 border border-green-200 rounded-lg bg-green-50 shadow-sm"
          >
            <p className="text-gray-800"><strong>{answer.username}:</strong> {answer.text}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No answers yet. Be the first to answer!</p>
      )}
    </div>
  );
};

export default AskDoubt;
