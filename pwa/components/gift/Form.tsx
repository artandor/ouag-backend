import {FunctionComponent, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {ErrorMessage, Formik} from "formik";
import {fetch} from "../../utils/dataAccess";
import {Gift} from "../../types/Gift";
import useTranslation from "next-translate/useTranslation";
import {dateToFormString} from "../../utils/common";

interface Props {
    gift?: Gift;
}

export const Form: FunctionComponent<Props> = ({gift}) => {
    const [error, setError] = useState(null);
    const router = useRouter();
    const {t} = useTranslation('gifts')

    return (
        <div className="container">
            <h1>{gift ? `Edit ${gift["name"]}` : `Create Gift`}</h1>
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
                        await fetch(isCreation ? "/gifts" : values["@id"], {
                            method: isCreation ? "POST" : "PUT",
                            body: JSON.stringify(values),
                        });
                        setStatus({
                            isValid: true,
                            msg: `Element ${isCreation ? "created" : "updated"}.`,
                        });
                        router.push("/gifts");
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
                                    I want to create a gift named
                                </label>
                                <br/>
                                <strong><input
                                    name="name"
                                    id="_name"
                                    value={values.name ?? ""}
                                    type="text"
                                    placeholder="Happy birthday !"
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
                                    A memory is sent every
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
                                    day(s)
                                </label>
                                <ErrorMessage
                                    className="text-danger"
                                    component="div"
                                    name="recurrence"
                                />
                                <br/>
                                <label className="form-control-label" htmlFor="_startAt">
                                    from
                                </label>
                                <input
                                    name="startAt"
                                    id="_startAt"
                                    value={values.startAt ? dateToFormString(new Date(values.startAt)) : dateToFormString(new Date())}
                                    type="date"
                                    min={dateToFormString(new Date())}
                                    className={`form-control-inline text-primary${
                                        errors.startAt && touched.startAt ? " is-invalid" : ""
                                    }`}
                                    aria-invalid={errors.startAt && touched.startAt}
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
                                I want to plan the distribution
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
                                <option value="manual">Manually
                                </option>
                                <option value="automatic">Automatically
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
                                            <h5 className="modal-title" id="exampleModalLabel">Help</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <p>In <strong>manual mode</strong>, for each day of your gift you'll have to
                                                associate a
                                                media.</p>
                                            <hr/>
                                            <p>In <strong>automatic mode</strong>, we will use your current libraries to
                                                plan your
                                                image, then you can modify them. If you have no libraries it will do
                                                nothing.</p>
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
                            <Link href="/gifts">
                                <a className="float-start float-lg-none btn btn-primary mt-3"><i
                                    className="bi bi-backspace"></i>{" "}Back
                                    to
                                    list</a>
                            </Link>

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
