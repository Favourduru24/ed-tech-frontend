import React from 'react'
import '../globals.css'
import AuthSession from '@/component/shared/AuthSession'

const AuthLayout = ({children}) => {
  return (
    <AuthSession>
      <div className='bg-[#1F2225]'>
    <div className='flex items-center justify-center mx-auto max-w-7xl min-h-screen max-sm:px-4 max-sm:py-8 dark'>
       {children}
    </div>
    </div>
    </AuthSession>
  )
}

export default AuthLayout