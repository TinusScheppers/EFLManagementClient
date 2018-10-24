import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './/app-routing.module';

import { CardService, UserService, API_BASE_URL } from './core/services/api.service';
import { CardHubService } from './core/services/cardhub.service';
import { PresenceHubService } from './core/services/presencehub.service';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './core/components/user/user.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ShellComponent } from './shell/shell.component';
import { UsersComponent } from './pages/users/users.component';
import { UserTableComponent } from './core/components/user-table/user-table.component';
import { PresenceComponent } from './pages/presence/presence.component';



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
    UserTableComponent,
    PresenceComponent
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
    MatSortModule,
    MatGridListModule,
    FlexLayoutModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    CardService,
    UserService,
    CardHubService,
    PresenceHubService,
    { provide: API_BASE_URL, useValue: environment.apiUri }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
