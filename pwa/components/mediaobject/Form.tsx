import {FunctionComponent, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {ErrorMessage, Formik} from "formik";
import {fetch} from "../../utils/dataAccess";
import {MediaObject} from "../../types/MediaObject";

interface Props {
    mediaobject?: MediaObject;
}

export const Form: FunctionComponent<Props> = ({mediaobject}) => {
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await fetch(mediaobject["@id"], {method: "DELETE"});
            router.push("/media_objects");
        } catch (error) {
            setError(`Error when deleting the resource: ${error}`);
            console.error(error);
        }
    };

    return (
        <div>
            <h1>
                {mediaobject
                    ? `Edit MediaObject ${mediaobject["@id"]}`
                    : `Create MediaObject`}
            </h1>
            <Formik
                initialValues={mediaobject ? {...mediaobject} : new MediaObject()}
                validate={(values) => {
                    const errors = {};
                    // add your validation logic here
                    return errors;
                }}
                onSubmit={async (values, {setSubmitting, setStatus, setErrors}) => {
                    const isCreation = !values["@id"];
                    try {
                        await fetch(isCreation ? "/media_objects" : values["@id"], {
                            method: isCreation ? "POST" : "PUT",
                            body: JSON.stringify(values),
                        });
                        setStatus({
                            isValid: true,
                            msg: `Element ${isCreation ? "created" : "updated"}.`,
                        });
                        router.push("/media_objects");
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
                            <label className="form-control-label" htmlFor="_title">
                                title
                            </label>
                            <input
                                name="title"
                                id="_title"
                                value={values.title ?? ""}
                                type="text"
                                placeholder=""
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
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_nsfw">
                                nsfw
                            </label>
                            <input
                                name="nsfw"
                                id="_nsfw"
                                value={values.nsfw ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.nsfw && touched.nsfw ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.nsfw && touched.nsfw}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage className="text-danger" component="div" name="nsfw"/>
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_comment">
                                comment
                            </label>
                            <input
                                name="comment"
                                id="_comment"
                                value={values.comment ?? ""}
                                type="text"
                                placeholder=""
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
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_content">
                                content
                            </label>
                            <input
                                name="content"
                                id="_content"
                                value={values.content ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.content && touched.content ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.content && touched.content}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="content"
                        />
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_file">
                                file
                            </label>
                            <input
                                name="file"
                                id="_file"
                                value={values.file ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.file && touched.file ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.file && touched.file}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage className="text-danger" component="div" name="file"/>
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_type">
                                type
                            </label>
                            <input
                                name="type"
                                id="_type"
                                value={values.type ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.type && touched.type ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.type && touched.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage className="text-danger" component="div" name="type"/>
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_size">
                                size
                            </label>
                            <input
                                name="size"
                                id="_size"
                                value={values.size ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.size && touched.size ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.size && touched.size}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage className="text-danger" component="div" name="size"/>
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_owner">
                                owner
                            </label>
                            <input
                                name="owner"
                                id="_owner"
                                value={values.owner ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.owner && touched.owner ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.owner && touched.owner}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="owner"
                        />
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="_library">
                                library
                            </label>
                            <input
                                name="library"
                                id="_library"
                                value={values.library ?? ""}
                                type="text"
                                placeholder=""
                                className={`form-control${
                                    errors.library && touched.library ? " is-invalid" : ""
                                }`}
                                aria-invalid={errors.library && touched.library}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="library"
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
            <Link href="/media_objects">
                <a className="btn btn-primary">Back to list</a>
            </Link>
            {mediaobject && (
                <button className="btn btn-danger" onClick={handleDelete}>
                    <a>Delete</a>
                </button>
            )}
        </div>
    );
};
