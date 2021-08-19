import React from "react";
import { Circle } from "better-react-spinkit";

function Loading() {
	return (
		<center>
			<div>
				<img
					src="/whatsapp-logo.png"
					alt="whatsapp"
					height={200}
					style={{
						marginBottom: 10,
					}}
				/>

				<Circle />
			</div>
		</center>
	);
}

export default Loading;
