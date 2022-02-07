import {FunctionComponent, Props, useState} from "react";
import {useRouter} from "next/router";
import {ErrorMessage, Formik} from "formik";
import {User} from "../../types/User";
import useTranslation from 'next-translate/useTranslation'
import {useCookies} from 'react-cookie';
import Link from 'next/link'
import {ENTRYPOINT} from "../../config/entrypoint";


export const PasswordResetForm: FunctionComponent<Props> = ({}) => {
    const {t} = useTranslation('users');
    const [showPassword, setShowPassword] = useState(false);
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
                    const token = window.location.pathname.split('\\').pop().split('/').pop()
                    try {
                        const response = await fetch(ENTRYPOINT + "/forgot_password/" + token, {
                            method: "POST",
                            body: JSON.stringify({
                                'password': values['plainPassword']
                            }),
                        });
                        console.log(response.status)
                        if (response.status != 204) {
                            setStatus({
                                isValid: false,
                                msg: t('forms.resetPasswordExpired'),
                            });
                            setTimeout(() => router.replace('/users/forgot_password'), 2000)
                        } else {
                            setStatus({
                                isValid: true,
                                msg: t('forms.updatedAccount'),
                            });
                            setTimeout(() => router.replace('/users/login'), 2000)
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
                            <label className="form-control-label" htmlFor="_plainPassword">
                                {t('forms.fields.password')}
                            </label>
                            <div className="input-group">
                                <input
                                    name="plainPassword"
                                    id="_plainPassword"
                                    value={values.plainPassword ?? ""}
                                    type={showPassword ? 'text' : 'password'}
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
                                <button className="btn btn-outline-secondary" type="button"
                                        onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <i className="bi bi-eye-slash"/> : <i className="bi bi-eye"/>}
                                </button>
                            </div>
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
};
