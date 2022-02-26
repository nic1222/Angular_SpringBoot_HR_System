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
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HeaderComponent } from './views/layouts/header/header.component';
import { ThemeModule } from './@theme/theme.module';
import { OneColumnLayoutComponent } from './views/layouts/one-column.layout';

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
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    ThemeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
