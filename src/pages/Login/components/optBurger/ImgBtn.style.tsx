import styled from "styled-components";

export const ImgBtn = styled.div<{ aspectRatio: string, maxWidth?: string, width?: string }>`
	position: relative;
	cursor: pointer;
	aspect-ratio: ${({ aspectRatio }) => aspectRatio};
	${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`};
	${({ width }) => width && `width: ${width};`};
`;
