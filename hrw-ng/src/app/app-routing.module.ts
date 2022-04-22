import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { AttendanceComponent } from './views/attendance/attendance.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EventAddComponent } from './views/event-add/event-add.component';
import { EventComponent } from './views/event/event.component';
import { LeaveAddComponent } from './views/leave-add/leave-add.component';
import { LeaveEditComponent } from './views/leave-edit/leave-edit.component';
import { LeaveComponent } from './views/leave/leave.component';
import { LoginComponent } from './views/login/login.component';
import { QrgenrComponent } from './views/qrgenr/qrgenr.component';
import { QrscanOutComponent } from './views/qrscan-out/qrscan-out.component';
import { QrscanComponent } from './views/qrscan/qrscan.component';
import { UserMgmtAddComponent } from './views/user-mgmt-add/user-mgmt-add.component';
import { UserMgmtEditComponent } from './views/user-mgmt-edit/user-mgmt-edit.component';
import { UserMgmtComponent } from './views/user-mgmt/user-mgmt.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'qrgenr', component: QrgenrComponent, canActivate: [AuthGuard] },
  { path: 'qrscan', component: QrscanComponent, canActivate: [AuthGuard] },
  { path: 'qrscan-out', component: QrscanOutComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
  { path: 'event', component: EventComponent, canActivate: [AuthGuard] },
  { path: 'event-add', component: EventAddComponent, canActivate: [AuthGuard] },
  { path: 'leave', component: LeaveComponent, canActivate: [AuthGuard] },
  { path: 'leave-add', component: LeaveAddComponent, canActivate: [AuthGuard] },
  { path: 'leave-edit', component: LeaveEditComponent, canActivate: [AuthGuard] },
  { path: 'user-mgmt', component: UserMgmtComponent, canActivate: [AuthGuard] },
  { path: 'user-mgmt-add', component: UserMgmtAddComponent },
  { path: 'user-mgmt-edit', component: UserMgmtEditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
