 'use client'
 import {Provider} from 'react-redux'
 import { store} from "@/app/store"
import ProtectAuth from './ProtectAuth'

const AuthSession = ({children}) => {
  return (
     <Provider store={store}>
      {/* <ProtectAuth> */}
         {children}
      {/* </ProtectAuth> */}
     </Provider>
  )
}

 export default AuthSession