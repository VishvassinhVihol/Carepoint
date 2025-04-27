//for Home.jsx
import React, { useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'



const TopDoctors = () => {
    const {doctors} = useContext(AppContext)

    let navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center gap-4 text-gray-900 my-16 md:mx-10'>
        <h2 className='text-3xl font-medium'>Top Doctors to Book</h2>
        <p className='text-sm text-center'>Simply browse through our extensive list of trusted doctors.</p>

        <div className='w-full grid grid-cols-auto pt-5 gap-4 gap-y-6 px-3 sm:px-0'>
            {
                doctors.slice(0,10).map((item,index) => (
                    <Link to={`/appointment/${item._id}`} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        <img className='bg-blue-100' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-600'} rounded-full`}></p>
                                <p className={`${!item.available ? 'text-red-500' : ''}`}>{item.available ? 'Available' :  'Not Available'}</p>
                            </div>
                            <p className='text-lg font-medium text-gray-900'>{item.name}</p>
                            <p className='text-sm text-gray-600'>{item.speciality}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
            <button onClick={() => {navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-100 px-12 mt-10 rounded-full text-medium py-3 cursor-pointer'>more</button>
    </div>
  )
}

export default TopDoctors