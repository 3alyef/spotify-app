import styled from "styled-components";
import { ThemeContract } from "../../../thems/thems";
import { ImgContainer } from "../../../components/ImgContainer/index.style";

const StyledContainer = styled.div<{ theme: ThemeContract }>`
	background-color: ${({ theme }) => theme.primaryColor};
	border-radius: 100%;
`

export default function OptBurger(): JSX.Element {
	return (
		<StyledContainer>
			<ImgContainer aspectRatio="1/1" width="75px">
				<img src="/assets/icons/stash_burger-classic.png" alt="burger icon" />
			</ImgContainer>
		</StyledContainer>
	);
}