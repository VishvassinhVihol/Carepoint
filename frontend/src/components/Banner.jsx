// for home.jsx

import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    let navigate = useNavigate()
  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 my-20 md:mx-10'>
        {/* ------- left side --------- */}
        <div className='flex-1 py-8 md:py-16 lg:py-24 lg:pl-5  '>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                <p>Book Appointment</p>
                <p className='mt-4'>With 100+ Trusted Doctors</p>
            </div>
            <button onClick={() => navigate('/login')} className='mt-5 bg-white text-gray-600 rounded-full py-3 px-7 hover:scale-105 transition-all duration-300'>Create account</button>
        </div>


        {/* ------- right side --------- */}
        <div className='hidden md:block w-1/2 lg:w-[370px] relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Banner