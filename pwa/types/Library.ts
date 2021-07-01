export class Library {
    public "@id"?: string;

    constructor(
        _id?: string,
        public name?: string,
        public sharedWith?: string[],
        public owner?: string
    ) {
        this["@id"] = _id;
    }
}
