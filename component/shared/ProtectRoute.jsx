"use client"
import { useRouter } from "next/navigation"
import { selectCurrentToken } from "@/features/auth/authSlice"
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import Loader from '@/component/shared/Loader'

const ProtectRoute = ({children}) => {
    const token = useSelector(selectCurrentToken)
    const router = useRouter()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        if (!token) {
            router.push('/sign-in')
        }
        setIsChecking(false)
    }, [token, router])

    if (isChecking) {
        return <div className="fixed inset-0 z-50 flex justify-center items-cente bg-black">
                    <Loader styleName='w-14 h-14'/>
                 </div>
    }
     
    return <>{children}</>
}

export default ProtectRoute