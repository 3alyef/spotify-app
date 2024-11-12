import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { UserData } from "../../interfaces/user-data";
import dataReceive from "../../services/DataReceive.service";

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
		<>
			<h1>
				Home
			</h1>
			<p>
				{userData && Object.entries(userData).map((e, i) => <p key={i}>{e}</p>)}
				{dictionary && dictionary.Footer}
			</p>
		</>
	)
}