
import { Route, Routes } from 'react-router-dom'
import {Button} from './components/ui/button'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/authPages/RegisterPage'
import LoginPage from './pages/authPages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
const App  = ()=>{



  return (
  <div className="flex flex-col items-center justify-start ">
    
    <Routes>
      {/* auth  */}
      <Route
       path="/login" 

       element={
        <ProtectedRoute authentication={true}>
          <LoginPage/>
        </ProtectedRoute>
      }
        />

      <Route 
      path="/register" 
      element={<RegisterPage/>} 
      />

      <Route 
      path='/' 
      element={<HomePage/>}
      />

    </Routes>
   
  </div>)
  
}


export default App