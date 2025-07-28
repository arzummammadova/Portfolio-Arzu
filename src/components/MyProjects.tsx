'use client'

import React from 'react'
import Title from './Title'
import { MoveUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Project = {
  id: string
  title: string
  image: string
}

const MyProjects = () => {
  const router = useRouter()

  const data: Project[] = [
    {
      id: 'readly',
      title: 'Readly - React & Node.js',
      image: '/images/readly.png',
    //   githublink:'https://github.com/arzummammadova/Readly-Front-back.git',
    //   figmalink:'https://www.figma.com/design/LmPlPyQ2uZxdvoh5Qn4ctr/Arzu-READLY--Community-?node-id=260-2&t=Gc3WE0ptUc0lfmRq-1',
    //   filelink:'https://www.figma.com/design/LmPlPyQ2uZxdvoh5Qn4ctr/Arzu-READLY--Community-?node-id=260-2&t=Gc3WE0ptUc0lfmRq-1',
    },
    {
      id: 'portfolio',
      title: 'Portfolio - Next.js & Tailwind',
      image: '/images/portfolio.png'
    },
    {
      id: 'book-review',
      title: 'Book Review - MERN Stack',
      image: '/images/bookapp.png'
    }
  ]

  const handleClick = (id: string) => {
    router.push(`/projects/${id}`)
  }

  return (
    <div>
      <Title text='My Projects' />
      <div className="cards container mx-auto py-4 mt-6 flex flex-wrap gap-8 justify-center">
        {data.map((project) => (
          <div
            key={project.id}
            onClick={() => handleClick(project.id)}
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
        ))}
      </div>
    </div>
  )
}

export default MyProjects
