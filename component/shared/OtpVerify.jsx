"use client"
import { useVerifyEmailMutation, useResendOtpMutation } from "@/features/user/usersApiSlice"
import { useRef, useState, useEffect } from "react"
import useAuth from "@/hooks/useAuth"
import {useRouter} from 'next/navigation'

const OtpVerify = () => {
  const [verifyEmail, { isLoading, isSuccess, isError, error }] = useVerifyEmailMutation()
  const [resendOtp, {isLoading: resendOtpLoading}] = useResendOtpMutation() 
  const {id: userId} = useAuth()
  const inputRef = useRef([])
  const [resendDisabled, setResendDisabled] = useState(true)
  const [countdown, setCountdown] = useState(120) // 2 minutes countdown
  const [otpError, setOtpError] = useState("")
  const router = useRouter()

  // Countdown timer effect

   useEffect(() => {
   if(isSuccess) {
     router.push('/')
   }
   },[isSuccess, router])
  useEffect(() => {
    let interval
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    } else {
      setResendDisabled(false)
    }
    return () => clearInterval(interval)
  }, [countdown])

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleInput = (e, index) => {
    setOtpError("")
    
    const value = e.target.value
    if (value && !/^\d+$/.test(value)) {
      e.target.value = ''
      return
    }

    if (value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text').trim()
    const pasteArray = paste.split('').slice(0, 6) // Only take first 6 characters
    
    if (pasteArray.length === 6 && pasteArray.every(char => /^\d+$/.test(char))) {
      pasteArray.forEach((char, index) => {
        if (inputRef.current[index]) {
          inputRef.current[index].value = char
          inputRef.current[index].classList.add('border-purple-500')
        }
      })
      inputRef.current[5].focus()
    }
  }
//1234535
  const handleVerifyEmail = async (e) => {
    e.preventDefault()
    setOtpError("")

    const otpArray = inputRef.current.map(e => e.value)
    const otp = otpArray.join('')

    if (otp.length !== 6) {
      setOtpError("Please enter a 6-digit code")
      return
    }

    try {
      await verifyEmail({ userId, otp }).unwrap()
      // Success handled by isSuccess
    } catch (err) {
      setOtpError(error?.data?.message || "Invalid verification code")
      // Shake animation on error
      const container = document.querySelector('.otp-inputs-container')
      container.classList.add('animate-shake')
      setTimeout(() => {
        container.classList.remove('animate-shake')
      }, 500)
    }
  }

  const handleResendOtp = async () => {
    setCountdown(120)
    setResendDisabled(true)
    setOtpError("")
    
    // Clear all inputs
    inputRef.current.forEach(input => {
      input.value = ''
      input.classList.remove('border-purple-500')
    })
    inputRef.current[0].focus()
    
     await resendOtp({userId})
    console.log("Resending OTP...")
  }

  return (
    <div className="min-h-screen flex flex-col items-cente justify-center p-4">
      

      {/* OTP Verification Card */}
      <div className="w-ful min-w-[30rem] bg-[#1A1C20] border-[#2E2E2E] rounded-xl overflow-hidden shadow-lg border-[2px]">
        <div className="p-8">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold text-light-100 mb-1">Ed-Tech</h1>
            <p className="text-gray-400">Knowledge without boundaries</p>
          </div>

          {/* Verification Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
            <p className="text-gray-400">
              Enter the 6-digit code sent to your email address
            </p>
          </div>

          {/* Error Message */}
          {otpError && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
              {otpError}
            </div>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="mb-4 p-3 bg-green-900/30 border border-green-700 rounded-lg text-green-300 text-sm">
              Email verified successfully! Redirecting...
            </div>
          )}

          {/* OTP Inputs */}
          <form onSubmit={handleVerifyEmail}>
            <div className="otp-inputs-container mb-6 flex justify-between">
              {Array(6).fill(0).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  required
                  className={`w-12 h-14 sm:w-14 sm:h-16 bg-[#0F0F0F] border-2 border-[#3D3D3D] text-white text-center text-2xl rounded-lg 
                    focus:border-[#9E4B9E] focus:outline-none transition-all duration-200 ${
                      inputRef.current[index]?.value ? 'border-[#9E4B9E]' : ''
                    }`}
                  placeholder="0"
                  ref={el => inputRef.current[index] = el}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  disabled={isLoading || isSuccess}
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className={`w-full py-3 px-4 mb-4 rounded-lg font-semibold text-white transition-all duration-300 cursor-pointer ${
                isLoading || isSuccess
                  ? 'bg-[#6d3a6d] cursor-not-allowed'
                  : 'bg-[#9E4B9E] hover:bg-[#b46eb4] shadow-lg hover:shadow-purple-900/30'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7. 962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : isSuccess ? (
                'Verified!'
              ) : (
                'Verify Email'
              )}
            </button>

            {/* Resend OTP */}
            <div className="text-center text-sm text-gray-400">
              <span>Didn't receive code? </span>
              {resendDisabled ? (
                <span className="text-gray-500">
                  Resend in {formatTime(countdown)}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-[#b46eb4] hover:text-[#9E4B9E] font-medium underline cursor-pointer"
                >
                  Resend now
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Add some custom animations to your global CSS */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  )
}

export default OtpVerify