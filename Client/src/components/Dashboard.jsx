import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useSprings, animated } from "@react-spring/web";
import { useState } from "react";

import Roboarm from "./Robot_arm";
import Quiz from "./Quiz";

const offers = [
  {
    title: "Academic Resources",
    description:
      "Get access to lecture notes, tutorials, and workshops to ace your AI & Robotics courses.",
    icon: "📘",
  },
  {
    title: "Student Connect",
    description:
      "Join study groups, discussions, and find peer mentorship to collaborate and grow together.",
    icon: "🤝",
  },
  {
    title: "Clubs",
    description:
      "Join the AI & Robotics club, participate in competitions, and work on real projects.",
    icon: "🤖",
  },
  {
    title: "Skill Resources",
    description:
      "Boost your coding, AI, and robotics skills with bootcamps, certifications, and workshops.",
    icon: "🎓",
  },
  {
    title: "Branch Updates",
    description:
      "Stay informed about the latest events, achievements, and initiatives in your branch.",
    icon: "📰",
  },
];
const questions = [
  {
    question: "What does AI stand for?",
    options: [
      "Artificial Intelligence",
      "Automated Integration",
      "Advanced Interaction",
      "Applied Informatics",
    ],
    answer: "Artificial Intelligence",
  },
  {
    question: "Which language is commonly used for AI development?",
    options: ["JavaScript", "Python", "C++", "Java"],
    answer: "Python",
  },
  {
    question: "What is a neural network?",
    options: [
      "A type of database",
      "A computer network",
      "A machine learning algorithm",
      "A programming language",
    ],
    answer: "A machine learning algorithm",
  },
  // Add more questions as needed
];

const Dashboard = () => {
  const data = useSelector((store) => store?.user);
  const controls = useAnimation();

  const [ref, inView] = useInView({
    triggerOnce: false, // It will animate every time it comes into view
    threshold: 0.2, // 20% of the element should be visible to trigger the animation
  });
  const springs = useSprings(
    offers.length,
    offers.map((_, index) => ({
      from: { opacity: 0, transform: "scale(0.8) translateY(20px)" },
      to: { opacity: 1, transform: "scale(1) translateY(0)" },
      delay: index * 200, // Staggering by 200ms for each card
      config: { tension: 120, friction: 14 }, // Smoother, bouncy effect
    }))
  );

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === questions[currentQuestionIndex].answer;
    if (isCorrect) {
      setScore(score + 1);
      setFeedback("Correct! 🎉");
    } else {
      setFeedback("Incorrect! ❌");
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setFeedback("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const { question, options } = questions[currentQuestionIndex];

  return (
    <div>
      <Roboarm/>
      <div className=" h-[80vh] overflow-hidden  ">
        <div className="main bg-white min-h-screen">
          <div
            ref={ref}
            className="page1 min-h-screen w-full relative pt-[12vw] flex flex-col justify-center items-center text-center"
          >
            <motion.h1
              className="text-5xl font-bold "
              initial="hidden"
              animate={controls}
              variants={{
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 1.5, ease: "easeInOut" },
                },
                hidden: { x: -100, opacity: 0 },
              }}
            >
              Welcome to Your AI & Robotics Hub, {data?.username}
            </motion.h1>
            <motion.h2
              className="text-4xl font-semibold  mt-2"
              initial="hidden"
              animate={controls}
              variants={{
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 },
                },
                hidden: { x: 100, opacity: 0 },
              }}
            >
              Ready to explore, learn, and innovate? Your journey in Artificial
              Intelligence and Robotics starts here.
            </motion.h2>
            <motion.video
              className="w-full mt-4"
              autoPlay
              muted
              loop
              src="https://duo-studio.co/assets/home/Duo%20Reel--Desktop-reduced.mp4"
              initial="hidden"
              animate={controls}
              variants={{
                visible: {
                  width: "90%",
                  transition: { duration: 1.5, ease: "easeInOut", delay: 0.6 },
                },
                hidden: { width: "100%" },
              }}
            ></motion.video>
          </div>
        </div>
      </div>
      <section className="text-center py-12 bg-gray-100">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">What We Offer</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {springs.map((springProps, index) => (
            <animated.div
              key={index}
              style={springProps}
              className="bg-white shadow-md rounded-lg p-6 w-64 transform transition-transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{offers[index].icon}</div>
              <h3 className="text-xl font-semibold text-blue-500 mb-2">
                {offers[index].title}
              </h3>
              <p className="text-gray-600 text-sm">
                {offers[index].description}
              </p>
            </animated.div>
          ))}
        </div>
      </section>
      <Quiz />
    </div>
  );
};

export default Dashboard;
