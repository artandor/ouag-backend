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
            <h1 className="text-center">Login</h1>
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
                                setStatus({
                                    isValid: false,
                                    msg: "Wrong credentials or this account doesn't exists.",
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
                        <div className="form-group my-2">
                            <input
                                name="email"
                                id="_email"
                                value={values.email ?? ""}
                                type="email"
                                placeholder="Email"
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

                        <div className="form-group my-2">
                            <input
                                name="plainPassword"
                                id="_plainPassword"
                                value={values.plainPassword ?? ""}
                                type="password"
                                placeholder="Password"
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
                            className="btn btn-success my-1 col-12"
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
