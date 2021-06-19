import {useState} from "react";
import {useRouter} from "next/router";
import {ErrorMessage, Formik} from "formik";
import {User} from "../../types/User";
import authProvider from "../../utils/authProvider";

export default function LoginForm() {
    const [error, setError] = useState(null);
    const router = useRouter();

    return (
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={new User()}
                validate={(values) => {
                    const errors = {};
                    // add your validation logic here
                    return errors;
                }}
                onSubmit={async (values, {setSubmitting, setStatus, setErrors}) => {
                    console.log(values)
                    try {
                        authProvider.login({username: values['email'], password: values['plainPassword']})
                            .then(() => {
                                setStatus({
                                    isValid: true,
                                    msg: 'Connexion successfull',
                                });

                                router.push("/users/profile");
                            })
                            .catch((error) => {
                                console.log(error)
                                setStatus({
                                    isValid: false,
                                    msg: `${error}`,
                                });
                            })

                    } catch (error) {
                        console.log(error)
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
                                type="email"
                                placeholder=""
                                className={`form-control${
                                    errors.email && touched.email ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.email && touched.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required={true}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="email"
                        />
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_plainPassword">
                                Plain Password
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
                            Login
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};
