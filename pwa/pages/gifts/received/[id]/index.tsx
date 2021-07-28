import ContainerLayout from "../../../../layouts/ContainerLayout";
import {fetch} from "../../../../utils/dataAccess";
import {useEffect, useRef, useState} from "react";
import router from "next/router";
import MediaObjectShow from "../../../../components/media_object/MediaObjectShow";

export default function ReceivedGiftDetailPage() {
    const ref = useRef(null);
    const [gift, setGift] = useState({})

    useEffect(() => {
        import("@lottiefiles/lottie-player");
        fetch(router.asPath.replace('/received', ""))
            .then((giftData) => {
                setGift(giftData)
            })
            .catch(() => null);
    }, [])

    return (
        <>
            <ContainerLayout>
                {gift && gift['actualPlanning'] && (
                    <div className="row text-center">
                        {(gift['actualPlanning']['animation'] || gift['defaultAnimation']) && <lottie-player
                            id="firstLottie"
                            ref={ref}
                            autoplay={true}
                            loop={false}
                            count={2}
                            mode="normal"
                            src={gift['actualPlanning']['animation'] ? gift['actualPlanning']['animation']['lottieLink']
                                : gift['defaultAnimation'] ? gift['defaultAnimation']['lottieLink'] : null}
                            style={{maxHeight: "80vh", position: "fixed", top: "0", left: "0"}}
                        />}
                        <MediaObjectShow media={gift['actualPlanning']['media']}/>
                    </div>
                )}
            </ContainerLayout>
        </>
    )
}
