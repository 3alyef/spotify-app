import { Locale } from '../lib/i18n';

export interface GlobalContextInterface {
  themeId: number;
  toggleTheme: () => void;
  currentLanguage: Locale;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Locale>>;
}
