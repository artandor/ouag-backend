export class Animation {
    public "@id"?: string;

    constructor(
        _id?: string,
        public lottieLink?: string,
    ) {
        this["@id"] = _id;
    }
}
