export interface IAuthModel {
    roles?:    any[];
    id?:       string;
    eduToken?: string;
    login?:    number;
    name?:     string;
    school?:   string;
    class?:    string;
    v?:        number;
    token?:    string;
}

export interface ISignIn {
    login: number | null;
    password: string | null;
}