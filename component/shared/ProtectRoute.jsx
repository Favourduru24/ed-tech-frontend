"use client"
import { useRouter } from "next/navigation"
import { selectCurrentToken } from "@/features/auth/authSlice"
import { useSelector } from 'react-redux'
import { useEffect } from "react"

const ProtectRoute = ({children}) => {

    const token = useSelector(selectCurrentToken)
    const router = useRouter()

    useEffect(() => {
        if(!token) {
            router.push('/sign-in')
        }
    },[token, router])
     
   return(
    <>{children}</>
   )
}

 export default ProtectRoute