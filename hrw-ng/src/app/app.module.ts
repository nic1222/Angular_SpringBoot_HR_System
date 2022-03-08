import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QrgenrComponent } from './views/qrgenr/qrgenr.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angularx-qrcode';
import { MainNavComponent } from './views/main-nav/main-nav.component';
import { QrscanComponent } from './views/qrscan/qrscan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { UserMgmtComponent } from './views/user-mgmt/user-mgmt.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
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

@NgModule({
  declarations: [
    AppComponent,
    QrgenrComponent,
    DashboardComponent,
    MainNavComponent,
    QrscanComponent,
    UserMgmtComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    OneColumnLayoutComponent,
    UserMgmtAddComponent,
    UserMgmtEditComponent,
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
    FormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
