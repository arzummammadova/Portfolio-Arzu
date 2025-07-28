'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, easeOut } from 'framer-motion' // <<-- IMPORT 'easeOut' here
import {
  Github,
  ExternalLink,
  Figma,
  Video,
  ArrowLeft
} from 'lucide-react'

type Project = {
  title: string
  description: string
  image: string
  githubLink?: string // Changed to optional as per previous suggestion
  liveLink?: string
  figmaLink?: string
  technologies?: string[] // Changed to optional as per previous suggestion
  video?: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: easeOut }, // <<-- USE imported easeOut
  }),
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger children animations
    },
  },
};

const ProjectDetail = () => {
  const router = useRouter()
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return
      try {
        const res = await fetch(`https://portfolio-arzu-api.onrender.com/api/projects/${id}`)
        if (!res.ok) throw new Error('Fetch failed')
        const data = await res.json()
        setProject(data)
      } catch (err) {
        console.error("Failed to fetch project:", err); // Log the actual error for debugging
        setError('An error occurred while loading project details.')
      }
    }
    fetchProject()
  }, [id])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md">
          <p className="text-red-600 text-xl font-semibold mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="mr-2" size={20} /> Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md">
          <p className="text-gray-800 text-xl font-semibold">Loading project details...</p>
          <div className="mt-4 animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 sm:p-10 flex items-center justify-center bg-transparent">
      <motion.div
        className="rounded-3xl p-6 md:p-10 max-w-6xl w-full flex flex-col lg:flex-row gap-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants} // Apply container variants
      >
        {/* Left: Image / Video */}
        <motion.div className="lg:w-1/2 space-y-6" variants={fadeUp} custom={0}>
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            unoptimized // Use unoptimized for external images or if you don't need Next.js image optimization
            className="rounded-xl shadow-lg w-full object-cover"
          />
          {project.video && (
            <div className="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={project.video.replace('view?usp=sharing', 'preview')}
                title={project.title}
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </motion.div>

        {/* Right: Details */}
        <motion.div className="flex-1 lg:w-1/2 space-y-6 text-center lg:text-left" variants={fadeUp} custom={1}>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">{project.title}</h1>
          <p className="text-lg text-gray-700">{project.description}</p>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Technologies Used:</h2>
            {project.technologies && project.technologies.length > 0 ? ( // Added check for empty array
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {project.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    custom={i + 2} // Continue custom values for staggered animation
                    variants={fadeUp}
                    className="px-4 py-2 rounded-full text-white font-medium shadow-md
                      bg-gradient-to-r from-[#D6C7FF] via-[#B9A9FF] to-[#A595FF]
                      hover:brightness-110 transition duration-300 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            ) : (
                // Optional: Render a message if no technologies are available
                <p className="text-gray-500 text-sm">No technologies listed.</p>
            )}
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            {/* GitHub black bg, white text */}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300 shadow-md"
              >
                <Github className="mr-2" size={20} /> GitHub
              </a>
            )}

            {/* Other buttons: white bg, black text & border, invert on hover */}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-5 py-2 border border-black bg-white text-black rounded-lg hover:bg-black hover:text-white transition duration-300 shadow-md"
              >
                <ExternalLink className="mr-2" size={20} /> Live Demo
              </a>
            )}
            {project.figmaLink && (
              <a
                href={project.figmaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-5 py-2 border border-black bg-white text-black rounded-lg hover:bg-black hover:text-white transition duration-300 shadow-md"
              >
                <Figma className="mr-2" size={20} /> Figma Design
              </a>
            )}
            {project.video && (
              <a
                href={project.video}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-5 py-2 border border-black bg-white text-black rounded-lg hover:bg-black hover:text-white transition duration-300 shadow-md"
              >
                <Video className="mr-2" size={20} /> Watch Video
              </a>
            )}
          </div>

          <div className="pt-6">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-300 flex items-center mx-auto lg:mx-0"
            >
              <ArrowLeft className="mr-2" size={20} /> Go Back
            </button>
          </div>
        </motion.div>
      </motion.div>


    </div>
  )
}

export default ProjectDetail