import {FunctionComponent, useState} from "react";
import {useRouter} from "next/router";
import {ErrorMessage, Formik} from "formik";
import {fetch} from "../../utils/dataAccess";
import {User} from "../../types/User";

interface Props {
    user?: User;
    editMode;
}

export const Form: FunctionComponent<Props> = ({user, editMode}) => {
    const [error, setError] = useState(null);
    const router = useRouter();

    return (
        <div>
            <h1>{user ? `Edit User ${user["@id"]}` : `Create User`}</h1>
            <Formik
                initialValues={user ? {...user} : new User()}
                validate={(values) => {
                    const errors = {};
                    // add your validation logic here
                    return errors;
                }}
                onSubmit={async (values, {setSubmitting, setStatus, setErrors}) => {
                    const isCreation = !values["@id"];
                    try {
                        await fetch(isCreation ? "/users" : values["@id"], {
                            method: isCreation ? "POST" : "PUT",
                            body: JSON.stringify(values),
                        });
                        setStatus({
                            isValid: true,
                            msg: `Element ${isCreation ? "created" : "updated"}.`,
                        });
                        router.push("/users/profile");
                        editMode(false)
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
                            <label className="form-control-label" htmlFor="_email">
                                email
                            </label>
                            <input
                                name="email"
                                id="_email"
                                value={values.email ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.email && touched.email ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.email && touched.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={true}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="email"
                        />
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_displayName">
                                displayName
                            </label>
                            <input
                                name="displayName"
                                id="_displayName"
                                value={values.displayName ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.displayName && touched.displayName ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.displayName && touched.displayName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="displayName"
                        />
                        <div className="form-group">
                            <label
                                className="form-control-label"
                                htmlFor="_preferredLanguage"
                            >
                                preferredLanguage
                            </label>
                            <input
                                name="preferredLanguage"
                                id="_preferredLanguage"
                                value={values.preferredLanguage ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.preferredLanguage && touched.preferredLanguage
                                        ? " is-invalid"
                                        : ""
                                }`}
                                aria-invalid={
                                    errors.preferredLanguage && touched.preferredLanguage
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="preferredLanguage"
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
            <button className="btn btn-primary" onClick={() => editMode(false)}>
                <a>Back</a>
            </button>
        </div>
    );
};
