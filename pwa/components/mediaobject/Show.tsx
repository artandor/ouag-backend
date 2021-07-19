import {FunctionComponent, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {fetch} from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import {MediaObject} from "../../types/MediaObject";

interface Props {
    mediaobject: MediaObject;
}

export const Show: FunctionComponent<Props> = ({mediaobject}) => {
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await fetch(mediaobject["@id"], {method: "DELETE"});
            router.push("/media_objects");
        } catch (error) {
            setError("Error when deleting the resource.");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>{mediaobject["title"]}</h1>
            <table className="table table-responsive table-striped table-hover">
                <thead>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">title</th>
                    <td>{mediaobject["title"]}</td>
                </tr>
                <tr>
                    <th scope="row">nsfw</th>
                    <td>{mediaobject["nsfw"]}</td>
                </tr>
                <tr>
                    <th scope="row">comment</th>
                    <td>{mediaobject["comment"]}</td>
                </tr>
                <tr>
                    <th scope="row">content</th>
                    <td>{mediaobject["content"]}</td>
                </tr>
                <tr>
                    <th scope="row">file</th>
                    <td>{mediaobject["file"]}</td>
                </tr>
                <tr>
                    <th scope="row">type</th>
                    <td>{mediaobject["type"]}</td>
                </tr>
                <tr>
                    <th scope="row">size</th>
                    <td>{mediaobject["size"]}</td>
                </tr>
                <tr>
                    <th scope="row">owner</th>
                    <td>
                        <ReferenceLinks items={mediaobject["owner"]} type="User"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row">library</th>
                    <td>
                        <ReferenceLinks items={mediaobject["library"]} type="Library"/>
                    </td>
                </tr>
                </tbody>
            </table>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <Link href={mediaobject["library"]}>
                <a className="btn btn-primary">Back to list</a>
            </Link>{" "}
            <Link href={`${mediaobject["@id"]}/edit`}>
                <a className="btn btn-warning">Edit</a>
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
                <a>Delete</a>
            </button>
        </div>
    );
};
