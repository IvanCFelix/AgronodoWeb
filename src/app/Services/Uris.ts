export class Uris {
         public static API_ENDPOINT = "http://159.89.49.19/api/v1/";
         //public static API_ENDPOINT = "http://192.168.50.103:8000/api/v1/";

         public static PASSWORD_RESET = `${Uris.API_ENDPOINT}password/reset/confirm/`;
         public static PASSWORD_SET_CONFIRM = `${Uris.API_ENDPOINT}password/set/confirm/`;
         public static PASSWORD_CHANGE = `${Uris.API_ENDPOINT}password/change/`;

         public static API_LOGIN = `${Uris.API_ENDPOINT}login/`;
         public static API_LOGOUT = `${Uris.API_ENDPOINT}logout/`;
         public static API_AGRONODO = `${Uris.API_ENDPOINT}adminagronodo/`;
         public static API_USER_GET = `${Uris.API_ENDPOINT}refresh/`;
         public static API_AGRICOLA = `${Uris.API_ENDPOINT}agricola/`;
         public static API_LOTS = `${Uris.API_ENDPOINT}fields/`;
         public static API_SUB_LOTS = `${Uris.API_ENDPOINT}subfields/`;
         public static API_ADMIN_AGRICOLA = `${Uris.API_ENDPOINT}adminagricola/`;
         public static API_ADMIN_ENGINEER_AGRICOLA = `${Uris.API_ENDPOINT}adminengineer/`;
         public static API_ENGINEER = `${Uris.API_ENDPOINT}engineer/`;
         public static API_CICLE = `${Uris.API_ENDPOINT}subfields/`;
         public static API_TASK_POST = `${Uris.API_ENDPOINT}tasks/subfield/`;
         public static API_TASK = `${Uris.API_ENDPOINT}tasks/`;
         public static API_INCIDENCES = `${Uris.API_ENDPOINT}incidences/`;
    
         public static API_INCIDENCES_BYDATE = `${Uris.API_ENDPOINT}incidences/bydate/`;
         public static API_INCIDENCES_BYRISK = `${Uris.API_ENDPOINT}incidences/byrisk/`;

         public static API_CROPS_LIST_GET = `${Uris.API_ENDPOINT}crops/`;

         public static API_RECOVER_POST = `${Uris.API_ENDPOINT}password/reset/`;
       }