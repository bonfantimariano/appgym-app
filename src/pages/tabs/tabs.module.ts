import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import {AuthGuard} from '../../_guards';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule',
        canActivate: [AuthGuard]

      },
      {
        path: 'payment-list',
        loadChildren: '../payment-list/payment-list.module#PaymentListPageModule',
        canActivate: [AuthGuard]

      },
      {
        path: 'access-list',
        loadChildren: '../access-list/access-list.module#AccessListPageModule',
        canActivate: [AuthGuard]

      },
      {
        path: '',
        redirectTo: '/app/tabs/home',
      },
      {
        path: '**',
        redirectTo: '/app/tabs/home',
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/tabs/home',
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
