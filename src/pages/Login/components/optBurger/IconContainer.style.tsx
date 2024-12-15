import styled from "styled-components";

const Container = styled.span<{ scale?: number }>`
	cursor: pointer;
	scale: ${({ scale }) => scale}
`;

interface PropsIconContainer {
	children: React.ReactNode;
	handleOption?: () => void;
	scale?: number;
}

export default function IconContainer({ children, handleOption, scale }: PropsIconContainer): JSX.Element {
	return (
		<Container onClick={handleOption} scale={scale}>
			{children}
		</Container>
	)
}