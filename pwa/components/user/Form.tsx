import {FunctionComponent, useState} from "react";
import {useRouter} from "next/router";
import {ErrorMessage, Formik} from "formik";
import {fetch} from "../../utils/dataAccess";
import {User} from "../../types/User";
import useTranslation from 'next-translate/useTranslation'
import {useCookies} from 'react-cookie';
import Link from 'next/link'

interface Props {
    user?: User;
    setEditMode?;
    setUser?;
}

export const Form: FunctionComponent<Props> = ({user, setEditMode, setUser}) => {
    const [cookies, setCookie] = useCookies(['NEXT_LOCALE']);
    const {t} = useTranslation('users');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    return (
        <div>
            <h1 className="text-center">{user ? t('profilePage.title') : t('registerPage.title')}</h1>
            <Formik
                initialValues={user ? {...user} : new User()}
                validate={(values) => {
                    const errors = {};
                    if (!values['acceptedTos']) {
                        errors['acceptedTos'] = t('forms.fields.errorAccept') + ' ' + t('forms.fields.tos') + '.';
                    }
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
                            msg: isCreation ? t('forms.validateAccount') : t('forms.updatedAccount'),
                        });
                        if (!isCreation) {
                            setUser(await response)
                            setCookie('NEXT_LOCALE', response["preferredLanguage"] ?? "en", {path: '/'});
                            setEditMode(false)
                            router.push(router.pathname, router.pathname, {locale: response["preferredLanguage"] ?? "en"});
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
                                {t('forms.fields.displayName')}
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
                        <div className="form-group">
                            <label
                                className="form-control-label"
                                htmlFor="_preferredLanguage"
                            >
                                {t('forms.fields.preferredLanguage')}
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

                        <div className="form-check">
                            <input
                                name="acceptedTos"
                                id="_acceptedTos"
                                type="checkbox"
                                value="acceptedTos"
                                className={`form-check-input${
                                    errors['acceptedTos'] && touched['acceptedTos'] ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors['acceptedTos'] && touched['acceptedTos']}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required={true}
                            />
                            <label className="form-check-label" htmlFor="_acceptTos">
                                {t('forms.fields.accept')} <Link href="/cgu"><a target="_blank"
                                                                                rel="noopener noreferrer">{t('forms.fields.tos')}</a></Link>
                                {" "}& <Link href="/privacy"><a target="_blank"
                                                                rel="noopener noreferrer">{t('forms.fields.privacy')}</a></Link>
                            </label>
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="acceptedTos"
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
                                onClick={() => !user ? router.replace('/users/login') : setEditMode(false)}>
                            <a>{!user ? t('shared:loginButton') : t('shared:backButton')}</a>
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};
