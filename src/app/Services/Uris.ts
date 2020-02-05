export class Uris {
  public static API_ENDPOINT = "http://159.89.49.19/api/v1/";
  //  public static API_ENDPOINT = "http://192.168.50.103:8000/api/v1/";
  
    public static PASSWORD_RESET = `${Uris.API_ENDPOINT}password/reset/confirm/`;
    public static PASSWORD_SET_CONFIRM = `${Uris.API_ENDPOINT}password/set/confirm/`;


    public static API_LOGIN = `${Uris.API_ENDPOINT}login/`;
    public static API_AGRONODO_POST = `${Uris.API_ENDPOINT}register/adminagronodo/`
    public static API_AGRONODO_GET_LIST= `${Uris.API_ENDPOINT}adminagronodo/`;
    public static API_AGRONODO_GET_USER = `${Uris.API_ENDPOINT}adminagronodo/`;
    public static API_ABRONODO_DELETE = `${Uris.API_ENDPOINT}adminagronodo/luisarmando/`

    public static API_AGRICOLA_POST = `${Uris.API_ENDPOINT}register/agricola/`;
    public static API_RECOVER_POST =  `${Uris.API_ENDPOINT}password/reset/`;
}