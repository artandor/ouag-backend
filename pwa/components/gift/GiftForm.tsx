import {FunctionComponent, useState} from "react";
import {useRouter} from "next/router";
import {ErrorMessage, Formik} from "formik";
import {fetch} from "../../utils/dataAccess";
import {Gift} from "../../types/Gift";
import useTranslation from "next-translate/useTranslation";
import Trans from 'next-translate/Trans'
import {dateToFormString} from "../../utils/common";

interface Props {
    gift?: Gift;
}

export const GiftForm: FunctionComponent<Props> = ({gift}) => {
    const {t} = useTranslation('gifts')
    const [error, setError] = useState(null);
    const router = useRouter();

    return (
        <div className="container">
            <h1>{gift ? `${t('shared:edit')} ${gift["name"]}` : `${t('giftCreation')}`}</h1>
            <Formik
                initialValues={gift ? {...gift} : new Gift()}
                validate={(values) => {
                    const errors = {};
                    // add your validation logic here
                    return errors;
                }}
                onSubmit={async (values, {setSubmitting, setStatus, setErrors}) => {
                    const isCreation = !values["@id"];
                    try {
                        const result = await fetch(isCreation ? "/gifts" : values["@id"], {
                            method: isCreation ? "POST" : "PUT",
                            body: JSON.stringify(values),
                        });
                        setStatus({
                            isValid: true,
                            msg: `Element ${isCreation ? "created" : "updated"}.`,
                        });
                        router.push(result['@id']);
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
                        <div className="text-center">
                            <div className="mb-3">
                                <label className="form-control-label" htmlFor="_name">
                                    {t('form.name.label')}
                                </label>
                                <br/>
                                <strong><input
                                    name="name"
                                    id="_name"
                                    value={values.name ?? ""}
                                    type="text"
                                    placeholder={t('form.name.placeholder')}
                                    className={`form-control-inline text-primary${
                                        errors.name && touched.name ? " is-invalid" : ""
                                    }`}
                                    aria-invalid={errors.name && touched.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                /></strong>
                                <ErrorMessage className="text-danger" component="div" name="name"/>
                                <br/>
                                <label className="form-control-label" htmlFor="_mediaAmount">
                                    containing
                                </label>
                                <input
                                    name="mediaAmount"
                                    id="_mediaAmount"
                                    value={values.mediaAmount ?? ""}
                                    type="number"
                                    placeholder="30"
                                    min="2"
                                    max="730"
                                    className={`form-control-inline text-primary${
                                        errors.mediaAmount && touched.mediaAmount ? " is-invalid" : ""
                                    }`}
                                    aria-invalid={errors.mediaAmount && touched.mediaAmount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <label className="form-control-label" htmlFor="_mediaAmount">
                                    memories.
                                </label>
                                <ErrorMessage
                                    className="text-danger"
                                    component="div"
                                    name="mediaAmount"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-control-label" htmlFor="_recurrence">
                                    {t('form.mediaAmount.label')}
                                </label>
                                <input
                                    name="recurrence"
                                    id="_recurrence"
                                    value={values.recurrence ?? ""}
                                    type="number"
                                    placeholder="2"
                                    min="1"
                                    max="365"
                                    className={`form-control-inline text-primary${
                                        errors.recurrence && touched.recurrence ? " is-invalid" : ""
                                    }`}
                                    aria-invalid={errors.recurrence && touched.recurrence}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <label className="form-control-label" htmlFor="_recurrence">
                                    {t('form.mediaAmount.labelEnd')}
                                </label>
                                <ErrorMessage
                                    className="text-danger"
                                    component="div"
                                    name="recurrence"
                                />
                                <br/>
                                <label className="form-control-label" htmlFor="_startAt">
                                    {t('form.startAt.label')}
                                </label>
                                <input
                                    name="startAt"
                                    id="_startAt"
                                    min={dateToFormString(new Date())}
                                    value={values.startAt ? dateToFormString(new Date(values.startAt)) : ""}
                                    type="date"
                                    className={`form-control-inline text-primary${
                                        errors.startAt && touched.startAt ? " is-invalid" : ""
                                    }`}
                                    aria-invalid={typeof errors.startAt != 'undefined' && typeof touched.startAt != 'undefined'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage
                                    className="text-danger"
                                    component="div"
                                    name="startAt"
                                />
                            </div>
                            <label className="form-control-label" htmlFor="_fillingMethod">
                                {t('form.fillingMethod.label')}
                            </label>
                            <select
                                name="fillingMethod"
                                id="_fillingMethod"
                                value={values.fillingMethod ?? ""}
                                placeholder=""
                                className={`form-control-inline text-primary${
                                    errors.fillingMethod && touched.fillingMethod
                                        ? " is-invalid"
                                        : ""
                                }`}
                                aria-invalid={errors.fillingMethod && touched.fillingMethod}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="manual">{t('form.fillingMethod.options.manual')}
                                </option>
                                <option value="automatic">{t('form.fillingMethod.options.automatic')}
                                </option>
                            </select>
                            <ErrorMessage
                                className="text-danger"
                                component="div"
                                name="fillingMethod"
                            />
                            <button type="button" className="btn" title="" data-bs-target="#modalHelpFillingMethod"
                                    data-bs-toggle="modal" data-bs-placement="bottom"><i
                                className="bi bi-question-circle"></i>
                            </button>

                            <div className="modal fade" id="modalHelpFillingMethod" tabIndex={-1} aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title"
                                                id="exampleModalLabel">{t('form.fillingMethod.help.title')}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <p><Trans i18nKey='gifts:form.fillingMethod.help.manual'
                                                      components={[<strong key="0"/>]}/></p>
                                            <hr/>
                                            <p><Trans i18nKey='gifts:form.fillingMethod.help.automatic'
                                                      components={[<strong key="0"/>]}/></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary mt-3" type="button" onClick={router.back}><i
                                className="bi bi-arrow-left"></i> {t('shared:backButton')}
                            </button>

                            <button
                                type="submit"
                                className="float-end float-lg-none btn btn-success ms-2 mt-3"
                                disabled={isSubmitting}
                            ><i className="bi bi-check2"></i>{" "}
                                {gift ? t('shared:editButton') : t('shared:createButton')}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};
