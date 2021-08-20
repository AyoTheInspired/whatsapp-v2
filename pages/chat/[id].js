import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";

function Chat({ chat, messages }) {
	const [user] = useAuthState(auth);

	return (
		<Div>
			<Head>
				<title>Chat with {getRecipientEmail(chat?.users, user)} </title>
			</Head>

			<Sidebar />

			<div className="chat__container">
				<ChatScreen chat={chat} messages={messages} />
			</div>
		</Div>
	);
}

export default Chat;

export async function getServerSideProps(context) {
	const ref = db.collection("chats").doc(context.query.id);

	const messagesRes = await ref
		.collection("messages")
		.orderBy("timestamp", "asc")
		.get();

	const messages = messagesRes.docs
		.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		.map((messages) => ({
			...messages,
			timestamp: messages.timestamp.toDate().getTime(),
		}));

	const chatRes = await ref.get();
	const chat = {
		id: chatRes.id,
		...chatRes.data(),
	};

	return {
		props: {
			messages: JSON.stringify(messages),
			chat: chat,
		},
	};
}

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
