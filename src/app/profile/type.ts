import { ErrorForm } from "@/libs/interfaces/error"

export type Status = 'DONE' | 'PROGRESS'
export type Profile = {
    id?: string
    fullname: string
    email: string
    image_url?: string
    created_at?: string
    updated_at?: string
}

export type ProfileState = {
    action: {
        changeForm(key: string, value: string | number ): any
        setForm(data: Profile): any
    },
    state: {
        form: Profile,
        isLoading: boolean,
    },
}



