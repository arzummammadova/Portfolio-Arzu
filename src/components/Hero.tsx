import { MoveUpRight } from 'lucide-react'
import React from 'react'
import Image from "next/image"
import { Typewriter } from 'react-simple-typewriter'

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
              "I&#39;m currently learning Next.js, Zustand, and Zod.",
              "I also have backend experience with Node.js, Express.js, and MongoDB.",
              "Recently, I started learning Oracle SQL.",
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

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl w-full md:w-[70%] lg:w-[50%] mt-5 leading-tight">
          Front-End <span className="text-[#6B6B6B]">dev</span>eloper
        </h1>

        <div className="mt-10 flex gap-1">
          <span className="border px-3 py-1 text-2xl rounded-full">A</span>
          <span className="border px-3 py-1 text-2xl rounded-full">R</span>
          <span className="border px-3 py-1 text-2xl rounded-full">Z</span>
          <span className="border px-3 py-1 text-2xl rounded-full">U</span>
        </div>

        <button className="flex justify-center gap-1 mt-9 bg-black text-white w-[300px] text-xl py-5 rounded-4xl hover:bg-white hover:text-black transition-colors border">
          Let's talk <MoveUpRight />
        </button>
      </div>

      <Image
        src="/images/bubbleleft.png"
        alt="Bubble Left"
        width={200}
        height={200}
        className="bottom-0 absolute left-0 z-0"
      />
      <Image 
        src="/images/bubbleright.png"
        alt="Bubble Right"
        width={200}
        height={200}
        className="top-40 absolute right-0 z-0"
      />
      <Image
        src="/images/rightglass.png"
        alt="Right Glass"
        width={800}
        height={700}
        className="top-20 absolute right-20 z-0"
      />
    </>
  )
}

export default Hero
