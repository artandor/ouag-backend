export class User {
    public "@id"?: string;

    constructor(
        _id?: string,
        public email?: string,
        public displayName?: string,
        public plainPassword?: string,
        public preferredLanguage?: string,
        acceptedTosAt?: Date
    ) {
        this["@id"] = _id;
        this["acceptedTos"] = acceptedTosAt !== undefined
    }
}
