import { Avatar, Button, IconButton } from "@material-ui/core";
import { Chat, MoreVert, Search } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { auth } from "../firebase";

function Sidebar() {
	const createChat = () => {
		const input = prompt("Please enter the reciever's email address");

		if (!input) {
			return null;
		}

		if (EmailValidator.validate(input)) {
		}
	};

	return (
		<Div>
			<Header>
				<UserAvatar onClick={() => auth.signOut()} />
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
