import MediaShowProps from "../MediaShowProps";

export default function ShowVideo({media, nsfw}: MediaShowProps) {
    return (
        <video controls={true} autoPlay={!nsfw} muted={false} className={"img-fluid"} style={{zIndex: 100}}>
            <source src={media['content']} type={media['type']}/>
            Your browser does not support the video tag.
        </video>
    )
}
