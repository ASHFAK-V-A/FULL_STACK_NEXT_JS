"use client"
import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

function ResetPassword() {
  const urlParams = new URLSearchParams(window.location.search)
  const email = urlParams.get("email")
  const [password, setPassword] = useState()
  const [confirmPass, setConfirmPass] = useState()
  const [err, setErr] = useState("")
  const router = useRouter()

  useEffect(() => {
    window.onpopstate = () => {
      router.push("/")
    }
  }, [])
  const SubmitHandler = async (e) => {
    e.preventDefault()
    if (password != confirmPass) {
      setErr("Password does't match!")
    }
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    await res.json().then((res) => {
      if (res.status == 200) {
        router.replace("/")
      } else {
        setErr(res.message)
      }
    })
    // router.replace("/")
  }
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4 text-center pb-4">
          Reset Password
        </h1>
        <form className="flex flex-col gap-3" onSubmit={SubmitHandler}>
          <input
            type="text"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-5 py-2 mt-5 ">
            SUBMIT
          </button>
          {err && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {err}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
