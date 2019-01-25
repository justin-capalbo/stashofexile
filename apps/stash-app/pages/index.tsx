import styled from "@emotion/styled";

const MyButton = styled.button`
	border-radius: 3px;
	background-color: #7fffd4;
	padding: .5em 1em;
`;

export default () => (
	<div>
		<p>Welcome to next.js!</p>
		<MyButton>Click</MyButton>
	</div>
);
