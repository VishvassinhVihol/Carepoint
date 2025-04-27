import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({docId,speciality}) => {

  let navigate = useNavigate()
  
  let {doctors} = useContext(AppContext)
  let [filteredDoc,setFilteredDoc] = useState([])

  let findDocs = () => {
    setFilteredDoc(doctors.filter(doc => doc.speciality === speciality && doc._id != docId))
  }
  
  useEffect(() => {
    findDocs()
  },[docId,speciality])

  return (
    <div className='mt-15'>
        <div className='flex flex-col gap-4 my-5 items-center justify-center'>
            <h2 className='text-3xl font-medium'>Related Doctors</h2>
            <p className='text-sm text-center'>Simply browse through our extensive list of trusted doctors.</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 mt-6 gap-y-6 '>
            {
                filteredDoc.map((item,index) => (
                  <div onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                      <img className='bg-blue-100' src={item.image} alt="" />
                      <div className='p-4'>
                          <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                          <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-600'} rounded-full`}></p>
                          <p className={`${!item.available ? 'text-red-500' : ''}`}>{item.available ? 'Available' :  'Not Available'}</p>
                          </div>
                          <p className='text-lg font-medium text-gray-900'>{item.name}</p>
                          <p className='text-sm text-gray-600'>{item.speciality}</p>
                      </div>
                  </div>
              ))
            }
          </div>

    </div>
  )
}

export default RelatedDoctors