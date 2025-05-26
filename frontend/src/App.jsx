
import { Route, Routes } from 'react-router-dom'
import {Button} from './components/ui/button'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/authPages/RegisterPage'
import LoginPage from './pages/authPages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'

import { Toaster } from "@/components/ui/sonner"

const App  = ()=>{



  return (
  <div className="flex flex-col items-center justify-start ">
        <Toaster richColors    position="top-center" />

    <Routes>
      {/* auth  */}
      <Route
       path="/login" 

       element={
        <ProtectedRoute authentication={false}>
          <LoginPage/>
        </ProtectedRoute>
      }
        />

      <Route 
      path="/register" 
      element={
        <ProtectedRoute authentication={false} >
      <RegisterPage/>

        </ProtectedRoute>}
      />

      <Route 
      path='/' 
      element={
        <ProtectedRoute authentication={true}>
      <HomePage/>
      </ProtectedRoute>

      }
      />

    </Routes>
   
  </div>)
  
}


export default App