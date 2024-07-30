"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "./provider";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Inputbox from "@/components/form/inputbox";
import Button from "@/components/form/button";
import { useState } from "react";
import logoisi from "@/assets/images/logo-isi.png";
import Image from "next/image";

export default function Page() {
    const { action, state } = useData();
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { title: 'User', content: LoginForm() },
        { title: 'Guest', content: Guest() }
    ];

    function LoginForm() {
        return (
            <form className="mb-8">
                <div className="mb-4 md:w-full">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Inputbox
                        id="email"
                        setValue={(val) => { action.changeForm('email', val) }}
                        value={state.form.email}
                        type="text"
                        placeholder="example@mail.com"
                        isError={state.isValidForm['email']}
                        setError={(val) => { action.resetErrForm(val, 'email') }}
                    />
                </div>
                <div className="mb-6 md:w-full relative">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <Inputbox
                        id="password"
                        setValue={(val) => { action.changeForm('password', val) }}
                        value={state.form.password}
                        type={!state.hidePass ? "password" : "text"}
                        placeholder="Password"
                        isError={state.isValidForm['password']}
                        setError={(val) => { action.resetErrForm(val, 'password') }}
                        keyDown={action.clickEnter}
                    />
                    <div
                        className="absolute cursor-pointer top-7 right-2 flex items-center px-1 py-0 my-1"
                        onClick={() => {
                            action.setHidePass(!state.hidePass)
                        }}
                    >
                        {
                            !state.hidePass ? (
                                <FontAwesomeIcon icon={faEyeSlash} className="text-gray-400 text-xl" />
                            ) : (
                                <FontAwesomeIcon icon={faEye} className="text-gray-400 text-xl" />
                            )
                        }
                    </div>
                </div>
                <Button
                    disabled={state.isLoading}
                    size='lg'
                    color='main'
                    borderVariant='rounded-lg'
                    className="w-full"
                    onClick={action.sigIn}
                >
                    <span className="text-md font-semibold" style={{ letterSpacing: '1.5px' }}>Login</span>
                </Button>
            </form>
        );
    }

    function Guest() {
        return (
            <div className="w-full flex justify-center mt-8">
                <Button
                    color="submain"
                    className="px-8 py-2"
                    onClick={()=> action.signAsGuest()}
                >
                    Login as Guest
                </Button>
            </div>
        );
    }

    return (
        <div className="w-[100%] h-[100vh] flex justify-center items-center def-backg">
            <div className="w-full bg-white rounded-lg shadow-lg p-8 m-4 md:max-w-lg md:mx-auto">
                <div className="flex flex-col items-center justify-center mb-4">
                    <div className="flex justify-center w-1/2 mb-4">
        				<Image width={200} height={200} src={logoisi} alt="logo isi" />
                    </div>
                    <div className="flex flex-col justify-center text-center">
                        <h1 className="text-lg font-semibold text-black" style={{ letterSpacing: `2px` }}>Welcome Back!</h1>
                        <p className="text-xs text-gray-500 pt-2">Login to continue to admin Dashboard</p>
                    </div>
                </div>
                <div className="p-4">
                    <div className="mb-4 border-gray-200">
                        <ul className="flex justify-center -mb-px text-sm font-medium text-center">
                            {tabs.map((tab, index) => (
                                <li className="mr-2" key={index}>
                                    <button
                                        className={`inline-block p-4 rounded-t-lg text-black border-b-2 ${activeTab === index ? 'text-blue-600 border-blue-600' : 'border-gray-200 hover:text-gray-600 hover:border-gray-300'}`}
                                        onClick={() => setActiveTab(index)}
                                    >
                                        {tab.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        {tabs[activeTab].content}
                    </div>
                </div>
            </div>
        </div>
    );
}
