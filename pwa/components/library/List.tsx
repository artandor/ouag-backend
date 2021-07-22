import {FunctionComponent} from "react";
import Link from "next/link";
import {Library} from "../../types/Library";
import Image from 'next/image';
import useTranslation from "next-translate/useTranslation";
// @ts-ignore
import emptyLibImage from '../../public/img/empty_library.webp';
// @ts-ignore
import iconPlus from '../../public/img/plus-circle.svg';

interface Props {
    libraries: Library[];
}

export const List: FunctionComponent<Props> = ({libraries}) => {
    const {t} = useTranslation('libraries');

    return (
        <div>
            <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-2 g-md-3 g-lg-4">
                <div className="col">
                    <Link href="/libraries/create">
                        <div className="card bg-light mb-3">
                            <div className="card-body">
                                <Image className="img-fluid img-thumbnail" src={iconPlus} height="" width=""
                                       layout="responsive"/>
                            </div>
                            <div className="card-footer text-center text-truncate">{t('librariesPage.create')}</div>
                        </div>
                    </Link>
                </div>
                {libraries &&
                libraries.length !== 0 &&
                libraries.map((library, index) => (
                    <div key={index} className="col">
                        <Link href={library["@id"]}>
                            <div className="card bg-light mb-3">
                                <div className="card-body">
                                    <Image className="img-fluid img-thumbnail" src={emptyLibImage} height="" width=""
                                           layout="responsive"/>
                                </div>
                                <div className="card-footer text-center text-truncate">{library["name"]}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
