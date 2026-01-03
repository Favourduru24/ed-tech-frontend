"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/app/store";
import PersistLogin from "@/features/auth/PersistLogin";
import Prefetch from "@/features/auth/Prefetch";
import ProtectRoute from "./ProtectRoute";

const Session = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
            Loading...
          </div>
        }
        persistor={persistor}
      >
        <PersistLogin>
          <Prefetch>
            <ProtectRoute>
              {children}
            </ProtectRoute>
          </Prefetch>
        </PersistLogin>
      </PersistGate>
    </Provider>
  );
};

export default Session;
