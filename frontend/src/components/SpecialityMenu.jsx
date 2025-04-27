import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center justify-center text-gray-800 gap-4 py-16'>
        <h1 className='font-medium text-3xl'>Find by Speciality</h1>
        <p className='sm:w-1/3  text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <div className='flex sm:justify-center items-center gap-4 pt-5 w-full overflow-scroll'>
            {
                // scrollTo a js function which will move us on top of the page
                specialityData.map((item,key) => (
                    <Link onClick={() => scrollTo(0,0)} className='flex flex-col items-center justify-center text-xs cursor-pointer hover:translate-y-[-10px] transition-all  duration-500'  key={key} to= {`/doctors/${item.speciality}`}>
                        <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                        <p >{item.speciality}</p>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default SpecialityMenu