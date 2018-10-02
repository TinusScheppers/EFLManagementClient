import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PresenceComponent } from './pages/presence/presence.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'users', component: UsersComponent},
  { path: 'landing', component: LandingComponent },
  { path: 'presence', component: PresenceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
