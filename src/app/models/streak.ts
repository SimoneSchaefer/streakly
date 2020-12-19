import { Serializable } from "./serializable";

export class Streak implements Serializable {
    id: string;
    count: number = 0;
    lastComputation: number = Date.now();
}
