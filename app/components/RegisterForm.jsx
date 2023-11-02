"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErr("All fields are required");
      return;
    }
    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUserExists.json();
      if (user) {
        setErr("User already exists.");
        return;
      }
      const res = await fetch("api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        setTimeout(() => {
          setName("");
          setEmail("");
          setPassword("");
        }, 500);
        router.push("/");
      } else {
        console.log("User registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4 text-center">Register</h1>
        <form className="flex flex-col gap-3" onClick={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Register
          </button>
          {err && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {err}
            </div>
          )}

          <Link href={"/"} className="text-sm mt-3 text-right">
            Already have an account ? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
