import React from "react";
import { FadeLoader } from "react-spinners";
function Loder() {
	return (
		<div
			style={{
				position: "absolute",
				zIndex:99,
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "#fff",
			}}
		>
			<FadeLoader />
		</div>
	);
}

export default Loder;
