import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'


export const DoctorContext = createContext()
const DoctorContextProvider = ({children}) => {

  const [dToken,setDToken] = useState(localStorage.getItem('dToken') || '')
  const [appointments,setAppointments] = useState([])
  const [dashData,setDashData] = useState('')
  const [profileData,setProfileData] = useState('')
  let backendUrl = import.meta.env.VITE_BACKEND_URL

  const getAllAppointments = async ()=> {
    try {

      
      let {data} = await axios.get(backendUrl + '/api/doctor/appointments',{headers:{dToken}})
      
      
      if(data.success){
        setAppointments(data.appointments.reverse())
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async(appointmentId) => {
    try {
      let {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        getAllAppointments()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const completeAppointment = async(appointmentId) => {
    try {
      let {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        getAllAppointments()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getDashData = async() => {
    try {
      let {data} = await axios.get(backendUrl + '/api/doctor/dashboard',{headers : {dToken}})
      if(data.success){
        setDashData(data.dashData)
     
        
        
      }
      else toast.error(data.message)
      
    } catch (error) {
      toast.error(error.message)
    }
  }
  const getProfile = async() => {
    try {
      let {data} = await axios.get(backendUrl + '/api/doctor/profile',{headers : {dToken}})
      if(data.success){
        setProfileData(data.doctor)

        
      }
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }


  const value = {dToken,setDToken,backendUrl,appointments,setAppointments,getAllAppointments,completeAppointment,cancelAppointment,dashData,getDashData,profileData,setProfileData,getProfile}
  return (
    <DoctorContext.Provider value={value}>
        {children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider