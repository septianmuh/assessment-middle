"use client"
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TaskState, Task } from './type';
import { ValidateData } from './validation';
import { ErrorForm } from '@/libs/interfaces/error';
import { ConfirmNotif, ConfirmNotifDelete, ErrorNotif, SuccessNotif } from '@/libs/helper/notif/popupnotif';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

let initialState: TaskState = {
    action: {
        changeForm() { },
        setForm() { },
        resetErrForm() { },
        addTask() { },
        deleteTask() { },
        handleCheck() { },
        editTask() { }
    },
    state: {
        isValidForm: {} as ErrorForm,
        form: {},
        isLoading: false,
        listData: [],
        listDataDone: [],
    },
};

const DataContext = createContext<TaskState>(initialState);

export function Provider(props: Readonly<{ children: React.ReactNode }>) {
    const { token } = useAuth();
    const [isValidForm, setIsValidForm] = useState<ErrorForm>({} as ErrorForm);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useRouter(); 
    const [form, setForm] = useState<Task>({
        status: 'PROGRESS',
        task: '',
    });
    const [listData, setListData] = useState<Task[]>([]);
    const [listDataDone, setListDataDone] = useState<Task[]>([]);

    const getList = async () => {
        try {
            if(!token) return false
            setIsLoading(true)
            const response = await fetch('/task/api', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            const data = await response.json(); 
            if(response.status === 200){
                setListData(data.progress)
                setListDataDone(data.done)
            }else {
                setListData([])
                setListDataDone([])
            }
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }
    const changeForm = (fieldName: string, selectedValue: any) => {
        setForm((prevdata) => ({
            ...prevdata,
            [fieldName]: selectedValue,
        }));
    };

    const addTask = async () => {
        try {
            const errForm = await ValidateData(form)
            if(errForm){
                setIsValidForm(errForm)
                return false
            }

            setIsLoading(true)
            let url = '/task/api'
            let method = "POST"
            let msg = "added"
            if (form.id) {
                url = `/task/api?id=${form.id}`
                method = "PUT"
                msg = "updated"
            }
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...form,
                }),
            })
            const data = await response.json();
            if(!([200, 201]).includes(response.status)){
                return ErrorNotif(data.error ?? 'something went wrong')
            }
            getList()
            setForm({
                status: 'PROGRESS',
                task: '',
                id: '',
            })
            SuccessNotif(`Task ${msg} successfully`)
        } catch (error: any) {
            ErrorNotif(error)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteTask = async (id: string) => {
        try {
            const del = await ConfirmNotifDelete()
            if (!del) return false
            setIsLoading(true)
            const response = await fetch(`/task/api?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            const data = await response.json();
            if(response.status !== 200){
                return ErrorNotif(data.error ?? 'something went wrong')
            }
            SuccessNotif("Task deleted successfully")
            getList()
        } catch (error: any) {
            ErrorNotif(error)
        } finally {
            setIsLoading(false)
        }
    }

    const editTask = async (id: string) => {
        try {
            setIsLoading(true)
            const response = await fetch(`/task/api?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            const data = await response.json();
            if(response.status !== 200){
                return ErrorNotif(data.error)
            }

            setForm(data)
            getList()
        } catch (error: any) {
            ErrorNotif(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCheck = async (id: string) => {
        try {
            const confirm = await ConfirmNotif({
                confirmButtonText: 'Yes',
                messageText: 'Are you sure you want to mark this task as done?',
                titleText: 'Confirm',
            })
            if (!confirm) return false

            setIsLoading(true)
            const response = await fetch(`/task/api?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    status: 'DONE',
                }),
            })
            const data = await response.json();
            if(response.status !== 200){
                return ErrorNotif(data.error ?? 'something went wrong')
            }
            SuccessNotif("Task updated successfully")
            getList()
        } catch (error: any) {
            ErrorNotif(error)
        } finally {
            setIsLoading(false)
        }
    }
    
    const resetErrForm = (err: boolean, field: string): any => {
        setIsValidForm(prev => ({
            ...prev,
            [field]: {
                error: err,
                msg: ''
            }
        }));
    }

    useEffect(() => {
        getList()
    }, [token])

    return (
        <DataContext.Provider
            value={useMemo(() => ({
                action: {
                    changeForm,
                    setForm,
                    resetErrForm,
                    addTask,
                    deleteTask,
                    editTask,
                    handleCheck,
                },
                state: {
                    isValidForm,
                    form,
                    isLoading,
                    listData,
                    listDataDone,
                }
            }), [isValidForm, form, isLoading, listData, listDataDone])}
        >
            {props.children}
        </DataContext.Provider>
    );
}

export const useData = (): TaskState => useContext(DataContext);

