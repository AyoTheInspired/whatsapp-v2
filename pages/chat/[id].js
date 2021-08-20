import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";

function Chat() {
	return (
		<Div>
			<Head>
				<title>Chat</title>
			</Head>

			<Sidebar />

			<div className="chat__container">
				<ChatScreen />
			</div>
		</Div>
	);
}

export default Chat;

const Div = styled.div`
	display: flex;

	.chat__container {
		flex: 1;
		overflow: scroll;
		height: 100vh;

		::-webkit-scrollbar {
			display: none;
		}

		-ms-overflow-style: none;
		scrollbar-width: none;
	}
`;
