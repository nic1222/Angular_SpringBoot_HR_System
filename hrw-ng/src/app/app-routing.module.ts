import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { QrgenrComponent } from './views/qrgenr/qrgenr.component';
import { QrscanComponent } from './views/qrscan/qrscan.component';
import { UserMgmtComponent } from './views/user-mgmt/user-mgmt.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashbaord', pathMatch: 'full' },
  { path: 'qrgenr', component: QrgenrComponent },
  { path: 'qrscan', component: QrscanComponent },
  { path: 'dashbaord', component: DashboardComponent },
  { path: 'user-mgmt', component: UserMgmtComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
