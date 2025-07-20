import React, { useEffect, useState } from "react";
import "./Home.css";
import { getHomedata } from "../../apis/BackendApisImpl";
import { NavLink } from "react-router-dom";
import { BarLoader} from "react-spinners";
import {loginApi} from '../../apis/BackendApisImpl'
function Home() {
	const [data, setdata] = useState([]);
	async function name() {
		const a = await getHomedata();
		setdata(a);
		 
	}
	useEffect(() => {
		name();
	}, []);

	return (
		<div className="maina">
			{data.length == 0 && (
				<div style={{width:"99%" , justifyContent:"center",alignItems:"center",display:"flex" ,height:"5px",position:"absolute",margin:"5px"}}>
					<BarLoader width="99%" />
				</div>
			)}
			{data
				.map((e, index) => {
					return (
						<NavLink to={`http://localhost:5173/image/${e.id}`} key={index} className="card">
							<img src={e.imageUrl} className="cardImg" alt="" />
						</NavLink>
					);
				})
				.reverse()}
		</div>
	);
}

export default Home;
