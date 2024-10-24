import { ImgContainer } from "../../components/ImgContainer/index.style";
import DefaultSection from "./components/DefaultSection.style";
import LoginBtn from "./components/LoginBtn.style";
import OptBurger from "./components/optBurger/OptBurger.style";
import { LoginContainer } from "./components/Wrapper.style";

export default function Login(): JSX.Element {
	return (
		<LoginContainer>
			<DefaultSection aspectRatio="1211/1347" position="relative">
				<img src="/assets/imagem.png" alt="imagem da tela login" />
			</DefaultSection>
			<DefaultSection flex="1">
				<header className="flex items-end p-2">
					<OptBurger />
				</header>
				<main className="flex flex-col items-center h-[80%] justify-evenly">
					<ImgContainer aspectRatio="577/324.5" maxWidth="390px">
						<img src="/assets/spotify-login-logo.png" alt="spotify logo" />
					</ImgContainer>
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