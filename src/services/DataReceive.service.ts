import axios from 'axios';
import { AuthData } from '../auth/auth-token.service';
import { UserData } from '../interfaces/user-data';

class DataReceive extends AuthData {
  constructor() {
    super();
  }

  async getUserData(access_token: string): Promise<UserData | null> {
    console.log('token to send', access_token);
    const userData = await axios({
      url: `${this.apiUrl}/v1/me`,
      headers: this.getHeaders(access_token),
      method: 'GET',
    });
    if (userData.data) {
      return userData.data as UserData;
    }
    console.error(
      `status: ${userData.status}, statusText: ${userData.statusText}`,
    );
    return null;
  }
}

const dataReceive = new DataReceive();
export default dataReceive;
