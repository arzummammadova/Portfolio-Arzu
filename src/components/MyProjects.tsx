'use client'

import React, { useEffect, useState } from 'react'
import Title from './Title'
import { MoveUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Project = {
  _id: string
  title: string
  image: string
}

const MyProjects = () => {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/projects')
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

  const handleClick = (id: string) => {
    router.push(`/projects/${id}`)
  }

  return (
    <div>
      <Title text='My Projects' />
      <div className="cards container mx-auto py-4 mt-6 flex flex-wrap gap-8 justify-center">
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              onClick={() => handleClick(project._id)}
              className="card w-full sm:w-[300px] h-[600px] bg-gray-200 rounded-4xl relative cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="arrow absolute top-3 right-3 pointer">
                <MoveUpRight size={45} className='bg-gray-400 px-3 py-3 rounded-full text-white' />
              </div>
              <div className="bg-gray-900 w-full py-5 opacity-90 text-center text-white text-lg font-semibold rounded-b-4xl absolute bottom-0">
                <p>{project.title}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyProjects
