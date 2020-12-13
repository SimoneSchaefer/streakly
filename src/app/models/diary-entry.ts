import { Serializable } from './serializable';

export class DiaryEntry implements Serializable {
    id: number;
    activityId: number;
    date: number;
}
