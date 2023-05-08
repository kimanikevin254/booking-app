import React, { useContext, useEffect, useState } from 'react'
import AuthNavigation from './auth/AuthNavigation'
import { AuthContext } from '../context/authContext'
import DrawerNavigation from './app/DrawerNavigation'

const MainNavigation = () => {
  const { userInfo, getSavedUserInfo } = useContext(AuthContext)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect( () => {
    const checkUserLoggedIn = async () => {
      if(userInfo){
        setIsUserLoggedIn(true)
      } else {
        setIsUserLoggedIn(false)
      }
    }

    checkUserLoggedIn()

  },[userInfo])
  return (
    <>
        {
            isUserLoggedIn === true ?
            <DrawerNavigation /> :
            <AuthNavigation />
        }
    </>
  )
}

export default MainNavigation