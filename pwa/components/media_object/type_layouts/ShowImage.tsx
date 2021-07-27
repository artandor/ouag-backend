import MediaShowProps from "../MediaShowProps";
import styles from "../MediaObject.module.css"

export default function ShowImage({media, nsfw}: MediaShowProps) {
    return (
        <img src={media['content']} alt={media['comment']}
             className={`img-fluid rounded mx-auto d-block ${nsfw && styles.blur}`}/>
    )
}
