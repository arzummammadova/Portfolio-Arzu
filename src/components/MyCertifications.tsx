import React from 'react'
import Title from './Title'
import Table from './Table'
import Image from 'next/image';

const MyCertifications = () => {
    const educationData = [
        ['01', 'Software Developer', 'Code Academy', 'high-honour'],
        ['02', 'Web programming', 'Technest', ''],
        ['03', 'HTML & CSS', 'Certiport ', ''],
        ['04', 'Sifirdan Komple Veb gelisdirme', 'Udemy', ''],
    ];
    return (
        <div className='mt-[140px]'>
            <Title text='My Certifications' />
            <Table headers={['Order', 'University Name', 'Degree/Program', 'Year']} data={educationData} />
            <div className="relative w-full h-[400px]">
                <Image
                    src="/images/line.png"
                    alt="line"
                    fill
                    className="object-contain" 
                />
            </div>
            

        </div>
    )
}

export default MyCertifications
