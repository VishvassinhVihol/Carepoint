import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <p className='text-center text-2xl py-8'><span className='text-gray-500'>ABOUT</span> US</p>

      <div className='flex flex-col md:flex-row gap-4 py-6'>
        <div className='w-full md:max-w-[360px]'>
          <img src={assets.about_image} alt="" />
        </div>
        <div className='w-full text-sm text-gray-600 sm:px-8 px-4 max-w-[700px]'>
          <p className='pt-8 '>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>

          <p className='py-5 '>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>

          <h3 className='pt-4 font-semibold text-black'>Our Vision</h3>

          <p className='pt-5 '>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>

      <div>
        <h2 className='py-5 text-xl text-gray-600'>WHY <span className='font-medium text-gray-700'>CHOOSE US</span></h2>

        <div className='flex flex-col md:flex-row ' >
          <div className='border flex flex-col gap-5 px-10 md:px-16 py-8  sm:py-16 text-[15px] text-gray-600 border-gray-300 rounded  group hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer '>

            <b className=' font-semibold'>EFFICIENCY:</b>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>

          </div>
          <div className='border flex flex-col gap-5 px-10 md:px-16 py-8  sm:py-16 text-[15px] text-gray-600 border-gray-300  rounded  group hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer '>
            <b className='font-semibold'>CONVENIENCE:</b>
            <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className='border flex flex-col gap-5 px-10 md:px-16 py-8  sm:py-16 text-[15px] text-gray-600 border-gray-300  rounded  group hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer '>
            <b className='  font-semibold '>PERSONALIZATION:</b>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About