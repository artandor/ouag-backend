import {MediaObject} from "./MediaObject";
import {Animation} from "./Animation";

export class Planning {
    public "@id"?: string;

    constructor(
        _id?: string,
        public animation?: Animation,
        public comment?: string,
        public media?: MediaObject,
        public plannedAt?: Date,
    ) {
        this["@id"] = _id;
    }
}
