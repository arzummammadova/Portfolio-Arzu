import React from 'react'
import Title from './Title'
import { MoveUpRight } from 'lucide-react'

const MyProjects = () => {
  return (
    <div>
      <Title text=' MyProjects'/>
      <div className="cards container mx-auto py-4 mt-6 pointer">
        <div 
          className="card w-1/3 bg-gray-200 rounded-4xl h-[600px] relative"
          style={{ 
            backgroundImage: "url('./images/readly.png')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat' 
          }}
        >
          <div className="arrow absolute top-3 right-3 pointer">
            <MoveUpRight size={45} className='bg-gray-400  px-3 py-3 rounded-full text-white ' />
          </div>
          <div className="bg-gray-300 w-full py-5 opacity-90 text-center text-white text-xl rounded-b-4xl absolute bottom-0" >
            <p>Readly-React Node.js </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProjects