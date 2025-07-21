import React, { useEffect, useState } from "react";
import "./ImageDetails.css";
import { useParams } from "react-router-dom";
import { getImgById, setLikes, saveImg } from "../../apis/BackendApisImpl";
import { BeatLoader, FadeLoader } from "react-spinners";
import { BiSolidLike } from "react-icons/bi";
import Cookie from "js-cookie";
import { useContext } from "react";
import { createcontext } from "../../context/Context";
import { GoPin } from "react-icons/go";
import Loaderr from "../../components/Loader";
function ImageDetails() {
	const UserInfo = useContext(createcontext);
	const cookie = Cookie.get("cookie");
	const { id } = useParams();
	const [data, setdata] = useState({});
	const [isOpen, setisOpen] = useState(false);
	const [Loader, setLoader] = useState(false);
	async function getImg() {
		setisOpen(true);
		const api = await getImgById(id);
		setdata(api);
		setisOpen(false);
	}
	async function SetLikes(postId) {
		setLoader(true);
		const api = await setLikes(UserInfo.username, postId, cookie);
		console.log(api);
		getImg();
		setLoader(false);
	}
	async function SaveImg(postId) {
		const api = await saveImg(UserInfo.username, postId, cookie);
		alert(api);
	}
	useEffect(() => {
		getImg();
		console.log("this from data", data);
	}, []);

	return (
		<div className="abc">
			{isOpen ? <Loaderr /> : null}
			<div className="dcsdc">
				<div className="imgDiv">
					<a href={data.imageUrl} download>
						<img src={data.imageUrl} alt="" className="DetailImg" />
					</a>
					<button
						onClick={() => {
							SaveImg(data.id);
						}}
					>
						<GoPin size={23} />
					</button>

					<div className="side-img-detail">
						<h1 style={{ paddingLeft: "3px", justifyContent: "start", display: "flex", color: "#000" }}>{data.ImgName}</h1>
						<div className="likes">
							<button
								onClick={() => {
									if (data.isLikesEnable) {
										SetLikes(data.id);
									} else {
										alert("Likes are disable for this post");
									}
								}}
								style={{ border: "none", background: "transparent" , margin:0 ,padding:0 , paddingTop:1}}
							>
								<BiSolidLike size={27} color={"#000"} />
							</button>
							{data.isLikesEnable ? (
								<>
									<h2 style={{ fontSize: 20, color: "#000" }}>
										{Array.isArray(data.likes) && data.likes.length > 0 ? data.likes.length : 0}
									</h2>
								</>
							) : (
								<span style={{ color: "#000" }}>Likes</span>
							)}
						</div>

						<div className="user">
							<img src={data.ownerProfileImage} alt="" className="User-img" />
							<h3 style={{ color: "#000", fontSize: 15 }}>{data.ownerUsername}</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ImageDetails;
