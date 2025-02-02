import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SuspenseRoute } from "../components/components";
import { Footer, Header } from "../layouts/layouts";
import { Home, Login } from "../pages/pages";
import { useEffect } from "react";
import { middleware } from "../services/middlewares/middleware";
import { useGlobalContext } from "../context/GlobalContext";
import { authSpotifyApi, SpotifyAuth } from "../auth/auth-token.service";
import Playlists from "../pages/Playlists";
import styled from "styled-components";


// bag-color-ok: #0b2557
const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: #0b2557;
	display: flex;
	flex-direction: column;
	color: ${({ theme }) => theme.textColor.primaryColor}
`

export default function AppRoutes() {
	const { currentLanguage, setCurrentLanguage, setAccessToken, setIsLogged, isLogged } = useGlobalContext();


	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		async function auth(code: string) {
			if (!isLogged) {
				const newAccessToken = await authSpotifyApi.authUser(code);
				let logged = false;
				const token = JSON.stringify(newAccessToken);
				if (newAccessToken) {

					localStorage.setItem('access_token', JSON.stringify(token));
					localStorage.setItem('created_in_token', Math.floor(Date.now() / 1000).toString()); // Armazena o tempo em segundos
					setAccessToken(newAccessToken);
					logged = true;
				}
				setIsLogged(logged);
				return middleware(location, setCurrentLanguage, navigate, logged);
			}
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
			const token = localStorage.getItem('access_token');
			const createdIn = localStorage.getItem('created_in_token');
			if (token && createdIn) {
				const currentTimeInSeconds = Math.floor(Date.now() / 1000);
				const createdInToken = parseInt(createdIn, 10);
				const access_token: SpotifyAuth | undefined = JSON.parse(token);
				if (access_token && currentTimeInSeconds - createdInToken >= access_token.expires_in) {
					auth(code);
					return;
				}
			}

			auth(code);
			return;
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
		<Container>
			{!isLoginPage && <Header />}
			<Routes>
				{
					isLogged && (
						<>
							<Route path={`${currentLanguage}/`} element={SuspenseRoute(<Home />)} />
							<Route path={`${currentLanguage}/playlists`} element={SuspenseRoute(<Playlists />)} />
							{/*!isLoginPage && <Footer />*/}
						</>
					)
				}
				<Route path={`${currentLanguage}/login`} element={SuspenseRoute(<Login />)} />
			</Routes>

		</Container>
	)
}