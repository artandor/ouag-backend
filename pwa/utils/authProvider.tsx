import jwtDecode from "jwt-decode";
import {ENTRYPOINT} from "../config/entrypoint";
import authProvider from "./authProvider";

export default {
    login: ({username, password}) => {
        const request = new Request(
            `${ENTRYPOINT}/authentication_token`,
            {
                method: "POST",
                body: JSON.stringify({email: username, password: password}),
                headers: new Headers({"Content-Type": "application/json"}),
            }
        );
        return fetch(request)
            .then(async (response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({token, refresh_token}) => {
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", refresh_token);
            });
    },
    refreshToken: () => {
        const request = new Request(
            `${ENTRYPOINT}/authentication_token/refresh`,
            {
                method: "POST",
                body: JSON.stringify({refresh_token: localStorage.getItem('refreshToken')}),
                headers: new Headers({"Content-Type": "application/json"}),
            }
        )
        return fetch(request)
            .then(async (response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({token}) => {
                localStorage.setItem("token", token);
                return token;
            })
            .catch((err) => console.log('An error occured while refreshing token : ' + err))
    },
    logout: () => {
        localStorage.clear();
        return Promise.resolve();
    },
    checkAuth: () => {
        try {
            // @ts-ignore
            if (!localStorage.getItem("token")) {
                return Promise.reject();
            }

            if (new Date().getTime() / 1000 > jwtDecode(localStorage.getItem("token"))?.exp) {
                authProvider.refreshToken();
            }
            return Promise.resolve();
        } catch (e) {
            // override possible jwtDecode error
            return Promise.reject();
        }
    },
    checkError: (err) => {
        if ([401].includes(err?.status || err?.response?.status)) {
            localStorage.removeItem("token");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
};
