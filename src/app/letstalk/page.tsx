'use client'

import { Mail, Linkedin, Github, Instagram, MapPin, Send } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import Image from 'next/image'

const data = {
  email: 'arzuimammadova@gmail.com',
  linkedin: 'https://www.linkedin.com/in/arzu-mammadova-892b25269',
  github: 'https://github.com/arzummammadova',
  instagram: ['arzummmm'],
  address: 'Baku, Azerbaijan',
}

const LetsTalk = () => {
  const { ref, inView } = useInView({ triggerOnce: true })

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-10 lg:py-20 md:py-18 sm:py-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mx-auto px-12 w-full">
        {/* LEFT SIDE - CONTACT INFO */}
      <div className="grid grid-cols-1 md:h-70 sm:h-auto sm:grid-cols-2 gap-4 md:gap-6">
  {/* Email */}
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-red-50 p-4 border-2 rounded-xl md:rounded-2xl h-auto md:h-[100px] flex items-center"
  >
    <div className="flex items-center gap-3 w-full">
      <div className="p-2 rounded-full bg-[#FFE2E2]">
        <Mail className="text-[#FF6B6B]" size={20} />
      </div>
      <div className="flex-1 min-w-0 overflow-hidden">
        <h3 className="font-medium text-gray-500 text-sm">Email</h3>
        <a
          href={`mailto:${data.email}`}
          className="text-[#9D75FF] hover:underline text-sm md:text-base break-words block"
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          {data.email}
        </a>
      </div>
    </div>
  </motion.div>

  {/* LinkedIn */}
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-blue-50 p-4 border-2 rounded-xl md:rounded-2xl h-auto md:h-[100px] flex items-center"
  >
    <div className="flex items-center gap-3 w-full">
      <div className="p-2 rounded-full bg-[#E0F7FA]">
        <Linkedin className="text-[#0077B5]" size={20} />
      </div>
      <div className="flex-1 min-w-0 overflow-hidden">
        <h3 className="font-medium text-gray-500 text-sm">LinkedIn</h3>
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#9D75FF] hover:underline text-sm md:text-base break-words block"
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          Connect with me
        </a>
      </div>
    </div>
  </motion.div>

  {/* GitHub */}
  <motion.div
    whileHover={{ y: -5 }}
    className="p-4 border-2 bg-amber-50 rounded-xl md:rounded-2xl h-auto md:h-[100px] flex items-center"
  >
    <div className="flex items-center gap-3 w-full">
      <div className="p-2 rounded-full bg-[#F2F2F2]">
        <Github className="text-[#333333]" size={20} />
      </div>
      <div className="flex-1 min-w-0 overflow-hidden">
        <h3 className="font-medium text-gray-500 text-sm">GitHub</h3>
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#9D75FF] hover:underline text-sm md:text-base break-words block"
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          View my work
        </a>
      </div>
    </div>
  </motion.div>

  {/* Location */}
  <motion.div
    whileHover={{ y: -5 }}
    className="border-2 bg-green-50 p-4 rounded-xl md:rounded-2xl h-auto md:h-[100px] flex items-center"
  >
    <div className="flex items-center gap-3 w-full">
      <div className="p-2 rounded-full bg-[#D4EDDA]">
        <MapPin className="text-[#28A745]" size={20} />
      </div>
      <div className="flex-1 min-w-0 overflow-hidden">
        <h3 className="font-medium text-gray-500 text-sm">Location</h3>
        <span
          className="text-[#9D75FF] text-sm md:text-base break-words block"
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          {data.address}
        </span>
      </div>
    </div>
  </motion.div>
</div>


        {/* RIGHT SIDE - FORM */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-white border-2 p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Send me a message</h3>
          <p className="text-gray-600 mb-6 md:mb-8">I'll get back to you as soon as possible</p>

          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              alert('Submitted!')
            }}
          >
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full px-4 py-2 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#9D75FF] focus:border-transparent transition"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-2 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#9D75FF] focus:border-transparent transition"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                className="w-full px-4 py-2 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#9D75FF] focus:border-transparent transition"
                placeholder="What would you like to discuss?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full hover:bg flex items-center justify-center gap-2 bg-gradient-to-r from-[#000000] to-[#000000] text-white py-3 md:py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Send size={18} className="text-white" />
              <span>Send Message</span>
            </button>
          </form>
        </motion.div>
      </div>

      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#CBBEFF] opacity-20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#A18AFF] opacity-20 rounded-full blur-3xl -z-10"></div>
      <div className="">
        <Image src="/images/line2.png" alt='spark' width={600} height={200} className='absolute bottom-0 opacity-70 left-0 z-[-1] rotate-25' />
        <Image src="/images/line2.png" alt='spark' width={600} height={200} className='absolute top-5 opacity-70 right-0 z-[-1] rotate-0' />
      </div>

      <Image src="/images/spark.png" alt='spark' width={200} height={200} className='absolute top-0 left-0' />
      <Image src="/images/spark.png" alt='spark' width={200} height={200} className='absolute top-0 left-0 z-[-1]' />

      <Image src="/images/spark.png" alt='spark' width={200} height={200} className='absolute top-5 left-2 opacity-25 z-[-1]' />

      <Image src="/images/spark2.png" alt='spark' width={400} height={400} className='absolute top-20 opacity-60 left-0 z-[-1]' />

      <Image src="/images/spark2.png" alt='spark' width={400} height={400} className='absolute bottom-0 opacity-50 left-0 z-[-1]' />
      <Image src="/images/spark2.png" alt='spark' width={400} height={400} className='absolute top-0 opacity-20 right-0 z-[0]' />

      <Image src="/images/spark2.png" alt='spark' width={400} height={400} className='absolute right-0 bottom-0 z-[-1]' />
    </section>
  )
}

export default LetsTalk