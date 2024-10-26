import { useGlobalContext } from "../../context/GlobalContext";

export default function Home(): JSX.Element {
	const { dictionary } = useGlobalContext();
	return (
		<>
			<h1>
				Home
			</h1>
			<p>
				{dictionary && dictionary.Footer}
			</p>
		</>
	)
}