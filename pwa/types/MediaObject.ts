export class MediaObject {
    public "@id"?: string;

    constructor(
        _id?: string,
        public title?: string,
        public nsfw?: boolean,
        public comment?: string,
        public type?: string,
        public content?: string,
        public file?: File | string,
    ) {
        this["@id"] = _id;
    }
}
