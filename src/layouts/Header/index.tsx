import styled from "styled-components"

const Container = styled.header`
	background-image: linear-gradient(to bottom, #191414, #121212);
	min-height: 15vh;
	color: white;
`

export default function Header() {
	return (
		<Container>
			Header
		</Container>
	)
}