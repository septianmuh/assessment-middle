"use client"
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Profile, ProfileState } from './type';
import { ErrorForm } from '@/libs/interfaces/error';
import { ErrorNotif } from '@/libs/helper/notif/popupnotif';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

let initialState: ProfileState = {
    action: {
        changeForm() { },
        setForm() { },
    },
    state: {
        form: {} as Profile,
        isLoading: false,
    },
};

const DataContext = createContext<ProfileState>(initialState);

export function Provider(props: Readonly<{ children: React.ReactNode }>) {
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useRouter(); 
    const [form, setForm] = useState<Profile>({
        email: '',
        fullname: '',
    });

    const changeForm = (fieldName: string, selectedValue: any) => {
        setForm((prevdata) => ({
            ...prevdata,
            [fieldName]: selectedValue,
        }));
    };

    const GetDetail = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/profile/api', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })

            if(response.status !== 200){
                return ErrorNotif('Data Not found')
            }
            setForm(await response.json())
        } catch (error: any) {
            let message = `not found`;
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

    useEffect(() => {
        if(token) GetDetail()
    }, [token])

    return (
        <DataContext.Provider
            value={useMemo(() => ({
                action: {
                    changeForm,
                    setForm,
                },
                state: {
                    form,
                    isLoading,
                }
            }), [form, isLoading])}
        >
            {props.children}
        </DataContext.Provider>
    );
}

export const useData = (): ProfileState => useContext(DataContext);

