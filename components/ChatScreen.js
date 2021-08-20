import React from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/dist/client/router";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert } from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";

function ChatScreen({ chat, messages }) {
	const router = useRouter();
	const [user] = useAuthState(auth);
	const [messagesSnapshot] = useCollection(
		db.collection("chats").doc(router.query.id)
	);

	const showMessages = () => {};

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
				<EndOfMessage />
			</div>
		</Container>
	);
}

export default ChatScreen;

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
