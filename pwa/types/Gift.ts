export class Gift {
    public "@id"?: string;

    constructor(
        _id?: string,
        public name?: string,
        public startAt?: Date,
        public recurrence?: number,
        public mediaAmount?: number,
        public defaultAnimation?: string,
        public fillingMethod?: string,
        public receivers?: string[],
        public invites?: any,
        public state?: string,
        public actualMedia?: string
    ) {
        this["@id"] = _id;
    }
}
