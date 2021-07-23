import {useState} from "react";
import {fetch} from "../../utils/dataAccess";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import InviteForm from "./InviteForm";
import {GiftInvite} from "../../types/GiftInvite";

export default function InviteList({invites, addInvite, deleteInvite}) {
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedInvite, setSelectedInvite] = useState({})

    const handleClose = () => {
        return setShowModal(false);
    };

    function handleAddInvite(invite) {
        addInvite(invite)
        handleClose()
        setSelectedInvite(null)
    }

    async function handleDelete(invite) {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        try {
            await fetch(invite["@id"], {method: "DELETE"})
            deleteInvite(invite)
        } catch (error) {
            setError("Error when deleting the resource.");
            console.error(error);
        }
    }

    return (
        <div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <Button variant="secondary" onClick={() => {
                setSelectedInvite(new GiftInvite())
                setShowModal(true);
            }}>
                <i className="bi bi-journal-plus"></i> Add a recipient
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a recipient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InviteForm addInvite={handleAddInvite} invite={selectedInvite}/>
                </Modal.Body>
            </Modal>
            <ul className={"list-group"}>
                {invites.length > 0 ? invites.map((invite) => {
                    return (
                        <li key={invite["@id"]} className="list-group-item list-group-item-action" onClick={(e) => {
                            setSelectedInvite(invite)
                            setShowModal(true)
                        }}>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{invite["receiverNickname"]} / {invite["email"]}</h5>
                                <button className="btn btn-link" onClick={async (e) => {
                                    e.stopPropagation()
                                    await handleDelete(invite);
                                }}><small
                                    className="text-muted"><i className="bi bi-trash"></i></small></button>
                            </div>
                            <p className="mb-1">Your Nickname : {invite["creatorNickname"]}</p>
                            <small className="text-muted">{invite["comment"]}</small>
                        </li>
                    );
                }) : null}
            </ul>
        </div>
    )
}
