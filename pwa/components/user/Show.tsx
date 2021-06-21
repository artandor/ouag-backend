import {FunctionComponent, useState} from "react";
import {useRouter} from "next/router";
import {fetch} from "../../utils/dataAccess";
import {User} from "../../types/User";
import authProvider from "../../utils/authProvider";

interface Props {
    user: User;
    setEditMode;
}

export const Show: FunctionComponent<Props> = ({user, setEditMode}) => {
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await fetch(user["@id"], {method: "DELETE"});
            router.push("/users");
        } catch (error) {
            setError("Error when deleting the resource.");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>{`Welcome to your profile ${user["displayName"]}`}</h1>
            <table className="table table-responsive table-striped table-hover">
                <thead>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">email</th>
                    <td>{user["email"]}</td>
                </tr>
                <tr>
                    <th scope="row">displayName</th>
                    <td>{user["displayName"]}</td>
                </tr>
                <tr>
                    <th scope="row">preferredLanguage</th>
                    <td>{user["preferredLanguage"]}</td>
                </tr>
                </tbody>
            </table>
            <p>At the moment, if you need to delete your account, please contact <a
                href={'mailto:support@once-upon-a-gift.com'}>support@once-upon-a-gift.com</a></p>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <div className={'btn-group col-12'} role={'group'} aria-label={'actions'}>
                <button className="btn btn-warning" onClick={(event) => setEditMode(true)}>
                    Edit
                </button>
                {/* The delete button is hidden until https://github.com/artandor/ouag-backend/issues/21 is done */}
                <button className="btn btn-danger d-none" onClick={handleDelete}>
                    <a>Delete</a>
                </button>
                <button className="btn btn-primary" onClick={(event) => {
                    authProvider.logout().then(value => router.push('/users/login'));
                }}>
                    <a>Logout</a>
                </button>
            </div>
        </div>
    );
};
