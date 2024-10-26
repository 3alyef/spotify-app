import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SuspenseRoute } from "../components/components";
import { Footer, Header } from "../layouts/layouts";
import { Home, Login } from "../pages/pages";
import { useEffect, useState } from "react";
import { middleware } from "../services/middlewares/middleware";
import { useGlobalContext } from "../context/GlobalContext";

export default function AppRoutes() {

	const { currentLanguage, setCurrentLanguage } = useGlobalContext();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLogged, setIsLogged] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		middleware(location.pathname, setCurrentLanguage, navigate, isLogged);
	}, [location.pathname, navigate]);

	const isLoginPage = location.pathname === `/${currentLanguage}/login`;
	return (
		<>
			{!isLoginPage && <Header />}
			<Routes>
				{
					isLogged && <Route path={`${currentLanguage}/`} element={SuspenseRoute(<Home />)} />
				}
				<Route path={`${currentLanguage}/login`} element={SuspenseRoute(<Login />)} />
			</Routes>
			{!isLoginPage && <Footer />}
		</>
	)

}