import React, { useState } from "react";
import { signupApi } from "../../apis/BackendApisImpl";
import "./Signin.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
const Signin = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
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

		// Stop if validation failed
		if (Object.keys(validationErrors).length > 0) return;

		setIsLoading(true);
		try {
			const token = await signupApi(form.name, form.email, form.password);
			if (!token) {
				alert("Signup failed. Please try again.");
			} else {
				Cookies.set("cookie", token, { expires: 7 });
				navigate("/");
				setForm({ name: "", email: "", password: "", confirmPassword: "" });
			}
		} catch (err) {
			console.error("Signup error:", err);
			alert("Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="signup-container">
			{isLoading && <Loader />}
			<form className="signup-form" onSubmit={handleSubmit} noValidate>
				<h2>Create an Account</h2>

				<label htmlFor="name">Username</label>
				<input type="text" name="name" value={form.name} onChange={handleChange} className={errors.name ? "error" : ""} />
				{errors.name && <p className="error-text">{errors.name}</p>}

				<label htmlFor="email">Email</label>
				<input type="email" name="email" value={form.email} onChange={handleChange} className={errors.email ? "error" : ""} />
				{errors.email && <p className="error-text">{errors.email}</p>}

				<label htmlFor="password">Password</label>
				<input type="password" name="password" value={form.password} onChange={handleChange} className={errors.password ? "error" : ""} />
				{errors.password && <p className="error-text">{errors.password}</p>}

				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					type="password"
					name="confirmPassword"
					value={form.confirmPassword}
					onChange={handleChange}
					className={errors.confirmPassword ? "error" : ""}
				/>
				{errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

				<button type="submit" disabled={isLoading}>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default Signin;
