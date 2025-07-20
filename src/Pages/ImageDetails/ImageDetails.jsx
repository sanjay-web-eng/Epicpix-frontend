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
import R from "../../assets/react.svg";
 
function ImageDetails() {
	const UserInfo = useContext(createcontext);
	const cookie = Cookie.get("cookie");
	const { id } = useParams();
	const [data, setdata] = useState({});
	const [isOpen, setisOpen] = useState(true);
	const [Loader, setLoader] = useState(false);
	async function getImg() {
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
		<div className="abc" style={{ backgroundImage: `url(${data.imageUrl})` }}>
			<div className="dcsdc">
				{isOpen && (
					<div
						style={{
							width: "100%",
							justifyContent: "center",
							alignItems: "center",
							display: "flex",
							height: "100%",
							position: "absolute",
							margin: "5px",
						}}
					>
						<BeatLoader width="99%" />
					</div>
				)}
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
						<h1 style={{ paddingLeft: "3px", justifyContent: "start", display: "flex", color: "#fff" }}>{data.ImgName}</h1>
						<div className="likes">
							<button
								onClick={() => {
									if (data.isLikesEnable) {
										SetLikes(data.id);
									} else {
										alert("Likes are disable for this post");
									}
								}}
								style={{ border: "none", background: "transparent", padding: 0 }}
							>
								<BiSolidLike size={40} color={"#ccc"} />
							</button>
							{data.isLikesEnable ? (
								<>
									<h2 style={{ fontSize: 30, color: "#fff" }}>
										{Array.isArray(data.likes) && data.likes.length > 0 ? data.likes.length : 0}
									</h2>
								</>
							) : (
								<span style={{ color: "#fff" }}>Likes</span>
							)}
							{Loader ? <BeatLoader size={12} color="#fff" /> : null}
						</div>

						<div className="user">
							<img src={data.ownerProfileImage} alt="" className="User-img" />
							<h3 style={{ color: "#fff" }}>{data.ownerUsername}</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ImageDetails;
