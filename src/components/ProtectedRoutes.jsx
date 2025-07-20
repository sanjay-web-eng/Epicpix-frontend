import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
function ProtectedRoutes({ children }) {
	const nav = useNavigate();
	const token = Cookie.get("cookie");

	useEffect(() => {
		if (!token) {
			nav("/login");
		}
	}, [token]);

	return children;
}

export default ProtectedRoutes;
