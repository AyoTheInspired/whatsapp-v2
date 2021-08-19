import { Avatar, IconButton } from "@material-ui/core";
import { Chat, MoreVert } from "@material-ui/icons";
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
		</Div>
	);
}

export default Sidebar;

const Div = styled.div``;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	height: 80px;
	border-bottom: 1px solid whitesmoke;
	position: sticky;
	top: 0;
	background-color: #fff;
	z-index: 1;
`;

const UserAvatar = styled(Avatar)``;
