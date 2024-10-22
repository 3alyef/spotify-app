import React from "react"
import styled from "styled-components";

const StyledSection = styled.section<{ position?: string }>`
	height: 100%;
	position: ${({ position }) => position || 'inherit'};
`;

interface PropsDefaultSection {
	children: React.ReactNode;
	position?: string;
	aspectRatio?: string;
	flex?: string;
}

export default function DefaultSection({ children, position, aspectRatio, flex }: PropsDefaultSection) {
	return (
		<StyledSection position={position} style={{ aspectRatio, flex }}>
			{children}
		</StyledSection>
	)
}