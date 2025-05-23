import React from 'react'


const ProtectedRoute = ({ children, authentication}) => {
    console.log(authentication)
    return <>{children}</>;
}

export default ProtectedRoute