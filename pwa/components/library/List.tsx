import {FunctionComponent} from "react";
import Link from "next/link";
import {Library} from "../../types/Library";
import Image from 'next/image';
import useTranslation from "next-translate/useTranslation";
import imageTest from '../../public/img/BabyYoddle.jpg';

interface Props {
    libraries: Library[];
}

export const List: FunctionComponent<Props> = ({libraries}) => {
    const {t} = useTranslation('libraries');

    return (
        <div>
            <h1>{t('librariesPage.title')}</h1>
            <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-2 g-md-3 g-lg-4">
                <Link href="/libraries/create">
                    <div className="col">
                        <div className="p-3 card bg-light mb-3">
                            <div className="card-body">
                                <Image src='/img/icon-plus.svg' width={680} height={409} layout={'responsive'}/>
                            </div>
                            <div className="card-header text-center text-truncate">{t('librariesPage.create')}</div>
                        </div>
                    </div>
                </Link>
                {libraries &&
                libraries.length !== 0 &&
                libraries.map((library) => (
                    <Link href={library["@id"]}>
                        <div className="col">
                            <div className="p-3 card bg-light mb-3">
                                <div className="card-body">
                                    <Image src={imageTest}/>
                                </div>
                                <div className="card-header text-center text-truncate">{library["name"]}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
