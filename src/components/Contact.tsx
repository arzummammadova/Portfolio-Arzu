import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import React from 'react';
import { MailCheck, Linkedin, Github, Instagram, MapPin } from 'lucide-react';

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const data = {
    email: 'arzuimammadova@gmail.com',
    linkedin: 'https://www.linkedin.com/in/arzu-mammadova-892b25269?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    github: 'https://github.com/arzummammadova',
    instagram: ['codingwitharzuui', 'justarzuui'],
    address: 'Azerbaijan'
  };

  return (
    <div className="w-full h-[900px] relative flex flex-col justify-center items-center overflow-hidden">
      <Image
        src="/images/blackline.png"
        alt="blackline"
        fill
        className="object-cover w-full h-full z-0"
      />

      <h2 className="text-8xl absolute top-2/4 left-1/10 w-[30%] tracking-[0.2em] text-black z-10">
        Contact with Me
      </h2>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute top-2/7 right-1/10 p-8 rounded-lg bg-transparent z-10 flex flex-col gap-6"
      >
        {/* Email */}
        <div className="flex items-center bg-[#FFE2E2] gap-4 text-xl border border-3 rounded-lg p-4">
          <MailCheck size={24} />
          <a href={`mailto:${data.email}`} className="text-black hover:underline">{data.email}</a>
        </div>

        {/* LinkedIn */}
        <div className="flex items-center gap-4 text-xl bg-[#F5EEEA] border border-3 rounded-lg p-4">
          <Linkedin size={24} />
          <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">LinkedIn Profile</a>
        </div>

        {/* GitHub */}
        <div className="flex items-center bg-[#E2F0FF] gap-4 text-xl border border-3 rounded-lg p-4">
          <Github size={24} />
          <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">GitHub Profile</a>
        </div>

        {/* Instagram */}
        <div className="flex flex-col gap-2 bg-[#FFFCE2] text-xl border border-3 rounded-lg p-4">
          <div className="flex items-center gap-4">
            <Instagram size={24} />
            <span>Instagram:</span>
          </div>
          <ul className="list-disc list-inside ml-8">
            {data.instagram.map((handle, index) => (
              <li key={index}>
                <a
                  href={`https://www.instagram.com/${handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:underline"
                >
                  @{handle}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Address */}
        <div className="flex items-center gap-4 bg-[#EBFFE2] text-xl border border-3 rounded-lg p-4">
          <MapPin size={24} />
          <span>{data.address}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
