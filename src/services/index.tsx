import styled from "styled-components";
import DefaultSection from "../pages/Login/components/DefaultSection.style";
import OptBurger from "../pages/Login/components/optBurger/OptBurger.style";
import { LoginContainer } from "../pages/Login/components/Wrapper.style";
import Main from "../pages/Login/components/main/Main.styled";

const Header = styled.header`
	display: flex;
	justify-content: flex-end;
	padding: 0.5rem;
`;

export default function Login(): JSX.Element {
	return (
		<LoginContainer>
			<DefaultSection aspectRatio="1211/1347" position="relative">
				<img src="/assets/imagem.png" alt="imagem da tela login" />
			</DefaultSection>
			<DefaultSection flex="1">
				<Header>
					<OptBurger />
				</Header>
				<Main />
			</DefaultSection>
		</LoginContainer>
	);
}