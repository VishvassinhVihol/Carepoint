import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



const MyAppointments = () => {
  const {backendUrl,token,getAllDoctors} = useContext(AppContext)
  const [appointments,setAppointments] = useState([])
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const navigate = useNavigate()

  async function getAppointments(){
    try {
      let {data} = await axios.get(backendUrl + '/api/user/appointments',{headers:{token}})
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

  function formateDate(slotDate){
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[dateArray[1]-1] + " " + dateArray[2];
  }

  async function cancelAppointment(appointmentId){
    try {
      let {data} = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getAppointments()
        getAllDoctors()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description : 'Appointment Payment',
      order_id : order.id,
      receipt : order.receipt,
      handler : async (response) => {
   
        try {
          //api call to verify payment
          const {data} = await axios.post(backendUrl + '/api/user/verify-payment',response,{headers:{token}})
          
          if(data.success){
            toast.success(data.message)
            getAppointments()
            navigate('/appointments')
          }
          else toast.error(data.message)
        } catch (error) {
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  

  //function for payment
  const razorPayPayment = async (appointmentId) => {
    try {
      //make axios request

      
      let {data} = await axios.post(backendUrl + '/api/user/payment-razorpay',{appointmentId},{headers:{token}})

      
      if(data.success){
        initPay(data.order);
        
      }
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
   
    if(token) getAppointments()
  },[token])

  return (
    <div className='mt-10'>
      <p className='text-xl font-medium text-gray-600'> My appointments </p>
      <hr className='text-gray-300 my-3 h-0.5' />

      {appointments.map((item,index) => (
        <div key={index} className='flex flex-col md:flex-row text-gray-600 text-sm w-full justify-between my-5'>
            <div className='flex flex-col sm:flex-row gap-6'>
              <img className='sm:w-35 bg-blue-100' src={item.doctorData.image} alt="" />
              <div className='flex flex-col gap-1'>
                <p className='text-base font-semibold text-gray-800'>{item.doctorData.name}</p>
                <p>{item.doctorData.speciality}</p>

                <p className='font-medium text-gray-800'>Address:</p>
                <p>{item.doctorData.address.line1}</p>
                <p>{item.doctorData.address.line2}</p>

                <p className='font-medium text-gray-800'>Date & Time: {formateDate(item.slotDate)} | {item.slotTime}</p>
              </div>

            </div>
            <div className='flex flex-col my-2 justify-end gap-2'>
              {!item.cancelled && item.payment && !item.isCompleted && <button className='sm: min-w-48 py-2 border rounded  bg-green-400'>Paid</button>}
              {!item.cancelled &&  !item.payment  && !item.isCompleted && <button onClick={() => razorPayPayment(item._id)} className='px-15 py-1.5 cursor-pointer hover:bg-primary hover:text-white duration-300 border border-gray-200'>Pay Online</button>}
              {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='px-15 py-1.5 cursor-pointer hover:bg-red-600 hover:text-white duration-300 border border-gray-200'>Cancel appointment</button> }
              {item.cancelled && !item.isCompleted &&  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500 '>Appointment Cancelled</button> }
              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
            </div>
           
        </div>
      ))}
    </div>
  )
}

export default MyAppointments