"use client"
import Image from "next/image";
import { useData } from "./provider";
import Inputbox from "@/components/form/inputbox";
import profile from "@/assets/images/de-profile.jpg";

export default function Page() {
    const { action, state } = useData();
    return (
        <div className="w-[80%] bg-white rounded-lg shadow-lg p-8 m-4 flex items-center">
            <div className="w-[35%] ">
                <div className="w-[250px] h-[250px] flex items-center justify-center mb-4 rounded-full overflow-hidden">
                    <Image
                        src={profile}
                        alt="Profile Image"
                        width={250}
                        height={250}
                        className="object-cover" 
                    />
                </div>
            </div>
            <div className="p-4 flex flex-col">
                <div className="mb-4 md:w-full text-black">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <Inputbox
                        id="email"
                        setValue={(val) => { action.changeForm('email', val) }}
                        value={state.form.email}
                        type="text"
                        placeholder=""
                    />
                </div>
                <div className="mb-4 md:w-full text-black">
                    <label htmlFor="fullname" className="block text-sm font-medium mb-1">Fullname</label>
                    <Inputbox
                        id="fullname"
                        setValue={(val) => { action.changeForm('fullname', val) }}
                        value={state.form.fullname}
                        type="text"
                        placeholder=""
                    />
                </div>
            </div>
        </div>
    );
}
