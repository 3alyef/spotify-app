import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { UserData } from "../../interfaces/user-data";
import Background from "./components/bg/Bg.styled";

export default function Home(): JSX.Element {
	const [userData, setUserData] = useState<UserData | null>(null);
	const { dictionary, accessToken } = useGlobalContext();
	return (
		<Background>
			<h1>
				Home
			</h1>
			<p>
			</p>
		</Background>
	)
}