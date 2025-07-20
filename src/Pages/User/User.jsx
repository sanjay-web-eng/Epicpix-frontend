import React, { useEffect, useState } from "react";
import { getUser, updateName, updateURL, DeleteImg, removeLikes, removeImg } from "../../apis/BackendApisImpl";
import Cookies from "js-cookie";
import { BarLoader } from "react-spinners";
import "./User.css";
import { BiLike } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Loader from "../../components/Loader";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { createcontext } from "../../context/Context";
import { NavLink, useNavigate } from "react-router-dom";
import { BiSolidDislike } from "react-icons/bi";

function User() {
	const navigation = useNavigate();
	const UserInfo = useContext(createcontext);
	const cookie = Cookies.get("cookie");
	const [userData, setuserData] = useState({});
	const [userLikes, setuserLikes] = useState([]);
	const [userSave, setuserSave] = useState([]);
	const [userImg, setuserImg] = useState([]);
	const [IsOpen, setIsOpen] = useState(false);
	const [id, setid] = useState();
	const [Val, setVal] = useState(1);
	const [newName, setnewName] = useState("");
	const [NewFileImg, setNewFileImg] = useState(null);
	const [NewFileImgTempURL, setFileImgTempURL] = useState(null);
	const [loader, setloader] = useState(false);

	const GetImage = (e) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			setNewFileImg(selectedFile);
			const temp = URL.createObjectURL(selectedFile);
			setFileImgTempURL(temp);
			console.log("Selected file:", selectedFile);
		}
	};
	const GetUserData = async () => {
		const value = Cookies.get("cookie");
		const a = await getUser(value);
		setuserData(a);
		setuserImg(a.usersImages);
		setuserSave(a.saveImages);
		setuserLikes(a.userlikes);
		console.log("Fetched user data:", a);
	};
	const updatename = async (id) => {
		if (cookie == null) {
			console.log("cookie is not there");
		} else {
			setloader(true);
			const newname = await updateName(newName, id, cookie);
			console.log(newname);
			setIsOpen(false);
			GetUserData();
			setloader(false);
		}
	};
	const updateImageURL = async (id) => {
		if (NewFileImg == null) {
			alert("image didn't got ");
		} else {
			setloader(true);
			const api = await updateURL(NewFileImg, id, cookie);
			console.log(api);
			setIsOpen(false);
			setNewFileImg(null);
			GetUserData();
			setloader(false);
		}
	};
	const deleteImg = async (id) => {
		const delet = confirm("do you went to delete this");
		console.log(delet, id);
		if (delet) {
			setloader(true);
			const api = await DeleteImg(id, userData.username, cookie);
			console.log(api);
			setIsOpen(false);
			GetUserData();
			setloader(false);
		}
	};
	const RemoveLikes = async (postId) => {
		const api = await removeLikes(UserInfo.username, postId, cookie);
		console.log(api);
		GetUserData();
	};
	const RemoveSaved = async (postID) => {
		const api = await removeImg(UserInfo.username, postID, cookie);
		console.log(api);
		GetUserData();
	};
	useEffect(() => {
		GetUserData();
	}, []);

	return (
		<div className="user-main">
			{Object.keys(userData).length === 0 && (
				<div
					style={{
						width: "99%",
						justifyContent: "center",
						alignItems: "center",
						display: "flex",
						height: "5px",
						position: "absolute",
						margin: "5px",
					}}
				>
					<BarLoader width="99%" />
				</div>
			)}

			{Object.keys(userData).length > 0 && (
				<>
					<div className="user-info">
						<img className="user-info-pp" src={userData.profileImage} alt="" onClick={() => navigation("/user-info")} />
						<h1 className="user-info-name">{userData.username}</h1>
					</div>

					{/* this is f */}
					<div
						style={{
							backdropFilter: "blur(15px) saturate(76%)",
							WebkitBackdropFilter: "blur(20px) saturate(76%)",
							backgroundColor: "rgba(17, 25, 40, 0.14)",
							width: "100%",
							top: 0,
							height: "100vh",
							display: `${IsOpen ? "flex" : "none"}`,
							justifyContent: "center",
							alignItems: "center",
							position: "fixed",
						}}
					>
						{loader ? <Loader /> : null}
						<div className="idk">
							<div className="">
								<button
									onClick={() => {
										setIsOpen(false);
									}}
									style={{
										padding: "10px",
										borderRadius: 10,
										border: "none",
										margin: 5,
										marginTop:25,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										backgroundColor: "red",
									}}
								>
									<IoClose size={22} color="#fff" />
								</button>
							</div>

							<div className="ab">
								<div className="update-name">
									<h3 style={{ margin: 3 }}>update name</h3>
									<input
										type="text"
										name="text"
										placeholder="new name"
										onChange={(e) => {
											setnewName(e.target.value);
										}}
										value={newName}
										style={{ padding: 12, margin: 5, borderRadius: 10, width: "250px" }}
									/>
									<button
										onClick={() => {
											updatename(id, newName);
											setnewName("");
										}}
										style={{ padding: 12, margin: 5, borderRadius: 10, width: "90px" }}
									>
										save
									</button>
								</div>
								<div className="update-img">
									<h3 style={{ margin: 0, paddingLeft: 10 }}>update image</h3>
									<div className="" style={{ height: "73%", alignItems: "center", display: "grid" }}>
										<input type="file" accept="image/*" onChange={GetImage} />
										<img src={NewFileImgTempURL} alt="Preview" height={200} width={200} style={{ objectFit: "contain" }} />
									</div>
									<button
										onClick={() => {
											updateImageURL(id);
										}}
										style={{
											padding: 15,
											width: "200px",
											borderRadius: 10,
											border: "2px soild",
											borderColor:"#000",
											color: "#000",
											fontSize: 16,
											background: "#fff",
											marginLeft: 5,
										}}
									>
										Save
									</button>
								</div>
							</div>
							<div className="b">
								<h3 style={{ marginLeft: 10 }}>delete wallpaper</h3>
								<button
									style={{
										width: 100,
										margin: 4,
										background: "red",
										border: "none",
										borderRadius: "10px",
										height: "30px",
										color: "#fff",
									}}
									onClick={() => {
										deleteImg(id);
									}}
								>
									delete
								</button>
							</div>
						</div>
					</div>

					<div className="user-imgs">
						<div className="user-imgs-links-area">
							<button onClick={() => setVal(1)}>Save</button>
							<button onClick={() => setVal(2)}>Likes</button>
							<button onClick={() => setVal(3)}>My wallpapers</button>
						</div>

						<div className="user-imgs-data-area">
							{Val === 1 && userSave.length > 0 ? (
								userSave
									.map((e, index) => (
										<div key={index} className="user-images">
											<div
												style={{
													height: 32,
													justifyContent: "end",
													alignItems: "center",
													display: "flex",
													paddingRight: 9,
													width: "inherit",
												}}
											>
												<button
													onClick={() => {
														RemoveSaved(e.id);
													}}
													style={{ border: "none", background: "#fff" }}
												>
													<MdDelete size={30} color="red" />
												</button>
											</div>
											<NavLink to={`http://localhost:5173/image/${e.id}`}>
												<img src={e.imageUrl} alt="" className="user-images-img" />
											</NavLink>
											<div className="likes-and-name">
												<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
													<BiLike />
													{e.likes.length}
												</div>
												<h3 style={{ width: "350px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
													{e.ImgName}
												</h3>
											</div>
										</div>
									))
									.reverse()
							) : Val === 2 && userLikes.length > 0 ? (
								userLikes
									.map((e, index) => (
										<div key={index} className="user-images">
											<div
												style={{
													height: 32,
													justifyContent: "end",
													alignItems: "center",
													display: "flex",
													paddingRight: 9,
													width: "inherit",
												}}
											>
												<button
													onClick={() => {
														RemoveLikes(e.id);
													}}
													style={{ border: "none", background: "#fff" }}
												>
													<BiSolidDislike size={30} color="red" />
												</button>
											</div>
											<NavLink to={`http://localhost:5173/image/${e.id}`}>
												<img src={e.imageUrl} alt="" className="user-images-img" />
											</NavLink>
											<div className="likes-and-name">
												<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
													<BiLike />
													{e.likes.length}
												</div>
												<h3 style={{ width: "350px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
													{e.ImgName}
												</h3>
											</div>
										</div>
									))
									.reverse()
							) : Val === 3 && userImg.length > 0 ? (
								userImg
									.map((e, index) => (
										<div key={index} className="user-images">
											<div
												style={{
													height: 32,
													justifyContent: "end",
													alignItems: "center",
													display: "flex",
													paddingRight: 9,
													width: "inherit",
												}}
											>
												<button
													onClick={() => {
														setIsOpen(true);
														console.log(e.id);
														setid(e.id);
													}}
													style={{ border: "none", background: "#fff" }}
												>
													<IoSettingsOutline size={22} />
												</button>
											</div>
											<NavLink to={`http://localhost:5173/image/${e.id}`}>
												<img src={e.imageUrl} alt="" className="user-images-img" />
											</NavLink>

											<div className="likes-and-name">
												<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
													<BiLike />
													{e.likes.length}
												</div>
												<h3 style={{ width: "350px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
													{e.ImgName}
												</h3>
											</div>
										</div>
									))
									.reverse()
							) : (
								<h2>No Data</h2>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default User;
