export class Uris {
   public static API_ENDPOINT = "http://159.89.49.19/api/v1/";
    //public static API_ENDPOINT = "http://192.168.50.103:8000/api/v1/";
  
    public static PASSWORD_RESET = `${Uris.API_ENDPOINT}password/reset/confirm/`;
    public static PASSWORD_SET_CONFIRM = `${Uris.API_ENDPOINT}password/set/confirm/`;
    public static PASSWORD_CHANGE = `${Uris.API_ENDPOINT}password/change/`;

    public static API_LOGIN = `${Uris.API_ENDPOINT}login/`;
    public static API_LOGOUT = `${Uris.API_ENDPOINT}logout/`;

    public static API_AGRONODO_POST = `${Uris.API_ENDPOINT}adminagronodo/`
    public static API_AGRONODO_GET_LIST= `${Uris.API_ENDPOINT}adminagronodo/`;
    public static API_AGRONODO_GET_USER = `${Uris.API_ENDPOINT}adminagronodo/`;
    public static API_ABRONODO_DELETE = `${Uris.API_ENDPOINT}adminagronodo/`
    public static API_AGRONODO_EDIT = `${Uris.API_ENDPOINT}adminagronodo/`
    public static API_USER_GET = `${Uris.API_ENDPOINT}refresh/`

    public static API_AGRICOLA_POST = `${Uris.API_ENDPOINT}agricola/`;
    public static API_AGRICOLA_GET_LIST= `${Uris.API_ENDPOINT}agricola/`;
    public static API_AGRICOLA_GET_USER = `${Uris.API_ENDPOINT}agricola/`;
    public static API_AGRICOLA_DELETE = `${Uris.API_ENDPOINT}agricola/`
    public static API_AGRICOLA_EDIT = `${Uris.API_ENDPOINT}agricola/`

    public static API_LOTS_POST = `${Uris.API_ENDPOINT}fields/`
    public static API_LOTS_GET_LIST= `${Uris.API_ENDPOINT}fields/`;
    public static API_LOTS_GET_LOT = `${Uris.API_ENDPOINT}fields/`;
    public static API_LOTS_DELETE = `${Uris.API_ENDPOINT}fields/`;
    public static API_LOTS_EDIT = `${Uris.API_ENDPOINT}fields/`;
    public static API_SUB_LOTS_DELETE = `${Uris.API_ENDPOINT}subfields/`;
    public static API_SUB_LOTS_REGISTER = `${Uris.API_ENDPOINT}subfields/`;
    public static API_SUB_LOTS_EDIT = `${Uris.API_ENDPOINT}subfields/`;
    public static API_SUB_LOTS_GET_LIST = `${Uris.API_ENDPOINT}subfields/`;
    public static API_SUB_LOT_GET_ID = `${Uris.API_ENDPOINT}subfields/`;


    public static API_ADMIN_AGRICOLA_POST = `${Uris.API_ENDPOINT}adminagricola/`
    public static API_ADMIN_AGRICOLA_GET_LIST= `${Uris.API_ENDPOINT}adminagricola/`;
    public static API_ADMIN_AGRICOLA_GET_USER = `${Uris.API_ENDPOINT}adminagricola/`;
    public static API_ADMIN_AGRICOLA_DELETE = `${Uris.API_ENDPOINT}adminagricola/`;
    public static API_ADMIN_AGRICOLA_EDIT = `${Uris.API_ENDPOINT}adminagricola/`;

    public static API_ADMIN_ENGINEER_AGRICOLA_POST = `${Uris.API_ENDPOINT}adminengineer/`
    public static API_ADMIN_ENGINEER_AGRICOLA_GET_LIST= `${Uris.API_ENDPOINT}adminengineer/`;
    public static API_ADMIN_ENGINEER_AGRICOLA_GET_USER = `${Uris.API_ENDPOINT}adminengineer/`;
    public static API_ADMIN_ENGINEER_AGRICOLA_DELETE = `${Uris.API_ENDPOINT}adminengineer/`;
    public static API_ADMIN_ENGINEER_AGRICOLA_EDIT = `${Uris.API_ENDPOINT}adminengineer/`;

    public static API_ENGINEER_POST = `${Uris.API_ENDPOINT}engineer/`
    public static API_ENGINEER_GET_LIST= `${Uris.API_ENDPOINT}engineer/`;
    public static API_ENGINEER_GET_USER = `${Uris.API_ENDPOINT}engineer/`;
    public static API_ENGINEER_DELETE = `${Uris.API_ENDPOINT}engineer/`;
    public static API_ENGINEER_EDIT = `${Uris.API_ENDPOINT}engineer/`;

    public static API_CICLE_POST = `${Uris.API_ENDPOINT}subfields/`
    public static API_CICLE_WEEKS_GET = `${Uris.API_ENDPOINT}subfields/`
    public static API_REPORT_LIST_GET = `${Uris.API_ENDPOINT}subfields/`
    public static API_PATHINGS_LIST_GET = `${Uris.API_ENDPOINT}subfields/`
    public static API_REPORTSOLO_LIST_GET = `${Uris.API_ENDPOINT}subfields/`
    
    public static API_TASK_POST = `${Uris.API_ENDPOINT}tasks/subfield/`
    public static API_TASK_GET_LIST = `${Uris.API_ENDPOINT}tasks/`
    public static API_TASK_EDIT = `${Uris.API_ENDPOINT}tasks/`
    public static API_TASK_DELETE = `${Uris.API_ENDPOINT}tasks/`
    public static API_TASK_GET_ID = `${Uris.API_ENDPOINT}tasks/`




    public static API_CROPS_LIST_GET = `${Uris.API_ENDPOINT}crops/`











    
    public static API_RECOVER_POST =  `${Uris.API_ENDPOINT}password/reset/`;
}