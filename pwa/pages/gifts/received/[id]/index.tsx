import ContainerLayout from "../../../../layouts/ContainerLayout";
import {fetch} from "../../../../utils/dataAccess";
import {useEffect, useRef, useState} from "react";
import router from "next/router";
import MediaObjectShow from "../../../../components/media_object/MediaObjectShow";
import Head from "next/head"

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
            <Head>
                <title>{gift['name']}</title>
            </Head>
            <ContainerLayout>
                {gift && gift['actualPlanning'] ? (
                    <div className="row text-center">
                        <lottie-player
                            id="firstLottie"
                            ref={ref}
                            autoplay={true}
                            loop={false}
                            count={2}
                            mode="normal"
                            src={gift['actualPlanning']['animation'] ? gift['actualPlanning']['animation']['lottieLink']
                                : gift['defaultAnimation'] ? gift['defaultAnimation']['lottieLink'] : null}
                            style={{maxHeight: "80vh", position: "fixed", top: "0", left: "0"}}
                        />
                        <MediaObjectShow media={gift['actualPlanning']['media']}/>
                    </div>
                ) : (
                    <div className="row text-center">
                        <h1>{gift['name']}</h1>
                        <p className="h2 mt-3">¯\_(ツ)_/¯</p>
                        <p>Oops, il semblerait qu'il n'y ait pas de cadeau pour vous aujourd'hui !</p>
                    </div>
                )}
            </ContainerLayout>
        </>
    )
}
