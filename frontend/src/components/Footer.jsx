import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-15 my-10 mt-30 text-sm '>
            {/* ------- left side ------- */}
            <div className=''>
               
                <img className='w-40 mb-5' src={assets.logo} alt="" />
                     
              
                <p className='w-full md:w-2/3 text-gray-700  leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>

            {/* ------- center side ------- */}
            <div className=''>
                <h2 className='font-semibold text-xl mb-5'>COMPANY</h2>
                <ul className='flex flex-col gap-2 text-sm text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            {/* ------- right side ------- */}
            <div > 
                <h2 className='text-xl font-semibold mb-5'>GET IN TOUCH</h2>
                <div className='flex flex-col gap-2 text-gray-600'>
                    <p>+0-000-000-000</p>
                    <p>greatstackdev@gmail.com</p>
                </div>
            </div>
        </div>
        <hr className='text-gray-200' />
        <p className='text-center m-5 text-sm font-medium'>Copyright 2024 @ Greatstack.dev - All Right Reserved.</p>
    </div>
  )
}

export default Footer