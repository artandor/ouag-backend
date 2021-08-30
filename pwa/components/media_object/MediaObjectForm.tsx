import {ErrorMessage, Formik} from "formik";
import {fetch} from "../../utils/dataAccess";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import {MediaObject} from "../../types/MediaObject";

interface MediaObjectFormProps {
    libraryIri: string,
    mediaObject?: MediaObject
    addMediaObject: Function
}

function MediaObjectForm({libraryIri, mediaObject, addMediaObject}: MediaObjectFormProps) {
    const {t} = useTranslation('gifts')
    const router = useRouter()

    return (
        <>
            <Formik
                initialValues={mediaObject ?? new MediaObject()}
                validate={(values) => {
                    return {};
                }}
                onSubmit={async (values, {setSubmitting, setStatus, setErrors}) => {
                    const isCreation = !values["@id"];
                    try {
                        let formData = new FormData();
                        for (let value in values) {
                            if (values[value]) {
                                formData.append(value, values[value]);
                            }
                        }
                        const result = await fetch(isCreation ? libraryIri + "/media_objects" : values["@id"], {
                            method: isCreation ? "POST" : "PUT",
                            body: formData,
                        });
                        setStatus({
                            isValid: true,
                            msg: `Element ${isCreation ? "created" : "updated"}.`,
                        });
                        // addMediaObject(result)
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
                      setFieldValue
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-2">
                            <label htmlFor="_title">{t('form.mediaObject.title.label')}</label>
                            <input
                                name="title"
                                id="_title"
                                value={values.title ?? ""}
                                placeholder={t('form.mediaObject.title.placeholder')}
                                className={`form-control${
                                    errors.title && touched.title ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.title && touched.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="title"
                        />

                        <div className="form-group my-2">
                            <label htmlFor="_file">{t('form.mediaObject.file.label')}</label>
                            <input
                                name="file"
                                id="_file"
                                type="file"
                                placeholder={t('form.mediaObject.file.placeholder')}
                                className={`form-control${
                                    errors.file && touched.file ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.file && touched.file}
                                onBlur={handleBlur}
                                required={true}
                                onChange={(event) => {
                                    setFieldValue("file", event.currentTarget.files[0]);
                                }}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="file"
                        />

                        <div className="form-group my-2">
                            <label htmlFor="_comment">{t('form.mediaObject.comment.label')}</label>
                            <input
                                name="comment"
                                id="_comment"
                                value={values.comment ?? ""}
                                placeholder={t('form.mediaObject.comment.placeholder')}
                                className={`form-control${
                                    errors.comment && touched.comment ? " is-invalid" : ""
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
                            {mediaObject ? t('shared:editButton') : t('shared:createButton')}
                        </button>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default MediaObjectForm
