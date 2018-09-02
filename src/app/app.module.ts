import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

import { AppRoutingModule } from './/app-routing.module';

import { CardService, UserService } from './core/services/api.service';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './pages/user/user.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ShellComponent } from './shell/shell.component';
import { UsersComponent } from './pages/users/users.component';
import { UserTableComponent } from './core/components/user-table/user-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    LandingComponent,
    ShellComponent,
    UsersComponent,
    UserTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    CardService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }