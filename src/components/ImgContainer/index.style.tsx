import styled from "styled-components"

export const ImgContainer = styled.div<{ aspectRatio: string, maxWidth?: string, width?: string }>`
	position: relative;
	aspect-ratio: ${({ aspectRatio }) => aspectRatio};
	${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`};
	${({ width }) => width && `width: ${width};`};
`;
