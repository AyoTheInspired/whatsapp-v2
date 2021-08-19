import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

function Login() {
	const signIn = () => {
		auth.signInWithPopup(provider).catch(alert);
	};

	return (
		<Container>
			<Head>
				<title>Login</title>
			</Head>

			<LoginContainer>
				<Logo src="/whatsapp-logo.png" />
				<Button onClick={signIn} variant="outlined">
					Sign in with Google
				</Button>
			</LoginContainer>
		</Container>
	);
}

export default Login;

const Container = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
	background-color: whitesmoke;
`;

const Logo = styled.img`
	height: 150px;
	width: 150px;
	margin-bottom: 50px;
`;

const LoginContainer = styled.div`
	padding: 100px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
