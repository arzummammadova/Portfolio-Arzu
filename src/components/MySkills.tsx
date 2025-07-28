import React from 'react'
import Title from './Title'
import Image from 'next/image'

const skills = [
    { name: 'React', src: '/images/react.svg.png' },
    { name: 'HTML', src: '/images/hmtlpng.png' },
    { name: 'CSS', src: '/images/css.png' },
    { name: 'JavaScript', src: '/images/js.png' },
    { name: 'Bootstrap', src: '/images/bootstrap.png' },
    { name: 'Material-UI', src: '/images/material.png' },
    { name: 'Tailwind CSS', src: '/images/tailwind.png' },
    { name: 'Figma', src: '/images/figma.png' },
    { name: 'Sass', src: '/images/sass.png' },
    { name: 'Redux', src: '/images/redux.png' },
    { name: 'Git', src: '/images/git.webp' },
    { name: 'Next.js', src: '/images/next.png' },
    { name: 'Node.js', src: '/images/nodejs.png' },
    { name: 'Express.js', src: '/images/express.png' },
    { name: 'MongoDB', src: '/images/mongo.png' },
    { name: 'JWT', src: '/images/jwt.png' },
    { name: 'Formik & Yup', src: '/images/formikyup.png' },
    { name: 'Postman', src: '/images/postman.webp' },
    { name: 'Vercel', src: '/images/vercel.png' },
    { name: 'Render', src: '/images/render.jpg' },
];

const MySkills = () => {
    return (
        <div className='mt-[80px]'>
            <Title text='My Skills' />
            <div className="container mx-auto py-8 px-4">
                <h3 className='text-2xl text-gray-500'>I have experience with these technologies</h3>
                <div className="flex flex-wrap gap-8 mt-7 justify-center lg:justify-start">
                    {skills.map((skill) => (
                        <div key={skill.name} className="flex flex-col items-center">
                            <Image
                                className='w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] object-contain'
                                alt={`${skill.name} logo`}
                                width={150}
                                height={150}
                                src={skill.src}
                            />
                            <p className="mt-2 text-gray-700 text-center text-sm lg:text-base">{skill.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MySkills