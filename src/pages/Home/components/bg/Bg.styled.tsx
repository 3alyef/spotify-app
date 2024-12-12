import styled from "styled-components"

const Container = styled.main`
	background-image: linear-gradient(to bottom, #191414, #999999);
`
interface PropsBg {
	children: React.ReactNode
}

export default function Background({ children }: PropsBg) {
	return (
		<Container>
			{children}
		</Container>
	)
}