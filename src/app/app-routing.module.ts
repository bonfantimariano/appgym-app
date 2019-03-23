import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../src/_guards';

const routes: Routes = [
  { path: 'app', loadChildren: '../pages/tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: '', redirectTo: 'app/tabs/home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'app/tabs/client-list', redirectTo: 'app/tabs/client-list', canActivate: [AuthGuard] },
  { path: 'app/tabs/payment-list', redirectTo: 'app/tabs/payment-list', canActivate: [AuthGuard] },
  { path: 'app/tabs/access-list', redirectTo: 'app/tabs/access-list', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: '../pages/login/login.module#LoginPageModule' },
  { path: 'sign-up', loadChildren: '../pages/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'activity-list', loadChildren: '../pages/activity-list/activity-list.module#ActivityListPageModule', canActivate: [AuthGuard] },
  { path: 'activity-modal', loadChildren: '../pages/activity-list/activity-modal/activity-modal.module#ActivityModalPageModule' },
  {
    path: '**',
    redirectTo: 'app/tabs/client-list',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
