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

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await fetch(gift["@id"], {method: "DELETE"});
            router.push("/gifts");
        } catch (error) {
            setError(`Error when deleting the resource: ${error}`);
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h1>{gift ? `Edit Gift ${gift["@id"]}` : `Create Gift`}</h1>
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
                            <label className="form-control-label" htmlFor="_name">
                                I want to create a gift named
                            </label>
                            <strong><input
                                name="name"
                                id="_name"
                                value={values.name ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control-inline text-primary${
                                    errors.name && touched.name ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.name && touched.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            /></strong>
                            <ErrorMessage className="text-danger" component="div" name="name"/>
                            <label className="form-control-label" htmlFor="_mediaAmount">
                                containing
                            </label>
                            <input
                                name="mediaAmount"
                                id="_mediaAmount"
                                value={values.mediaAmount ?? ""}
                                type="text"
                                placeholder=""
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
                            <label className="form-control-label" htmlFor="_recurrence">
                                A memory is sent every
                            </label>
                            <input
                                name="recurrence"
                                id="_recurrence"
                                value={values.recurrence ?? ""}
                                type="text"
                                placeholder=""
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

                            <label className="form-control-label" htmlFor="_startAt">
                                from
                            </label>
                            <input
                                name="startAt"
                                id="_startAt"
                                value={values.startAt ? dateToFormString(new Date(values.startAt)) : dateToFormString(new Date())}
                                type="date"
                                placeholder=""
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

                            <label className="form-control-label" htmlFor="_fillingMethod">
                                I want to plan my gift
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
                                <option value="manual">Manually (For each day of your gift you'll have to associate a
                                    media)
                                </option>
                                <option value="automatic">Automatically (we will use your current libraries to plan your
                                    image, then you can modify them. If you have no libraries it will do nothing)
                                </option>
                            </select>

                            <ErrorMessage
                                className="text-danger"
                                component="div"
                                name="fillingMethod"
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
                        </div>

                        <div className="mt-3">
                            <button
                                type="submit"
                                className="btn btn-success"
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
            <Link href="/gifts">
                <a className="btn btn-primary">Back to list</a>
            </Link>
            {gift && (
                <button className="btn btn-danger" onClick={handleDelete}>
                    <a>Delete</a>
                </button>
            )}
        </div>
    );
};
