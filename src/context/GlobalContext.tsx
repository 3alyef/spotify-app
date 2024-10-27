import { createContext, useContext, useEffect, useState } from "react"
import { GlobalContextInterface } from "./model";
import { GlobalStyle } from "../thems/GlobalStyle";
import { darkTheme, lightTheme, ThemeContract } from '../thems/thems';
import { ThemeProvider } from "styled-components";
import { Locale } from "../lib/i18n";
import { TypeDictionary } from "../routes/model";
import { getDictionary } from "../lib/get-dictionary";
import { SpotifyAuth } from "../auth/auth-token.service";
// import { useLocation } from "react-router-dom";

interface PropsGlobalContextProvider {
	children: React.ReactNode
}

const GlobalContext = createContext<GlobalContextInterface | null>(null);

export default function GlobalContextProvider({ children }: PropsGlobalContextProvider): JSX.Element {
	// language
	const [currentLanguage, setCurrentLanguage] = useState<Locale>('en');
	const [theme, setTheme] = useState<ThemeContract>(darkTheme);
	const [tokenAccess, setTokenAccess] = useState<SpotifyAuth | undefined>();
	function toggleTheme() {
		if (theme.themeId === 1) {
			setTheme(lightTheme)
		} else {
			setTheme(darkTheme)
		}
	}

	const [dictionary, setDictionary] = useState<TypeDictionary | undefined>();

	const [isLogged, setIsLogged] = useState(false);
	// const location = useLocation();

	useEffect(() => {
		async function fetchDictionary() {
			const dict = await getDictionary(currentLanguage);
			setDictionary(dict);
			// setLoading(false); // Indica que o carregamento foi concluído
		}

		fetchDictionary();
	}, [currentLanguage, /*location.pathname*/])
	return (
		<GlobalContext.Provider value={{
			themeId: theme.themeId,
			toggleTheme,
			currentLanguage,
			setCurrentLanguage,
			dictionary,
			tokenAccess,
			setTokenAccess,
			isLogged,
			setIsLogged
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