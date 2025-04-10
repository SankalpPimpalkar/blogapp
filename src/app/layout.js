"use client";
import reduxStore from "@/lib/redux/store";
import { Provider, useSelector } from "react-redux";
import "./globals.css";
import { useEffect } from "react";
import { login } from "@/lib/redux/slices/auth";
import { useDispatch } from "react-redux";
import { GET_ACCOUNT } from "@/lib/appwrite/auth";
import { useRouter } from "next/navigation";

function RootComponent({ children }) {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const router = useRouter()

  useEffect(() => {
    async function fetchCurrentUser() {

      if (user) return

      const response = await GET_ACCOUNT()

      if (response) {
        dispatch(login(response))
        return
      }

      return router.push('/auth/login')
    }

    fetchCurrentUser()
  }, [])

  return children
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Provider store={reduxStore}>
          <RootComponent>
            {children}
          </RootComponent>
        </Provider>
      </body>
    </html>
  );
}
