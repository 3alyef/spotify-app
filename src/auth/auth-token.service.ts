import axios from 'axios';
import { NavigateFunction, Location } from 'react-router-dom';

export interface SpotifyAuth {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
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
    const authOptions = {
      code: code,
      redirect_uri: this.redirect_uri,
      grant_type: 'authorization_code',
    };

    const response = await fetch(`${this.apiUrlAccounts}/api/token`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: new URLSearchParams(authOptions).toString(),
    });

    const data = await response.json();

    if (!data) {
      const resF = {
        message: data.statusText,
        status: data.status,
      };
      console.error(resF);
      return;
    }

    return data as SpotifyAuth;
  }

  userAuthentication() {
    const url = `${this.apiUrlAccounts}/authorize?response_type=code&client_id=${this.client_id}&scope=${encodeURIComponent(this.scopes)}&redirect_uri=${this.redirect_uri}`;
    location.href = url;
  }

  private async authGuest(): Promise<SpotifyAuth | undefined> {
    // The Client Credentials flow is used in server-to-server authentication. Since this flow does not include authorization, only endpoints that do not access user information can be accessed.

    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');

    const resp = await fetch(`${this.apiUrlAccounts}/api/token`, {
      method: 'POST',
      headers: this.getHeaders(),
      body,
    });

    const respjs = await resp.json();
    if (resp.ok) {
      return respjs as SpotifyAuth;
    }
    const error = {
      message: `Erro ao fazer login: ${resp.statusText}`,
      status: resp.status,
    };
    console.error(error);
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
      setAccessToken(token);
      setIsLogged(true);
      if (noRedirect) {
        return;
      }
      const locale = location.pathname.split('/')[1];
      return navigate(`/${locale}/?type=guest`);
    }
  }
}
export const authSpotifyApi = new AuthSpotifyApi();
