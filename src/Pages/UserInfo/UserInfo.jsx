import React, { useEffect, useState, useContext } from "react";
import "./UserInfo.css";
import { createcontext } from "../../context/Context";
import { updateUsername, updateEmail, updateProfileImage } from "../../apis/BackendApisImpl";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

function UserInfo() {
	const navigate = useNavigate();
	const cookie = Cookie.get("cookie");
	const userData = useContext(createcontext);

	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [val, setVal] = useState(0);
	const [tempURL, setTempURL] = useState(null);
	const [newFile, setNewFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (userData) {
			setUserName(userData.username || "");
			setEmail(userData.email || "");
		}
	}, [userData]);

	const handleUpdate = async () => {
		try {
			setIsLoading(true);

			let response;

			if (val === 1) {
				response = await updateUsername(userName, userData.username, cookie);
			} else if (val === 2) {
				response = await updateEmail(email, userData.username, cookie);
			} else if (val === 3 && newFile) {
				response = await updateProfileImage(newFile, userData.username, cookie);
			} else {
				setIsLoading(false);
				return;
			}

			if (response) {
				Cookie.set("cookie", response, { expires: 7 });
				navigate("/user-dashboard");
			}
		} catch (error) {
			console.error("Update failed:", error);
		} finally {
			setIsLoading(false);
			setVal(0);
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const preview = URL.createObjectURL(file);
			setTempURL(preview);
			setNewFile(file);
			setVal(3);
		}
	};

	const logout = () => {
		Cookie.remove("cookie");
		navigate("/");
	};

	return (
		<div className="user-info-main">
			{isLoading && <Loader />}
			<div className="user-info-edit">
				<button className="logout-btn" onClick={logout}>
					Logout
				</button>

				<div className="profile-img-wrapper">
					<img
						src={tempURL || userData?.ProfileImage || "https://via.placeholder.com/150"}
						alt={userData?.username ? `${userData.username}'s Profile` : "User Profile"}
						className="profile-img"
					/>
				</div>

				<div className="input-group">
					<label>Username</label>
					<input
						type="text"
						value={userName}
						onChange={(e) => {
							setUserName(e.target.value);
							setVal(1);
						}}
						placeholder="Enter username"
					/>
				</div>

				<div className="input-group">
					<label>Profile Image</label>
					<input type="file" accept="image/*" onChange={handleImageChange} />
				</div>

				<div className="input-group">
					<label>Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							setVal(2);
						}}
						placeholder="Enter email"
					/>
				</div>

				<button
					className="save-btn"
					onClick={handleUpdate}
					disabled={isLoading || val === 0}
				>
					{isLoading ? "Saving..." : "Save Changes"}
				</button>
			</div>
		</div>
	);
}

export default UserInfo;
