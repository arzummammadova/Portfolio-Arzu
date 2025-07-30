'use client';
import { MoveUpRight } from 'lucide-react';
import React from 'react';
import Image from "next/image";
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  return (
    <>
      <div className="container px-4 mx-auto min-h-[90vh] justify-center flex flex-col relative z-10">
        <p className="text-xl font-medium text-gray-600">
          <Typewriter
            words={[
              "Hello! I am Arzu",
              "I am Arzu Mammadova, a final-year student at Azerbaijan Technical University.",
              "I specialize in front-end development with React, Redux, Tailwind CSS, and Material UI.",
              "I am currently learning Next.js, Zustand, and Zod.",
              "I also have backend experience with Node.js, Express.js, and MongoDB.",
              // "Recently, I started learning Oracle SQL.",
              "My goal is to become a full-stack developer and build impactful digital products."
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={20}
            deleteSpeed={10}
            delaySpeed={500}
          />
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl w-full md:w-[70%] lg:w-[50%] mt-5 leading-tight">
          Front-End <span className="text-[#6B6B6B]">dev</span>eloper
        </h1>

        <div className="mt-10 flex gap-2 flex-wrap">
          {['A', 'R', 'Z', 'U'].map((char, i) => (
            <span
              key={i}
              className="border w-9 h-9 text-xl lg:w-10 lg:h-10 sm:w-8 sm:h-8 sm:text-2xl rounded-full flex items-center justify-center"
            >
              {char}
            </span>
          ))}
        </div>

        <button className="flex justify-center gap-2 mt-9 bg-black text-white w-[170px] sm:w-[140px] md:w-[200px] lg:w-[270px] text-lg py-3 lg:py-3 rounded-[2rem] hover:bg-white hover:text-black transition-colors border">
          Let&#39;s talk <MoveUpRight size={24} />
        </button>
      </div>

      <Image
        src="/images/bubbleleft.png"
        alt="Bubble Left"
        width={200}
        height={200}
        className="bubble-left w-[120px] sm:w-[100px] lg:w-[220px] md:w-[220px]"

      />

      <Image
        src="/images/bubbleright.png"
        alt="Bubble Right"
        width={200}
        height={200}
        className="bubble-right w-[120px] sm:w-[100px] lg:w-[240px] md:w-[220px]"
      />

      <Image
        src="/images/rightglass.png"
        alt="Right Glass"
        width={800}
        height={700}
        className="glass-float"
      />

    </>
  );
};

export default Hero;
