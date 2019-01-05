import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../appgym/appgym-manager/src/_guards';

const routes: Routes = [
  { path: 'app', loadChildren: '../pages/tabs/tabs.module#TabsPageModule' },
  { path: 'app/tabs/payment-list', redirectTo: 'app/tabs/payment-list' },
  { path: 'app/tabs/access-list', redirectTo: 'app/tabs/access-list' },
  { path: 'sign-in', loadChildren: '../pages/sign-in/sign-in.module#SignInPageModule' },
  { path: 'sign-up', loadChildren: '../pages/sign-up/sign-up.module#SignUpPageModule' },
  {
    path: '',
    redirectTo: 'app/tabs/home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'app/tabs/home',
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
