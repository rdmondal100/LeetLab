import React, { useEffect, useState } from "react";
import { useGetAuthUserQuery } from "../redux-toolkit/services/authService";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux-toolkit/features/authSlice";
import { Loader2 } from "lucide-react";
import LoginModal from "../pages/authPages/AuthModel";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Capture original path
  const redirectPath = location.pathname + location.search;

  const {
    data: authUser,
    isFetching,
    isLoading,
  } = useGetAuthUserQuery();
console.log(authUser)
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser?.success) {
      dispatch(setAuthUser(authUser.data));
    } else {
      dispatch(setAuthUser(null));
    }

    if (!isFetching && !isLoading) {
      setAuthChecked(true);
    }
  }, [authUser, isFetching, isLoading, dispatch]);

  useEffect(() => {
    if (authChecked && !authUser?.success) {
      setShowLoginModal(true);
    }
  }, [authChecked, authUser]);

  const handleModalClose = () => {
    setShowLoginModal(false);
    // Redirect to home if user closes modal without logging in
    navigate("/");
  };

  if (!authChecked) {
    return (
      <div className='flex justify-center items-center gap-2 text-3xl font-bold'>
        <Loader2 className='animate-spin' /> Checking Auth...
      </div>
    );
  }

  if (!authUser?.success) {
    return showLoginModal ? (
      <LoginModal 
        onClose={handleModalClose} 
        redirectPath={redirectPath} 
      />
    ) : null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;