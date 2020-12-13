import { Serializable } from './serializable';

export class Activity implements Serializable {
    id: number;
    name: string;
    description: string;
}
