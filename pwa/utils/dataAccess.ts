import get from "lodash/get";
import has from "lodash/has";
import mapValues from "lodash/mapValues";
import isomorphicFetch from "isomorphic-unfetch";
import {ENTRYPOINT} from "../config/entrypoint";

const MIME_TYPE = "application/ld+json";

interface Violation {
    message: string;
    propertyPath: string;
}

export const fetch = async (id: string, init: RequestInit = {}) => {
    if (typeof init.headers === "undefined") init.headers = {};
    if (!init.headers.hasOwnProperty("Accept"))
        init.headers = {...init.headers, Accept: MIME_TYPE};
    if (
        init.body !== undefined &&
        !(init.body instanceof FormData) &&
        !init.headers.hasOwnProperty("Content-Type")
    )
        init.headers = {...init.headers, "Content-Type": MIME_TYPE};

    // This is clearly temporary, in the future we must use a real auth but this allows to work on other subjects while auth is not here
    if (!init.headers.hasOwnProperty("Authorization"))
        init.headers = {
            ...init.headers,
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MjQwNDQzNTQsImV4cCI6MTYyNDA1MTU1NCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidXNlckBleGFtcGxlLmNvbSJ9.DvN8qtkB2SsZwWNuy-MZgYtQRuWerZooN9jIldhpHb-R12qRfnkA3j1LeiYLySU06a8NqY_7b64QDlL8HXw5fG9HouPFMpHQUhsDeTBABM8M08bBE5QQBZg0OrA0ZBjPQmtd1XxTkCXmz1SLRWq7YaWS9CVr2FKcMqoAqXQv0xRZh6cNR7m8kBgGYweoGaHQ7FDMrnTUKFPSUSecQEecLTPa-vQoNQUBbYngXRtBPagn_Pp3iXKGI4VdcieZvJ78OY2wr9hxpk7OQbtJrs0FXt50-OhpDL9bnsFxy08HG_ExI2VSeH3We2in-qxYpJqtDcHyQfiiIU_fhppv-2e591Mkyx9hf1toEH1yn3RqSvu5gqVrZTxqyO5Tm3h-4ExQpFqcGsLFSFwEHNGlv-3mudGyH55fZ3cDSAjlDA5UVurIGQsqGDFgZA43Cf6y2f_M6kzUON3QzOX18kCwqWYfxj7TVTrE1_dLOQhdNzmubZLlS8vhF5uNIazTWDmoCGphoA2RJT3xO8y9Bk8dBKkQ88GAJhcsoJzWblGIJW358qBjTcBpxq_tTlQKaAA7NJTjkxzBTJGmfot_tm-EqFjhU_pRhTycdb9E0d4HNNKO0KGrRwtwB5K4Q8zUWtIhDt2DP8i_hpIWFroLCQn4uj0pfGuKCPoa02vkV_ltdtvKvCg"
        };

    const resp = await isomorphicFetch(ENTRYPOINT + id, init);
    if (resp.status === 204) return;

    const json = await resp.json();
    if (resp.ok) return normalize(json);

    const defaultErrorMsg = json["hydra:title"];
    const status = json["hydra:description"] || resp.statusText;
    if (!json.violations) throw Error(defaultErrorMsg);
    const fields = {};
    json.violations.map(
        (violation: Violation) =>
            (fields[violation.propertyPath] = violation.message)
    );

    throw {defaultErrorMsg, status, fields};
};

export const normalize = (data: any) => {
    if (has(data, "hydra:member")) {
        // Normalize items in collections
        data["hydra:member"] = data["hydra:member"].map((item: any) =>
            normalize(item)
        );

        return data;
    }

    // Flatten nested documents
    return mapValues(data, (value) =>
        Array.isArray(value)
            ? value.map((v) => get(v, "@id", v))
            : get(value, "@id", value)
    );
};
