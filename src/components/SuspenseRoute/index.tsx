import { Suspense } from "react";
import LoadingScreen from "./LoadingScreen";

export default function SuspenseRoute(screen: JSX.Element) {
	return (
		<Suspense fallback={<LoadingScreen />}>
			{screen}
		</Suspense>
	)
}