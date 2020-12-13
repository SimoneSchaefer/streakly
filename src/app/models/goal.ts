import { Activity } from './activity';
import { Serializable } from './serializable';

export class Goal implements Serializable{
    id: number;
    activityId: number;
    timesPerWeek: number;
}
