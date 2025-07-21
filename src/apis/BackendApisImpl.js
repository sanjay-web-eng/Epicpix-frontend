import axios from "axios";
let url = "https://epicpix.onrender.com";

// === PUBLIC APIS ===

async function getHomedata() {
	try {
		const { data, status } = await axios.get(`${url}/public/get-all-image`);
		if (status === 200) return data;
		else if (status === 400) alert("Something went wrong");
	} catch (error) {
		alert("Error fetching home data");
		console.error(error);
	}
}

async function getImgById(ImgId) {
	try {
		const { data } = await axios.post(`${url}/public/get-img/${ImgId}`);
		return data;
	} catch (error) {
		alert("Error fetching image by ID");
		console.error(error);
	}
}

async function signupApi(username, password, email) {
	try {
		const data = new FormData();
		data.append("username", username);
		data.append("email", email);
		data.append("password", password);

		const { data: res, status } = await axios.post(`${url}/public/singup`, data, {
			headers: { "Content-Type": "multipart/form-data" },
		});

		switch (status) {
			case 201:
				return res;
			case 226:
				alert("This username already exists");
				break;
			case 400:
				alert("Something went wrong");
				break;
		}
	} catch (error) {
		alert("Signup failed");
		console.error(error);
	}
}

async function loginApi(username, password) {
	const formdata = new FormData();
	formdata.append("username", username);
	formdata.append("password", password);
	try {
		const { data, status } = await axios.post(`${url}/public/login` , formdata);
		if (status === 200) return data;
	} catch (error) {
		if (error.response?.status === 401) alert("Wrong password");
		else if (error.response?.status === 404) alert("User not found");
		else alert("Login failed. Please try again.");
	}
}

// === AUTHORIZED USER ENDPOINTS ===

