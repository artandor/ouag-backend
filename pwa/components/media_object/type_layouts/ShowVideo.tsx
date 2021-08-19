import MediaShowProps from "../MediaShowProps";

export default function ShowVideo({media, nsfw, autoplay = false}: MediaShowProps) {
    return (
        <video controls={true} autoPlay={autoplay && !nsfw} muted={false} className={"img-fluid"} style={{zIndex: 100}}>
            <source src={media['content']} type={media['type']}/>
            Your browser does not support the video tag.
        </video>
    )
}
