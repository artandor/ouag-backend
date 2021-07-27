import {MediaObject} from "../../types/MediaObject";
import ShowVideo from "./type_layouts/ShowVideo";
import ShowImage from "./type_layouts/ShowImage";
import ShowLink from "./type_layouts/ShowLink";
import ShowText from "./type_layouts/ShowText";
import MediaShowProps from "./MediaShowProps";


export default function MediaContentLayout({media, nsfw = false}: MediaShowProps) {
    return getComponentFromType(media, nsfw);
}

export function getComponentFromType(media: MediaObject, nsfw: boolean): JSX.Element {
    switch (media['type']) {
        case 'video/mp4':
            return <ShowVideo media={media} nsfw={nsfw}/>
        case 'image/gif':
        case 'image/png':
        case 'image/jpeg':
            return <ShowImage media={media} nsfw={nsfw}/>
        case 'text/link':
            return <ShowLink media={media} nsfw={nsfw}/>
        case 'text/plain':
            return <ShowText media={media} nsfw={nsfw}/>
        default:
            return <ShowText media={media} nsfw={nsfw}/>
    }
}
