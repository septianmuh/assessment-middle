"use client"
import React, { createContext, useContext, useMemo, useState } from 'react';
import { SignInState, Credentials } from './type';
import { ValidateData } from './validation';
import { ErrorForm } from '@/libs/interfaces/error';
import { ErrorNotif } from '@/libs/helper/notif/popupnotif';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

let initialState: SignInState = {
    action: {
        sigIn(){ },
        changeForm() { },
        setForm() { },
        setHidePass(){ },
        resetErrForm() { },
        clickEnter(){},
        setActiveTab() { },
        signAsGuest() { }
    },
    state: {
        isValidForm: {} as ErrorForm,
        form: {},
        hidePass: false,
        isLoading: false,
        activeTab: 0
    },
};

const DataContext = createContext<SignInState>(initialState);

export function Provider(props: Readonly<{ children: React.ReactNode }>) {
    const { saveHistory } = useAuth();
    const [isValidForm, setIsValidForm] = useState<ErrorForm>({} as ErrorForm);
    const [hidePass, setHidePass] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useRouter(); 
    const [activeTab, setActiveTab] = useState<number>(0);
    const [form, setForm] = useState<Credentials>({
        email: '',
        password: ''
    });

    const clickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sigIn();
        }
    }

    const changeForm = (fieldName: string, selectedValue: any) => {
        setForm((prevdata) => ({
            ...prevdata,
            [fieldName]: selectedValue,
        }));
    };

    
    const resetErrForm = (err: boolean, field: string): any => {
        setIsValidForm(prev => ({
            ...prev,
            [field]: {
                error: err,
                msg: ''
            }
        }));
    }

    const signAsGuest = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/auth/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type_login: 'guest'
                }),
            })
            const data = await response.json();
            if(response.status !== 200){
                return ErrorNotif(data.error ?? 'something went wrong')
            }
            saveHistory(data.token, data.user)
            navigate.push('/task')
        } catch (error: any) {
            ErrorNotif('something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    const sigIn = async () => {
        try {
            const errForm = await ValidateData(form)
            if(errForm){
                setIsValidForm(errForm)
                return false
            }

            setIsLoading(true)
            const response = await fetch('/auth/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    type_login: 'user'
                }),
            })
            const data = await response.json();
            if(response.status !== 200){
                return ErrorNotif(data.error ?? 'Invalid Credentials')
            }
            saveHistory(data.token, data.user)
            navigate.push('/task')
        } catch (error: any) {
            let message = `Check email or password, please!`;
            if(error?.error?.data){
                const msg = Object.values(error?.error?.data).map((v) => {
                    return v
                })
                if(msg.length > 0) message = msg[0] as string
            }
            ErrorNotif(message)
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <DataContext.Provider
            value={useMemo(() => ({
                action: {
                    sigIn,
                    changeForm,
                    setForm,
                    setHidePass,
                    resetErrForm,
                    clickEnter,
                    setActiveTab,
                    signAsGuest,
                },
                state: {
                    isValidForm,
                    form,
                    hidePass,
                    isLoading,
                    activeTab,
                }
            }), [isValidForm, form, hidePass, isLoading, activeTab])}
        >
            {props.children}
        </DataContext.Provider>
    );
}

export const useData = (): SignInState => useContext(DataContext);

