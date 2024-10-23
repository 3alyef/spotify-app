import styled from "styled-components";
import { ThemeContract } from "../../../../thems/thems";
import { useEffect, useState } from "react";
import { ImgBtn } from "./ImgBtn.style";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSunnySharp } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

const StyledContainer = styled.div<{ theme: ThemeContract, optIs: boolean, timerTemp: number, childrenQuant: number, padding: number }>`
	display: flex;
	flex-direction: row-reverse;
	background-color: ${({ theme }) => theme.primaryColor};
	border-radius: 15px;
	padding: ${({ padding }) => `${padding}px`};
	width: ${({ optIs, padding, childrenQuant }) => (optIs ? `${(54 * childrenQuant) - (padding * (childrenQuant + 1))}px` : "54px")
	};
	transition: all ${({ timerTemp }) => `${timerTemp / 1000}s`} ease;
`;

export default function OptBurger(): JSX.Element {
	const [optIs, setOptIs] = useState(false);
	const [showOptions, setShowOptions] = useState(false);
	const timerTemp = 500;
	const t = true
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
			<ImgBtn aspectRatio="1/1" width="34px" onClick={() => setOptIs(!optIs)} className="pointer">
				<RxHamburgerMenu />
			</ImgBtn>
			{
				showOptions && (
					<>
						<ImgBtn aspectRatio="1/1" width="34px">
							<img src="/assets/icons/stash_burger-classic.png" alt="burger icon" />
						</ImgBtn>
						<ImgBtn aspectRatio="1/1" width="34px">
							{
								t ? (
									<IoSunnySharp />
								) : (
									<IoMoon />
								)
							}
						</ImgBtn>
					</>
				)
			}
		</StyledContainer>
	);
}