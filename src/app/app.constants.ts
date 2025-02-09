export abstract class AppConstants {
  public static BASE_URL: string = 'https://localhost:7296';
  public static AUTH_URL: string = this.BASE_URL + '/Auth';
  public static FILE_NODE_URL: string = this.BASE_URL + '/FileNode';
  public static USER: string = this.BASE_URL + '/user';

  public static END_POINT = {
    AUTH: {
      LOGIN: this.AUTH_URL + '/login',
      LOGOUT: this.AUTH_URL + '/logout',
      SIGNUP: this.AUTH_URL + '/signup',
      REFRESH_TOKEN: this.AUTH_URL + '/token/refresh',
      REVOKE_TOKEN: this.AUTH_URL + '/token/revoke',
    },
    FILE_NODE: {
      GET: this.FILE_NODE_URL,
      CREATE: this.FILE_NODE_URL,
      DELETE: this.FILE_NODE_URL,
      GET_BY_ID: this.FILE_NODE_URL + '/id',
      GET_BY_NAME: this.FILE_NODE_URL + '/name',
      GET_BY_PATH: this.FILE_NODE_URL + '/path',
      UPDATE: this.FILE_NODE_URL,
    },
    USER: {
      CREATE: this.USER,
      GET: this.USER,
      UPDATE: this.USER,
      DELETE: this.USER,
    },
  };
}
