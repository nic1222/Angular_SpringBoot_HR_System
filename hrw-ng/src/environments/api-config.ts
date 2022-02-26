import { environment } from "./environment";

export const ApiConfig = {

    EMPLOYEE_GET: environment.apiBaseUrl + '/api/employee/${id}',
    EMPLOYEE_ALL: environment.apiBaseUrl + '/api/employee',
    EMPLOYEE_ADD: environment.apiBaseUrl + '/api/employee/add',
    EMPLOYEE_DELETE: environment.apiBaseUrl + '/api/employee/delete/${id}',
    EMPLOYEE_UPDATE: environment.apiBaseUrl + '/api/employee/update/${id}',
};
