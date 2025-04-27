// for showing all doctors according to their speciality.

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

const Doctors = () => {
  let navigate = useNavigate()
  let { speciality } = useParams() //useParams hook to fetch parameters from url
  //now speciality undefined aavshe jo tame direct navbar mathi all doctors click karo chho to. to te case ma aapde all doctors show kari daisu and jo speciality hase to to te speciality na doctors ne dekhadi shu


  let { doctors } = useContext(AppContext)
  let [filteredDoc, setFilteredDoc] = useState([])
  let [filters, setFilters] = useState(false)//for mobile view this will set button filter as true

  const applyFilter = () => {
    if (speciality) {
      setFilteredDoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else {
      //specitlity is undefined means all doctors
      setFilteredDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])



  return (
    <div>

      <p className='text-gray-600'>Browse through the doctors specialist.</p>

      <button onClick={() => setFilters(prev => !prev)} className={`${filters ? 'bg-primary text-white' : ''} sm:hidden border border-gray-400 px-5 py-1   rounded text-sm text-gray-600 mt-5`}>Filters</button>


      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className={`${filters ? 'flex' : 'hidden sm:flex'} flex-col gap-4  text-gray-600 text-sm`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`border ps-3 px-15  cursor-pointer rounded border-gray-300 py-1.5  ${speciality === 'General physician' ? 'bg-blue-100 text-black' : ''} `}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`border ps-3 px-15  cursor-pointer rounded border-gray-300 py-1.5 ${speciality === 'Gynecologist' ? 'bg-blue-100 text-black' : ''}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`border ps-3 px-15  cursor-pointer rounded border-gray-300 py-1.5 ${speciality === 'Dermatologist' ? 'bg-blue-100 text-black' : ''} `}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`border ps-3 px-15  cursor-pointer rounded border-gray-300 py-1.5 ${speciality === 'Pediatricians' ? 'bg-blue-100 text-black' : ''} `}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`border ps-3 px-15  cursor-pointer rounded border-gray-300 py-1.5 ${speciality === 'Neurologist' ? 'bg-blue-100 text-black' : ''} `}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`border ps-3 px-15  cursor-pointer rounded border-gray-300 py-1.5 ${speciality === 'Gastroenterologist' ? 'bg-blue-100 text-black' : ''}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6 '>
          {
            filteredDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-100' src={item.image} alt="" />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-600'} rounded-full`}></p>
                    <p className={`${!item.available ? 'text-red-500' : ''}`}>{item.available ? 'Available' : 'Not Available'}</p>
                  </div>
                  <p className='text-lg font-medium text-gray-900'>{item.name}</p>
                  <p className='text-sm text-gray-600'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors