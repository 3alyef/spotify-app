import { createContext, useContext, useState } from "react"
import { GlobalContextInterface } from "./model";
import { GlobalStyle } from "../thems/GlobalStyle";
import { darkTheme, lightTheme, ThemeContract } from '../thems/thems';
import { ThemeProvider } from "styled-components";
import { Locale } from "../lib/i18n";

interface PropsGlobalContextProvider {
	children: React.ReactNode
}

const GlobalContext = createContext<GlobalContextInterface | null>(null);

export default function GlobalContextProvider({ children }: PropsGlobalContextProvider): JSX.Element {
	// language
	const [currentLanguage, setCurrentLanguage] = useState<Locale>('en');
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
			toggleTheme,
			currentLanguage,
			setCurrentLanguage
		}}>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				{children}
			</ThemeProvider>
		</GlobalContext.Provider>
	)
}

export function useGlobalContext(): GlobalContextInterface {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error("useGlobalContext deve ser usado dentro de um GlobalContextProvider");
	}
	return context;
}