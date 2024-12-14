import styled from "styled-components"
import ImageLink from "./components/imageLink/imageLink.styled";

const Container = styled.header`
	background-image: linear-gradient(180deg, #191414 0%, #121212 90%);
	border-bottom: 1px solid rgba(255, 255, 255, 0.50);
	padding: 25px 125px;
	justify-content: space-between;
	align-items: center;
`;

export default function Header() {
	return (
		<Container>
			<ImageLink>
				<img src="/assets/spotify-header.png" alt="spotify home header" />
			</ImageLink>
		</Container>
	)
} 