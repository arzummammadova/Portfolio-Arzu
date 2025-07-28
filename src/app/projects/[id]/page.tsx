'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { FaGithub, FaExternalLinkAlt, FaFigma, FaVideo, FaArrowLeft } from 'react-icons/fa'

type Project = {
  title: string
  description: string
  image: string
  githubLink: string
  liveLink?: string
  figmaLink?: string
  technologies: string[]
  video?: string
}

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
        setError('Proyekt detalları yüklənərkən xəta baş verdi.')
      }
    }
    fetchProject()
  }, [id])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-white">
        <div className="bg-gray-50 p-8 rounded-lg shadow-xl text-center">
          <p className="text-red-600 text-xl font-semibold mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mx-auto"
          >
            <FaArrowLeft className="mr-2" /> Geri Qayıt
          </button>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-white">
        <div className="bg-gray-50 p-8 rounded-lg shadow-xl text-center">
          <p className='text-gray-700 text-xl font-semibold'>Proyekt detalları yüklənir...</p>
          <div className="mt-4 animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-6 sm:p-10 flex items-center justify-center">
      <div className="bg-gray-50 rounded-2xl shadow-2xl p-6 md:p-10 max-w-5xl w-full flex flex-col lg:flex-row gap-8">
        {/* Sol tərəf: Şəkil və Video */}
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col gap-6 items-center justify-center">
          {project.image && (
            <div className="w-full flex justify-center">
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                unoptimized
                className="rounded-xl shadow-lg object-cover w-full h-auto max-w-full transition-transform duration-300"
              />
            </div>
          )}
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
        </div>

        {/* Sağ tərəf: Mətn detalları */}
        <div className="flex-1 lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">İstifadə Olunan Texnologiyalar:</h2>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm hover:bg-blue-200 hover:scale-105 transition-all duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-auto">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300 shadow-md transform hover:scale-105'
              >
                <FaGithub className="mr-2 text-xl" /> GitHub
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-md transform hover:scale-105'
              >
                <FaExternalLinkAlt className="mr-2 text-xl" /> Canlı Demo
              </a>
            )}
            {project.figmaLink && (
              <a
                href={project.figmaLink}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 shadow-md transform hover:scale-105'
              >
                <FaFigma className="mr-2 text-xl" /> Figma Dizayn
              </a>
            )}
            {project.video && (
              <a
                href={project.video}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow-md transform hover:scale-105'
              >
                <FaVideo className="mr-2 text-xl" /> Video Bax
              </a>
            )}
          </div>

          <button
            onClick={() => router.back()}
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mx-auto lg:mx-0 w-fit"
          >
            <FaArrowLeft className="mr-2" /> Geri Qayıt
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail