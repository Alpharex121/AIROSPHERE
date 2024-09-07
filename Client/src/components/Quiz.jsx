import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Utility function to decode HTML entities
const decodeHtml = (html) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = html;
  return textArea.value;
};

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [options, setOptions] = useState([]);

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple"
        );
        const data = await response.json();
        setQuizData(data.results);
      } catch (error) {
        console.error("Failed to fetch quiz data", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    // Ensure that quizData and the current question exist
    if (quizData && quizData.length > 0) {
      const currentQuestion = quizData[currentQuestionIndex];
      // Combine correct answer and incorrect answers, then shuffle them
      const allOptions = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];
      setOptions(shuffleArray(allOptions));
    }
  }, [quizData, currentQuestionIndex]);

  // Function to shuffle the options randomly
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (selectedOption) => {
    if (!quizData[currentQuestionIndex]) return; // Ensure data is loaded

    const isCorrect =
      selectedOption === quizData[currentQuestionIndex].correct_answer;
    if (isCorrect) {
      setScore(score + 1);
      setFeedback("Correct! 🎉");
    } else {
      setFeedback(
        `Incorrect! ❌ Correct answer: ${decodeHtml(
          quizData[currentQuestionIndex].correct_answer
        )}`
      );
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setFeedback("");
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Check if quizData is available and the current question exists
  if (quizData && quizData.length === 0) {
    return <div>Loading quiz...</div>;
  }

  let question;
  if (quizData) {
    question = quizData[currentQuestionIndex].question;
  }

  return (
    <section className="pt-12 bg-white h-[90vh]  text-center">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Mini Quiz</h2>
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-4">
            {decodeHtml(question)}
          </h3>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full p-3 mb-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              {decodeHtml(option)}
            </button>
          ))}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <p className="text-xl font-semibold mb-2">{feedback}</p>
              {currentQuestionIndex < quizData.length - 1 && (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                >
                  Next Question
                </button>
              )}
              {currentQuestionIndex === quizData.length - 1 && (
                <p className="text-xl font-semibold mt-4">
                  Your score: {score} / {quizData.length}
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Quiz;
