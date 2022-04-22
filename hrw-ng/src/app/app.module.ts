import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QrgenrComponent } from './views/qrgenr/qrgenr.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angularx-qrcode';
import { QrscanComponent } from './views/qrscan/qrscan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { UserMgmtComponent } from './views/user-mgmt/user-mgmt.component';
import { LoginComponent } from './views/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbActionsModule, NbUserModule, NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule, NbButtonModule, NbIconModule, NbSelectModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HeaderComponent } from './views/layouts/header/header.component';
import { ThemeModule } from './@theme/theme.module';
import { OneColumnLayoutComponent } from './views/layouts/one-column.layout';
import { FormsModule } from '@angular/forms';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { UserMgmtAddComponent } from './views/user-mgmt-add/user-mgmt-add.component';
import { UserMgmtEditComponent } from './views/user-mgmt-edit/user-mgmt-edit.component';
import { AttendanceComponent } from './views/attendance/attendance.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { LeaveComponent } from './views/leave/leave.component';
import { LeaveAddComponent } from './views/leave-add/leave-add.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LeaveEditComponent } from './views/leave-edit/leave-edit.component';
import { EventComponent } from './views/event/event.component';
import { EventAddComponent } from './views/event-add/event-add.component';
import { FilterPipe } from './pipe/filter.pipe';
import { QrscanOutComponent } from './views/qrscan-out/qrscan-out.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    QrgenrComponent,
    DashboardComponent,
    QrscanComponent,
    UserMgmtComponent,
    LoginComponent,
    HeaderComponent,
    OneColumnLayoutComponent,
    UserMgmtAddComponent,
    UserMgmtEditComponent,
    AttendanceComponent,
    LeaveComponent,
    LeaveAddComponent,
    LeaveEditComponent,
    EventComponent,
    EventAddComponent,
    FilterPipe,
    QrscanOutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbCollapseModule,
    QRCodeModule,
    ZXingScannerModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    NbCardModule,
    NbInputModule,
    NbUserModule,
    NbActionsModule,
    ThemeModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
