import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QrgenrComponent } from './views/qrgenr/qrgenr.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainNavComponent } from './views/main-nav/main-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    QrgenrComponent,
    DashboardComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
