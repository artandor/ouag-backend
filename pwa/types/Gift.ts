import {Planning} from "./Planning";

export class Gift {
    public "@id"?: string;

    constructor(
        _id?: string,
        public name?: string,
        public startAt?: Date,
        public recurrence?: number,
        public mediaAmount?: number,
        public completionPercentage?: number,
        public defaultAnimation?: any,
        public fillingMethod?: string,
        public receivers?: string[],
        public invites?: any,
        public state?: string,
        public actualPlanning?: Planning,
        public checkoutUrl?: string,
    ) {
        this["@id"] = _id;
    }
}
