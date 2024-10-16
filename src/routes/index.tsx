import { Route, Routes, useNavigate } from "react-router-dom";
import { SuspenseRoute } from "../components/components";
import { Footer, Header } from "../layouts/layouts";
import { Home } from "../pages/pages";
import { useEffect, useState } from "react";
import { middleware } from "../services/middlewares/middleware";
import { Locale } from "../lib/i18n";
import { getDictionary } from "../lib/get-dictionary";

export default function AppRoutes() {
	const [currentLanguage, setCurrentLanguage] = useState<Locale>('en');
	const pathname = location.pathname;
	const navigate = useNavigate();

	const [dictionary, setDictionary] = useState<{ translation: { header: string } } | null>(null);

	useEffect(() => {
		middleware(pathname, setCurrentLanguage, navigate);
		async function fetchDictionary() {
			const dict = await getDictionary(currentLanguage);
			setDictionary(dict);
			// setLoading(false); // Indica que o carregamento foi concluído
		}

		fetchDictionary();
	}, []);
	return (
		<>
			<Header />
			<Routes>
				<Route path={`${currentLanguage}/`} element={SuspenseRoute(<Home dictionary={dictionary} />)} />
			</Routes>
			<Footer />
		</>
	)
}