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

    return (
        <div>
            <h1>{library ? `Edit Library ${library["name"]}` : `Create Library`}</h1>
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
                            <strong><input
                                name="name"
                                id="_name"
                                value={values.name ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control-inline text-primary${
                                    errors.name && touched.name ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.name && touched.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            /></strong>
                        </div>
                        <ErrorMessage className="text-danger" component="div" name="name"/>
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
                            className="float-end float-lg-none btn btn-success ms-2 mt-3"
                            disabled={isSubmitting}
                        >
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
            <br/>
            <Link href="/libraries">
                <a className="btn btn-primary">Back to list</a>
            </Link>
        </div>
    );
};
