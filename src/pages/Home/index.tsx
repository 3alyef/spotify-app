import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { UserData } from "../../interfaces/user-data";
import Background from "./components/bg/Bg.styled";

export default function Home(): JSX.Element {
	const [userData, setUserData] = useState<UserData | null>(null);
	const { dictionary, accessToken } = useGlobalContext();
	useEffect(() => {
		/*async function updateUserData(access_token: string) {
			const userData = await dataReceive.getUserData(access_token);
			if (userData) {
				setUserData(userData);
			}
		}
		if (accessToken) {
			updateUserData(accessToken.access_token);
		}*/
	})
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