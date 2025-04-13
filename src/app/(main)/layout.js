"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";

export default function MainLayout({ children }) {
    const router = useRouter();

    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");

        if (!cookieFallback || cookieFallback === "[]") {
            return router.push("/auth/register");
        }
    }, [router]);

    return (
        <div className="w-full h-screen bg-black text-white flex divide-x divide-gray-600 overflow-hidden">
            <Sidebar />

            <div className="flex-grow h-full overflow-y-auto px-4">
                {children}
            </div>
        </div>
    );
}
