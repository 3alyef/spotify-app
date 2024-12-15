import styled from "styled-components"
import ImageLink from "./components/imageLink/imageLink.styled";
import Nav from "./components/nav/nav.styled";

const Container = styled.header`
	background-image: linear-gradient(180deg, #191414 0%, #121212 90%);
	border-bottom: 1px solid rgba(255, 255, 255, 0.50);
	padding: 18px 50px;
	justify-content: space-between;
	align-items: center;
	display: flex;
	gap: 2%;
`;

export default function Header() {
	return (
		<Container>
			<ImageLink href="/home" width="75">
				<img src="/assets/spotify-header.png" alt="spotify home header" />
			</ImageLink>
			<Nav />
		</Container>
	)
} 