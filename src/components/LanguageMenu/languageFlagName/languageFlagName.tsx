interface LanguagesFlagName {
	languageName: string;
	languageNameFull: string;
	customStyle?: React.CSSProperties;
	flag?: string;
	customClass?: string;
}


export default function LanguageFlagName({ flag, customStyle, customClass }: LanguagesFlagName) {
	return (
		<>
			<div className={`languageFlag ${customClass}`}>
				{/* <span className="languageName languageNameFull">
					{languageNameFull}
				</span>
				<span className="languageName languageNameSm">
					{languageName}
				</span> */}
				<span style={customStyle} className="flag">
					{flag}
				</span>
			</div>

		</>
	)
}