
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useLogoutUserMutation } from '../redux-toolkit/services/authService'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '../redux-toolkit/features/authSlice'
import { authApi } from '../redux-toolkit/services/authService'
import { useNavigate } from 'react-router-dom'
const LogoutButton = ({children}) => {
    const [logoutUser,{ isLoading, isSuccess, isError, error }] = useLogoutUserMutation()
    const authUser = useSelector((state)=>state.auth.authUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = async()=>{
        try {
            const response = await logoutUser().unwrap();
            console.log(response)
            if(response?.success){
                dispatch(setAuthUser(null))
                dispatch(authApi.util.resetApiState());
                toast.success("Logout successfully")
                console.log(authUser)
                setTimeout(() => {
                    navigate('/');
                }, 100);
            }


        } catch (error) {
            toast.error("Failed to logout")
        }
    }


    
  return (
    <Button onClick= {handleLogOut} className="flex gap-1 items-center justify-start p-0 w-full">
       {isLoading &&<Loader2 className='animate-spin' size={18} />} {children}
    </Button>
  )
}

export default LogoutButton