"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAddNewUserMutation } from "@/features/user/usersApiSlice"
import { useRouter } from "next/navigation"
import { useLoginMutation } from "@/features/auth/authApiSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentToken, setCredentials } from "@/features/auth/authSlice"
import usePersist from "@/hooks/usePersist"
// import useSocket from "@/features/socket/socket"


const AuthForm = ({type}) => {


   const [loginUser, {
    isLoading: loginLoading,
     isError: loginIsError,
     isSuccess: loginIsSuccess,
     error: loginError,
     
    }] = useLoginMutation()

         const 
         [addNewUser,
           {isLoading,
           isError,
           error,
           isSuccess }] = useAddNewUserMutation()


          const [errMsg, setErrMsg] = useState('')
          const [persist, setPersist] = usePersist()
          const token = useSelector(selectCurrentToken)

        const [form, setForm] = useState({
            username: '',
            email: '',
              password: '',
            confirmPassword: ''
       })
         
         const router = useRouter()
         const dispatch = useDispatch()


          const isSignIn = type === 'sign-in'
         
              useEffect(() => {
                 if(token) {
                    router.push('/verify-otp')
                 }
                }, [token, router])
         
             useEffect(() => {
               if(isSuccess || loginIsSuccess) {
                 setForm({
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword:""
                 })

                 router.push(`${isSignIn ? '/verify-otp' : 'sign-in'}`)
               }
            }, [isSuccess, router, loginIsSuccess])

             useEffect(() => {
               if(errMsg) {
                 setErrMsg('')
               } 
             },[form])
        

        const handleSignUp = async (e) => {
          e.preventDefault()

            const {username, password, email, confirmPassword} = form

             if (!username || !password || !email || !confirmPassword) {
                return
             }
              await addNewUser({username: username, email: email, password: password, confirmPassword: confirmPassword})
              
       }
            
       const handlePersist = (e) => {
        setPersist(e.target.checked)
      }
      

        const handleLogin = async (e) => {
          const {password, email} = form

           e.preventDefault()
                
           if (!email || !password ) {
                return
             }

            try {
              const  {accessToken } = await loginUser({email: email, password: password}).unwrap()
             dispatch(setCredentials({ accessToken }))
            } catch (err) {
              if (!err.status) {
                setErrMsg('No Server Response!`');
            } else if (err.status === 400) {
                setErrMsg('All field required!');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized!');
            } else if(loginIsError){
                setErrMsg(loginError.data?.message);
            }else{
                 setErrMsg(err.data?.message)
            }
            }
        }


        

  return (
      <>
      <div className="fixed inset-0 w-full h-16 sm:h-20 flex items-center justify-between px-5 bg-black/10 backdrop-blur-sm z-10">
  <p className='text-light-100 text-3xl sm:text-4xl font-semibold font-sans tracking-tight'>Ed-Tech</p>
</div>

<form 
  className='w-full max-w-xl mx-auto mt-20 bg-gradient-to-br from-[#4B4D4F] to-[#4B4D4F33] p-0.5 rounded-2xl shadow-xl'
  onSubmit={isSignIn ? handleLogin : handleSignUp}
>
  <div className='flex flex-col gap-6 bg-gradient-to-b from-[#1A1C20] to-[#08090D] p-8 sm:p-10 rounded-2xl'>
    <div className='space-y-6'>
      {!isSignIn && (
        <div className="flex flex-col gap-2">
          <label className='text-light-100 text-lg font-medium'>Username</label>
          <input 
            type='text' 
            className='w-full bg-dark-200 rounded-lg h-12 px-4 text-light-100 placeholder-gray-400 focus:ring-2 focus:ring-[#9E4B9E] focus:outline-none transition-all font-sans'
            placeholder='Enter your username'
            value={form.username}
            onChange={(e) => setForm({...form, username: e.target.value})}
            autoComplete="name"
          />
        </div>
      )}
      
      <div className="flex flex-col gap-2">
        <label className='text-light-100 text-lg font-medium '>Email</label>
        <input 
          type='email' 
          className='w-full bg-dark-200 rounded-lg h-12 px-4 text-light-100 placeholder-gray-400 focus:ring-2 focus:ring-[#9E4B9E] focus:outline-none transition-all font-sans'
          placeholder='email@gmail.com'
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          autoComplete="email"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label className='text-light-100 text-lg font-medium'>Password</label>
        <input 
          type='password' 
          className='w-full bg-dark-200 rounded-lg h-12 px-4 text-light-100 placeholder-gray-400 focus:ring-2 focus:ring-[#9E4B9E] focus:outline-none transition-all'
          placeholder='Enter your password'
          value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
        />
      </div>
      
      {!isSignIn && (
        <div className="flex flex-col gap-2">
          <label className='text-light-100 text-lg font-medium '>Confirm Password</label>
          <input 
            type='password' 
            className='w-full bg-dark-200 rounded-lg h-12 px-4 text-light-100 placeholder-gray-400 focus:ring-2 focus:ring-[#9E4B9E] focus:outline-none transition-all '
            placeholder='Confirm your password'
            value={form.confirmPassword}
            onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
          />
        </div>
      )}
      
      {(loginIsError || isError) && (
        <div className='bg-red-900/20 p-3 rounded-lg flex items-start gap-3 border border-red-800/50'>
          <Image 
            src="/icons/error.png" 
            width={20} 
            height={20} 
            alt="error" 
            className="mt-0.5 flex-shrink-0"
          />
          <p className='text-red-300 text-sm'>
            {isError ? error?.data?.message : ''}
            {loginIsError ? errMsg : ''}
          </p>
        </div>
      )}
    </div>
    
    <button 
      type="submit" 
      disabled={isLoading || loginLoading}
      className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all text-lg font-sans cursor-pointer ${
        isLoading || loginLoading
          ? 'bg-[#9E4B9E]/70 cursor-not-allowed'
          : 'bg-[#9E4B9E] hover:bg-[#b46eb4] shadow-md hover:shadow-[#9E4B9E]/30'
      } flex items-center justify-center gap-2`}
    >
      {isLoading || loginLoading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        isSignIn ? 'Sign In' : 'Create Account'
      )}
    </button>
    
    {isSignIn && (
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="checkbox"
          id="checkbox"
          onChange={handlePersist}
          checked={persist}
          className="w-4 h-4 rounded accent-[#9E4B9E] focus:ring-[#9E4B9E] cursor-pointer"
        />
        <label htmlFor="checkbox" className="text-light-100 text-sm cursor-pointer text-sm">
          I agree to the terms and conditions
        </label>
      </div>
    )}
    
    <p className='text-light-100 text-[1rem]'>
      {isSignIn ? "Don't have an account?" : "Already have an account?"} {' '}
      <Link 
        href={!isSignIn ? "/sign-in" : "/sign-up"} 
        className='text-[#b46eb4] hover:text-[#9E4B9E] font-medium underline underline-offset-2 transition-colors text-lg'
      >
        {!isSignIn ? "Sign In" : "Sign Up"}
      </Link>
    </p>
  </div>
</form>
</>
  )
}

export default AuthForm