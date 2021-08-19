import {MediaObject} from "../../types/MediaObject";

export default interface MediaShowProps {
    media: MediaObject,
    nsfw?: boolean,
    autoplay?: boolean,
    thumbnail?: boolean
}
