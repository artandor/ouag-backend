import {ErrorMessage, Formik} from "formik";
import {fetch} from "../../utils/dataAccess";
import {GiftInvite} from "../../types/GiftInvite";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";

interface InviteFormProps {
    invite?: GiftInvite,
    addInvite: Function
}

export default function InviteForm({invite, addInvite}: InviteFormProps) {
    const {t} = useTranslation('gifts')
    const router = useRouter()

    return (
        <>
            <Formik
                initialValues={invite ?? new GiftInvite()}
                validate={(values) => {
                    return {};
                }}
                onSubmit={async (values, {setSubmitting, setStatus, setErrors}) => {
                    const isCreation = !values["@id"];
                    try {
                        const result = await fetch(isCreation ? router.asPath : values["@id"], {
                            method: isCreation ? "POST" : "PUT",
                            body: JSON.stringify(values),
                        });
                        setStatus({
                            isValid: true,
                            msg: `Element ${isCreation ? "created" : "updated"}.`,
                        });
                        addInvite(result)
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
                        <div className="form-group my-2">
                            <label htmlFor="_email">{t('form.invite.email.label')}</label>
                            <input
                                name="email"
                                id="_email"
                                value={values.email ?? ""}
                                type="email"
                                placeholder={t('form.invite.email.placeholder')}
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

                        <label htmlFor="_creatorNickname">{t('form.invite.creatorNickname.label')}</label>
                        <div className="form-group my-2">
                            <input
                                name="creatorNickname"
                                id="_creatorNickname"
                                value={values.creatorNickname ?? ""}
                                placeholder={t('form.invite.creatorNickname.placeholder')}
                                className={`form-control${
                                    errors.creatorNickname && touched.creatorNickname
                                        ? " is-invalid"
                                        : ""
                                }`}
                                aria-invalid={errors.creatorNickname && touched.creatorNickname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="creatorNickname"
                        />

                        <label htmlFor="_receiverNickname">{t('form.invite.receiverNickname.label')}</label>
                        <div className="form-group my-2">
                            <input
                                name="receiverNickname"
                                id="_receiverNickname"
                                value={values.receiverNickname ?? ""}
                                placeholder={t('form.invite.receiverNickname.placeholder')}
                                className={`form-control${
                                    errors.receiverNickname && touched.receiverNickname
                                        ? " is-invalid"
                                        : ""
                                }`}
                                aria-invalid={errors.receiverNickname && touched.receiverNickname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="receiverNickname"
                        />

                        <div className="form-group my-2">
                            <label htmlFor="_comment">{t('form.invite.comment.label')}</label>
                            <textarea
                                name="comment"
                                id="_comment"
                                value={values.comment ?? ""}
                                placeholder={t('form.invite.comment.placeholder')}
                                className={`form-control${
                                    errors.comment && touched.comment
                                        ? " is-invalid"
                                        : ""
                                }`}
                                aria-invalid={errors.comment && touched.comment}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="comment"
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
                            className="btn btn-primary float-end"
                            disabled={isSubmitting}
                        >
                            {invite ? t('shared:editButton') : t('shared:createButton')}
                        </button>
                    </form>
                )}
            </Formik>
        </>
    )
}
