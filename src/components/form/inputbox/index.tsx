import React, { useEffect } from 'react';
import numeral from 'numeral';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPercentage } from '@fortawesome/free-solid-svg-icons';
import { ErrorObj } from '@/libs/interfaces/error';

interface InputboxProps {
    id: string
    value: string | number;
    setValue: (e: string | number) => any;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    type?: "text" | "password" | "number" | 'alphanumeric' | 'numeric' | 'currency' | 'time' | 'percentage' | 'hidden';
    setMasking?: (e: string | number) => string | number;
    isError?: ErrorObj
    setError?: (e: boolean) => any;
    hidden?: boolean;
    keyDown?: (e: any) => any;
}

const Inputbox: React.FC<InputboxProps> = ({ value, setValue, disabled = false, placeholder, className, type = 'text', setMasking, isError, setError, hidden=false, keyDown }) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        if (type === 'alphanumeric') {
            const maskedValue = newValue.replace(/[^0-9a-zA-Z]/g, '');
            setValue(setMasking ? setMasking(maskedValue) : maskedValue);
        } else if(type === 'numeric' || type === 'currency') {
            const numericValue = newValue.replace(/[^0-9]/g, '');
            setValue(setMasking ? setMasking(numericValue) : numericValue);
        } else if (type === 'percentage') {
            const regex = /^[0-9]*(?:\.[0-9]*)?$/;
            if (newValue.startsWith('0') && !newValue.startsWith('0.')) {
                newValue = newValue.replace(/^0+/, '');
                if (newValue === '') {
                    newValue = '0';
                }
            }
    
            if (newValue === '' || regex.test(newValue)) {
                if (parseFloat(newValue) > 100) {
                    if (isError && setError) {
                        setError(true);
                    }
                } else {
                    setValue(newValue);
                    if (isError && setError) {
                        setError(false);
                    }
                }
            } else {
                if (isError && setError) {
                    setError(true);
                }
            }
        }else if (type === 'time') {
            const partialRegex = /^(0[0-9]?|1[0-9]?|2[0-3]?)?(:[0-5]?[0-9]?)?$/;
            const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            if(newValue.length > 5) return false

            if (newValue.length > 2) {
                if (!isNaN(parseInt(newValue[0]))) {
                    if (newValue[2] !== ':') {
                        newValue = newValue.substring(0, 2) + ':' + newValue.substring(2);
                    }
                }
            }
            
            if (newValue === '' || partialRegex.test(newValue)) {
                setValue(newValue);
                if (isError && setError) {
                    setError(false);
                }
            } else if (regex.test(newValue)) {
                setValue(newValue);
                if (isError && setError) {
                    setError(false);
                }
            } else {
                if (isError && setError) {
                    setError(true);
                }
            }

        } else {
            setValue(setMasking ? setMasking(newValue) : newValue);
        }
    };

    const formatCurrency = (value: number | string) => {
        return `Rp   ${numeral(value).format('0.0,[.]00')}`;
    };

    useEffect(() => {
        if (setMasking) {
            setValue(setMasking(value));
        }
    }, [setMasking, setValue, value]);

    let classNames = "appearance-none border-main rounded w-full py-[.45rem] px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
    if (className) {
        classNames += ` ${className}`;
    }

    return (
        <div>
            {type === 'time' ? (
                <div className='relative'>
                    <input
                        onInput={() => { setError && setError(false); }}
                        className={`${classNames} border-b-2 border-gray-300 focus:border-blue-500 ${isError?.error ? ' border-red-500' : ''} ${hidden ? ' text-transparent bg-gray-200' : ''}`}
                        type={'text'}
                        value={value}
                        onChange={handleOnChange}
                        disabled={disabled}
                        placeholder={'hh:mm'}
                    />
                    <FontAwesomeIcon className='absolute text-gray-400 right-2 bottom-3' icon={faClock} />
                </div>
            ) : (
                <div className='relative'>
                    <input
                        onInput={() => { setError && setError(false); }}
                        className={`${classNames} border-b-2 border-gray-300 focus:border-blue-500 ${isError?.error ? ' border-red-500' : ''} ${hidden ? ' text-transparent bg-gray-200' : ''}`}
                        type={type === 'alphanumeric' || type === 'percentage' || type === 'numeric' ? 'text' : type}
                        value={type === 'currency' ? formatCurrency(value) : value}
                        onChange={handleOnChange}
                        disabled={disabled}
                        placeholder={placeholder}
                        onKeyDown={keyDown}
                    />
                    {type === 'percentage' && (
                        <FontAwesomeIcon className='absolute text-gray-400 right-2 bottom-2' icon={faPercentage} />
                    )}
                </div>
            )}
            {isError && isError.error && <p className="text-red-500 text-xs">{isError.msg}</p>}
        </div>
    );
};

export default Inputbox;
