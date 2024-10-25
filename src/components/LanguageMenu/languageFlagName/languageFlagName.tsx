interface LanguagesFlagName {
	languageName: string;
	languageNameFull: string;
	flag?: string;
	costumerClass?: string;
}


export default function LanguageFlagName({ flag, costumerClass }: LanguagesFlagName) {
	return (
		<>
			<div className={`languageFlag ${costumerClass}`}>
				{/* <span className="languageName languageNameFull">
					{languageNameFull}
				</span>
				<span className="languageName languageNameSm">
					{languageName}
				</span> */}
				<span className="flag">
					{flag}
				</span>
			</div>

		</>
	)
}