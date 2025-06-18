import { selectCurrentToken } from "@/features/auth/authSlice"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const ProtectAuth = ({children}) => {

   const token = useSelector(selectCurrentToken)
   const router = useRouter()

   useEffect(() => {
    if(token) {
       router.push('/')
    }
   }, [token, router])

    
    return (
      <>
       {children}   
      </>
    )
}

 export default ProtectAuth