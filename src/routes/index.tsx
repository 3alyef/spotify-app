import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SuspenseRoute } from "../components/components";
import { Footer, Header } from "../layouts/layouts";
import { Home } from "../pages/pages";
import { useEffect, useState } from "react";
import { middleware } from "../services/middlewares/middleware";

export default function AppRoutes() {
	const [currentLanguage, setCurrentLanguage] = useState('en');
	const location = useLocation();
	const pathname = location.pathname;
	const navigate = useNavigate();
	useEffect(() => {
		middleware(pathname, setCurrentLanguage, navigate);
	}, []);

	return (
		<>
			<Header />
			<Routes>
				<Route path={`${currentLanguage}/`} element={SuspenseRoute(<Home />)} />
			</Routes>
			<Footer />
		</>
	)
}