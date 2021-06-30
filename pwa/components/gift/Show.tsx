import {FunctionComponent, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {fetch} from "../../utils/dataAccess";
import {Gift} from "../../types/Gift";

interface Props {
    gift: Gift;
}

export const Show: FunctionComponent<Props> = ({gift}) => {
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
            <h1>{`Show Gift ${gift["@id"]}`}</h1>
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
                    <td>{gift["startAt"]}</td>
                </tr>
                <tr>
                    <th scope="row">recurrence</th>
                    <td>{gift["recurrence"]}</td>
                </tr>
                <tr>
                    <th scope="row">mediaAmount</th>
                    <td>{gift["mediaAmount"]}</td>
                </tr>
                {/*          <tr>
            <th scope="row">defaultAnimation</th>
            <td>
              <ReferenceLinks
                items={gift["defaultAnimation"]}
                type="Animation"
              />
            </td>
          </tr>*/}
                <tr>
                    <th scope="row">fillingMethod</th>
                    <td>{gift["fillingMethod"]}</td>
                </tr>
                {/*          <tr>
            <th scope="row">receivers</th>
            <td>
              <ReferenceLinks items={gift["receivers"]} type="User" />
            </td>
          </tr>*/}
                {/*          <tr>
            <th scope="row">invites</th>
            <td>{gift["invites"]}</td>
          </tr>*/}
                <tr>
                    <th scope="row">state</th>
                    <td>{gift["state"]}</td>
                </tr>
                {/*          <tr>
            <th scope="row">actualMedia</th>
            <td>
              <ReferenceLinks items={gift["actualMedia"]} type="MediaObject" />
            </td>
          </tr>*/}
                </tbody>
            </table>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <Link href="/gifts">
                <a className="btn btn-primary">Back to list</a>
            </Link>{" "}
            <Link href={`${gift["@id"]}/edit`}>
                <a className="btn btn-warning">Edit</a>
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
                <a>Delete</a>
            </button>
        </div>
    );
};
