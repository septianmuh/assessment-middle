import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import HeaderDefault from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Task Management",
    description: "",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <AuthProvider>
                <div className={`flex bg-gray-100`} style={{height: '100%'}}>
                    <div className="flex flex-col flex-1 overflow-hidden w-full">
                        <HeaderDefault />
                        <div className="w-[100%] h-[100vh] flex justify-center items-center second-backg">
                            {children}
                        </div>
                    </div>
                </div>
            </AuthProvider>
        </body>
        </html>
    );
}
