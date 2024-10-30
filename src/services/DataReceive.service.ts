import { AuthData } from '../auth/auth-token.service';

class DataReceive extends AuthData {
  constructor() {
    super();
  }
}

const dataReceive = new DataReceive();
export default dataReceive;
