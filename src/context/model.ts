import { SpotifyAuth } from '../auth/auth-token.service';
import { Locale } from '../lib/i18n';
import { TypeDictionary } from '../routes/model';

export interface GlobalContextInterface {
  themeId: number;
  toggleTheme: () => void;
  currentLanguage: Locale;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Locale>>;
  dictionary: TypeDictionary | undefined;
  accessToken: SpotifyAuth;
  setAccessToken: React.Dispatch<React.SetStateAction<SpotifyAuth>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}
