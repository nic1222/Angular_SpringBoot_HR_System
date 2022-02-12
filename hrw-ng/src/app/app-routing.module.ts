import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { QrgenrComponent } from './views/qrgenr/qrgenr.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashbaord', pathMatch: 'full' },
  { path: 'qrgenr', component: QrgenrComponent },
  { path: 'dashbaord', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
