import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const AboutMe = () => {
  return (
    <div className="container mx-auto py-8 px-4 border-t border-gray-100">
      <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">Who am I?</h2>
      <p className="text-3xl leading-relaxed text-gray-700 font-medium">
        <Typewriter
          words={[
            "I am Arzu Mammadova, a final-year student at Azerbaijan Technical University.",
            "I specialize in front-end development with React, Redux, Tailwind CSS, and Material UI.",
            "I'm currently learning Next.js, Zustand, and Zod.",
            "I also have backend experience with Node.js, Express.js, and MongoDB.",
            "Recently, I started learning Oracle SQL.",
            "My goal is to become a full-stack developer and build impactful digital products."
          ]}
          loop={false}
          cursor
          cursorStyle="|"
          typeSpeed={40}
          deleteSpeed={20}
          delaySpeed={1000}
        />
      </p>
    </div>
  );
};

export default AboutMe;
