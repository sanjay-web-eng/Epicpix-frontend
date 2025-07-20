import React, { useState } from "react";
import { singupApi } from "../../apis/BackendApisImpl";
import "./Signin.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Signin = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const validate = () => {
		const errs = {};
		if (!form.name.trim()) errs.name = "Name is required.";
		if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Invalid email address.";
		if (form.password.length < 6) errs.password = "Password must be at least 6 characters.";
		if (form.confirmPassword !== form.password) errs.confirmPassword = "Passwords do not match.";
		return errs;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validate();
		setErrors(validationErrors);
		const api = await singupApi(form.name, form.email, form.password);
		console.log(api);
		if (api == null) {
			return null;
		} else {
			handleSetCookie(api);
			navigate("/");
		}
		setForm({ name: "", email: "", password: "", confirmPassword: "" });
	};
	const handleSetCookie = (val) => {
		Cookies.set("cookie", val, { expires: 7 }); // Expires in 7 days
	};
	return (
		<div className="signup-container">
			<form className="signup-form" onSubmit={handleSubmit} noValidate>
				<h2>Create an Account</h2>

				<label htmlFor="name">Username</label>
				<input type="text" name="name" id="name" value={form.name} onChange={handleChange} className={errors.name ? "error" : ""} />
				{errors.name && <p className="error-text">{errors.name}</p>}

				<label htmlFor="email">Email</label>
				<input type="email" name="email" id="email" value={form.email} onChange={handleChange} className={errors.email ? "error" : ""} />
				{errors.email && <p className="error-text">{errors.email}</p>}

				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					value={form.password}
					onChange={handleChange}
					className={errors.password ? "error" : ""}
				/>
				{errors.password && <p className="error-text">{errors.password}</p>}

				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					value={form.confirmPassword}
					onChange={handleChange}
					className={errors.confirmPassword ? "error" : ""}
				/>
				{errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default Signin;
