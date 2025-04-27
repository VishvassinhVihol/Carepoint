import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
    const {atoken,setaToken} = useContext(AdminContext)
    const {dToken,setDToken} = useContext(DoctorContext)

    //logout
    const navigate = useNavigate()
    const logout = () =>{
        
          atoken && setaToken('')
          atoken && localStorage.removeItem('atoken')
          dToken && setDToken('')
          dToken && localStorage.removeItem('dToken')
          navigate('/')
        
    }


  return (
    <div className='flex pt-3 items-center p-4 md:px-10 bg-white shadow-md'>
        <div className='flex gap-2 text-xs items-center'>
            <img className='w-36 md:w-40' src={assets.admin_logo} alt="" />
            <p className='px-3 py-1 rounded-full border border-gray-400'>{atoken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-primary ms-auto  cursor-pointer text-white px-10 py-2 rounded-full text-sm'>Logout</button>
    </div>
  )
}

export default Navbar