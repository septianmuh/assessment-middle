import { ErrorForm } from "@/libs/interfaces/error"

export type Status = 'DONE' | 'PROGRESS'
export type Task = {
    id?: string
    task: string
    status: Status
    created_at?: string
    updated_at?: string
}
export type TaskState = {
    action: {
        changeForm(key: string, value: string | number ): any
        setForm(data: Task): any
        resetErrForm(err: boolean, field: string): any
        addTask(): any
        editTask(id: string): any
        deleteTask(id: string): any
        handleCheck(id: string): any
    },
    state: {
        isValidForm: ErrorForm
        form: any,
        isLoading: boolean,
        listData: Task[],
        listDataDone: Task[],
    },
}



