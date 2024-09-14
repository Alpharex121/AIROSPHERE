import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Robot from "./3drobot";
import AboutUs from "./AboutusHome";
import Deck from "./Deck";
import { Team } from "./Team";
import { api } from "../utils/constant";
import airospherelogo from "../assets/Airosphere_transparent_cropped.png";

// Content for the cards
const cardContent = [
  {
    title: "About Airosphere",
    description:
      "This card represents the foundation of our community—a space where students passionate about Artificial Intelligence and Robotics come together. Airosphere offers invaluable academic resources like notes, previous year’s question papers (PYQs), and project guidance. More than just content, Airosphere encourages collaboration through the Student Connect feature, enabling students to find teammates for hackathons, ask doubts, and share ideas. This card symbolizes the power of a united community, pushing the boundaries of technological innovation.",
  },
  {
    title: "Robotics Revolution",
    description:
      "This card symbolizes the future of Robotics—the mechanical marvels that will transform our world. From automating industries to exploring new terrains, robots are now designed to think and act autonomously. The Robotics tarot represents the synthesis of hardware and software, working together to push humanity into the future. At Airosphere, students are provided with comprehensive roadmaps, resources, and mentorship, ensuring they gain the practical skills needed to thrive in this ever-evolving field.",
  },
  {
    title: " Machine Learning Mastery",
    description:
      "Machine Learning is the heart of AI’s rapid development, and this tarot card signifies the mastery of data and algorithms. Machine learning unlocks predictive power by learning patterns and trends hidden in vast datasets. Whether it's crafting recommendation systems, improving healthcare predictions, or optimizing robotics performance, this card embodies the drive for precision, efficiency, and intelligence. At Airosphere, students dive deep into machine learning, mastering tools that are changing the landscape of technology forever.",
  },
  {
    title: "Artificial Intelligence Ascension",
    description:
      "The Artificial Intelligence tarot card marks the dawn of a transformative era, where machines start to think, learn, and evolve. AI is revolutionizing industries, reshaping the future of decision-making, problem-solving, and interaction. From intelligent assistants to predictive analytics, this card highlights AI’s incredible potential to not just augment, but enhance human capability across every domain of life. The rise of AI within Airosphere is a testament to the brilliance of those willing to explore the unknown.",
  },
];

const Homepage = () => {
  const [activeCard, setActiveCard] = useState(0); // Track the active card
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await api.put(
          "https://airosphere-ggits.vercel.app/counter/increment"
        );
      } catch (error) {
        console.error("Error increasing counter:", error);
      }
    };
    fetchCounter();
  }, []);

  return (
    <div className="h-full">
      <Robot />
      <div className="h-[80vh] overflow-hidden">
        <div className="main bg-black min-h-screen">
          <div
            ref={ref}
            className="page1 min-h-screen w-full relative  flex flex-col justify-center items-center text-center"
          >
            <motion.h1
              className="text-5xl font-bold text-white"
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
              Empowering Tomorrow with AI and Robotics
            </motion.h1>

            <motion.h2
              className="text-4xl font-semibold text-white mt-2 mb-6"
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
              Where Innovation Meets Reality.
            </motion.h2>

            <motion.img
              src={airospherelogo}
              alt="Airosphere Logo"
              className="w-[23%]"
              initial="hidden"
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 },
                },
                hidden: { opacity: 0, scale: 0.8 },
              }}
            />
          </div>
        </div>
      </div>

      <AboutUs />

      <div className="bg-black flex flex-col md:flex-row w-full">
        <div className="flex flex-col md:flex-row justify-center items-center py-12 bg-gradient-to-r from-gray-900 via-[#1d2247] to-gray-800 shadow-lg overflow-hidden">
          {/* Deck Section */}
          <div className="h-[60vh] m-6 overflow-hidden w-full md:w-[60vw] bg-[#2e315e] lg:w-[50vw] rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <Deck setActiveCard={setActiveCard} />
          </div>

          {/* Dynamic Content Section */}
          <div className="text-white m-4 flex items-center justify-center p-8 w-full md:w-[60vw] lg:w-[50vw] bg-[#2e315e] rounded-lg shadow-lg mt-8 md:mt-0 md:ml-8 transition-all duration-500">
            <p className="text-center text-lg md:text-xl leading-relaxed">
              <strong>{cardContent[activeCard].title}</strong>
              <br />
              {cardContent[activeCard].description}
            </p>
          </div>
        </div>
      </div>

      <Team />
    </div>
  );
};

export default Homepage;
