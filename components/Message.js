import styled from "styled-components";

function Message({ user, message }) {
	return (
		<Div>
			<p> {message?.message} </p>
		</Div>
	);
}

export default Message;

const Div = styled.div``;
