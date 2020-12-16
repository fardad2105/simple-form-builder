import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditAppComponent } from './components/edit-app/edit-app.component';
import { LoginComponent } from './components/Login/Login.component';
import { AuthGuard } from './Security/auth.guard';

const routes: Routes = [
  { path: '', component: EditAppComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
