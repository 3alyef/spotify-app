import styled from "styled-components";
import { ThemeContract } from "../../../../thems/thems";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSunnySharp } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import IconContainer from "./IconContainer.style";
import { useGlobalContext } from "../../../../context/GlobalContext";
import LanguageMenu from "../../../../components/LanguageMenu";

const StyledContainer = styled.div<{ theme: ThemeContract, optIs: boolean, timerTemp: number, childrenQuant: number, padding: number }>`
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.primaryColor};
	border-radius: 15px;
	padding: ${({ padding }) => `${padding}px`};
	width: ${({ optIs, padding, childrenQuant }) => (optIs ? `${(54 * childrenQuant) - (padding * (childrenQuant + 1))}px` : "50px")
	};
	transition: all ${({ timerTemp }) => `${timerTemp / 1000}s`} ease;
`;

export default function OptBurger(): JSX.Element {
	const [optIs, setOptIs] = useState(false);
	const [showOptions, setShowOptions] = useState(false);
	const timerTemp = 500;
	const { toggleTheme, themeId } = useGlobalContext();
	useEffect(() => {
		if (optIs) {
			const timer = setTimeout(() => setShowOptions(true), timerTemp);
			return () => clearTimeout(timer);
		} else {
			setShowOptions(false);
		}
	}, [optIs]);
	return (
		<StyledContainer optIs={optIs} timerTemp={timerTemp} childrenQuant={3} padding={10} >
			<IconContainer handleOption={() => setOptIs(!optIs)}>
				<RxHamburgerMenu size="30px" style={{ color: "white" }} />
			</IconContainer>

			{
				showOptions && (
					<>
						<IconContainer>
							<LanguageMenu />
						</IconContainer>
						<IconContainer handleOption={() => toggleTheme()}>
							{
								themeId === 2 ? (
									<IoSunnySharp size="30px" style={{ color: "white" }} />
								) : (
									<IoMoon size="30px" style={{ color: "white" }} />
								)
							}
						</IconContainer>

					</>
				)
			}
		</StyledContainer>
	);
}