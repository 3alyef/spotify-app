import styled from "styled-components"

interface PropsImageLink {
	children: React.ReactNode
}

const Link = styled.a`

`;

export default function ImageLink(
	{
		children,
	}: PropsImageLink
) {
	return (
		<Link>
			{children}
		</Link>
	)
}