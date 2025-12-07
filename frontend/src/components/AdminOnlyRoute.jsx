
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminOnlyRoute = () => {
    const authUser = useSelector((state)=>state.auth.authUser)
    if(!authUser || authUser?.role !=="ADMIN"){
        return <Navigate to="/" replace/>
    }
  return (
    <Outlet/>
  )
}

export default AdminOnlyRoute