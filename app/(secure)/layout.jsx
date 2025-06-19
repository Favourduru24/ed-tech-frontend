import '../globals.css'
import OtpSession from '@/component/shared/OtpSession'

const AuthLayout = ({children}) => {
  return (
    <OtpSession>
      <div className='bg-[#1F2225] selection:bg-[#B391F0]'>
    <div className='flex items-center justify-center mx-auto max-w-7xl min-h-screen max-sm:px-4 max-sm:py-8 dark'>
       {children}
    </div>
    </div>
    </OtpSession>
  )
}

export default AuthLayout