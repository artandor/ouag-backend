import {FunctionComponent, useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {fetch} from "../../utils/dataAccess";
import {Library} from "../../types/Library";
// @ts-ignore
import emptyLibImage from "../../public/img/empty_library.webp";
import {List} from "../mediaobject/List";

interface Props {
    library: Library;
}

export const Show: FunctionComponent<Props> = ({library}) => {
    let [medias, setMedias] = useState({});
    const [errorMessage, setError] = useState(null);
    const router = useRouter();
    {
        library != undefined &&
        useEffect(() => {
            fetch(library["@id"] + "/media_objects")
                .then((value) => {
                    setMedias(value)
                })
                .catch(() => null);
        }, [])
    }

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await fetch(library["@id"], {method: "DELETE"});
            await router.push("/libraries");
        } catch (error) {
            setError("Error when deleting the resource.");
            console.error(errorMessage);
        }
    };

    return (
        <div>
            {library == null ? "fetching data..." :
                <>
                    <h1 className="text-center">{library["name"]}</h1>
                    <List media_objects={medias["hydra:member"]}/>
                    <Link href="/libraries">
                        <a className="btn btn-primary">Back to list</a>
                    </Link>{" "}
                    <Link href={`${library["@id"]}/edit`}>
                        <a className="btn btn-warning">Edit</a>
                    </Link>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        <a>Delete</a>
                    </button>

                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#shareWithModal">
                        Share library
                    </button>

                    <div className="modal fade" id="shareWithModal" aria-labelledby="shareWithModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="shareWithModalLabel">Share library with another
                                        user</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                {library["sharedWith"] && library["sharedWith"].length > 0 &&
                                <div className="modal-body">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th className="text-center">Username</th>
                                            <th className="text-center">Delete</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {library["sharedWith"].map((collaborator) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{collaborator.displayName}</td>
                                                    <td className="text-center">Bouton delete à mettre en place</td>
                                                </tr>);
                                        })}
                                        </tbody>
                                    </table>
                                </div>}
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name"
                                                   className="col-form-label">Username:</label>
                                            <input type="text" className="form-control" id="Username"
                                                   placeholder="Enter other user display name here"/>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                        >Submit
                                        </button>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
        </div>
    );
}
