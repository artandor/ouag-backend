import {MediaObject} from "../../types/MediaObject";
import MediaContentLayout from "./MediaContentLayout";
import {useState} from "react";
import useTranslation from "next-translate/useTranslation";

interface MediaObjectShowProps {
    media: MediaObject,
}

export default function MediaObjectShow({media}: MediaObjectShowProps) {
    const [nsfw, setNsfw] = useState(media.nsfw)
    const {t} = useTranslation('gifts')

    return (
        <div className="col-12 mb-4">
            <h1>{t('receiver.mediaObject.title')} : {media['title']}</h1>
            <blockquote className="blockquote">
                {media['comment'] && <p>{t('receiver.mediaObject.comment')} : {media['comment']}</p>}
            </blockquote>
            {nsfw &&
            <>
                <p>{t('receiver.mediaObject.nsfwNotice')}</p>
                <div className="d-inline-flex">
                    <button style={{zIndex: 100}} className="btn btn-danger" onClick={() => setNsfw(false)}>
                        {t('shared:confirmButton')}
                    </button>
                </div>
            </>}
            <MediaContentLayout media={media} nsfw={nsfw} autoplay={true}/>
            <figure className="mt-4">
                <figcaption className="blockquote-footer">
                    {t('receiver.mediaObject.from')} <cite title="Media owner">{media['owner']['displayName']}</cite>
                </figcaption>
            </figure>
            <div className="d-inline-flex">
                <a style={{zIndex: 100}} className="btn btn-success" href={media.content} target="_blank"
                   rel="noreferrer" download={media.title}>
                    <i className="bi bi-download"></i> {t('shared:downloadButton')}</a>
            </div>
        </div>
    )
}
