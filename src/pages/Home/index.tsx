
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Home({ dictionary }: { dictionary: any }): JSX.Element {

	return (
		<>
			<h1>
				Home
			</h1>
			<p>
				{dictionary && dictionary.translation.header}
			</p>
		</>
	)
}