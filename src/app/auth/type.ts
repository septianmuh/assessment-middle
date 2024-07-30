import { ErrorForm } from "@/libs/interfaces/error"

export type Credentials = {
    email: string
    password: string
}

export type SignInState = {
    action: {
        sigIn(data: any): any
        signAsGuest(): any
        changeForm(key: string, value: string | number ): any
        setForm(data: Credentials): any
        setHidePass(p: boolean): any
        resetErrForm(err: boolean, field: string): any
        clickEnter(e: any): any
        setActiveTab(tab: number): any
    },
    state: {
        isValidForm: ErrorForm
        form: any,
        isLoading: boolean,
        hidePass: boolean
        activeTab: number
    },
}
