import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import React from 'react';
import { MailCheck, Linkedin, Github, Instagram, MapPin } from 'lucide-react';

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const data = {
    email: 'arzuimammadova@gmail.com',
    linkedin:
      'https://www.linkedin.com/in/arzu-mammadova-892b25269?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    github: 'https://github.com/arzummammadova',
    instagram: ['codingwitharzui'],
    address: 'Azerbaijan',
  };

  return (
    <div className="w-full border-t border-gray-300 min-h-screen relative flex flex-col justify-center items-center overflow-hidden">
      <Image
        src="/images/blackline.png"
        alt="blackline"
        fill
        className="object-cover w-full h-full z-0 hidden lg:block"
      />
      <Image src="/images/spark.png" alt='spark' width={200} height={200} className='absolute top-0 left-0' />
      <Image src="/images/spark.png" alt='spark' width={200} height={200} className='absolute top-0 left-0' />
      <Image src="/images/spark.png" alt='spark' width={200} height={200} className='absolute top-5 left-5' />
      <Image src="/images/spark.png" alt='spark' width={200} height={200} className='absolute top-0 left-0' />
      <Image src="/images/spark2.png" alt='spark' width={400} height={400}className='absolute top-10 left-0' />
      <Image src="/images/spark2.png" alt='spark' width={400} height={400}className='absolute top-10 right-0' />
      
      <Image src="/images/spark2.png" alt='spark' width={400} height={400}className='absolute  right-0 bottom-0' />

      {/* Başlıq */}
      <h2 className="text-3xl sm:text-5xl md:text-7xl absolute top-8 sm:top-10 md:top-1/2 left-4 sm:left-6 md:left-[10%] w-[90%] md:w-[30%] tracking-[0.05em] text-black z-10 text-center md:text-left">
        Contact with Me
      </h2>

      {/* Əlaqə qutusu */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute top-28 sm:top-36 md:top-[28%] right-0 md:right-[10%] p-4 md:p-8 w-full sm:w-[90%] md:w-auto bg-white/90 md:bg-transparent rounded-none md:rounded-lg z-10 flex flex-col gap-4 md:gap-6"
      >
        {/* Email */}
        <div className="flex items-center bg-[#FFE2E2] gap-4 text-lg md:text-xl border border-3 rounded-lg p-3 md:p-4">
          <MailCheck size={24} />
          <a href={`mailto:${data.email}`} className="text-black hover:underline">
            {data.email}
          </a>
        </div>

        {/* LinkedIn */}
        <div className="flex items-center gap-4 text-lg md:text-xl bg-[#F5EEEA] border border-3 rounded-lg p-3 md:p-4">
          <Linkedin size={24} />
          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:underline"
          >
            LinkedIn Profile
          </a>
        </div>

        {/* GitHub */}
        <div className="flex items-center bg-[#E2F0FF] gap-4 text-lg md:text-xl border border-3 rounded-lg p-3 md:p-4">
          <Github size={24} />
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:underline"
          >
            GitHub Profile
          </a>
        </div>

        {/* Instagram */}
        <div className="flex flex-col gap-2 bg-[#FFFCE2] text-lg md:text-xl border border-3 rounded-lg p-3 md:p-4">
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
        <div className="flex items-center gap-4 bg-[#EBFFE2] text-lg md:text-xl border border-3 rounded-lg p-3 md:p-4">
          <MapPin size={24} />
          <span>{data.address}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
