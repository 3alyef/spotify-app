import { createContext, useState } from "react"
import { GlobalContextInterface } from "./model";
import { GlobalStyle } from "../thems/GlobalStyle";
import { darkTheme, lightTheme, ThemeContract } from '../thems/thems';
import { ThemeProvider } from "styled-components";

interface PropsGlobalContextProvider {
	children: React.ReactNode
}
export default function GlobalContextProvider({ children }: PropsGlobalContextProvider): JSX.Element {
	const GlobalContext = createContext<GlobalContextInterface | null>(null);
	const [theme, setTheme] = useState<ThemeContract>(darkTheme);
	function toggleTheme() {
		if (theme.themeId === 1) {
			setTheme(lightTheme)
		} else {
			setTheme(darkTheme)
		}
	}
	return (
		<GlobalContext.Provider value={{
			themeId: theme.themeId,
			toggleTheme
		}}>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				{children}
			</ThemeProvider>
		</GlobalContext.Provider>
	)
}