async function updateUsername(username, oldusername, token) {
	try {
		const data = new FormData();
		data.append("newUsername", username);
		data.append("oldUsername", oldusername);

		const { data: res, status } = await axios.post(`${url}/user/update-username`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		alert("username update");
		if (status === 200) return res;
	} catch (error) {
		alert("Failed to update username");
		console.error(error);
	}
}

async function updateEmail(newEmail, username, token) {
	try {
		const data = new FormData();
		data.append("newEmail", newEmail);
		data.append("username", username);

		const { data: res, status } = await axios.post(`${url}/user/update-email`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		if (status === 200) return res;
		else alert("email update");
	} catch (error) {
		alert("Update email error");
		console.error(error);
	}
}

async function updateProfileImage(newPP, username, token) {
	try {
		const data = new FormData();
		data.append("newImage", newPP);
		data.append("username", username);

		const { data: res } = await axios.post(`${url}/user/update-profileimage`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		alert("profile image update");
		return res;
	} catch (error) {
		alert("Profile image update failed");
		console.error(error);
	}
}

async function getUser(token) {
	try {
		const { data } = await axios.post(`${url}/public/get-user/${token}`);
		return data;
	} catch (error) {
		alert("Error fetching user");
		console.error(error);
	}
}

async function saveImg(username, imgID, token) {
	try {
		const { data: res, status } = await axios.post(`${url}/user/save-img/${username}/${imgID}`, null, {
			headers: { Authorization: `Bearer ${token}` },
		});

		if (status === 200) return res;
		else if (status === 226) alert("You already saved this post");
	} catch (error) {
		alert("Failed to save image");
		console.error(error);
	}
}

async function removeImg(username, imgID, token) {
	try {
		const { data: res, status } = await axios.post(`${url}/user/remove-save-img/${username}/${imgID}`, null, {
			headers: { Authorization: `Bearer ${token}` },
		});

		if (status === 200) return res;
		else if (status === 226) alert("Post already removed");
	} catch (error) {
		alert("Failed to remove image");
		console.error(error);
	}
}

// === LIKES ===

async function setLikes(username, postId, token) {
	try {
		const { data: res, status } = await axios.post(
			`${url}/likes/set-like`,
			{ username, postId },
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);

		alert(res);
		return res;
	} catch (error) {
		alert("Failed to like post");
		console.error(error);
	}
}

async function removeLikes(username, postId, token) {
	try {
		const { data: res, status } = await axios.post(
			`${url}/likes/remove-like`,
			{ username, postId },
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);

		alert(res);
		return res;
	} catch (error) {
		alert("Failed to remove like");
		console.error(error);
	}
}

// === IMAGE UPLOAD/EDIT ===

async function makeImg(imgName, username, isLikesEnable, file, token) {
	try {
		const data = new FormData();
		data.append("imgName", imgName);
		data.append("username", username);
		data.append("isLikesEnable", isLikesEnable);
		data.append("file", file);

		const { status, data: res } = await axios.post(`${url}/image/set-image`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		switch (status) {
			case 200:
				alert(res);
				return res;
			case 404:
				alert("User not found");
				break;
			case 204:
				alert("Missing info");
				break;
			case 500:
				alert("Failed to upload image");
				break;
			default:
				alert("Unexpected error");
		}
	} catch (error) {
		alert("Image upload failed");
		console.error(error);
	}
}

async function updateName(newName, id, token) {
	try {
		const data = new FormData();
		data.append("newName", newName);
		data.append("id", id);

		const { data: res, status } = await axios.post(`${url}/image/update-name`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		if (status === 200) return res;
		else alert("Failed to update image name");
	} catch (error) {
		alert("Update name failed");
		console.error(error);
	}
}

async function updateURL(newFile, id, token) {
	try {
		const data = new FormData();
		data.append("newFile", newFile);
		data.append("id", id);

		const { data: res, status } = await axios.post(`${url}/image/update-imageUrl`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		if (status === 200) return res;
		else alert("Failed to update image");
	} catch (error) {
		alert("Update image URL failed");
		console.error(error);
	}
}

async function DeleteImg(id, username, token) {
	try {
		const data = new FormData();
		data.append("username", username);
		data.append("id", id);

		const { data: res, status } = await axios.post(`${url}/image/delete-img`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		if (status === 200) return res;
		else alert(res);
	} catch (error) {
		alert("Delete image failed");
		console.error(error);
	}
}

// === ADMIN ===

async function GetAllUsersForADMIN(token) {
	try {
		const { data, status } = await axios.get(`${url}/admin/all-users`, { headers: { Authorization: `Bearer ${token}` } });
		if (status === 200) return data;
	} catch (error) {
		alert("Failed to fetch users");
		console.error(error);
	}
}

async function GetAllImagesForADMIN(token) {
	try {
		const { data, status } = await axios.get(`${url}/admin/all-img`, { headers: { Authorization: `Bearer ${token}` } });
		if (status === 200) return data;
	} catch (error) {
		alert("Failed to fetch images");
		console.error(error);
	}
}

async function DeleteUsersForADMIN(postId, token) {
	try {
		const { data, status } = await axios.post(`${url}/admin/delete-users/${postId}`, null, { headers: { Authorization: `Bearer ${token}` } });
		if (status === 200) return data;
	} catch (error) {
		alert("Failed to delete user");
		console.error(error);
	}
}

async function DeleteImageForADMIN(UserId, token) {
	try {
		const { data, status } = await axios.post(`${url}/admin/delete-image/${UserId}`, null, { headers: { Authorization: `Bearer ${token}` } });
		if (status === 200) return data;
	} catch (error) {
		alert("Failed to delete image");
		console.error(error);
	}
}

export {
	getHomedata,
	signupApi,
	loginApi,
	getUser,
	saveImg,
	makeImg,
	setLikes,
	removeLikes,
	removeImg,
	getImgById,
	updateUsername,
	updateEmail,
	updateProfileImage,
	DeleteImg,
	updateName,
	updateURL,
	DeleteImageForADMIN,
	DeleteUsersForADMIN,
	GetAllImagesForADMIN,
	GetAllUsersForADMIN,
};
