import { Serializable } from './serializable';

export class DiaryEntry implements Serializable {
    id: string;
    goalId: string;
    date: number;
}
