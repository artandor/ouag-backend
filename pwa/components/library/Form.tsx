import {FunctionComponent, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {ErrorMessage, Formik} from "formik";
import {fetch} from "../../utils/dataAccess";
import {Library} from "../../types/Library";

interface Props {
    library?: Library;
}

export const Form: FunctionComponent<Props> = ({library}) => {
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await fetch(library["@id"], {method: "DELETE"});
            router.push("/libraries");
        } catch (error) {
            setError(`Error when deleting the resource: ${error}`);
            console.error(error);
        }
    };

    return (
        <div>
            <h1>{library ? `Edit Library ${library["@id"]}` : `Create Library`}</h1>
            <Formik
                initialValues={library ? {...library} : new Library()}
                validate={(values) => {
                    const errors = {};
                    // add your validation logic here
                    return errors;
                }}
                onSubmit={async (values, {setSubmitting, setStatus, setErrors}) => {
                    const isCreation = !values["@id"];
                    try {
                        await fetch(isCreation ? "/libraries" : values["@id"], {
                            method: isCreation ? "POST" : "PUT",
                            body: JSON.stringify(values),
                        });
                        setStatus({
                            isValid: true,
                            msg: `Element ${isCreation ? "created" : "updated"}.`,
                        });
                        router.push("/libraries");
                    } catch (error) {
                        setStatus({
                            isValid: false,
                            msg: `${error.defaultErrorMsg}`,
                        });
                        setErrors(error.fields);
                    }
                    setSubmitting(false);
                }}
            >
                {({
                      values,
                      status,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_name">
                                name
                            </label>
                            <input
                                name="name"
                                id="_name"
                                value={values.name ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.name && touched.name ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.name && touched.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage className="text-danger" component="div" name="name"/>
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_sharedWith">
                                sharedWith
                            </label>
                            <input
                                name="sharedWith"
                                id="_sharedWith"
                                value={values.sharedWith ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.sharedWith && touched.sharedWith ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.sharedWith && touched.sharedWith}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="sharedWith"
                        />
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_owner">
                                owner
                            </label>
                            <input
                                name="owner"
                                id="_owner"
                                value={values.owner ?? ""}
                                type="text"
                                placeholder="Injected by Listener/LibraryInjectOwnerSubscriber.php"
                                className={`form-control${
                                    errors.owner && touched.owner ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.owner && touched.owner}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="owner"
                        />

                        {status && status.msg && (
                            <div
                                className={`alert ${
                                    status.isValid ? "alert-success" : "alert-danger"
                                }`}
                                role="alert"
                            >
                                {status.msg}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={isSubmitting}
                        >
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
            <Link href="/libraries">
                <a className="btn btn-primary">Back to list</a>
            </Link>
            {library && (
                <button className="btn btn-danger" onClick={handleDelete}>
                    <a>Delete</a>
                </button>
            )}
        </div>
    );
};
