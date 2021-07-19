import {User} from "./User";

export class Library {
    public "@id"?: string;

    constructor(
        _id?: string,
        public name?: string,
        public sharedWith?: User[],
        public owner?: User
    ) {
        this["@id"] = _id;
    }
}
