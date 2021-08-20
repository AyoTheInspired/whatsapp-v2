import React from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/dist/client/router";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, Mic, MoreVert } from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";

function ChatScreen({ chat, messages }) {
	const router = useRouter();
	const [user] = useAuthState(auth);
	const [messagesSnapshot] = useCollection(
		db
			.collection("chats")
			.doc(router.query.id)
			.collection("messages")
			.orderBy("timestamp", "asc")
	);

	const showMessages = () => {
		if (messagesSnapshot) {
			return messagesSnapshot.docs.map((message) => (
				<Message
					key={message.id}
					user={message.data().user}
					message={{
						...message.data(),
						timestamp: message.data().timestamp?.toDate().getTime(),
					}}
				/>
			));
		}
	};

	return (
		<Container>
			<Header>
				<Avatar />
				<div className="header__information">
					<h3> Recipient Email </h3>

					<p>Last Seen</p>
				</div>

				<div className="header__icons">
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</Header>

			<div className="message__container">
				{showMessages()}

				<EndOfMessage />
			</div>

			<InputContainer>
				<InsertEmoticon />
				<Input placeholder="Type a message" />
				<Mic />
			</InputContainer>
		</Container>
	);
}

export default ChatScreen;

const Input = styled.input`
	flex: 1;
	align-items: center;
	padding: 15px;
	position: sticky;
	bottom: 0;
	background-color: whitesmoke;
	outline-width: 0;
	border: none;
	border-radius: 10px;
	margin-left: 15px;
	margin-right: 15px;
	font-size: 18px;
`;

const InputContainer = styled.form`
	display: flex;
	align-items: center;
	padding: 10px;
	position: sticky;
	bottom: 0;
	background-color: #fff;
	z-index: 100;
`;

const Container = styled.div``;

const Header = styled.div`
	position: sticky;
	top: 0;
	display: flex;
	padding: 11px;
	height: 80px;
	align-items: center;
	border-bottom: var(--smk-border);
	background-color: #fff;
	z-index: 100;

	.header__information {
		margin-left: 15px;
		flex: 1;

		h3 {
			margin-bottom: 3px;
		}

		p {
			font-size: 14;
			color: gray;
		}
	}
`;

const EndOfMessage = styled.div``;
