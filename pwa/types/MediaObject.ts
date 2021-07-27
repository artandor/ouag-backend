export class MediaObject {
    public "@id"?: string;

    constructor(
        _id?: string,
        public title?: string,
        public nsfw?: boolean,
        public comment?: string,
        public type?: string,
        public content?: string,
    ) {
        this["@id"] = _id;
    }
}
