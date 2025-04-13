"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }) {
   const router = useRouter();

   useEffect(() => {
      const cookieFallback = localStorage.getItem('cookieFallback');

      if (cookieFallback) {
         return router.push('/')
      }

   }, [router]);

   return (
      <div className="flex w-full min-h-dvh items-center justify-center bg-gray-900">
         {children}
      </div>
   );
}
