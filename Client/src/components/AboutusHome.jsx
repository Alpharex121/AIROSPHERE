import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-indigo-900 via-indigo-700 to-indigo-900 py-16 overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-800 blur-2xl opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
      ></motion.div>

      <div className="relative z-10 text-center px-6">
        {/* Section Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-white mb-10 tracking-wide"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          Discover Our BTech Branch
        </motion.h1>

        {/* Branch Overview */}
        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-16 mx-auto max-w-3xl leading-relaxed"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
        >
          Our BTech branch in Artificial Intelligence and Robotics stands at the forefront of technological advancement. We are committed to innovative research and real-world applications, driving the future of AI and robotics.
        </motion.p>

        {/* Key Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16">
          {[
            { title: 'Innovation Focus', description: 'Pioneering research and practical AI & robotics solutions.' },
            { title: 'Hands-on Projects', description: 'Engaging in real-world projects and internships.' },
            { title: 'Strong Community', description: 'Collaborative network of peers, mentors, and industry experts.' }
          ].map((highlight, index) => (
            <motion.div
              key={index}
              className="relative text-center p-8 bg-indigo-600 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl transform hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                delay: 0.3 + index * 0.2
              }}
            >
              <motion.h2
                className="text-2xl font-semibold text-white mb-4"
                transition={{ type: 'spring', stiffness: 150, damping: 10 }}
              >
                {highlight.title}
              </motion.h2>
              <motion.p
                className="text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
              >
                {highlight.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
