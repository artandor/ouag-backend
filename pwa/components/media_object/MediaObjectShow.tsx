import {MediaObject} from "../../types/MediaObject";
import MediaContentLayout from "./MediaContentLayout";
import {useState} from "react";

interface MediaObjectShowProps {
    media: MediaObject,
}

export default function MediaObjectShow({media}: MediaObjectShowProps) {
    //TODO : Ask @vasilvestre if it's ok to duplicate state to make the component autonomous
    const [nsfw, setNsfw] = useState(media.nsfw)

    return (
        <div className="col-12">
            <h1>Titre : {media['title']}</h1>
            <blockquote className="blockquote">
                <p>Comment : {media['comment']}</p>
            </blockquote>
            {nsfw &&
            <>
                <p>This media seems to be not safe for work. Confirm that you want to see it now ?</p>
                <div className="d-inline-flex">
                    <button style={{zIndex: 100}} className="btn btn-danger" onClick={() => setNsfw(false)}>
                        Confirm
                    </button>
                </div>
            </>}
            <MediaContentLayout media={media} nsfw={nsfw}/>
            <figure className="mt-4">
                <figcaption className="blockquote-footer">
                    From <cite title="Source Title">{media['owner']['displayName']}</cite>
                </figcaption>
            </figure>
            <div className="d-inline-flex">
                <a style={{zIndex: 100}} className="btn btn-success" href={media.content} download="test"><i
                    className="bi bi-download"></i> Download</a>
            </div>
        </div>
    )
}
