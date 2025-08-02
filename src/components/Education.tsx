import React from 'react';
import Title from './Title';
import Table from './Table'; 
import Image from 'next/image';

const Education = () => {
  const educationData = [
    ['01', 'Azerbaijan Technical University (SABAH Groups)', 'bachelor degree', '2023-2026'],
    ['02', 'Sumgait State University', 'bachelor degree', '2022-2023'],
    ['03', 'Code Academy', 'Software Development', '2024 sep-2025 feb'],
    ['04', 'Technest Codinarium', 'Web programming', '2024'],
  ];

  return (
    <div className='mx-auto max-w-8xl relative '>
      <Title text='My Educations' />
      <Table headers={['Order', 'University Name', 'Degree/Program', 'Year']} data={educationData} />
     <Image
             src="/images/tableglassbuble.png"
             alt="Bubble Left"
             width={100}
             height={100}
             className="bubble-right-education w-[120px] sm:w-[100px] lg:w-[120px] md:w-[120px]"
           
           />

    </div>
  );
};

export default Education;