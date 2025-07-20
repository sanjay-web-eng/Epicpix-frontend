import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Admin from "./Pages/Admin/Admin";
import ImageUp from "./Pages/ImageUp/ImageUp";
import ImageDetails from "./Pages/ImageDetails/ImageDetails";
import Login from "./Pages/Login/Login";
import Signin from "./Pages/Signin/Signin";
import Users from "./Pages/User/User";
import UserInfo from "./Pages/UserInfo/UserInfo";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { createcontext } from "./context/Context";
import { getUser } from "./apis/BackendApisImpl";
import Cookie from "js-cookie";
import "./App.css";
import { useEffect, useState } from "react";
function App() {
	const token = Cookie.get("cookie");
	const [data, setdata] = useState({});
	const getUserInfo = async () => {
		if (token == null) {
		} else {
			const api = await getUser(token);
			setdata(api);
		}
	};
	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<>
			<createcontext.Provider value={data}>
				<Routes>
					<Route index element={<Home />} />
					<Route
						path="/admin"
						element={
							<ProtectedRoutes>
								<Admin />
							</ProtectedRoutes>
						}
					/>
					<Route
						path="/image"
						element={
							<ProtectedRoutes>
								<ImageUp />
							</ProtectedRoutes>
						}
					/>
					<Route path="/image/:id" element={<ImageDetails />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signin" element={<Signin />} />
					<Route
						path="/user-info"
						element={
							<ProtectedRoutes>
								<UserInfo />
							</ProtectedRoutes>
						}
					/>
					<Route
						path="/user-dashboard"
						element={
							<ProtectedRoutes>
								<Users />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			</createcontext.Provider>
		</>
	);
}

export default App;
