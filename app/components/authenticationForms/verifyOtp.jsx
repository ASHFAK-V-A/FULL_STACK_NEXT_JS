"use client"

import React, { useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import usePreventReturnToVerifyOTP from "@/app/hooks/prevent"

function VerifyOtpComponent() {
  const [otp, setOtp] = useState("")
  const [err, setErr] = useState("")
  const router = useRouter()
  useEffect(() => {
    window.onpopstate = () => {
      router.push("/")
    }
  }, [])

  const SubmitHandler = (e) => {
    e.preventDefault()
    // if (!otp) {
    //   setErr("Please enter the OTP to complete the process")
    // }

    router.push("/forgot-password/reset-password")
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4 text-center pb-4">Verify OTP</h1>
        <form className="flex flex-col gap-3" onSubmit={SubmitHandler}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
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

export default VerifyOtpComponent
