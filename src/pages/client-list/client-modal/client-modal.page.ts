import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { ClientService, ActivityService } from '../../../_services';
import { ClientModel, UserModel } from '../../../_models';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.page.html',
  styleUrls: ['./client-modal.page.scss'],
})
export class ClientModalPage implements OnInit {
    currentUser: UserModel;
    client: ClientModel = new ClientModel();
    activity_id = '';
    activities: any[];
    editMode: false;
    public loading: HTMLIonLoadingElement;
    constructor(
        public modalCtrl: ModalController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private clientService: ClientService,
        private activityService: ActivityService
    ) {}

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.navParams.get('clientId'));
        this.editMode = this.navParams.get('editMode');
        if (this.editMode) {
            this.loadClient(this.navParams.get('clientId')).then(() => console.log('client loaded...'));
        }
        this.loadActivities();
    }

    async loadClient(id) {
        console.log(id);
        this.loading = await this.loadingCtrl.create();
        await this.loading.present();
        this.clientService.getById(id).subscribe(
            data => {
                console.log(data);
                this.loading.dismiss().then(() => {
                    this.client = data;
                    this.activity_id = data.activity._id;
                });
            },
            error => {
                this.loading.dismiss().then(async () => {
                    const alert = await this.alertCtrl.create({
                        message: error,
                        buttons: [{ text: 'Ok', role: 'Cancel' }],
                    });
                    await alert.present();
                });
            });
    }

    save() {
        this.editMode ? this.updateItem() : this.createItem();
    }

    async createItem() {
        const newClient = {
            firstName: this.client.firstName,
            lastName: this.client.lastName,
            dni: this.client.dni,
            activity: this.activity_id,
            user_id: this.currentUser._id
        };
        this.loading = await this.loadingCtrl.create();
        await this.loading.present();
        this.clientService.create(newClient)
            .subscribe(
                data => {
                    this.loading.dismiss().then(() => {
                        console.log('Client created!!');
                        this.modalCtrl.dismiss();
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

    async updateItem() {
        this.loading = await this.loadingCtrl.create();
        await this.loading.present();
        this.client.activity._id = this.activity_id;
        this.clientService.update(this.client)
            .subscribe(
                () => {
                    this.loading.dismiss().then(() => {
                        console.log('Client updated!!');
                        this.modalCtrl.dismiss();
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

    loadActivities() {
        this.activityService.getAll().subscribe(data => {
                this.activities = data;
            },
            error => {
                    console.log('Error loading activities: ', error);
            });
    }

    close() {
        this.modalCtrl.dismiss();
    }

}
