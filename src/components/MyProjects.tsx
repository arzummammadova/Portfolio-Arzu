'use client'

import React, { useEffect, useState } from 'react'
import { Github, ExternalLink, Figma } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Title from './Title'
import { motion } from 'framer-motion'

type Project = {
  _id: string
  title: string
  description: string
  image?: string
  githubLink?: string
  liveLink?: string
  figmaLink?: string
  technologies?: string[]
  video?: string
}

const truncateWords = (text: string, maxWords: number) => {
  const words = text.trim().split(' ')
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(' ') + '...'
}

const MyProjects = () => {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('https://portfolio-arzu-api.onrender.com/api/projects')
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        setProjects(data)
      } catch (error) {
        console.error('Failed to fetch projects', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <section className="w-full px-4 md:px-10 lg:px-20 py-10">
      <Title text="My Projects" />

      {loading ? (
        <div className="text-center text-lg text-gray-600 mt-10 animate-pulse">Loading projects...</div>
      ) : (
        <div className="max-h-[85vh] overflow-y-auto snap-y snap-mandatory pr-2 custom-scroll">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              className="relative h-[80vh] sm:h-[65vh] w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden border shadow-md snap-start bg-white cursor-pointer mb-16"
              onClick={() => router.push(`/projects/${project._id}`)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/projects/${project._id}`)
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-black text-white hover:bg-gray-800 transition z-10"
                aria-label="Go to project details"
              >
                <ExternalLink size={20} />
              </button>

              <div
                className="w-full lg:w-1/2 h-2/5 sm:h-60 lg:h-full bg-cover bg-center"
                style={{ backgroundImage: project.image ? `url(${project.image})` : 'none' }}
              />

              <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4">{project.title}</h2>

                  <p className="text-gray-700 text-md lg:text-lg leading-relaxed mb-4">
                    <span className="block">
                      {truncateWords(project.description, 50)}
                    </span>
                  </p>

                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 my-4">
                      {project.technologies.slice(0, 5).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs lg:text-sm text-white px-3 py-1 rounded-full bg-gradient-to-r from-[#D6C7FF] to-[#B9A9FF] shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}

                      {project.technologies.length > 5 && (
                        <span className="text-xs text-gray-500 px-3 py-1">...</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-4 flex-wrap">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                    >
                      <Github size={18} /> GitHub
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm border border-black text-black px-4 py-2 rounded-xl hover:bg-black hover:text-white transition"
                    >
                      <ExternalLink size={18} /> Live
                    </a>
                  )}
                  {project.figmaLink && (
                    <a
                      href={project.figmaLink}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm border border-black text-black px-4 py-2 rounded-xl hover:bg-black hover:text-white transition"
                    >
                      <Figma size={18} /> Figma
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}

export default MyProjects