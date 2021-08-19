import {MediaObject} from "../../types/MediaObject";
import MediaContentLayout from "./MediaContentLayout";

interface MediaCardListProps {
    mediaObjects: MediaObject[],
    selectedMedia?: MediaObject,
    setSelectedMedia?: Function
}

function MediaCardList({mediaObjects, selectedMedia, setSelectedMedia}: MediaCardListProps) {
    return (
        <div className="card-group row mt-4">
            {mediaObjects && mediaObjects.map((media: MediaObject) => (
                <div className="col-6 col-lg-3 mb-3" key={media['@id']}
                     onClick={() => setSelectedMedia && setSelectedMedia(media)}>
                    <div className={`card h-100 ${selectedMedia && media === selectedMedia && "border-primary"}`}>
                        <div style={{maxHeight: "15vh", overflow: "hidden"}} className="card-body">
                            {media && <MediaContentLayout media={media} nsfw={media.nsfw} autoplay={false}
                                                          thumbnail={true}/>}
                        </div>
                        {media.title && <div
                            className={`card-footer ${selectedMedia && media === selectedMedia ? "bg-primary text-white" : "text-muted"}`}>
                            <h5 className="text-center">{media.title}</h5>
                        </div>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MediaCardList
