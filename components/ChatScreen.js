import React, { useState, useRef } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/dist/client/router";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, Mic, MoreVert } from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

function ChatScreen({ chat, messages }) {
	const [input, setInput] = useState("");
	const router = useRouter();
	const [user] = useAuthState(auth);
	const endOfMessagesRef = useRef(null);

	const [recipientSnapshot] = useCollection(
		db
			.collection("users")
			.where("email", "==", getRecipientEmail(chat.users, user))
	);
	const [messagesSnapshot] = useCollection(
		db
			.collection("chats")
			.doc(router.query.id)
			.collection("messages")
			.orderBy("timestamp", "asc")
	);

	const scrollToBottom = () => {
		endOfMessagesRef.current.scrollIntoView({
			behaviour: "smooth",
			block: "start",
		});
	};

	const sendMessage = (e) => {
		e.preventDefault();

		db.collection("users").doc(user.uid).set(
			{
				lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
			},
			{ merge: true }
		);

		db.collection("chats").doc(router.query.id).collection("messages").add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			user: user.email,
			photoURL: user.photoURL,
		});

		setInput("");
		scrollToBottom();
	};

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
		} else {
			return JSON.parse(messages).map((message) => (
				<Message key={message.id} user={message.user} message={message} />
			));
		}
	};

	const recipient = recipientSnapshot?.docs?.[0]?.data();
	const recipientEmail = getRecipientEmail(chat.users, user);

	return (
		<Container>
			<Header>
				{recipient ? (
					<Avatar src={recipient?.photoURL} />
				) : (
					<Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
				)}
				<div className="header__information">
					<h3> {recipientEmail} </h3>
					{recipientSnapshot ? (
						<p>
							{" "}
							Last active:{" "}
							{recipient?.lastSeen?.toDate() ? (
								<TimeAgo datetime={recipient?.lastSeen?.toDate()} />
							) : (
								"Unavailable"
							)}{" "}
						</p>
					) : (
						<p>Loading last active...</p>
					)}
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

				<EndOfMessage ref={endOfMessagesRef} />
			</div>

			<InputContainer>
				<InsertEmoticon />
				<Input
					placeholder="Type a message"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button hidden disabled={!input} type="submit" onClick={sendMessage}>
					Send Message
				</button>
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
	font-size: 15px;
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

const Container = styled.div`
	.message__container {
		padding: 30px;
		background-color: #e5ded8;
		min-height: 90vh;
	}
`;

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

const EndOfMessage = styled.div`
	margin-bottom: 50px;
`;
