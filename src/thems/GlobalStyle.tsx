import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
    transition: all ease 0.3s;
    text-decoration: none;
	}

	html, body {
		height: 100%;
		scroll-behavior: smooth;
	}
	
	img {
		height: 100%;
	}
`;