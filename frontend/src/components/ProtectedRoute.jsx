import React, { useEffect, useState } from "react";
import { useGetAuthUserQuery } from "../redux-toolkit/services/authService";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux-toolkit/features/authSlice";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children, authentication = true }) => {
	const [authChecked, setAuthChecked] = useState(false);

	const {
		data: authUser,
		isFetching,
		isLoading,
		error,
	} = useGetAuthUserQuery();
	console.log(authUser);
	const dispatch = useDispatch();

	useEffect(() => {
		if (authUser?.success) {
			dispatch(setAuthUser(authUser?.data));
		} else {
			dispatch(setAuthUser(null));
		}

		if (!isLoading && !isFetching) {
			setAuthChecked(true);
		}
	}, [authUser, isLoading, isFetching]);

	if (!authChecked) {
		return (<div className="flex justify-center items-center gap-2 text-3xl font-bold">
        <Loader2 className="animate-spin" /> Loading...
      </div>)
	}

	if (authentication && !authUser?.success) {
		return <Navigate to='/login' replace />;
	}

	if (!authentication && authUser?.success) {
		return <Navigate to='/' replace />;
	}

	return <>{children}</>;
};
export default ProtectedRoute;
