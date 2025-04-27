  import React, { useContext, useEffect, useState } from 'react'
  import { useNavigate, useParams } from 'react-router-dom'
  import { AppContext } from '../context/AppContext'
  import { assets } from '../assets/assets'
  import RelatedDoctors from '../components/RelatedDoctors'
  import { toast } from 'react-toastify'
  import axios from 'axios'


  const Appointment = () => {
    let { doctors,backendUrl,token,getAllDoctors } = useContext(AppContext)
    let { docId } = useParams()
    let daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']
    
    
    let [docInfo, setDocInfo] = useState('')//curr doctor ni information
    const [docSlots, setDocSlots] = useState(false)//doc slots for next 7 days
    const [slotIndex, setSlotIndex] = useState(0)//track Fri 7,Sat 8 etc..
    const [slotTime, setSlotTime] = useState('')//to show times like 8:30,9:00 and all
    const navigate = useNavigate()


   

    let findDoc = () => {
      setDocInfo(doctors.find(doc => doc._id === docId))
    }

    let getAvailableSlots = async () => {
      setDocSlots([])//set the previouse slots as empty

      let today = new Date()
      // console.log('today: ',today)

      for (let i = 0; i < 7; i++) {
        let currDate = new Date(today)
        
        currDate.setDate(today.getDate() + i)
        // console.log('currDate',currDate);
        

        let endTime = new Date()
        endTime.setDate(today.getDate() + i)
        endTime.setHours(21, 0, 0, 0);//time slots 8:30 sudhi j rakhavana chhe
        // console.log(endTime.getHours());

        if (currDate.getDate() === today.getDate()) {
          //means we are at the same day so we will display time slots from currHour+1
          currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10)
          //setting minuts
          currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0)
          // console.log(currDate.getMinutes());

        }
        else {
          //for next day start slots from 10 AM
          currDate.setHours(10)
          currDate.setMinutes(0)
        }

        let timeSlots = []
        // console.log('currDate',currDate);
        // console.log('endTIme',endTime);
        
        while (currDate < endTime) {//currDate e aaj ni date chhe and endTime pan aaj ni j date chhe endTime ma time 9:00pm set karel chhe and currTime +30 min thi increase thay chhe
          let formattedTime = currDate.toLocaleString([], { hour: '2-digit', minute: '2-digit' })
      
          //now jo slot alredy book thai gayo hoy to aapde tene show nahi karie
          let day = currDate.getDate()
          let month = currDate.getMonth()+1
          let year = currDate.getFullYear()

          let slotDate = day + '_' + month + '_' + year
          let slotTime = formattedTime

          let isSlotAvailable = docInfo && docInfo.slotsBooked &&  docInfo.slotsBooked[slotDate] && docInfo.slotsBooked[slotDate].includes(slotTime) ? false : true

          if(isSlotAvailable){
            timeSlots.push({
              dateTime: new Date(currDate),
              time: formattedTime
            })
          }

          

          //now increase the time by 30 minuts
          currDate.setMinutes(currDate.getMinutes() + 30)

        }

        
        setDocSlots(prev => ([...prev,timeSlots]))

      }
    }

   
    

    async function bookAppointment() {
      
      if(!token){
        toast.warning('Login to book appointment')
        return navigate('/login')
      }

      const date = docSlots[slotIndex][0].dateTime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year
      

      try {
        let {data} = await axios.post(backendUrl + '/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})

        if(data.success){
          toast.success('Appointment booked')
          getAllDoctors()//to re-render all doctors so that update can be made
          navigate('/my-appointments')
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error({success:false,message:error.message})
      }
      
    }

    useEffect(() => {
      if(doctors.length > 0) findDoc()
    }, [docId,doctors])

    useEffect(() => {
     if(docInfo) getAvailableSlots()
      // console.log('docSlots: ',docSlots);
      
    }, [ docInfo])



    return docInfo && (
      <div>
        <div className='flex sm:flex-row flex-col  text-gray-600'>
          <div>
            <img className='bg-primary rounded-lg w-full sm:max-w-72' src={docInfo.image} alt="" />
          </div>
          <div className='flex-1 border border-gray-400 rounded-lg p-8 mx-4 mt-[-80px] sm:mt-0 bg-white '>

            <div>
              <h2 className='text-3xl font-medium text-gray-900 flex items-center gap-2 '>{docInfo.name} <img src={assets.verified_icon} className='w-5' alt="" /></h2>
              <div className='flex items-center text-sm my-2 gap-4 text-gray-600'>
                <p>{docInfo.degree} - {docInfo.speciality}</p>

                <button className='px-2 py-0.5 border text-xs cursor-pointer rounded-full'>{docInfo.experience}</button>
              </div>
            </div>

            <div>
              <h3 className='flex items-center gap-1 text-sm text-gray-900 font-medium mb-2'>About <img className='w-3' src={assets.info_icon} alt="" /></h3>
              <p className='text-sm text-gray-600 mt-1 max-w-[700px]'>{docInfo.about}</p>
            </div>
            <p className='text-gray-900 mt-3'>Appointment fee: ${docInfo.fees}</p>
          </div>
        </div>

        <div className='sm:ml-80 font-medium ml-4 my-5 text-gray-600'>

          <p>Booking slots</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {
              docSlots.length && docSlots.map((item,index) => (
                
                <div onClick={() => setSlotIndex(index)} className={`text-center border rounded-full border-gray-200 min-w-16 py-6 cursor-pointer ${slotIndex === index ? 'bg-primary  rounded-full text-white ' : ''}`}   key={index}>
              
                  
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
                
              ))
            }
          </div>


          <div  className='flex gap-3 mt-4 font-light text-sm overflow-x-scroll'>

              {
                docSlots.length && docSlots[slotIndex].map((item,index) => (
                  
                  <div onClick={() => setSlotTime(item.time)} className={`border border-gray-300 text-center min-w-25 py-2 rounded-full cursor-pointer  ${slotTime === item.time ? 'bg-primary  rounded-full text-white ' : ''}`} key={index}>
                    <p>{item.time}</p>
                    
                  </div>
                  
                ))
              }
          </div>

          <button onClick={bookAppointment} className=' my-5 cursor-pointer text-sm py-3 px-20  bg-primary text-white rounded-full font-light' >Book an appointment</button>
        </div>

        {/* we will show the releted doctors */}
        <RelatedDoctors docId = {docId} speciality={docInfo.speciality}/>
      </div>
    )
  }

  export default Appointment