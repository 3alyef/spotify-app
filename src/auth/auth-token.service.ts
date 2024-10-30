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
  setTokenAccess: React.Dispatch<React.SetStateAction<SpotifyAuth | undefined>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export class AuthData {
  protected redirect_uri: string;
  protected dataToServer: URLSearchParams;
  protected client_id: string;
  protected client_secret: string;
  protected headers: {
    'Content-type': string;
    Authorization: string;
  };
  constructor() {
    this.client_id = process.env.REACT_APP_CLIENT_ID || '';
    this.client_secret = process.env.REACT_APP_CLIENT_SECRET || '';

    this.redirect_uri = 'http://localhost:3000/';

    this.dataToServer = new URLSearchParams();
    this.dataToServer.append('grant_type', 'client_credentials');
    this.dataToServer.append('redirect_uri', this.redirect_uri);

    const buffer = btoa(`${client_id}:${client_secret}`);
    this.headers = {
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${buffer}`,
    };
  }
}

class AuthSpotifyApi extends AuthData {
  constructor() {
    super();
    this.userAuthentication = this.userAuthentication.bind(this);
    // this.authUser = this.authUser.bind(this);
  }

  async authUser(code: string): Promise<SpotifyAuth | undefined> {
    this.dataToServer.append('code', code);
    const url = 'https://accounts.spotify.com/api/token';
    const response = await axios({
      url,
      method: 'POST',
      headers: this.headers,
      data: this.dataToServer,
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

    return final as SpotifyAuth;
  }
  private async authGuest(): Promise<SpotifyAuth | undefined> {
    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');

    const resp = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: this.headers,
      body: body.toString(),
    });

    const respjs = await resp.json();
    // console.log(respjs);
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
    setTokenAccess,
    location,
  }: PropsUserAuthenticationAsGuest) {
    const token = await authSpotifyApi.authGuest();
    if (token) {
      let logged = false;
      if (token) {
        setTokenAccess(token);
        logged = true;
      }
      setIsLogged(logged);

      const locale = location.pathname.split('/')[1];
      return navigate(`/${locale}/?type=guest`);
    }
  }
  userAuthentication() {
    const scopes =
      'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';
    location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.client_id}&scope=${scopes}&redirect_uri=${this.redirect_uri}`;
  }
}
export const authSpotifyApi = new AuthSpotifyApi();
