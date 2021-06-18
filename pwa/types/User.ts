export class User {
    public "@id"?: string;

    constructor(
        _id?: string,
        public email?: string,
        public displayName?: string,
        public preferredLanguage?: string,
    ) {
        this["@id"] = _id;
    }
}
