//for Home.jsx
import React from 'react'
import { assets } from '../assets/assets'


const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        {/* there are two sides left and right */}
        {/* ----Left Side---- */}

        <div className='md:w-1/2 flex flex-col py-10 gap-4  md:py-[10vw] items-start justify-center'>
            <p className='text-3xl  md:text-4xl lg:text-5xl text-white font-semibold leading-tight '>Book Appointment <br /> With Trusted Doctors</p>

            <div className='flex flex-col md:flex-row items-center gap-4 w-[100%] text-white text-sm font-light'>
                <img className='w-28' src={assets.group_profiles} alt="" />
                <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' />
                schedule your appointment hassle-free.</p>
            </div>

            <a href='#speciality' className='flex bg-white gap-2 rounded-full px-8 py-3 text-sm text-gray-600 m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
            </a>{/*The browser scrolls smoothly to the element with id="speciality".
If no element with id="speciality" exists, nothing happens. */}
        </div>


        {/* ----Right Side----  */}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header