import {FunctionComponent, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {ErrorMessage, Formik} from "formik";
import {fetch} from "../../utils/dataAccess";
import {Gift} from "../../types/Gift";

interface Props {
    gift?: Gift;
}

export const Form: FunctionComponent<Props> = ({gift}) => {
    const [error, setError] = useState(null);
    const router = useRouter();

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
        <div>
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
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_name">
                                name
                            </label>
                            <input
                                name="name"
                                id="_name"
                                value={values.name ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.name && touched.name ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.name && touched.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage className="text-danger" component="div" name="name"/>
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_startAt">
                                startAt
                            </label>
                            <input
                                name="startAt"
                                id="_startAt"
                                value={values.startAt ?? ""}
                                type="date"
                                placeholder=""
                                className={`form-control${
                                    errors.startAt && touched.startAt ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.startAt && touched.startAt}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="startAt"
                        />
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_recurrence">
                                recurrence
                            </label>
                            <input
                                name="recurrence"
                                id="_recurrence"
                                value={values.recurrence ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.recurrence && touched.recurrence ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.recurrence && touched.recurrence}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="recurrence"
                        />
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_mediaAmount">
                                mediaAmount
                            </label>
                            <input
                                name="mediaAmount"
                                id="_mediaAmount"
                                value={values.mediaAmount ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.mediaAmount && touched.mediaAmount ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.mediaAmount && touched.mediaAmount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="mediaAmount"
                        />
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_defaultAnimation">
                                defaultAnimation
                            </label>
                            <input
                                name="defaultAnimation"
                                id="_defaultAnimation"
                                value={values.defaultAnimation ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.defaultAnimation && touched.defaultAnimation
                                        ? " is-invalid"
                                        : ""
                                }`}
                                aria-invalid={
                                    errors.defaultAnimation && touched.defaultAnimation
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="defaultAnimation"
                        />
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_fillingMethod">
                                fillingMethod
                            </label>
                            <input
                                name="fillingMethod"
                                id="_fillingMethod"
                                value={values.fillingMethod ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.fillingMethod && touched.fillingMethod
                                        ? " is-invalid"
                                        : ""
                                }`}
                                aria-invalid={errors.fillingMethod && touched.fillingMethod}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="fillingMethod"
                        />
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_receivers">
                                receivers
                            </label>
                            <input
                                name="receivers"
                                id="_receivers"
                                value={values.receivers ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.receivers && touched.receivers ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.receivers && touched.receivers}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="receivers"
                        />
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_invites">
                                invites
                            </label>
                            <input
                                name="invites"
                                id="_invites"
                                value={values.invites ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.invites && touched.invites ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.invites && touched.invites}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="invites"
                        />
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_state">
                                state
                            </label>
                            <input
                                name="state"
                                id="_state"
                                value={values.state ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.state && touched.state ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.state && touched.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="state"
                        />
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_actualMedia">
                                actualMedia
                            </label>
                            <input
                                name="actualMedia"
                                id="_actualMedia"
                                value={values.actualMedia ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.actualMedia && touched.actualMedia ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.actualMedia && touched.actualMedia}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="actualMedia"
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
                            className="btn btn-success"
                            disabled={isSubmitting}
                        >
                            Submit
                        </button>
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
