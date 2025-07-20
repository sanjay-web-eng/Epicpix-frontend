import React, { useState } from "react";
import "./Admin.css";
import { DeleteImageForADMIN, DeleteUsersForADMIN, GetAllUsersForADMIN, GetAllImagesForADMIN } from "../../apis/BackendApisImpl";
import Cookie from "js-cookie";
import { NavLink } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
function Admin() {
	const [val, setval] = useState(0);
	const token = Cookie.get("cookie");
	const [UserData, setUserData] = useState([]);
	const [ImgData, setImgData] = useState([]);
	async function GetAllUser() {
		const api = await GetAllUsersForADMIN(token);
		console.log(api);
		setUserData(api);
	}
	async function GetAllImg() {
		const api = await GetAllImagesForADMIN(token);
		console.log(api);
		setImgData(api);
	}

	return (
		<div className="admin-main">
			<div className="sec-one">
				<div className="all-elm-of-sec-one">
					<button
						onClick={() => {
							setval(1), GetAllUser();
						}}
						checked
					>
						{" "}
						<samp>user</samp>
					</button>
					<button
						onClick={() => {
							setval(2);
						}}
					>
						{" "}
						<samp>delete-user</samp>
					</button>
					<button onClick={() => setval(3)}>
						{" "}
						<samp>delete img</samp>
					</button>
					<button
						onClick={() => {
							setval(4), GetAllImg();
						}}
					>
						{" "}
						<samp>img</samp>
					</button>
				</div>
			</div>
			<div className="sec-two">
				<div className="gbv" style={{ display: `${val == 1 ? "block" : "none"}` }}>
					{UserData.map((e) => {
						return (
							<div key={e.id} className="user-images-admin">
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
									<button style={{ border: "none", background: "#fff" }}>
										<MdDelete size={30} color="red" />
									</button>
								</div>
									<img src={e.profileImage} alt="" height={200} width={200} />
								<div className="likes-and-name">
									<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
										<BiLike />
									</div>
									<h3 style={{ width: "350px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
										{e.username}
									</h3>
								</div>
							</div>
						);
					}).reverse()}
				</div>
				<div className="g" style={{ display: `${val == 2 ? "block" : "none"}` }}>
					<h1>delete user</h1>
				</div>
				<div className="g" style={{ display: `${val == 3 ? "block" : "none"}` }}>
					<h1>delete img</h1>
				</div>
				<div className="g" style={{ display: `${val == 4 ? "block" : "none"}` }}>
					{ImgData.map((e) => {
						return <h1>{e.ImgName}</h1>;
					}).reverse()}
				</div>
			</div>
		</div>
	);
}

export default Admin;
