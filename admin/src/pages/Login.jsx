import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'
import {useNavigate} from 'react-router-dom'

const Login = () => {

  let [state, setState] = useState('Admin') //state represent ke kon login karva mage chhe admin ke doctor

  const { atoken,setaToken, backendUrl } = useContext(AdminContext)
  let { setDToken ,dToken} = useContext(DoctorContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    try {
      if (state == 'Admin') {
        //for admin login
        let { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {//from backend if the login is successfull we are sending a object {success:true,token} also token

          localStorage.setItem('atoken', data.atoken)
          toast.success('Login successful')
          setaToken(data.atoken)
        
          
        }
        else {
          toast.error(data.message)
        }

      }
      else {
        //check doctor login
        let { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          
          localStorage.setItem('dToken', data.dToken)
          setDToken(data.dToken)

        } 
        else toast.error(data.message)

      }
    }
    catch (e) {
      toast.error(e.message)

    }
  }

  return !atoken && !dToken && (
    <form className='flex flex-col items-center justify-center min-h-[80vh]' onSubmit={handleLogin}>
      <div className='border border-gray-200 m-8 p-8 shadow-lg text-sm text-gray-600 rounded-lg min-w-[380px] flex flex-col gap-3'>
        <p className='text-center text-2xl font-semibold text-gray-700'><span className='text-primary'>{state}</span> Login</p>

        <div>
          <p>Email</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border border-gray-200 rounded p-1 mt-1' type="email" name="email" id="" />
        </div>
        <div>
          <p>Password</p>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border border-gray-200 rounded p-1 mt-1' type="password" name="password" id="" />
        </div>
        <button className='bg-primary cursor-pointer text-white p-2 rounded font-medium' type="submit">Login</button>

        {
          state === 'Admin' ?
            <p>Doctor Login? <span className='text-primary cursor-pointer underline' onClick={() => setState('Doctor')}>Click here</span> </p> :
            <p>Admin Login? <span className='text-primary cursor-pointer underline' onClick={() => setState('Admin')}>Click here</span> </p>
        }
      </div>
    </form>
  )
}

export default Login