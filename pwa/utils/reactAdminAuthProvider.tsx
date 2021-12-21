import AuthProvider from "./AuthProvider";

export default {
    login: ({username, password}) => AuthProvider.login({username, password}),
    refreshToken: () => AuthProvider.refreshToken(),
    logout: () => AuthProvider.logout(),
    checkAuth: () => AuthProvider.checkAuth(),
    checkError: (err) => AuthProvider.checkError(err),
    getPermissions: () => AuthProvider.getPermissions(),
};
