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
import useTranslation from "next-translate/useTranslation";

interface Props {
    library: Library;
    updateCollaborator: any;
}

export const Show: FunctionComponent<Props> = ({library, updateCollaborator}) => {
    const {t} = useTranslation('libraries');
    let [medias, setMedias] = useState({});
    const [errorMessage, setError] = useState({});
    const router = useRouter();
    let [query, setQuery] = useState({});
    let [options, setOptions] = useState([]);
    let [_cache] = useState({});
    let [isLoading, setIsLoading] = useState(false);
    let [collab, setCollab] = useState({})

    //Getting all medias in the Library
    useEffect(() => {
        fetch(router.asPath + "/media_objects")
            .then((value) => {
                setMedias(value)
            })
            .catch(() => null);
    }, [])

    //Handle delete of the Library
    const handleDelete = async () => {
        if (!window.confirm(t("libraryPage.deleteLibrary"))) return;
        try {
            await fetch(library["@id"], {method: "DELETE"});
            await router.push("/libraries");
        } catch (error) {
            setError(t("libraryPage.errorDelete"));
            console.error(errorMessage);
        }
    };

    //Handle delete of a user's access to the Library
    const handleCollaboratorDelete = async (collaborator: User) => {
        if (!window.confirm(t("libraryPage.deleteCollaborator"))) return;
        try {
            library["sharedWith"] = library["sharedWith"].filter(o => {
                return o !== collaborator
            });
            let bodyMap = library["sharedWith"].map((entry) => {
                return entry["@id"]
            })
            await fetch(library["@id"], {body: JSON.stringify({"sharedWith": bodyMap}), method: "PUT"},);
            updateCollaborator(library);
        } catch (error) {
            setError(t("libraryPage.errorDeleteCollaborator"));
            console.error(errorMessage);
        }
    };

    //On submit, if the user isn't already in the sharedWith, add it.
    //First in DB, then on display
    const handleSubmit = async (collaborator: User) => {
        const variable = library["sharedWith"].find(existingCollaborator => existingCollaborator["displayName"] === collaborator["displayName"])
        if (collaborator["displayName"] && !variable) {
            try {
                library["sharedWith"].push(collaborator)
                let bodyMap = library["sharedWith"].map((entry, index) => {
                    return entry["@id"]
                })
                await fetch(library["@id"], {body: JSON.stringify({"sharedWith": bodyMap}), method: "PUT"},);
                updateCollaborator(library);
            } catch (error) {
                setError(t("libraryPage.errorAddCollaborator"));
                console.error(errorMessage);
            }
        }
    }

    //Get a list of Users
    function makeAndHandleRequest(query) {
        return fetch(`/users?displayName=${query}`)
            .then((resp) => {
                /* eslint-disable-line camelcase */
                const options = (resp["hydra:member"].map(i => ({
                    ["@id"]: i["@id"],
                    ["@type"]: i["@type"],
                    displayName: i.displayName,
                })));
                return {options};
            });
    }

    //Set collab var at selected value
    function handleSelected(selected) {
        setCollab(selected[0])
    }

    //Set the query var with the user's input, then call handleSearch
    //only if query's length > 3 and no input change for at least 1 second
    const handleInputChange = query => {
        setQuery(query);
        if (query.length >= 3) {
            _.debounce(handleSearch, 1000,)(query);
        }
    };

    //Will call the function to get all users with a username which contains query
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
                        <a className="btn btn-primary">{t("editLibrary.back")}</a>
                    </Link>
                    <Link href={`${library["@id"]}/edit`}>
                        <a className="btn btn-warning">{t("editLibrary.edit")}</a>
                    </Link>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        <a>{t("libraryPage.deleteButton")}</a>
                    </button>

                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#shareWithModal">
                        {t("libraryPage.shareLibraryButton")}
                    </button>

                    <div className="modal fade" id="shareWithModal" aria-labelledby="shareWithModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="shareWithModalLabel">
                                        {t("libraryPage.shareLibraryTitle")}</h5>
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
                                                   className="col-form-label">
                                                {t("libraryPage.username")}:</label>
                                            <AsyncTypeahead
                                                isLoading={isLoading}
                                                options={options}
                                                query={query}
                                                id="async-result-query"
                                                labelKey="displayName"
                                                maxResults={30}
                                                minLength={3}
                                                onInputChange={handleInputChange}
                                                onChange={handleSelected}
                                                onSearch={handleSearch}
                                                onSubmit={handleSubmit}
                                                paginate
                                                placeholder={t("libraryPage.placeholder")}
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
                                            onClick={() => collab && handleSubmit(collab)}
                                        >
                                            {t("libraryPage.submitButton")}
                                        </button>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            data-bs-dismiss="modal">{t("libraryPage.closeModalButton")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
        </div>
    );
}
