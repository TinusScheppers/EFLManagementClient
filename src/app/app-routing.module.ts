import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PresenceComponent } from './pages/presence/presence.component';

const routes: Routes = [
  { path: '', redirectTo: '/presence', pathMatch: 'full' },
  { path: 'users', component: UsersComponent},
  { path: 'landing', component: LandingComponent },
  { path: 'presence', component: PresenceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
