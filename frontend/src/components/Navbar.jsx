    import React, { useContext, useState } from 'react'
    import { assets } from '../assets/assets'
    import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
    

    const Navbar = () => {

        let navigate = useNavigate()//to navigate to route

        const {token,setToken,userData} = useContext(AppContext)//token true means user is logged in. and if false means not loggedIn.if the user is logged we will disply user's image and other stuff and if not loggedIn we will disply a create account btn
        let [click, setClick] = useState(false)//for mobile menu
        let [showDropdown, setShowDropdown] = useState(false)

        function logout(){
            localStorage.removeItem('token')
            setToken(false)
            navigate('/')
        }
        return (
            <div className='flex justify-between  items-center py-4 mb-5 border-b border-b-gray-400'>
                <img onClick={() => { navigate('/'); scrollTo(0, 0) }} className='w-44  cursor-pointer' src={assets.logo} alt="CarePointLogo" />
                <ul className='hidden md:flex gap-5 font-medium ms-auto '>
                    <NavLink to={'/'}>
                        <li className='py-1'>HOME</li>
                        <hr className='hidden border-none outline-none h-0.5 w-3/5 bg-primary m-auto ' />
                    </NavLink>
                    <NavLink to={'/doctors'}>
                        <li className='py-1'>ALL DOCTORS</li>
                        <hr className='hidden none border-none outline-none h-0.5 w-3/5 bg-primary m-auto' />
                    </NavLink>
                    <NavLink to={'/about'}>
                        <li className='py-1'>ABOUT</li>
                        <hr className='hidden border-none outline-none h-0.5 w-3/5 bg-primary m-auto' />
                    </NavLink>
                    <NavLink to={'/contact'}>
                        <li className='py-1'>CONTACT</li>
                        <hr className='hidden border-none outline-none h-0.5 w-3/5 bg-primary m-auto' />
                    </NavLink>
                    <button onClick={() => window.open(import.meta.env.VITE_ADMIN_URL + '/api/admin', '_blank')} className='text-xs border rounded-full px-4 border-gray-300 cursor-pointer'>Admin Pannel</button>
                </ul>
                <div className='flex items-center gap-4 ms-auto relative'>
                    {
                        token && userData ?
                        <div className='flex gap-2 items-center ' >
                            <div onClick={() => setShowDropdown(prev => !prev)} className='flex gap-2 cursor-pointer'>
                                <img className='w-8 rounded-full' src={userData.image} alt="profile" />
                                <img className='w-2.5' src={assets.dropdown_icon} alt="dropdown icon" />
                            </div>
                
                            {showDropdown && (
                                <div className='absolute top-10 right-0  text-base font-medium text-gray-800 z-10 bg-stone-100 w-48 rounded p-4 flex flex-col gap-4'>
                                    <p onClick={() => {navigate('/my-profile');setShowDropdown(false);scrollTo(0,0)}} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => {navigate('/my-appointments');setShowDropdown(false);scrollTo(0,0)}} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={ logout} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            )}
                        </div> :
                            <button onClick={() => navigate('/login')} className='hidden md:block bg-primary px-10 py-3 text-white font-light rounded-full cursor-pointer'>Create account</button>
                    }
                    {/*--------- mobile menu -------- */}
                    <img className='w-6 md:hidden  cursor-pointer  relative ' onClick={() => setClick(true)} src={assets.menu_icon} alt="" />
                    <div className={`${click ? 'fixed top-0 right-0 bottom-0 overflow-hidden h-full w-full z-20 transition-all bg-white  ' : 'hidden h-0 w-0'} `}>
                        <div className='mt-5 px-6 flex '>
                            <img className='w-40' src={assets.logo} alt="" />
                            <img className='w-8 ms-auto' src={assets.cross_icon} onClick={() => setClick(false)} alt="" />

                        </div>
                        <ul className='flex flex-col items-center mt-12 gap-5 h-full text-lg '>
                            <NavLink onClick={() => { setClick(false); scrollTo(0, 0) }} className={({ isActive }) => isActive ? 'py-2 px-5 text-white bg-primary rounded-lg font-medium ' : ''}
                                to='/'>HOME</NavLink>
                            <NavLink onClick={() => { setClick(false); scrollTo(0, 0) }} className={({ isActive }) => isActive ? 'py-2 px-5 text-white bg-primary rounded-lg font-medium' : ''}
                                to='/doctors'>ALL DOCTORS</NavLink>
                            <NavLink onClick={() => { setClick(false); scrollTo(0, 0) }} className={({ isActive }) => isActive ? 'py-2 px-5 text-white bg-primary rounded-lg font-medium ' : ''}
                                to='/about'>ABOUT</NavLink>
                            <NavLink onClick={() => { setClick(false); scrollTo(0, 0) }} className={({ isActive }) => isActive ? 'py-2 px-5 text-white bg-primary rounded-lg font-medium' : ''}
                                to='/contact'>CONTACT</NavLink>
                                <button onClick={() => window.open(import.meta.env.VITE_ADMIN_URL + '/api/admin', '_blank')} className='text-xs border rounded-full px-4 border-gray-300 cursor-pointer'>Admin Pannel</button>
                           
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    export default Navbar