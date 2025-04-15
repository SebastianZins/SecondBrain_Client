export abstract class AppConstants {
  public static BASE_URL: string = 'https://localhost:7296';
  public static AUTH_URL: string = this.BASE_URL + '/auth';
  public static FILE_URL: string = this.BASE_URL + '/file';
  public static FILE_SECTION_URL: string = this.BASE_URL + '/section/metaData';
  public static FILE_STRUCTURE_URL: string = this.BASE_URL + '/fileStructure';
  public static LIST_SECTION_URL: string = this.BASE_URL + '/section/list';
  public static CHECKLIST_SECTION_URL: string =
    this.BASE_URL + '/section/checklist';
  public static TEXT_SECTION_URL: string = this.BASE_URL + '/section/text';
  public static USER: string = this.BASE_URL + '/user';

  public static END_POINT = {
    AUTH: {
      LOGIN: this.AUTH_URL + '/login',
      LOGOUT: this.AUTH_URL + '/logout',
      REFRESH_TOKEN: this.AUTH_URL + '/token/refresh',
      REVOKE_TOKEN: this.AUTH_URL + '/token/revoke',
      SIGNUP: this.AUTH_URL + '/signup',
    },
    FILE: {
      CREATE: this.FILE_URL,
      DELETE: this.FILE_URL,
      GET: this.FILE_URL,
      GET_BY_FOLDER: this.FILE_URL + '/byFolder',
      UPDATE: this.FILE_URL,
      UPDATE_ORDER: this.FILE_URL + '/order',
    },
    FILE_SECTION: {
      CREATE: this.FILE_SECTION_URL,
      DELETE: this.FILE_SECTION_URL,
      GET_BY_ID: this.FILE_SECTION_URL,
      GET_BY_FILE: this.FILE_SECTION_URL + '/byFile',
      UPDATE: this.FILE_SECTION_URL,
    },
    LIST_SECTION: {
      GET_BY_ID: this.LIST_SECTION_URL,
      GET_BY_FILE: this.LIST_SECTION_URL + '/byFile',
      UPDATE: this.LIST_SECTION_URL,
    },
    CHECKLIST_SECTION: {
      GET_BY_ID: this.CHECKLIST_SECTION_URL,
      GET_BY_FILE: this.CHECKLIST_SECTION_URL + '/byFile',
      UPDATE: this.CHECKLIST_SECTION_URL,
    },
    TEXT_SECTION: {
      GET_BY_ID: this.TEXT_SECTION_URL,
      GET_BY_FILE: this.TEXT_SECTION_URL + '/byFile',
      UPDATE: this.TEXT_SECTION_URL,
    },
    FILE_STRUCTURE: {
      GET_STRUCTURE: this.FILE_STRUCTURE_URL,
      CREATE_FOLDER: this.FILE_STRUCTURE_URL,
      DELETE_FOLDER: this.FILE_STRUCTURE_URL,
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
    FILE: 'file',
    LOGIN: 'login',
    SIGNUP: 'signup',
    NOT_FOUND: 'not-found',
    HOME: 'home',
  };

  public static LOCAL_STORAGE = {
    USER_MAIL: 'user_mail',
  };

  public static REGEX_TAG = /(?<!\/)#(\w+)/g;
}
