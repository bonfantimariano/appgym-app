import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, NavParams} from '@ionic/angular';
import { ActivityService } from '../../../_services';
import {ActivityModel, UserModel} from '../../../_models';

@Component({
  selector: 'app-activity-modal',
  templateUrl: './activity-modal.page.html',
  styleUrls: ['./activity-modal.page.scss'],
})
export class ActivityModalPage implements OnInit {
    name: string;
    description: string;
    price: number;
    frequency: number;
    currentUser: UserModel;
    activity: ActivityModel = new ActivityModel();
    editMode: false;
    public loading: HTMLIonLoadingElement;
    constructor(
        public modalCtrl: ModalController,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private activityService: ActivityService
    ) { }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.navParams.get('activityId'));
        this.editMode = this.navParams.get('editMode');
        if (this.editMode) {
            this.loadActivity(this.navParams.get('activityId')).then(() => console.log('Activity loaded'));
        }
    }

    async loadActivity(id) {
        console.log(id);
        this.loading = await this.loadingCtrl.create();
        await this.loading.present();
        this.activityService.getById(id).subscribe(
            data => {
                console.log(data);
                this.loading.dismiss().then(() => {
                    this.activity = data;
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

    save() {
        this.editMode ? this.updateItem() : this.createItem();
    }

    async createItem() {
        const newActivity = {
            name: this.activity.name,
            description: this.activity.description,
            price: this.activity.price,
            frequency: this.activity.frequency,
            user_id: this.currentUser._id
        };
        this.loading = await this.loadingCtrl.create();
        await this.loading.present();
        this.activityService.create(newActivity)
            .subscribe(
                data => {
                    this.loading.dismiss().then(() => {
                        console.log('activity created!!');
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
        this.activityService.update(this.activity)
            .subscribe(
                data => {
                    this.loading.dismiss().then(() => {
                        console.log('activity updated!!');
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

    close() {
        this.modalCtrl.dismiss();
    }

}
