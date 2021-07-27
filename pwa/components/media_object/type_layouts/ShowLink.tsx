import MediaShowProps from "../MediaShowProps";

export default function ShowLink({media}: MediaShowProps) {
    return (
        <a href={media['content']}>{media['content']}</a>
    )
}
