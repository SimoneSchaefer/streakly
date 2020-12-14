import { Serializable } from './serializable';

export class DiaryEntry implements Serializable {
    id: string;
    activityId: string;
    date: number;
}
