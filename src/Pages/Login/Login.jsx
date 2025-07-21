import React, { useState } from "react";
import "./Login.css";
import { loginApi } from "../../apis/BackendApisImpl";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
const Login = () => {
	const navigate = useNavigate();
	const [isLoading, setisLoading] = useState(false);
	const [form, setForm] = useState({
		Username: "",
		password: "",
	});
	const [error, setError] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		setisLoading(true);
		e.preventDefault();
		const a = await loginApi(form.Username, form.password);
		if (a == null) {
		} else {
			Cookie.set("cookie", a, { expires: 7 });
			navigate("/");
		}
		setisLoading(false);
	};

	return (
		<div className="login-container">
			{isLoading ? <Loader /> : null}
			<form className="login-form" onSubmit={handleSubmit} noValidate>
				<h2>Login</h2>

				<label>Username</label>
				<input type="Username" name="Username" value={form.Username} onChange={handleChange} />

				<label>Password</label>
				<input type="password" name="password" value={form.password} onChange={handleChange} />

				{error && <p className="error-text">{error}</p>}

				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
