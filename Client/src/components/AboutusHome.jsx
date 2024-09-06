import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      ></motion.div>

      <div className="relative z-10 text-center px-4">
        {/* Section Title */}
        <motion.h1
          className="text-5xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Discover Our BTech Branch
        </motion.h1>

        {/* Branch Overview */}
        <motion.p
          className="text-xl text-gray-300 mb-12 mx-auto max-w-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Our BTech branch in Artificial Intelligence and Robotics stands at the forefront of technology. We are dedicated to pioneering research and practical applications, shaping the future of AI and robotics with cutting-edge solutions.
        </motion.p>

        {/* Key Highlights */}
        <div className="flex flex-col items-center gap-8 px-4">
          {['Innovation Focus', 'Hands-on Projects', 'Strong Community'].map((highlight, index) => (
            <motion.div
              key={index}
              className="relative text-center p-6 bg-gray-800 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
            >
              <motion.h2
                className="text-2xl font-semibold text-white mb-2"
                whileHover={{ scale: 1.1, color: '#F5DEB3' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {highlight}
              </motion.h2>
              <motion.p
                className="text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {index === 0 && 'Emphasis on groundbreaking research and practical solutions in AI and robotics.'}
                {index === 1 && 'Real-world projects and internships to apply theoretical knowledge in practical scenarios.'}
                {index === 2 && 'A supportive network of peers, faculty, and industry professionals fostering growth and collaboration.'}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
