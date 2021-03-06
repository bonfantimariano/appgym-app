import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActivityListPage } from './activity-list.page';
import { ActivityModalPage } from './activity-modal/activity-modal.page';


const routes: Routes = [
  {
    path: '',
    component: ActivityListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActivityListPage, ActivityModalPage],
  entryComponents: [ActivityModalPage]
})
export class ActivityListPageModule {}
