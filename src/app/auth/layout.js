"use client";

export default function AuthLayout({ children }) {
   return (
      <div className="flex w-full min-h-dvh items-center justify-center bg-gray-900">
         {children}
      </div>
   );
}