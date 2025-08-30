'use client'
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor} from "@/app/store"
import PersistLogin from "@/features/auth/PersistLogin"
import Prefetch from "@/features/auth/Prefetch"
import ProtectRoute from "./ProtectRoute";

const Session = ({children}) => {
  return (
    <Provider store={store}>
      <ProtectRoute>
       <PersistGate loading={null} persistor={persistor}>
         <PersistLogin>
          <Prefetch>
           {children}
          </Prefetch>
         </PersistLogin>
         </PersistGate>
         </ProtectRoute>
    </Provider>
  )
}

export default Session