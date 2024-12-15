import { useState } from "react";
import styled from "styled-components";

interface PropsOptTitle {
	logout: string;
	login: string;
	isLogged: boolean;
	showOptTitle: boolean;
}

const H3Title = styled.h3<{ isOn: boolean, onMouse: boolean }>`
	font-size: 18px;
	z-index: 1;
  opacity: ${({ isOn, onMouse }) => ((isOn || onMouse) ? 1 : 0)};
	transform: translateX(${({ isOn, onMouse }) => (isOn || onMouse) ? "0px" : "45px"});
	transition: opacity 0.5s ease, transform 0.5s ease;
`

export default function OptTitle({ logout, login, isLogged, showOptTitle }: PropsOptTitle) {
	const [onMouse, setOnMouse] = useState(false);
	return (
		<H3Title isOn={showOptTitle} onMouse={onMouse} onMouseEnter={() => !onMouse && setOnMouse(true)}
			onMouseLeave={() => onMouse && setOnMouse(false)}>
			{isLogged ? logout : login}
		</H3Title>
	)
}