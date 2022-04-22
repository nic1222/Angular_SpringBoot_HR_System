import { Employee } from "./user.model";

export class Leave {
    id: string;
    employee: Employee;
    type: string;
    status: string;
    dateFrom: string;
    dateTo: string;
    duration: number;
    leaveReason: string;
    deniedReason: string;
    filename: any;
}

export class DenyLeaveReq {
    id: string;
    deniedReason: string;
}

export class AddLeaveReq {
    userId: string;
    type: string;
    dateFrom: string;
    dateTo: string;
    leaveReason: string;
    filename: string;
}