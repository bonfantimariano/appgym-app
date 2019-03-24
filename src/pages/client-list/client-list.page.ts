import {Component, OnInit} from '@angular/core';
import {ClientModalPage} from './client-modal/client-modal.page';
import { OverlayEventDetail } from '@ionic/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {ActivityService, ClientService} from '../../_services';
import {ActivityModel, ClientModel, UserModel} from '../../_models';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.page.html',
  styleUrls: ['./client-list.page.scss'],
})
export class ClientListPage implements OnInit {
  clients: ClientModel[] = [];
  activities: ActivityModel[];
  currentUser: UserModel;
  public loading: HTMLIonLoadingElement;
  constructor(
      public modalCtrl: ModalController,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      private activityService: ActivityService,
      private clientService: ClientService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loadClients().then(() => console.log('Clients loaded'));
  }

  async loadClients() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this.clientService.getAll().subscribe(
        data => {
          this.loading.dismiss().then(() => {
            console.log('clients ', data);
            this.clients = data;
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
      component: ClientModalPage,
      componentProps: {
        clientId: id,
        editMode: editMode
      }
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail && detail.data !== null && detail.data !== undefined) {
        console.log('The result:', detail.data);
      }
      this.loadClients().then(() => { console.log('Clients loaded after modal dismiss'); });
    });

    await modal.present();
  }
}

