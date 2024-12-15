import styled from "styled-components"

interface PropsImageLink {
	children: React.ReactNode;
	href?: string;
	width?: string;
	onHoverSet?: (change: boolean) => void;
}

const Link = styled.a<{ width?: string }>`
	display: inline-block;
	width: ${({ width }) => (width ? `${width}px` : '60px')};
	z-index: 2;
`;

export default function ImageLink(
	{
		children,
		href,
		width,
		onHoverSet
	}: PropsImageLink
) {
	function handleMouse(type: boolean) {
		if (onHoverSet) {
			onHoverSet(type);
		}
	}

	return (
		<Link href={href} width={width} onMouseEnter={() => handleMouse(true)} onMouseLeave={() => handleMouse(false)}>
			{children}
		</Link>
	)
}