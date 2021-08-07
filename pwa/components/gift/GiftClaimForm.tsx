import {fetch} from "../../utils/dataAccess";
import {ErrorMessage, Formik, FormikErrors} from "formik";
import useTranslation from "next-translate/useTranslation";

interface GiftClaimFormProps {
    addGift: Function,
}

interface FormValues {
    token: string
}

export default function GiftClaimForm({addGift}: GiftClaimFormProps) {
    const {t} = useTranslation('gifts')
    return (
        <Formik
            initialValues={{token: ""}}
            validate={(values: FormValues) => {
                let errors: FormikErrors<FormValues> = {};
                (Number(values.token) < 100000 || Number(values.token) > 999999) ? errors.token = t('form.token.error') : null;
                return errors;
            }}
            onSubmit={async (values, {setSubmitting, setStatus, setErrors}) => {
                try {
                    const result = await fetch(`/gifts/claim?token=${values.token}`, {
                        method: "GET",
                    });
                    setStatus({
                        isValid: true,
                        msg: "Gift retrieved.",
                    });
                    addGift(result)
                } catch (error) {
                    setStatus({
                        isValid: false,
                        msg: t('form.token.errorNotFound'),
                    });
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
                    <label htmlFor="_token">{t('form.token.label')}</label>
                    <div className="form-group my-2">
                        <input
                            name="token"
                            id="_token"
                            value={values.token ?? ""}
                            placeholder={t('form.token.placeholder')}
                            className={`form-control${
                                errors.token && touched.token
                                    ? " is-invalid"
                                    : ""
                            }`}
                            aria-invalid={errors.token && touched.token}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <ErrorMessage
                        className="text-danger"
                        component="div"
                        name="token"
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
                        {t('claimGiftButton')}
                    </button>
                </form>
            )}
        </Formik>

    )
}
