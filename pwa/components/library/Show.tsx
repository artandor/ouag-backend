import {FunctionComponent, useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {fetch} from "../../utils/dataAccess";
import {Library} from "../../types/Library";
// @ts-ignore
import emptyLibImage from "../../public/img/empty_library.webp";
import {List} from "../mediaobject/List";
import {User} from "../../types/User";
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import _ from "lodash";

interface Props {
    library: Library;
    deleteCollaborator: any;
    addCollaborator: any;
}

export const Show: FunctionComponent<Props> = ({library, deleteCollaborator, addCollaborator}) => {
    let [medias, setMedias] = useState({});
    const [errorMessage, setError] = useState(null);
    const router = useRouter();
    let [query, setQuery] = useState();
    let [options, setOptions] = useState([]);
    let [_cache] = useState({});
    let [isLoading, setIsLoading] = useState(false);
    let [collab, setCollab] = useState({})

    useEffect(() => {
        fetch(router.asPath + "/media_objects")
            .then((value) => {
                setMedias(value)
            })
            .catch(() => null);
    }, [])

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

    const handleCollaboratorDelete = async (collaborator: User) => {
        if (!window.confirm("Are you sure you want to remove this user's access to the library?")) return;
        try {
            library["sharedWith"] = library["sharedWith"].filter(o => {
                return o !== collaborator
            });
            let bodyMap = library["sharedWith"].map((entry, index) => {
                return entry["@id"]
            })
            await fetch(library["@id"], {body: JSON.stringify({"sharedWith": bodyMap}), method: "PUT"},);
            deleteCollaborator(library);
            return;
        } catch (error) {
            setError("Error when deleting the resource.");
            console.error(errorMessage);
        }
    };

    const handleSubmit = async (collaborator: User) => {
        try {
            console.log(collaborator)
            library["sharedWith"].push(collaborator)
            let bodyMap = library["sharedWith"].map((entry, index) => {
                return entry["@id"]
            })
            await fetch(library["@id"], {body: JSON.stringify({"sharedWith": bodyMap}), method: "PUT"},);
            addCollaborator(library);
            return;
        } catch (error) {
            setError("Error when adding the resource.");
            console.error(errorMessage);
        }
    }

    function makeAndHandleRequest(query) {
        return fetch(`/users?displayName=${query}`)
            .then((resp) => {
                console.log(query)
                console.log(resp)
                /* eslint-disable-line camelcase */
                const options = (resp["hydra:member"].map(i => ({
                    ["@id"]: i["@id"],
                    ["@type"]: i["@type"],
                    displayName: i.displayName,
                })));
                return {options};
            });
    }

    const handleInputChange = query => {
        setQuery(query);
        if (query.length >= 3) {
            _.debounce(handleSearch, 1000,)(query);
        }
    };

    const handleSearch = query => {
        setIsLoading(true);
        makeAndHandleRequest(query).then(resp => {
            _cache[query] = {...resp};
            setIsLoading(false);
            setOptions(resp.options);
        });
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
                                <div className="modal-body">
                                    {library["sharedWith"] && library["sharedWith"].length > 0 &&
                                    <ul className="list-group">
                                        {library["sharedWith"].map((collaborator, index) => {
                                            return (
                                                <li key={index}
                                                    className="list-group-item d-flex justify-content-between align-items-center">
                                                    {collaborator.displayName}
                                                    <i className="bi bi-trash"
                                                       onClick={() => handleCollaboratorDelete(collaborator)}
                                                    ></i>
                                                </li>);
                                        })}
                                    </ul>
                                    }
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name"
                                                   className="col-form-label">Username:</label>
                                            <AsyncTypeahead
                                                isLoading={isLoading}
                                                options={options}
                                                query={query}
                                                id="async-result-query"
                                                labelKey="displayName"
                                                maxResults={30}
                                                minLength={3}
                                                onInputChange={handleInputChange}
                                                onSearch={handleSearch}
                                                onSubmit={handleSubmit}
                                                paginate
                                                placeholder="Search for a user..."
                                                renderMenuItemChildren={option => (
                                                    <div key={option.id}>
                                                        <span
                                                            onClick={() => setCollab(option)}>{option.displayName}</span>
                                                    </div>
                                                )}
                                                useCache={false}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() => handleSubmit(collab)}
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
