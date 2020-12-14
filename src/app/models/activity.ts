import { Serializable } from './serializable';

export class Activity implements Serializable {
    id: string;
    name: string;
    description: string;
}
