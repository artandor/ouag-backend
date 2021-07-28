export class GiftInvite {
    public "@id"?: string;

    constructor(
        _id?: string,
        public email?: string,
        public creatorNickname?: string,
        public receiverNickname?: string,
        public comment?: string,
        public claimed?: boolean
    ) {
        this["@id"] = _id;
    }
}
