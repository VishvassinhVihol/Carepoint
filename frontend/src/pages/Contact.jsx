import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className=''>
      <p className='text-2xl text-gray-600 text-center mt-12'>CONTACT <span className='font-medium text-gray-900'>US</span></p>

      <div className='flex flex-col md:flex-row gap-10 justify-center my-10 text-sm text-gray-600'>
        <div className='md:max-w-[360px] w-full'>
          <img src={assets.contact_image} alt="" />
        </div>
        <div className='flex flex-col gap-6 items-start justify-center'>
          <p className='text-lg font-semibold'>OUR OFFICE</p>
          <div>
            <p>00000 Willms Station</p>
            <p>Suite 000, Washington, USA</p>
          </div>
          <div>
            <p>Tel: (000) 000-0000</p>
            <p>Email: vishwassinh@gmail.com</p>
          </div>

          <h2 className='text-lg font-semibold'>CAREERS AT PRESCRIPTO</h2>
          <p>Learn more about our teams and job openings.</p>

          <button className='border px-8 py-4 cursor-pointer hover:bg-black text-gray-900 hover:text-white transition-all duration-300'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact