export class MediaObject {
    public "@id"?: string;

    constructor(
        _id?: string,
        public title?: string,
        public nsfw?: boolean,
        public comment?: string,
        public content?: string,
        public file?: any,
        public type?: string,
        public size?: string,
        public owner?: string,
        public library?: string
    ) {
        this["@id"] = _id;
    }
}
