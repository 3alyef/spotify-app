import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SuspenseRoute } from "../components/components";
import { Footer, Header } from "../layouts/layouts";
import { Home, Login } from "../pages/pages";
import { useEffect, useState } from "react";
import { middleware } from "../services/middlewares/middleware";
import { Locale } from "../lib/i18n";
import { getDictionary } from "../lib/get-dictionary";

export default function AppRoutes() {
	const [currentLanguage, setCurrentLanguage] = useState<Locale>('en');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLogged, setIsLogged] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const [dictionary, setDictionary] = useState<{ translation: { header: string } } | null>(null);

	useEffect(() => {
		middleware(location.pathname, setCurrentLanguage, navigate, isLogged);
		async function fetchDictionary() {
			const dict = await getDictionary(currentLanguage);
			setDictionary(dict);
			// setLoading(false); // Indica que o carregamento foi concluído
		}

		fetchDictionary();
	}, [currentLanguage, location.pathname, navigate]);

	const isLoginPage = location.pathname === `/${currentLanguage}/login`;
	return (
		<>
			{!isLoginPage && <Header />}
			<Routes>
				{
					isLogged && <Route path={`${currentLanguage}/`} element={SuspenseRoute(<Home dictionary={dictionary} />)} />
				}
				<Route path={`${currentLanguage}/login`} element={SuspenseRoute(<Login />)} />
			</Routes>
			{!isLoginPage && <Footer />}
		</>
	)

}