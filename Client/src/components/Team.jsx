"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Importing icons
import alpha from "../assets/IMG20240522152121.jpg";
import anmol from "../assets/7f1ff7d8-011d-4634-883c-871263f0c65e.jpg";

export function Team() {
  return (
    <div className="bg-slate-900 py-16">
      <div className="text-center m-8 ">
        <h2 className="text-3xl font-bold text-white">Meet the Creators</h2>
        <p className="text-lg text-wrap text-gray-400 mt-2">
          We created this website for the AIR (Artificial Intelligence and
          Robotics) community, <br /> aiming to provide a hub for innovation and
          collaboration. <br />
          Discover the minds behind this project who are dedicated to advancing
          technology and fostering a vibrant tech community.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
        {/* First Card */}
        <CardContainer className="inter-var">
          <CardBody className=" relative group/card  hover:shadow-2xl  hover:shadow-emerald-500/[0.1]  bg-black   border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
            <CardItem translateZ="100" className="w-full h-[60vh] mt-4">
              <img
                src={anmol}
                height="1000"
                width="1000"
                className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="Anmol's image"
              />
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-xl font-bold  text-white mt-4"
            >
              Anmol Awasthi
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-lg  text-white mt-4"
            >
              Full Stack Developer
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className=" text-sm max-w-sm mt-2  text-neutral-300"
            >
              Building coding culture for the next generation.
            </CardItem>
            <div className="flex justify-between items-center mt-6">
              <CardItem translateZ={20} className="text-2xl text-white">
                <a
                  href="https://github.com/Anmolawasthi117"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="hover:text-emerald-500 transition-colors duration-300" />
                </a>
              </CardItem>
              <CardItem translateZ={20} className="text-2xl text-white">
                <a
                  href="https://linkedin.com/in/anmol-awasthi11117"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="hover:text-emerald-500 transition-colors duration-300" />
                </a>
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>

        {/* Second Card */}
        <CardContainer className="inter-var">
          <CardBody className=" relative group/card  hover:shadow-2xl  hover:shadow-emerald-500/[0.1]  bg-black  border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
            <CardItem translateZ="100" className="w-full h-[60vh] mt-4">
              <img
                src={alpha}
                height="1000"
                width="1000"
                className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="Alpha's image"
              />
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-xl font-bold   text-white mt-4"
            >
              Arpit Koshta
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-lg   text-white mt-4"
            >
              Full Stack Developer
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className=" text-sm max-w-sm mt-2  text-neutral-300"
            >
              Crafting innovative solutions, one line of code at a time.
            </CardItem>
            <div className="flex justify-between items-center mt-6">
              <CardItem translateZ={20} className="text-2xl text-white">
                <a
                  href="https://github.com/Alpharex121"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="hover:text-emerald-500 transition-colors duration-300" />
                </a>
              </CardItem>
              <CardItem translateZ={20} className="text-2xl text-white">
                <a
                  href="https://www.linkedin.com/in/arpit-koshta/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="hover:text-emerald-500 transition-colors duration-300" />
                </a>
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
}
