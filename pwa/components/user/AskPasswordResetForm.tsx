import {useState} from "react";
import {useRouter} from "next/router";
import {ErrorMessage, Formik} from "formik";
import {User} from "../../types/User";
import useTranslation from 'next-translate/useTranslation'
import {ENTRYPOINT} from "../../config/entrypoint";

function AskPasswordResetForm() {
    const {t} = useTranslation('users');
    const [error, setError] = useState(null);
    const router = useRouter();

    return (
        <div>
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
                        const response = await fetch(ENTRYPOINT + "/forgot_password/", {
                            method: "POST",
                            body: JSON.stringify({
                                'email': values['email']
                            }),
                        });
                        console.log(response.status)
                        if (response.status != 204) {
                            setStatus({
                                isValid: false,
                                msg: "Invalid token",
                            });
                        } else {
                            setStatus({
                                isValid: true,
                                msg: t('forms.resetPasswordEmailSent'),
                            });
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
                                {t('forms.fields.email')}
                            </label>
                            <div className="input-group">
                                <input
                                    name="email"
                                    id="_email"
                                    type="email"
                                    value={values.email ?? ""}
                                    placeholder=""
                                    required={true}
                                    className={`form-control${
                                        errors.email && touched.email
                                            ? " is-invalid"
                                            : ""
                                    }`}
                                    aria-invalid={errors.email && touched.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="email"
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
                            className="btn btn-primary mt-2"
                            disabled={isSubmitting}
                        >
                            {t('shared:submitButton')}
                        </button>

                        <button className="float-end btn btn-light mt-2" type={"button"}
                                onClick={() => router.replace('/users/login')}>
                            <a>{t('shared:loginButton')}</a>
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default AskPasswordResetForm;
