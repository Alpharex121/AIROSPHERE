import React, { useState } from "react";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

const Robot = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="h-[90vh] w-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-40">
          <motion.div
            className="loader border-t-4 border-b-4 border-black rounded-full w-16 h-16"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
          ></motion.div>
        </div>
      )}

      <Spline
        scene="https://prod.spline.design/nqM8c2080JyOKqWW/scene.splinecode"
        onLoad={handleLoad}
      />
    </div>
  );
};

export default Robot;
