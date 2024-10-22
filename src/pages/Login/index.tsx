import DefaultSection from "./components/DefaultSection.style";
import LoginBtn from "./components/LoginBtn.style";
import { LoginContainer } from "./components/Wrapper.style";

export default function Login(): JSX.Element {
	return (
		<LoginContainer>
			<DefaultSection aspectRatio="1211/1347" position="relative">
				<img src="/assets/imagem.png" alt="imagem da tela login" />
			</DefaultSection>
			<DefaultSection flex="1">
				<header className="">
					lenguage
				</header>
				<main className="flex flex-col items-center h-[90%] justify-evenly">
					<div className="relative aspect-[577/324.5] max-w-[390px]">
						<img src="/assets/spotify-login-logo.png" alt="spotify logo" />
					</div>
					<div className="flex flex-col w-full max-w-[390px]">
						<LoginBtn textValue="Entrar com Spotify" />
						<div className="flex items-center gap-1">
							<span className="spanLoginOr flex-1 border-t border-black"></span>
							<p className="flex-3">
								ou
							</p>
							<span className="spanLoginOr flex-1 border-t border-black"></span>
						</div>
						<LoginBtn textValue="Entrar como visitante" />
					</div>
				</main>
			</DefaultSection>
		</LoginContainer>
	);
}