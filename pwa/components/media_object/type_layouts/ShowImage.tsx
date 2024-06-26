import MediaShowProps from "../MediaShowProps";

export default function ShowImage({media, nsfw, thumbnail}: MediaShowProps) {
    return (
        <img src={media['content']} alt={media['comment']}
             className={`img-fluid rounded mx-auto d-block ${nsfw && "blur"}`}/>
    );
};
