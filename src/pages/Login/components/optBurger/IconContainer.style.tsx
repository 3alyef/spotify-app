import styled from "styled-components";

const Container = styled.span`
	cursor: pointer;
`;

interface PropsIconContainer {
	children: React.ReactNode;
	handleOption?: () => void;
}

export default function IconContainer({ children, handleOption }: PropsIconContainer): JSX.Element {
	return (
		<Container onClick={handleOption}>
			{children}
		</Container>
	)
}