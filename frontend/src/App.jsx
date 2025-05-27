import { Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/authPages/RegisterPage";
import LoginPage from "./pages/authPages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

import { Toaster } from "@/components/ui/sonner";
import RootLayout from "./layouts/RootLayout";
import AdminOnlyRoute from "./components/AdminOnlyRoute";
import AddProblemPage from "./pages/AddProblemPage";

const App = () => {
	return (
		<div className='flex flex-col items-center justify-start '>
			<Toaster richColors position='top-center' />

			<Routes>
				{/* auth  */}
				<Route
					path='/login'
					element={
						<ProtectedRoute authentication={false}>
							<LoginPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/register'
					element={
						<ProtectedRoute authentication={false}>
							<RegisterPage />
						</ProtectedRoute>
					}
				/>

				{/* protected routes  */}
				<Route path='/' element={<RootLayout />}>
					<Route
						index
						element={
							<ProtectedRoute authentication={true}>
								<HomePage />
							</ProtectedRoute>
						}
					/>


        {/* Admin routes */}
        <Route element={<AdminOnlyRoute/>}>
          <Route
          path="/add-problem"
          element={
            <ProtectedRoute authentication={true}>
              <AddProblemPage/>
            </ProtectedRoute>
          }/>
        </Route>
				</Route>

			</Routes>
		</div>
	);
};

export default App;
