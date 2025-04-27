import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext = createContext()


const AppContextProvider = ({children}) => {
    let [doctors,setDoctors] = useState([])
    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    let backendUrl = import.meta.env.VITE_BACKEND_URL
    let [userData,setUserData] = useState(false)

   

    async function getAllDoctors(){
        try{
            let {data} = await axios.get(backendUrl + '/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    async function loadUserData(){
        try {
            let {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
            if(data.success){
                setUserData(data.user)
               
                
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    useEffect(() => {
        
     getAllDoctors()
        
    },[])

    useEffect(() => {
       
        if(token) loadUserData()
     
    },[token])

  
    
    let value = {
        doctors,getAllDoctors,token,setToken,backendUrl,userData,setUserData,loadUserData
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}



export default AppContextProvider