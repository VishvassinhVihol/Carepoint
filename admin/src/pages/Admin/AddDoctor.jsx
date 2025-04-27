    import React, { useContext, useState } from 'react'
    import {assets} from "../../assets/assets"
    import axios from 'axios'
    import { AdminContext } from '../../context/AdminContext'
    import {useNavigate} from 'react-router-dom'
    import { toast } from 'react-toastify'

    const AddDoctor = () => {

        const [docImg,setDocImg] = useState(false)
        const [input,setInput] = useState({name:'',email:'',password:'',experience:'1 Year',about:'',fees:'',speciality:'General physician',degree:'',address1:'',address2:''})
        

        const {backendUrl,atoken} = useContext(AdminContext)
        const navigate = useNavigate()

        const onSubmit = async (e) => {
            e.preventDefault()

            try {
                if(!docImg){
                    toast.error('Image is required!')
                    return
                }
                
                let formData = new FormData()
        
                formData.append('image',docImg)
                formData.append('name',input.name)
                formData.append('email',input.email)
                formData.append('password',input.password)
                formData.append('experience',input.experience)
                formData.append('about',input.about)
                formData.append('speciality',input.speciality)
                formData.append('degree',input.degree)
                formData.append('fees',Number(input.fees))
                formData.append('address',JSON.stringify({line1:input.address1,line2:input.address2}))

              
                
        
                let {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{atoken}})
   
                
                if(data.success){
                    toast.success(data.message)
              
                    setInput({name:'',email:'',password:'',experience:'1 Year',about:'',fees:'',speciality:'General physician',degree:'',address1:'',address2:''})
                    setDocImg(false)
                    
                }
                else toast.error(data.message)
                
            } catch (error) {
                toast.error(error.message)
            }
            
          
        }

    return (
        <form action="" onSubmit={onSubmit} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Doctor</p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} alt="" />
                    </label>
                    <input   onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p>Upload doctor <br /> picture</p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor name</p>
                            <input value={input.name} onChange={(e) => setInput((prevInput) => ({...prevInput,name:e.target.value}))}  className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor email</p>
                            <input value={input.email} onChange={(e) => setInput((prevInput) => ({...prevInput,email:e.target.value}))} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor password</p>
                            <input value={input.password} onChange={(e) => setInput((prevInput) => ({...prevInput,password:e.target.value}))}   className='border rounded px-3 py-2' type="password" placeholder='Password' required />
                        </div>  

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Experience</p>
                            <select value={input.experience} onChange={(e) => setInput((prevInput) => ({...prevInput,experience:e.target.value}))}   className='border rounded px-3 py-2' name="" id="">
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                                <option value="10+ Year">10+ Year</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Fees</p>
                            <input value={input.fees} onChange={(e) => setInput((prevInput) => ({...prevInput,fees:e.target.value}))}   className='border rounded px-3 py-2' type="number" placeholder='fees' required />
                        </div>  
                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Speciality</p>
                            <select value={input.speciality} onChange={(e) => setInput((prevInput) => ({...prevInput,speciality:e.target.value}))}   className='border rounded px-3 py-2' name="" id="">
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Degree</p>
                            <input value={input.degree} onChange={(e) => setInput((prevInput) => ({...prevInput,degree:e.target.value}))}   className='border rounded px-3 py-2' type="text" placeholder='Degree' required />
                        </div>  
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Address</p>
                            <input value={input.address1} onChange={(e) => setInput((prevInput) => ({...prevInput,address1:e.target.value}))}   className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
                            <input value={input.address2} onChange={(e) => setInput((prevInput) => ({...prevInput,address2:e.target.value}))}   className='border rounded px-3 py-2' type="text" placeholder='Address 2' required />
                        </div>  
                    </div>

                </div>

                <div>
                    <p className='mt-4 mb-2'>About Doctor</p>
                    <textarea value={input.about} onChange={(e) => setInput((prevInput) => ({...prevInput,about:e.target.value}))}   className='w-full px-4 pt-2 border rounded' name="" rows='5' placeholder='Write about doctor' cols='30' id=""></textarea>
                </div> 

                <button className='bg-primary px-10 py-3 mt-4 text-white rounded-full cursor-pointer'>Add Doctor</button>

            </div>
        </form>
    )
    }

    export default AddDoctor