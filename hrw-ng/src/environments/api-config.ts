import { environment } from "./environment";

export const ApiConfig = {

    USER_GET: environment.apiBaseUrl + '/user/${id}',
    USER_ALL: environment.apiBaseUrl + '/user/all',
    USER_ADD: environment.apiBaseUrl + '/user/add',
    USER_DELETE: environment.apiBaseUrl + '/user/delete/${id}',
    USER_UPDATE: environment.apiBaseUrl + '/user/update',
    LOGIN: environment.apiBaseUrl + '/auth/signin',
    ATTENDANCE_QR_SET: environment.apiBaseUrl + '/attendance/qr/add',
    ATTENDANCE_QR_GET: environment.apiBaseUrl + '/attendance/qr/find/${qrInfo}',
    ATTENDANCE_CHECK_IN: environment.apiBaseUrl + '/attendance/clockIn',
    ATTENDANCE_CHECK_OUT: environment.apiBaseUrl + '/attendance/clockOut',
};
