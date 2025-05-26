import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const RootLayout = () => {
  return (
    <main className='flex flex-col w-full container'>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </main>
  )
}

export default RootLayout