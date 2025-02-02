import styled from "styled-components"
import IconContainer from "../../../../pages/Login/components/optBurger/IconContainer.style";
import { IoMoon, IoSunnySharp } from "react-icons/io5";
import { useGlobalContext } from "../../../../context/GlobalContext";
import LanguageMenu from "../../../../components/LanguageMenu/LanguageMenu";
import ImageLink from "../imageLink/imageLink.styled";
import { useState } from "react";
import OptTitle from "./OptTitle";
import { BiWorld } from "react-icons/bi";

const Container = styled.nav`
	display: flex;
	justify-content: space-between;
	flex: 1;
	gap: 10px;
`;
const Link = styled.a`
	font-size: 21px;
	font-style: normal;
	font-weight: 400;
`;

const RotesLinks = styled.section`
	display: flex;
	justify-content: space-around;
	flex: 2;
	align-items: center;
`;
const SubOptions = styled.section`
	display: flex;
	flex: 1;
	justify-content: center;
	gap: 5%;
`
const UX = styled.div`
	justify-content: center;
	align-items: center;
	gap: 25%;
	display: flex;
	padding: 0px 10px;
`;
const LoginOpt = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

export default function Nav() {
	const { toggleTheme, themeId, isLogged } = useGlobalContext();
	const [showOptTitle, setShowOptTitle] = useState(false);
	const [onMenu, setOnMenu] = useState(false);
	return (
		<Container>
			<RotesLinks>
				<Link>
					Home
				</Link>
				<Link>
					Play Lists
				</Link>
				<Link>
					Favorites
				</Link>
			</RotesLinks>
			<SubOptions>
				<UX>
					<IconContainer handleOption={() => toggleTheme()}>
						{
							themeId === 2 ? (
								<IoSunnySharp size="32px" style={{ color: "white" }} />
							) : (
								<IoMoon size="32px" style={{ color: "white" }} />
							)
						}
					</IconContainer>
					<IconContainer scale={1.1} handleOption={() => setOnMenu(el => !el)}>
						<BiWorld size={35} style={{ position: 'absolute' }} />
						<LanguageMenu fontSize="20px" languageContainerStyle={{
							position: 'relative',
							top: '12px',
							left: '16px'
						}} onMenu={onMenu} />
					</IconContainer>
				</UX>
				<LoginOpt>
					<OptTitle login="Login" logout="Sair" isLogged={isLogged} showOptTitle={showOptTitle} />
					<ImageLink href="#" width="56" onHoverSet={setShowOptTitle}>
						<img src="/assets/world.png" alt="spotify home header" />
					</ImageLink>
				</LoginOpt>
			</SubOptions>
		</Container>
	)
}