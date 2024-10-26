import styled from "styled-components";
import { ImgContainer } from "../../../../components/ImgContainer/index.style";
import LoginBtn from "../LoginBtn.style";
import OrOptions from "./OrOptions.styled";
import { useGlobalContext } from "../../../../context/GlobalContext";

const MainContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 80%;
	justify-content: space-evenly;
`;

const OptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 390px;
`;


export default function Main() {
	const { dictionary } = useGlobalContext();

	if (!dictionary) return <></>

	const { Login } = dictionary;
	return (
		<MainContainer>
			<ImgContainer aspectRatio="577/324.5" maxWidth="390px">
				<img src="/assets/spotify-login-logo.png" alt="spotify logo" />
			</ImgContainer>
			<OptionContainer>
				<LoginBtn textValue={Login.login_with_spotify} />
				<OrOptions or={Login.or} />
				<LoginBtn textValue={Login.login_as_guest} />
			</OptionContainer>
		</MainContainer>
	)
}