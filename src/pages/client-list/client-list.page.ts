import {Component, OnInit} from '@angular/core';
import {ClientModalPage} from './client-modal/client-modal.page';
import { OverlayEventDetail } from '@ionic/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {ActivityService, ClientService} from '../../_services';
import {ActivityModel, ClientModel, UserModel} from '../../_models';

export interface Config {
  technologies: string;
}

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.page.html',
  styleUrls: ['./client-list.page.scss']
})
export class ClientListPage implements OnInit {
  clients: ClientModel[] = [];
  clientsList: ClientModel[] = [];
  activities: ActivityModel[];
  currentUser: UserModel;

  public config: Config;
  public columns: any;
  public rows: any;

  public loading: HTMLIonLoadingElement;
  constructor(
      public modalCtrl: ModalController,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      private activityService: ActivityService,
      private clientService: ClientService
  ) {
    this.columns = [
      { prop: 'lastName, firstName', name: 'Cliente' },
      { prop: 'firstName', name: 'Nombre' },
      { name: 'DNI' },
      { prop: 'activity.name', name: 'Actividad' }
    ];
  }

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
            this.initializeItems();
            this.rows = data;
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

  initializeItems() {
    this.clientsList = this.clients;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.clientsList = this.clientsList.filter((item) => {
        return (item.lastName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
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

  onActivate(event, index) {
    if (event.type === 'click') {
      console.log('Select Event', event);
      console.log('Select index', event.cellIndex);
      this.presentModal(event.row._id);
    }
  }
}
