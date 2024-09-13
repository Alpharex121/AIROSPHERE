import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { addDoubt } from "../../../store/studentConnectSlice";
import getDoubtsData from "../../../utils/getDoubts";
import { api } from "../../../utils/constant";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import styles for confirm box

const AskDoubt = () => {
  const data = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const doubtsdata = useSelector((store) => store?.studentconnect?.doubtsdata);
  const [newDoubt, setNewDoubt] = useState({ title: "", description: "" });
  const [expandedDoubt, setExpandedDoubt] = useState(null);
  const currentUser = data?.username;

  getDoubtsData();

  const handleSubmitDoubt = async (e) => {
    e.preventDefault();
    if (data?.role === "demo") return;
    const title = newDoubt.title;
    const description = newDoubt.description;
    if (newDoubt.title && newDoubt.description) {
      const data = await api.post(
        "http://localhost:3000/studentconnect/postdoubt",
        {
          title,
          description,
        }
      );
      dispatch(addDoubt(data?.data));
    }
  };

  const toggleAnswers = (doubtIndex) => {
    setExpandedDoubt(expandedDoubt === doubtIndex ? null : doubtIndex);
  };

  const handleDeleteDoubt = async (doubtid) => {
    const data = await api.delete(
      "http://localhost:3000/studentconnect/deletedoubt/" + doubtid
    );
    console.log(data);
    const updatedData = doubtsdata.filter((doubt) => {
      return doubt._id.toString() !== doubtid;
    });
    dispatch(addDoubt(updatedData));
  };

  // Confirm delete
  const confirmDelete = (doubtIndex) => {
    console.log(doubtIndex);
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this doubt?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeleteDoubt(doubtIndex),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Banner Section */}
      <div className="bg-indigo-600 text-white py-6 px-4 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold text-center">Ask Your Doubt</h1>
        <p className="text-center text-lg mt-2">
          Post your doubts and get them answered by the community!
        </p>
      </div>

      {/* Form Section */}
      <div className="mb-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200">
          <form onSubmit={handleSubmitDoubt}>
            <input
              type="text"
              className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              placeholder="Doubt Title"
              value={newDoubt.title}
              onChange={(e) =>
                setNewDoubt({ ...newDoubt, title: e.target.value })
              }
            />
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              placeholder="Describe your doubt..."
              value={newDoubt.description}
              onChange={(e) =>
                setNewDoubt({ ...newDoubt, description: e.target.value })
              }
            />
            <button
              type="submit"
              className={`bg-indigo-500 text-white ${
                data?.role === "demo" && "cursor-not-allowed"
              } px-6 py-3 rounded-lg hover:bg-indigo-600 shadow-lg transition duration-300 mt-3`}
              disabled={!newDoubt.title.trim() || !newDoubt.description.trim()}
            >
              Submit Doubt
            </button>
          </form>
        </div>
      </div>

      {/* Doubt Cards Section */}
      {doubtsdata && (
        <div>
          {doubtsdata.map((doubt, index) => (
            <DoubtCard
              doubtdata={doubtsdata}
              key={index}
              doubt={doubt}
              doubtIndex={index}
              currentUser={currentUser}
              toggleAnswers={toggleAnswers}
              isExpanded={expandedDoubt === doubt._id}
              confirmDelete={confirmDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DoubtCard = ({
  doubtdata,
  doubt,
  doubtIndex,
  onAnswer,
  toggleAnswers,
  currentUser,
  isExpanded,
  confirmDelete,
}) => {
  const data = useSelector((store) => store?.user);
  const [newAnswer, setNewAnswer] = useState("");
  const [openedDoubt, setOpenedDoubt] = useState(doubt);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (data?.role === "demo") return;
    if (newAnswer.trim()) {
      try {
        const response = await api.post(
          `http://localhost:3000/studentconnect/postcomment/${openedDoubt._id}`,
          {
            description: newAnswer,
          }
        );
        setOpenedDoubt(response?.data);
        setNewAnswer(""); // Clear the textarea after submitting
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    }
  };

  return (
    <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-white shadow-lg transition duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col text-xl font-semibold text-indigo-800">
          <h1>{doubt.title}</h1>
          <p className="text-sm text-gray-700">{doubt.description}</p>
        </div>

        {(doubt.postername === currentUser ||
          data?.role === "admin" ||
          data?.role === "modhead") && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            onClick={() => confirmDelete(doubt._id)}
          >
            Delete
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-4">Asked by: {doubt.postername}</p>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={() => toggleAnswers(doubt._id)}
      >
        {isExpanded ? "Hide Answers" : "Show Answers"}
      </button>

      {isExpanded && (
        <>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <form onSubmit={handleAnswerSubmit}>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Type your answer..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <button
                type="submit"
                className={`mt-3 bg-green-500 text-white px-4 py-2 ${
                  data?.role === "demo" && "cursor-not-allowed"
                } rounded-md hover:bg-green-600 shadow-lg transition duration-300`}
                disabled={!newAnswer.trim()}
              >
                Submit Answer
              </button>
            </form>

            <AnswerThread doubt={openedDoubt} />
          </div>
        </>
      )}
    </div>
  );
};

const AnswerThread = ({ doubt }) => {
  return (
    <div className="mt-4">
      {doubt.comments.length > 0 ? (
        doubt.comments.map((comment, commentIndex) => (
          <div
            key={commentIndex}
            className="mb-2 p-4 border border-green-200 rounded-lg bg-green-50 shadow-sm"
          >
            <p className="text-gray-800">
              <strong>{comment.postername}:</strong> {comment.description}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No answers yet. Be the first to answer!</p>
      )}
    </div>
  );
};

export default AskDoubt;
