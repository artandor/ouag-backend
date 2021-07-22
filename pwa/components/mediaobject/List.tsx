import {FunctionComponent} from "react";
import Link from "next/link";
import {MediaObject} from "../../types/MediaObject";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
// @ts-ignore
import emptyLibImage from '../../public/img/empty_library.webp';
// @ts-ignore
import test from '../../public/img/test.png';
// @ts-ignore
import iconPlus from '../../public/img/plus-circle.svg';

interface Props {
    media_objects: MediaObject[];
}

export const List: FunctionComponent<Props> = ({media_objects}) => {
    const {t} = useTranslation('libraries');

    return (
        <div>
            <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-2 g-md-3 g-lg-4">
                <div className="col">
                    <Link href="/mediaobjects/create">
                        <div className="card bg-light mb-3">
                            <div className="card-body">
                                <Image className="img-fluid img-thumbnail" src={iconPlus} height="" width=""
                                       layout="responsive"/>
                            </div>
                            <div className="card-footer text-center text-truncate">{t('mediasPage.create')}</div>
                        </div>
                    </Link>
                </div>
                {media_objects &&
                media_objects.length !== 0 &&
                media_objects.map((media_object, index) => (
                    <div key={index} className="col">
                        <Link href={media_object["@id"]}>
                            <div className="card bg-light mb-3">
                                <div className="card-body">
                                    <Image className="img-fluid img-thumbnail"
                                           src={media_object["nsfw"] ? test : emptyLibImage} height="" width=""
                                           layout="responsive"
                                    />
                                </div>
                                <div className="card-footer text-center text-truncate">{media_object["title"]}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
