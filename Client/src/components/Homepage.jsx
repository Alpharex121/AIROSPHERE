import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Robot from "./3drobot";
import AboutUs from "./AboutusHome";
import Deck from "./Deck";
import { Team } from "./Team";
// import Stickypage from "./Stickypage";

const Homepage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // It will animate every time it comes into view
    threshold: 0.2, // 20% of the element should be visible to trigger the animation
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  return (
    <div className="h-full">
      <Robot />
      <div className="h-[80vh] overflow-hidden">
      <div className="main bg-black min-h-screen">
        <div
          ref={ref}
          className="page1 min-h-screen w-full relative pt-[12vw] flex flex-col justify-center items-center text-center"
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
            className="text-4xl font-semibold text-white mt-2"
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
      <AboutUs />
      <div className="bg-black  flex flex-col md:flex-row w-full">
  <div className="flex flex-col md:flex-row justify-center items-center py-12 bg-indigo-900  shadow-lg overflow-hidden">
    
    {/* Deck Section with Gradient Background */}
    <div className="h-[60vh] m-6 overflow-hidden w-full md:w-[60vw] lg:w-[50vw] bg-gradient-to-r from-indigo-800 to-indigo-900 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <Deck />
    </div>

    {/* Text Section */}
    <div className="text-white m-4 flex items-center justify-center p-8 w-full md:w-[60vw] lg:w-[50vw] bg-indigo-800 rounded-lg shadow-lg mt-8 md:mt-0 md:ml-8 transition-all duration-500 hover:bg-indigo-700">
      <p className="text-center text-lg md:text-xl leading-relaxed">
        Peeking into the future of the Robotics branch is like reading from a deck of tarot cards—you’ll find a mix of intriguing possibilities and exciting transformations. Imagine a world where robots are as common as smartphones, helping us with everything from mundane tasks to groundbreaking discoveries. With advancements in AI and robotics, the future is all about innovation, precision, and making our lives a whole lot easier. Our branch is ready to lead this revolution, developing technologies that will change how we live and work. So, just like the tarot cards might reveal a bright future, the Robotics branch is set to unveil a future full of amazing advancements and opportunities.
      </p>
    </div>

  </div>
</div>

            <Team/>
      {/* <Stickypage /> */}
    </div>
  );
};
export default Homepage;
