import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/authPages/RegisterPage";
import LoginPage from "./pages/authPages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RootLayout from "./layouts/RootLayout";
import AdminOnlyRoute from "./components/AdminOnlyRoute";
import AddProblemPage from "./pages/AddProblemPage";
import ProblemsDisplayPage from "./pages/ProblemsDisplayPage";
import SingleProblemDetailsPage from "./pages/SingleProblemDetailsPage";
import Contests from "./pages/Contests";
import Battle from "./pages/Battle";
import Discuss from "./pages/Discuss";
import { useGetAuthUserQuery } from "./redux-toolkit/services/authService";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAuthUser } from "./redux-toolkit/features/authSlice";
import Profile from "./pages/profile/Profile";
import AuthModel from "./pages/authPages/AuthModel";

const App = () => {

	  const {
		data: authUser,
		isFetching,
		isLoading,
	  } = useGetAuthUserQuery();
	  const dispatch = useDispatch()

	  useEffect(()=>{
		dispatch(setAuthUser(authUser?.data))
	  },[authUser])

  return (
    <div className='flex flex-col items-center justify-start relative overflow-hidden'>
      <Toaster richColors position='top-center' />

      <Routes>
        {/* Public HomePage route */}
        <Route path='/' element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/auth" element={<AuthModel/>} />

          {/* Protected routes */}
          <Route
            path='/problems'
            element={
              <ProtectedRoute>
                <ProblemsDisplayPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/contests'
            element={
              <ProtectedRoute>
                <Contests />
              </ProtectedRoute>
            }
          />

          <Route
            path='/battle'
            element={
              <ProtectedRoute>
                <Battle />
              </ProtectedRoute>
            }
          />

          <Route
            path='/discuss'
            element={
              <ProtectedRoute>
                <Discuss />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route element={<AdminOnlyRoute />}>
            <Route
              path='/add-problem'
              element={
                <ProtectedRoute>
                  <AddProblemPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>

        {/* Single problem route */}
        <Route
          path='/problems/:id'
          element={
            <ProtectedRoute>
              <SingleProblemDetailsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;