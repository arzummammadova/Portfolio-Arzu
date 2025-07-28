'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

type Project = {
  title: string
  description: string
  image: string
  githubLink: string
  liveLink?: string
  figmaLink?: string
  technologies: string[]
}

const ProjectDetail = () => {
  const router = useRouter()
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/projects/${id}`)
        const data = await res.json()
        setProject(data)
      } catch (error) {
        console.error('Failed to fetch project', error)
      }
    }

    if (id) fetchProject()
  }, [id])

  if (!project) {
    return <p className='text-center mt-10'>Loading project details...</p>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <img src={project.image} alt={project.title} className="max-w-md mb-4 rounded-xl shadow-lg" />
      <p className="text-lg text-gray-600 mb-4">{project.description}</p>
      <p className="text-md mb-2"><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
      {project.githubLink && <a href={project.githubLink} target='_blank' className='text-blue-600 underline'>GitHub</a>}
      <br />
      {project.liveLink && <a href={project.liveLink} target='_blank' className='text-green-600 underline'>Live Demo</a>}
      <br />
      <button
        onClick={() => router.back()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Geri
      </button>
    </div>
  )
}

export default ProjectDetail
