import React, { useContext, useEffect } from 'react'
import Login from './pages/Login'
import { AdminContext } from './context/AdminContext';

import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Appointments from './pages/Admin/Appointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
  const {atoken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

 return (
   atoken || dToken ? <div className='bg-[#F8F9FD]'> {/* jo admin login karel hoy to pages batavo*/}
      <Navbar />
      <ToastContainer />
      <div className='flex items-start'>
        <Sidebar/>
        <Routes >
          {/* admin routes */}
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<Appointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorsList/>}/>

          {/* doctor routes */}
          <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path='/doctor-profile' element={<DoctorProfile/>}/>

     
        </Routes>
      </div>
   </div> :  

   <div> {/*jo doctor e login karel hoy to aa batavo*/}
      <Login />
      <ToastContainer />
   </div>
 )
}

export default App