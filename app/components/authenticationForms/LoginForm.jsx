"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")
  const router = useRouter()

  const SubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      if (res.error) {
        setErr("Invalid Credentials")
        return
      }

      router.replace("dashboard")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4 text-center">Login</h1>
        <form className="flex flex-col gap-3" onSubmit={SubmitHandler}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-5 py-2">
            Login
          </button>
          {err && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {err}
            </div>
          )}
          <div className="flex justify-between">
            {" "}
            <Link href={"/forgot-password"} className="text-sm mt-3 ">
              Forgot Password?
            </Link>
            <Link href={"/register"} className="text-sm mt-3 text-right">
              Don't have an account ?{" "}
              <span className="underline">Register</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
