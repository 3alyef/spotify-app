import axios from 'axios';
import { NavigateFunction, Location } from 'react-router-dom';

export interface SpotifyAuth {
  access_token: string;
  token_type: string;
  expires_in: number;
}
interface PropsUserAuthenticationAsGuest {
  navigate: NavigateFunction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: Location<any>;
  setAccessToken: React.Dispatch<React.SetStateAction<SpotifyAuth | undefined>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  noRedirect?: true;
}

export class AuthData {
  protected redirect_uri: string;
  protected dataToServer: URLSearchParams;
  protected client_id: string;
  protected client_secret: string;
  protected apiUrl: string;
  protected apiUrlAccounts: string;
  constructor() {
    this.client_id = process.env.REACT_APP_CLIENT_ID || '';
    this.client_secret = process.env.REACT_APP_CLIENT_SECRET || '';
    this.apiUrl = process.env.REACT_APP_SPOTIFY_URL || '';
    this.apiUrlAccounts = process.env.REACT_APP_SPOTIFY_ACCOUNTS_URL || '';

    this.redirect_uri = process.env.REACT_APP_REDIRECT_URI || '';

    this.dataToServer = new URLSearchParams();
    this.dataToServer.append('grant_type', 'authorization_code');
  }

  protected getHeaders(accessToken?: string) {
    const buffer = btoa(`${this.client_id}:${this.client_secret}`);
    if (accessToken) {
      return {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      };
    }
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${buffer}`,
    };
  }
}

class AuthSpotifyApi extends AuthData {
  private scopes: string;
  constructor() {
    super();
    this.userAuthentication = this.userAuthentication.bind(this);

    this.scopes = [
      'user-read-private', // Acessar informações do perfil
      'playlist-read-private', // Ler playlists privadas
      'playlist-modify-private', // Modificar playlists privadas
      'playlist-read-collaborative', // Ler playlists colaborativas
      'playlist-modify-public', // Modificar playlists públicas
    ].join(' ');
  }

  async authUser(code: string): Promise<SpotifyAuth | undefined> {
    this.dataToServer.append('code', code);
    const url = `${this.apiUrlAccounts}/api/token`;
    const response = await axios({
      url,
      method: 'POST',
      headers: this.getHeaders(),
      data: this.dataToServer.append('redirect_uri', this.redirect_uri),
    });

    if (!response.data) {
      const resF = {
        message: response.statusText,
        status: response.status,
      };
      console.error(resF);
      return;
    }
    const final = await response.data;

    console.log('auth_user HINEEE: ', final);
    return final as SpotifyAuth;
  }

  private async authGuest(): Promise<SpotifyAuth | undefined> {
    const resp = await fetch(`${this.apiUrlAccounts}/api/token`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: this.dataToServer,
    });

    const respjs = await resp.json();
    //console.log(respjs);
    if (resp.ok) {
      return respjs as SpotifyAuth;
    }
    const err = {
      message: 'Erro ao fazer login',
      status: 500,
    };
    console.error(err);
    return;
  }

  async userAuthenticationAsGuest({
    navigate,
    setIsLogged,
    setAccessToken,
    location,
    noRedirect,
  }: PropsUserAuthenticationAsGuest) {
    const token = await this.authGuest();
    if (token) {
      let logged = false;
      if (token) {
        setAccessToken(token);
        logged = true;
      }
      setIsLogged(logged);
      if (noRedirect) {
        return;
      }
      const locale = location.pathname.split('/')[1];
      return navigate(`/${locale}/?type=guest`);
    }
  }

  userAuthentication() {
    const url = `${this.apiUrlAccounts}/authorize?response_type=code&client_id=${this.client_id}&scope=${encodeURIComponent(this.scopes)}&redirect_uri=${this.redirect_uri}`;
    console.log(url);
    //location.href = url;
  }
}
export const authSpotifyApi = new AuthSpotifyApi();
