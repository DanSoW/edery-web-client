import IRouteModel from "src/models/IRouteModel";
import SignIn from "src/containers/Auth/SignIn";

const authRouteConfig: IRouteModel[] = [
    {
        // URL: /auth/sign-in
        path: '/auth/sign-in',
        element: SignIn
    }
];

export default authRouteConfig;