import styled from "styled-components"

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 0.25rem;
`;

const BarSpan = styled.span`
	flex: 1;
	border-top: 1px solid black;
`;
//spanLoginOr
export default function OrOptions(): JSX.Element {
	return (
		<Container>
			<BarSpan></BarSpan>
			<p>
				ou
			</p>
			<BarSpan></BarSpan>
		</Container>
	)
}