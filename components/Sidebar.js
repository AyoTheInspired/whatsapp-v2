import { Avatar, Button, IconButton } from "@material-ui/core";
import { AudiotrackSharp, Chat, MoreVert, Search } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chats from "./Chats";

function Sidebar() {
	const [user] = useAuthState(auth);

	const userChatRef = db
		.collection("chats")
		.where("users", "array-contains", user.email);

	const [chatsSnapshot] = useCollection(userChatRef);

	const createChat = () => {
		const input = prompt("Please enter the reciever's email address");

		if (!input) return null;

		if (
			EmailValidator.validate(input) &&
			!chatAlreadyExists(input) &&
			input !== user.email
		) {
			db.collection("chats").add({
				users: [user.email, input],
			});
		}
	};

	const chatAlreadyExists = (recipientEmail) =>
		!!chatsSnapshot?.docs.find(
			(chat) =>
				chat.data().users.find((user) => user === recipientEmail)?.length > 0
		);

	return (
		<Div>
			<Header>
				<UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
				<div className="icons__container">
					<IconButton>
						<Chat />
					</IconButton>

					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</Header>

			<div className="search">
				<Search />
				<SearchInput placeholder="Search chats" />
			</div>
			<SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

			{chatsSnapshot?.docs.map((chat) => (
				<Chats key={chat.id} id={chat.id} users={chat.data().users} />
			))}
		</Div>
	);
}

export default Sidebar;

const SidebarButton = styled(Button)`
	width: 100%;

	&&& {
		border-top: var(--smk-border);
		border-bottom: var(--smk-border);
	}
`;

const SearchInput = styled.input`
	outline-width: 0;
	border: none;
	flex: 1;
`;

const Div = styled.div`
	.search {
		display: flex;
		align-items: center;
		padding: 20px;
		border-radius: 2px;
	}
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	height: 80px;
	border-bottom: var(--smk-border);
	position: sticky;
	top: 0;
	background-color: #fff;
	z-index: 1;
`;

const UserAvatar = styled(Avatar)`
	cursor: pointer;
	transition: var(--sht-trans);
	:hover {
		opacity: 0.8;
	}
`;
