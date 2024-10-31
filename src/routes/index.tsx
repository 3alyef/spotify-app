import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SuspenseRoute } from "../components/components";
import { Footer, Header } from "../layouts/layouts";
import { Home, Login } from "../pages/pages";
import { useEffect } from "react";
import { middleware } from "../services/middlewares/middleware";
import { useGlobalContext } from "../context/GlobalContext";
import { authSpotifyApi } from "../auth/auth-token.service";
import Playlists from "../pages/Playlists";


export default function AppRoutes() {

	const { currentLanguage, setCurrentLanguage, setAccessToken, setIsLogged, isLogged } = useGlobalContext();


	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {

		async function auth(code: string) {
			const accessToken = await authSpotifyApi.authUser(code);
			let logged = false;
			if (accessToken) {
				setAccessToken(accessToken);
				logged = true;
			}
			setIsLogged(logged);
			return middleware(location, setCurrentLanguage, navigate, logged);
		}
		async function authAsGuest() {
			await authSpotifyApi.userAuthenticationAsGuest({
				navigate,
				setIsLogged,
				setAccessToken, location, noRedirect: true
			})
		}

		const searchParams = new URLSearchParams(location.search);
		const code = searchParams.get("code");
		if (code) {
			//searchParams.delete('code');

			auth(code);
			return
			//navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
		} else {
			const searchParams = new URLSearchParams(location.search);
			const type = searchParams.get("type");
			if (type === "guest") {
				authAsGuest();
				return;
			}
		}
		middleware(location, setCurrentLanguage, navigate, isLogged);
	}, [location, navigate, isLogged]);


	const isLoginPage = location.pathname === `/${currentLanguage}/login`;
	return (
		<>
			{!isLoginPage && <Header />}
			<Routes>
				{
					isLogged && (
						<>
							<Route path={`${currentLanguage}/`} element={SuspenseRoute(<Home />)} />
							<Route path={`${currentLanguage}/playlists`} element={SuspenseRoute(<Playlists />)} />
						</>
					)
				}
				<Route path={`${currentLanguage}/login`} element={SuspenseRoute(<Login />)} />
			</Routes>
			{!isLoginPage && <Footer />}
		</>
	)

}