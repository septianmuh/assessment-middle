"use client"
import Image from "next/image";
import Link from "next/link";
import logoisi from "@/assets/images/logo-isi.png";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeaderDefault() {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        logout();
        router.push("/auth");
    };


    return (
        <header className="bg-mainh px-4 flex items-center w-full fixed right-0 ease-in-out duration-300" style={{ width: "100%" }}>
            <div className='py-2 w-[20%]'>
                <Image width={150} height={100} src={logoisi} alt="logo isi" />
            </div>
            <div className="flex w-[80%] justify-between items-center mr-2 relative">
                <div className="flex items-center justify-center w-[80%] gap-8">
                    <Link
                        href={"/task"}
                        className="text-base font-semibold text-gray-800 hover:text-white"
                    >
                        Task
                    </Link>
                    <Link
                        href={"/profile"}
                        className="text-base font-semibold text-gray-800 hover:text-white"
                    >
                        Profile
                    </Link>
                </div>
                <div className="relative flex items-center justify-end w-[20%]">
                    <button
                        onClick={toggleDropdown}
                        className="text-base font-semibold text-gray-800 hover:text-white"
                    >
                        {user?.fullname}
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-4 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}