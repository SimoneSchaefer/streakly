import { Serializable } from './serializable';

export class Goal implements Serializable {
    id: string;
    activityName: string;
    timesPerWeek: number;
}
