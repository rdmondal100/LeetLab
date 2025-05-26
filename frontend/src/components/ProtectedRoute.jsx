import React, { useEffect } from 'react'
import { useGetAuthUserQuery } from '../redux-toolkit/services/authService';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux-toolkit/features/authSlice';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children, authentication = true}) => {
    console.log(authentication)
    const {
        data: authUser,
        isFetching,
        isLoading,
        error
      } = useGetAuthUserQuery()

      const dispatch = useDispatch()
    
      useEffect(() => {
        if (authUser) {
          dispatch(setAuthUser(authUser));
        }
      }, [authUser, dispatch]);


      if (isLoading || isFetching) {
        return <p>Loading...</p>; // Or show a spinner
      }
      if (!authentication && authUser) {
    return <Navigate to="/" replace />;
  }

    return <>{children}</>;
}

export default ProtectedRoute