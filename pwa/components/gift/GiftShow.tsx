import {FunctionComponent, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {fetch} from "../../utils/dataAccess";
import {Gift} from "../../types/Gift";

interface Props {
    gift: Gift;
}

export const GiftShow: FunctionComponent<Props> = ({gift}) => {
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await fetch(gift["@id"], {method: "DELETE"});
            router.push("/gifts");
        } catch (error) {
            setError("Error when deleting the resource.");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>{gift["name"]}</h1>
            <Link href="/gifts">
                <a className="btn btn-primary"><i className="bi bi-arrow-left"></i> Back to list</a>
            </Link>
            <Link href={router.asPath + "/invites"}>
                <a className="btn btn-success float-end">Next <i className="bi bi-arrow-right"></i></a>
            </Link>
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
                    <td>{gift["name"]}</td>
                </tr>
                <tr>
                    <th scope="row">startAt</th>
                    <td>{new Date(gift["startAt"]).toLocaleDateString(router.locale, {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}</td>
                </tr>
                <tr>
                    <th scope="row">recurrence</th>
                    <td>{gift["recurrence"]}</td>
                </tr>
                <tr>
                    <th scope="row">mediaAmount</th>
                    <td>{gift["mediaAmount"]}</td>
                </tr>
                <tr>
                    <th scope="row">fillingMethod</th>
                    <td>{gift["fillingMethod"]}</td>
                </tr>
                <tr>
                    <th scope="row">state</th>
                    <td>{gift["state"]}</td>
                </tr>
                </tbody>
            </table>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <Link href={`${gift["@id"]}/edit`}>
                <a className="btn btn-warning">Edit</a>
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
                <a>Delete</a>
            </button>
        </div>
    );
};
