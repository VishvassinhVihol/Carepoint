import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {

  const {profileData,dToken,getProfile,setProfileData,backendUrl} = useContext(DoctorContext)

  const [isEdit,setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {

      let updatedData = {
        fees : profileData.fees,
        address : profileData.address,
        available : profileData.available
      }

      let {data} = await axios.post(backendUrl + '/api/doctor/update-profile',updatedData,{headers:{dToken}})

      if(data.success){
        toast.success(data.message)
        getProfile()
      }
      else toast.error(data.message)
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(dToken) getProfile()
  },[dToken])

  return profileData && (
    <div>
      <div className='flex flex-col gap-4 md:m-5 m-2 '>
        <div>
          <img className='bg-primary/80 w-full sm:w-64 rounded-lg' src={profileData.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* doc info name,degree,experience */}

          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

          {/* about */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
          </div>

          <p className='text-gray-600 font-medium mt-4'>Appointment fee: $ {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({...prev,fees:e.target.value}) )} value={profileData.fees} /> : profileData.fees}</p>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
            {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({...prev,address:{...prev.address,line1:e.target.value}}) )} value={profileData.address.line1} /> : profileData.address.line1} <br />
            {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({...prev,address:{...prev.address,line2:e.target.value}}) )} value={profileData.address.line2} /> : profileData.address.line2}
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input onChange={() => isEdit && setProfileData(prev => ({...prev,available : !prev.available}))} checked={profileData.available} className='cursor-pointer' type="checkbox" name="" id="" />
            <label htmlFor="">Available</label>
          </div>



          <button onClick={async () => {if(isEdit) await updateProfile();setIsEdit(prev => !prev)}} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 cursor-pointer hover:bg-primary hover:text-white transition-all'>{isEdit ? 'Save Info' : 'Edit'}</button>

        </div>
      </div>
    </div>
  )
}

export default DoctorProfile