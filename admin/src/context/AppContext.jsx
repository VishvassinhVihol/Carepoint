import React, { createContext } from 'react'
export const AppContext = createContext()

const AppContextProvider = ({children}) => {
  

  //function to calcualte Age
  const calculateAge = (dob) =>{
    let today = new Date()
    let birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()

    return age
  }

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  function formateDate(slotDate){
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[dateArray[1]-1] + " " + dateArray[2];
  }

  const value = {calculateAge,formateDate}
  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider