import { Activity } from './activity';
import { Serializable } from './serializable';

export class Goal implements Serializable{
    id: string;
    activityId: string;
    timesPerWeek: number;
}
