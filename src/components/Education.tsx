import React from 'react';
import Title from './Title';

const Education = () => {
  return (
    <div className='mx-auto max-w-8xl '>
      <Title  text='My Educations ' />
      <table className='mx-auto px-9 w-4/5 table-fixed '>
        <tbody>
          <tr>
            {/* Order column - given a fixed small width */}
            <td className='order font-bold text-xl lg:text-4xl px-8 py-2 w-1/12'>01</td>
            {/* University Name - given a larger fixed width */}
            <td className='px-4 font-bold text-md lg:text-2xl py-2 w-5/12'>Azerbaijan Technical University
            (SABAH Groups)</td>
            {/* Remaining two columns will share the rest of the space evenly due to table-fixed */}
            <td className='px-8 py-2 text-xl text-gray-500'>bachelor degree</td>
            <td className='px-8 py-2 text-xl text-gray-500'>2023-2026</td>
          </tr>
          <tr>
            <td className='order px-8 py-2 w-1/12'>02</td>
            <td className='px-8 py-2 w-5/12'>Sumgait State University</td>
            <td className='px-8 py-2'>bachlor degree</td>
            <td className='px-8 py-2'>2026-2028</td>
          </tr>
          <tr>
            <td className='order px-8 py-2 w-1/12'>03</td>
            <td className='px-8 py-2 w-5/12'>Code Academy</td>
            <td className='px-8 py-2'>Sofware Develpment</td>
            <td className='px-8 py-2'>2024 sep-2025 feb</td>
          </tr>
          <tr>
            <td className='order px-8 py-2 w-1/12'>04</td>
            <td className='px-8 py-2 w-5/12'>Technest Codinarium</td>
            <td className='px-8 py-2'>Web programming</td>
            <td className='px-8 py-2'>2024</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Education;