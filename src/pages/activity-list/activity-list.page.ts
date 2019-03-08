import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { ActivityModalPage } from './activity-modal/activity-modal.page';
import { ActivityService } from '../../_services';
import { ActivityModel, UserModel } from '../../_models';
import {isNull} from 'util';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.page.html',
  styleUrls: ['./activity-list.page.scss'],
})
export class ActivityListPage implements OnInit {
  activities: ActivityModel[] = [];
  currentUser: UserModel;
  public loading: HTMLIonLoadingElement;
  constructor(
      public modalCtrl: ModalController,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loadActivities().then(() => console.log('Activities loaded'));
  }

  async loadActivities() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this.activityService.getAll().subscribe(
        data => {
          this.loading.dismiss().then(() => {
            this.activities = data;
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        });
  }

  async presentModal(id = null) {
    const editMode = id ? true : false;
    const modal = await this.modalCtrl.create({
      component: ActivityModalPage,
      componentProps: {
        activityId: id,
        editMode: editMode
      }
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail && detail.data !== null && detail.data !== undefined) {
        console.log('The result:', detail.data);
      }
      this.loadActivities().then(() => { console.log('Activities loaded after modal dismiss'); });
    });

    await modal.present();
  }

  async delete (item: ActivityModel) {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this.activityService.delete(item._id).subscribe(
        () => {
          this.loading.dismiss().then(() => {
            this.loadActivities().then(() => { console.log('Activity deleted'); });
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        });
  }

}
