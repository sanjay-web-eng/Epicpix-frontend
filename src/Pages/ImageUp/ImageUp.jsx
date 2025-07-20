import React, { useContext, useState } from "react";
import "./ImageUp.css";
import { makeImg } from "../../apis/BackendApisImpl";
import Loader from "../../components/Loader";
import Cookie from "js-cookie";
import { createcontext } from "../../context/Context";
function ImageUp() {
	const UserInfo = useContext(createcontext);
	const token = Cookie.get("cookie");
	const [imageFile, setImageFile] = useState(null);
	const [imageName, setImageName] = useState("");
	const [previewURL, setPreviewURL] = useState("");
	const [isLikeEnable, setIsLikeEnable] = useState(true);
	const [isLoadeing, setisLoadeing] = useState(false);
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			setPreviewURL(URL.createObjectURL(file));
		}
	};

	const handleUpload = async () => {
//		if (imageFile && imageName) {
			setisLoadeing(true);
			const api = await makeImg(imageName, UserInfo.username, isLikeEnable, imageFile, token);
			setImageFile(null);
			setImageName("");
			setPreviewURL("");
			setisLoadeing(false);
		//}
	};

	return (
		<div className="container">
			{isLoadeing ? <Loader /> : null}
			<div className="abccc">
				<div className="img-preview">
					{previewURL.length == 0 ? <h1 className="h1">No preview</h1> : <img className="img" src={previewURL} alt="" />}
				</div>
				<div className="img-info">
					<div className="input-div">
						<input type="file" onChange={handleImageChange} accept="image/*" className="img-input" />
						<input
							className="input"
							type="text"
							placeholder="Enter image name"
							value={imageName}
							onChange={(e) => setImageName(e.target.value)}
						/>
						<div className="s">
							<label>Enable likes</label>
							<input type="checkbox" checked={isLikeEnable} onChange={(e) => setIsLikeEnable(e.target.checked)} />
						</div>
						<button className="but" onClick={handleUpload}>
							Upload
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ImageUp;
