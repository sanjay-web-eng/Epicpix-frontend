import React, { useEffect, useState } from "react";
import "./Navber.css";
import Logo from "../../assets/Screenshot_2025-07-12_015803-removebg-preview.png";
import Cookies from "js-cookie";
import { TiThMenu } from "react-icons/ti";
import { MdClose } from "react-icons/md";

function Navber() {
	const [isUserLogin, setisUserLogin] = useState(false);
	const handleGetCookie = () => {
		const value = Cookies.get("cookie");
		if (value == null) {
			setisUserLogin(false);
		} else {
			setisUserLogin(true);
		}
	};
	useEffect(() => {
		handleGetCookie();
	});

	const [isOpen, setisOpen] = useState(false);
	return (
		<div className="" style={{ position: "sticky", top: "0px" , zIndex:2 }}>
			<div className="main">
				<div className="body">
					<a href="/" className="partOne">
						<img src={Logo} className="logo" />
					</a>
					<div className="partTwo">
						<ul className="ul">
							<li>
								<a className="a" href="https://epicpix-frontend.vercel.app">
									Home
								</a>
							</li>
							<li>
								<a className="a" href="https://epicpix-frontend.vercel.app/user-dashboard">
									Profile
								</a>
							</li>
							<li>
								<a className="a" href="https://epicpix-frontend.vercel.app/image">
									Create Image
								</a>
							</li>
							{isUserLogin ? null : (
								<>
									<li>
										<a className="a" href="https://epicpix-frontend.vercel.app/login">
											Login
										</a>
									</li>
									<li>
										<a className="a" href="https://epicpix-frontend.vercel.app/signin">
											Signup
										</a>
									</li>
								</>
							)}
						</ul>
					</div>
					<div className="button">
						<button
							className="butt"
							onClick={() => {
								setisOpen(!isOpen);
							}}
						>
							{isOpen ? <MdClose size={15} /> : <TiThMenu size={15} />}
						</button>
					</div>
				</div>
			</div>
			{isOpen && (
				<div className="body2">
					<div className="PartTwo">
						<ul className="ul2">
							<li className="li">
								<a className="a" href="https://epicpix-frontend.vercel.app">
									Home
								</a>
							</li>
							<li className="li">
								<a className="a" href="https://epicpix-frontend.vercel.app/user-dashboard">
									Profile
								</a>
							</li>
							<li className="li">
								<a className="a" href="/image">
									Create Image
								</a>
							</li>
							{isUserLogin ? null : (
								<>
									<li className="li">
										<a className="a" href="https://epicpix-frontend.vercel.app/login">
											Login
										</a>
									</li>
									<li className="li">
										<a className="a" href="https://epicpix-frontend.vercel.app/signin">
											Signup
										</a>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

export default Navber;
