import {FunctionComponent, useState} from "react";
import {useRouter} from "next/router";
import {ErrorMessage, Formik} from "formik";
import {fetch} from "../../utils/dataAccess";
import {User} from "../../types/User";

interface Props {
    user?: User;
    setEditMode;
    setUser;
}

export const Form: FunctionComponent<Props> = ({user, setEditMode, setUser}) => {
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
                        const response = await fetch(isCreation ? "/users" : values["@id"], {
                            method: isCreation ? "POST" : "PUT",
                            body: JSON.stringify(values),
                        });
                        setStatus({
                            isValid: true,
                            msg: isCreation ? 'You need to validate your account, please check your email' : 'Account updated.',
                        });
                        if (!isCreation) {
                            setUser(await response)
                            setEditMode(false)
                        }
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
                                Email
                            </label>
                            <input
                                name="email"
                                id="_email"
                                value={values.email ?? ""}
                                type="text"
                                placeholder=""
                                className={`${user != undefined ? " form-control-plaintext" : "form-control"}`}
                                aria-invalid={errors.email && touched.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly={user != undefined}
                                required={true}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="email"
                        />
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_displayName">
                                Display name
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
                            <label className="form-control-label" htmlFor="_plainPassword">
                                Password
                            </label>
                            <input
                                name="plainPassword"
                                id="_plainPassword"
                                value={values.plainPassword ?? ""}
                                type="password"
                                placeholder=""
                                className={`form-control${
                                    errors.plainPassword && touched.plainPassword
                                        ? " is-invalid"
                                        : ""
                                }`}
                                aria-invalid={errors.plainPassword && touched.plainPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="plainPassword"
                        />
                        <div className="form-group">
                            <label
                                className="form-control-label"
                                htmlFor="_preferredLanguage"
                            >
                                Preferred language
                            </label>
                            <select
                                name="preferredLanguage"
                                id="_preferredLanguage"
                                value={values.preferredLanguage ?? ""}
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
                            >
                                <option value={'en'}>English</option>
                                <option value={'fr'}>Français</option>
                            </select>
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

                        <button className="float-end btn btn-primary" type={"button"}
                                onClick={() => !user ? router.replace('/users/login') : setEditMode(false)}>
                            <a>{!user ? 'Login' : 'Back'}</a>
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};
