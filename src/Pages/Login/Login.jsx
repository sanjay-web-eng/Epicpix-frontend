import React, { useState } from "react";
import "./Login.css";
import { loginApi } from "../../apis/BackendApisImpl";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {
	const navigate = useNavigate();
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
		e.preventDefault();
		const a = await loginApi(form.Username, form.password);
		console.log(a);
		if (a == null) {
		} else {
			Cookie.set("cookie", a, { expires: 7 });
			navigate("/");
		}
	};

	return (
		<div className="login-container">
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
