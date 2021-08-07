import MediaShowProps from "../MediaShowProps";

export default function ShowText({media}: MediaShowProps) {
    return (
        <p>{media['content']}</p>
    )
}
