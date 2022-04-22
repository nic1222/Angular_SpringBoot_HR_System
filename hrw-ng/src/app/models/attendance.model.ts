import { Employee } from "./user.model";

export class Attendance {
    employee: Employee;
    leaveId: string;
    date: string;
    clockIn: string;
    clockOut: string;
    late: boolean;
}

export class ClockInOutReq {
    employeeId: string;
}