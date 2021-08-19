import { Avatar, IconButton } from "@material-ui/core";
import { Chat, MoreVert, Search } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";

function Sidebar() {
	return (
		<Div>
			<Header>
				<UserAvatar />
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
		</Div>
	);
}

export default Sidebar;

const SearchInput = styled.input``;

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
