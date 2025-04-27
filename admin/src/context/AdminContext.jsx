import React, { createContext, useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'


export const AdminContext = createContext()

const AdminContextProvider = ({children}) => {

  const [atoken,setaToken] = useState(localStorage.getItem('atoken') ||  '')
  const [doctors,setDoctors] = useState([])
  const [appointments,setAppointments] = useState([])
  const [dashData,setDashData] = useState([])

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  
  const getAllDoctors = async () => {
    try {
      const {data} = await axios.post(backendUrl + '/api/admin/allDoctors',{},{headers:{atoken}})
      if(data.success){
        setDoctors(data.doctors)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const changeAvailability = async (docId) => {
    try {

      
      const {data} = await axios.post(backendUrl + '/api/admin/change-availability',{docId},{headers:{atoken}})
      if(data.success){

        toast.success(data.message)
        getAllDoctors()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const getAllAppointments = async () => {
    try {
      let {data} = await axios.get(backendUrl + '/api/admin/appointments',{headers:{atoken}})
      if(data.success){
   
        
        setAppointments(data.appointments)
       
        
      }
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async(appointmentId) => {
    try {
      let {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{atoken}})
      if(data.success){
        toast.success(data.message)
        getAllAppointments()
        getAllDoctors()
      }
      else  toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getDashData = async() => {
    try {
      let {data} = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{atoken}})
      if(data.success){
        setDashData(data.dashData)
       
      }
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    atoken,setaToken,backendUrl,doctors,getAllDoctors,changeAvailability,appointments,getAllAppointments,getDashData,dashData,setDashData,cancelAppointment
  }
  return (
    <AdminContext.Provider value={value}>
        {children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider