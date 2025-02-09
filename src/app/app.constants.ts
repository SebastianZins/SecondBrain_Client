export abstract class AppConstants {
  public static BASE_URL: string = 'https://localhost:7296';
  public static AUTH_URL: string = this.BASE_URL + '/auth';
  public static FILE_NODE_URL: string = this.BASE_URL + '/fileNode';
  public static FILE_STRUCTURE_URL: string = this.BASE_URL + '/fileStructure';
  public static USER: string = this.BASE_URL + '/user';

  public static END_POINT = {
    AUTH: {
      LOGIN: this.AUTH_URL + '/login',
      LOGOUT: this.AUTH_URL + '/logout',
      REFRESH_TOKEN: this.AUTH_URL + '/token/refresh',
      REVOKE_TOKEN: this.AUTH_URL + '/token/revoke',
      SIGNUP: this.AUTH_URL + '/signup',
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
    FILE_STRUCTURE: {
      GET_STRUCTURE: this.FILE_STRUCTURE_URL,
      CREATE_FOLDER: this.FILE_STRUCTURE_URL,
      UPDATE_FOLDER: this.FILE_STRUCTURE_URL,
      MOVE_FOLDER: this.FILE_STRUCTURE_URL + '/move',
    },
    USER: {
      CREATE: this.USER,
      GET: this.USER,
      UPDATE: this.USER,
      DELETE: this.USER,
    },
  };

  public static ROUTES = {
    LOGIN: 'login',
    SIGNUP: 'signup',
    NOT_FOUND: 'not-found',
    HOME: 'home',
  };

  public static LOCAL_STORAGE = {
    USER_MAIL: 'user_mail',
  };
}
