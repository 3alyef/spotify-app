import { useEffect, useRef, useState } from "react";
import LanguageFlagName from "./languageFlagName/languageFlagName";
import { toggleMenuLanguages } from "./services/toggleMenuLanguages";
import { languages } from "../../lib/get-languages-names";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { Locale } from "../../lib/i18n";
import "./style.css";

interface PropsLanguageMenu {
	onClickCostumer?: () => void
}
export default function LanguageMenu({ onClickCostumer }: PropsLanguageMenu) {
	const { setCurrentLanguage, currentLanguage: locale } = useGlobalContext()
	//
	const getCurrentHash = () => window.location.hash;

	// alterado para este problema
	const location = useLocation();
	const pathName = location.pathname;
	const navigate = useNavigate();
	//
	const [top, setTop] = useState(0);
	const languageSwitchRef = useRef<HTMLDivElement>(null);
	//const pathName = usePathname();
	// const router = useRouter();
	const redirectedPathName = (locale: Locale) => {
		//
		const hash = getCurrentHash();
		//
		setCurrentLanguage(locale);
		if (!pathName) return "/";
		if (hash.includes("#")) {
			const segments = pathName.split("/");
			//console.log("link: ", `/${locale}${hash}`)
			segments[1] = `${locale}${hash}`;
			const link = segments.join("/");
			navigate(link, { replace: true });
			// router.push(segments.join("/"));
		} else {
			const segments = pathName.split("/");
			segments[1] = locale;
			const link = segments.join("/");
			navigate(link, { replace: true });
			// router.push();
		}

	};
	const [openLangToggle, setOpenLangToggle] = useState<boolean>(false);
	const [maxHeightMenu, setMaxHeightMenu] = useState<string>("0em");
	const [widthVar, setWidthVar] = useState<string>("55%");;
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// Verificar se o clique foi fora do menu de idiomas
			const target = event.target as Element;

			if (openLangToggle && !target.closest('.languagesSubContainer')) {
				const onlyClose = true;
				toggleMenuLanguages({ openLangToggle, setOpenLangToggle, maxHeightMenu, setMaxHeightMenu, setWidthVar, onlyClose });
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [openLangToggle]);
	useEffect(() => {
		const ref = languageSwitchRef.current;
		if (ref) {
			setTop(ref.clientHeight)
		}
	}, [languageSwitchRef])

	return (
		<div className={`languageSwitchContainer`}>
			<div className="languagesSubContainer"
				onClick={() => {
					const onlyClose = false
					toggleMenuLanguages(
						{
							openLangToggle, setOpenLangToggle, maxHeightMenu, setMaxHeightMenu, setWidthVar, onlyClose
						})
				}}>

				<div className="parentLanguagesMenu" style={{ width: widthVar }}>
					<div className="languagesMenu menuApparence" style={{ maxHeight: maxHeightMenu, top: `${top}px` }}  >
						<ul style={{ maxHeight: maxHeightMenu, opacity: (maxHeightMenu != "0em" ? "1" : "0") }} className="contentLanguagesUl">
							{
								Object.entries(languages).map(([key, value]) => key === locale && (
									<li key={key}
										className="liSelect"
									>
										<LanguageFlagName languageName={value[1]}
											languageNameFull={value[0]}
											flag={value[2]} costumerClass="languageFlagCostumer" />

									</li>
								)
								)
							}
							{

								Object.entries(languages).map(([key, value]) => key != locale && (
									<li key={key} onClick={() => {
										setTimeout(() => {
											redirectedPathName(key as Locale);
											if (onClickCostumer) onClickCostumer()
										}, 750);

									}
									}>
										<LanguageFlagName languageName={value[1]} languageNameFull={value[0]} flag={value[2]} costumerClass="languageFlagCostumer" />

									</li>
								)
								)
							}

						</ul>
					</div>
				</div>
				<div className="languageSwitch" ref={languageSwitchRef}>
					<LanguageFlagName languageName={languages[locale][1]} flag={languages[locale][2]} languageNameFull={languages[locale][0]} />
					{/*openLangToggle ? (
						<IoMdArrowDropup className="dropStyle" />
					) : (
						<IoMdArrowDropdown className="dropStyle" />
					)*/}

				</div>
			</div>
		</div>
	);
};
