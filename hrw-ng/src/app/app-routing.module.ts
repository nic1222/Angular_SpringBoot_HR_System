import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { QrgenrComponent } from './views/qrgenr/qrgenr.component';
import { QrscanComponent } from './views/qrscan/qrscan.component';
import { UserMgmtAddComponent } from './views/user-mgmt-add/user-mgmt-add.component';
import { UserMgmtEditComponent } from './views/user-mgmt-edit/user-mgmt-edit.component';
import { UserMgmtComponent } from './views/user-mgmt/user-mgmt.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'qrgenr', component: QrgenrComponent, canActivate: [AuthGuard] },
  { path: 'qrscan', component: QrscanComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'user-mgmt', component: UserMgmtComponent, canActivate: [AuthGuard] },
  { path: 'user-mgmt-add', component: UserMgmtAddComponent, canActivate: [AuthGuard] },
  { path: 'user-mgmt-edit', component: UserMgmtEditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
