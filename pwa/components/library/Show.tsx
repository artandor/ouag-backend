import {FunctionComponent, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {fetch} from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import {Library} from "../../types/Library";

interface Props {
    library: Library;
}

export const Show: FunctionComponent<Props> = ({library}) => {
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await fetch(library["@id"], {method: "DELETE"});
            router.push("/libraries");
        } catch (error) {
            setError("Error when deleting the resource.");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>{`Show Library ${library["@id"]}`}</h1>
            <table className="table table-responsive table-striped table-hover">
                <thead>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">name</th>
                    <td>{library["name"]}</td>
                </tr>
                <tr>
                    <th scope="row">sharedWith</th>
                    <td>
                        <ReferenceLinks items={library["sharedWith"]} type="User"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row">owner</th>
                    <td>
                        <ReferenceLinks items={library["owner"]} type="User"/>
                    </td>
                </tr>
                </tbody>
            </table>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <Link href="/libraries">
                <a className="btn btn-primary">Back to list</a>
            </Link>{" "}
            <Link href={`${library["@id"]}/edit`}>
                <a className="btn btn-warning">Edit</a>
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
                <a>Delete</a>
            </button>
        </div>
    );
};
