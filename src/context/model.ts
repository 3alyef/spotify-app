import { Locale } from '../lib/i18n';
import { TypeDictionary } from '../routes/model';

export interface GlobalContextInterface {
  themeId: number;
  toggleTheme: () => void;
  currentLanguage: Locale;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Locale>>;
  dictionary: TypeDictionary | undefined;
}
