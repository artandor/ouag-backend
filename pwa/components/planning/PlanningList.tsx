import {Planning} from "../../types/Planning";
import MediaContentLayout from "../media_object/MediaContentLayout";
import {Gift} from "../../types/Gift";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";

interface PlanningListProps {
    plannings: Planning[],
    gift: Gift,
    selectedPlanning?: Planning,
    selectPlanning?: Function
}

function PlanningList({plannings, gift, selectedPlanning, selectPlanning}: PlanningListProps) {
    const router = useRouter()
    const {t} = useTranslation('gifts')

    const renderListItem = planning => {
        const datePlanned = new Date(gift.startAt);
        datePlanned.setDate(datePlanned.getDate() + (planning.position * gift.recurrence));

        return (
            <div className="col-6 col-md-3 my-3" key={planning['@id']} ref={planning['ref']}
                 onClick={() => selectPlanning && selectPlanning(planning)}>
                <div
                    className={`card h-100 ${(selectedPlanning && planning === selectedPlanning) && "border-primary"}`}>
                    <div style={{maxHeight: "15vh", overflow: "hidden"}} className="m-3">
                        {planning.media ? <MediaContentLayout media={planning.media}/> :
                            <p className="text-center mt-4">{t('fields.emptyMedia')}</p>}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title text-center">{planning.media && planning.media.title}</h5>
                        {(planning.comment || (planning.media && planning.media.comment)) &&
                        <p className="card-text">{planning.comment ?? planning.media.comment}</p>
                        }
                    </div>
                    <div
                        className={`card-footer ${(selectedPlanning && planning === selectedPlanning) ? "bg-primary text-white" : "text-muted"}`}>
                        <p className="card-text">
                            <small>{t('fields.plannedFor')} {datePlanned.toLocaleDateString(router.locale, {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}</small></p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card-group row horizontal-scroll">
            {plannings.map((planning: Planning) => renderListItem(planning))}
        </div>
    )
}

export default PlanningList
