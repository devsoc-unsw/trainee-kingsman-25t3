import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

import ForestBackground from "../components/ForestBackground";

const Register = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [passConfirmVisible, setConfirmVisible] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const passwordToggle = () => {
    setPasswordVisible(!passwordVisible)
  }

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const passConfirmToggle = () => {
    setConfirmVisible(!passConfirmVisible)
  }

  const passConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }
 
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#213547] text-white z-99">
      <ForestBackground />
      <div className="flex flex-col justify-center items-center border-2 p-4 gap-y-4 w-1/2">
        <h1 className="text-3xl">Register with Farm 'n Cram</h1>

        <div className="flex flex-col gap-y-4 w-1/2">
          <h2>Email</h2>
          <input placeholder="Email" className="border-2 text-black p-2 bg-white"></input>
          <h2>Username</h2>
          <input placeholder="Username" className="border-2 text-black p-2 bg-white"></input>
          <h2>Password</h2>
          <div className="relative w-full">
            <input 
              placeholder="Password" 
              className="border-2 text-black p-2 bg-white w-3/4" 
              onChange={passwordChange}
              type={passwordVisible ? "text" : "password"}
              value={password}
              />
              <span onClick={passwordToggle} className="absolute bg-white w-fit p-1 rounded-2xl right-0 top-1/2 -translate-y-1/2 cursor-pointer text-black select-none">
                {passwordVisible ? 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              }
            </span>
          </div>
          <h2>Confirm Password</h2>
          <div className="relative w-full">
            <input 
              placeholder="Password" 
              className="border-2 text-black p-2 bg-white w-3/4" 
              onChange={passConfirmChange}
              type={passConfirmVisible ? "text" : "password"}
              value={confirmPassword}
              />
              <span onClick={passConfirmToggle} className="absolute bg-white border-black w-fit p-1 rounded-2xl right-0 top-1/2 -translate-y-1/2 cursor-pointer text-black select-none">
                {passConfirmVisible ? 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                
              }
            </span>
          </div>
        </div>
        <button 
          className="bg-purple-700 rounded py-3 px-4 cursor-pointer hover:bg-purple-800"
          onClick={() => navigate("/")}>
          Register
        </button>
        <p>Already have an account? 
          <span className="m-1">
            <button 
              className="bg-purple-700 rounded p-1.5 cursor-pointer hover:bg-purple-800"
              onClick={() => navigate("/login")}>
              Log In
            </button>
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register