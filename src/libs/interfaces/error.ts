export interface ErrorObj {
    error: boolean;
    msg: string;
}

export interface ErrorForm {
    [key: string]: ErrorObj
}
