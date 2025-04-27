import React, { useContext, useState } from 'react'

import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {

  
 let {userData,setUserData,backendUrl,loadUserData,token} = useContext(AppContext)

  let [isEdit,setIsEdit] = useState(false)
  let [image,setImage] = useState(false)

   function changeHandler(e){
    setUserData((prev) => ({...prev,[e.target.name]:e.target.value}))
  }
  async function updateUserProfileData(){
    try {
      let formData = new FormData()

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)
      formData.append('email',userData.email)

      image && formData.append('image',image)

      let {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}})
      
      
      if(data.success){
        await loadUserData()

        toast.success(data.message)
        setIsEdit(false)
        setImage(false)
      }
    
      else{
        toast.error(data.message)
      }

      
    } catch (error) {
      toast.error(error.message)
    }
  }
  return userData && (
    <div className=' max-w-[500px] text-sm text-gray-600 flex flex-col gap-2'>
      {
        isEdit ?
          <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75'  src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img  className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
         : <img className='w-40 rounded-lg' src={userData.image} alt=""/>
      }
      <p className='text-2xl font-medium'>{isEdit ? <input className='bg-stone-50 border text-black border-gray-300' name='name' onChange={changeHandler} value={userData.name} type="text" /> : userData.name}</p>
      <hr />

      <div>
        <p className='my-2 underline'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2 mt-3'>
          
            <p className='font-medium text-gray-900'>Email id: </p>
            <p className='text-blue-500'>{isEdit ? <input className='bg-stone-50 border text-black border-gray-300' type="text" name='email' value={userData.email} onChange={changeHandler} /> : userData.email}</p> 
       
          
            <p className='font-medium text-gray-900'>Phone: </p>
            <p className='text-blue-500'>{isEdit ? <input className='bg-stone-50 border text-black border-gray-300' type="text" name='phone' value={userData.phone} onChange={changeHandler} /> : userData.phone}</p>
        
          
            <p className='font-medium text-gray-900'>Address: </p>
            {
              isEdit ?
              <p>
                <input  className='bg-stone-50 border border-gray-300 text-black' type="text" name = 'line1'value={userData.address.line1} onChange={(e) => setUserData((prev) => ({...prev,address: {...prev.address,line1:e.target.value}}))} /> <br />
                  <input name='line2' className='bg-stone-50 border border-gray-300 text-black' type="text" value={userData.address.line2} onChange={(e) => setUserData((prev) => ({...prev,address: {...prev.address,line2:e.target.value}}))} /> 
            
              </p>:

              <p>
                {userData.address.line1} <br />
                {userData.address.line2}
              </p>
              
            }
         
         
        </div>
        
      </div>
      <div>
        <p className='my-2 underline'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2 mt-3'>
         
            <p className='font-medium text-gray-900'>Gender: </p>
            <p> { isEdit ?
                  <select className='bg-stone-50 border border-gray-300 text-black' name="gender" onChange={changeHandler} value={userData.gender} id="">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>       :
                          userData.gender}</p>
        
         
            <p className='font-medium text-gray-900'>Birthday: </p>
            <p>{ isEdit ? <input className='bg-stone-50 border border-gray-300 text-black' type="date" name="dob" value={userData.dob} onChange={changeHandler} id="" /> : userData.dob}</p>
       
        </div>
       
      </div>
      
      <div className='mt-10'>
        {
          isEdit ? <button className='border border-blue-500 rounded-full px-10 py-2 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'  onClick={updateUserProfileData}>Save Information</button> : <button className='border border-blue-500 rounded-full px-10 py-2 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>

    </div>
  )
}

export default MyProfile