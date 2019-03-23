import {ActivityModel} from './activity.model';

export class ClientModel {
    _id: string;
    firstName: string;
    lastName: string;
    dni: number;
    activity: ActivityModel;
    user_id: string;
    createdDate: string;
}
