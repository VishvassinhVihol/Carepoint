
import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  let {doctors,atoken,getAllDoctors,changeAvailability} = useContext(AdminContext)

  useEffect(() => {
    if(atoken) getAllDoctors()
  },[atoken])
  
  return (
    <div className='m-8 max-h-[90vh] overflow-y-scroll'>
      <p className='text-xl font-medium '>All Doctors</p>
      <div className='flex flex-wrap gap-4 pt-5 py-6 items-center justify-center '>
        {
          doctors.map((doctor,index) => (
            <div key={index} className='max-w-[250px] border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group'>
              <div>
                <img className='bg-indigo-100 group-hover:bg-primary transition-all duration-300' src={doctor.image} alt="" />
              </div>
              <div className='m-4'>
                <p className='text-xl font-semibold text-neutral-800'>{doctor.name}</p>
                <p className='text-sm text-gray-600'>{doctor.speciality}</p>
                <div className='flex gap-2 mt-2'>
                  <input onChange={() =>changeAvailability(doctor._id)} type="checkbox"  checked={doctor.available} />
                  <p >Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList