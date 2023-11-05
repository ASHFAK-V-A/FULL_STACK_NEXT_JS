"use client"
import Link from "next/link"
import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [err, setErr] = useState("")
  const router = useRouter()

  const SubmitHandler = async (e) => {
    e.preventDefault()
    if (!email) {
      setErr("email is requried")
    }
    try {
      const res = await fetch("api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      await res.json().then((res) => {
        if (res.status == 200) {
          router.push("forgot-password/verify-otp")
        } else {
          setErr(res.message)
        }
      })
    } catch (error) {}
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4 text-center pb-4">
          Forgot Password?
        </h1>
        <form className="flex flex-col gap-3" onSubmit={SubmitHandler}>
          <input
            type="text"
            placeholder="Email Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="bg-green-600 text-white font-bold cursor-pointer px-5 py-2 mt-5 ">
            Rest Password
          </button>
          {err && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {err}
            </div>
          )}

          <Link href={"/register"} className="text-sm mt-3 text-right">
            Don't have an account ? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
