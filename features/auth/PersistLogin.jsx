// 'use client'
// import { useEffect, useRef, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useRefreshMutation } from './authApiSlice'
// import { selectCurrentToken } from './authSlice'
// import usePersist from '@/hooks/usePersist'
// import Link from 'next/link'

// const PersistLogin = ({children}) => {
//     const [persist] = usePersist()
//     const token = useSelector(selectCurrentToken)
//     const effectRan = useRef(false)
//     const [trueSuccess, setTrueSuccess] = useState(false)
    

//     const [refresh, {
//         isUninitialized,
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     }] = useRefreshMutation()

//     useEffect(() => {
//         console.log("TOKEN:", token)
//         console.log("PERSIST:", persist)
//         console.log("isUninitialized:", isUninitialized)
//         console.log("isLoading:", isLoading)
//         console.log("isError:", isError)
//         console.log("isSuccess:", isSuccess)
//         console.log("trueSuccess:", trueSuccess)
//       }, [token, persist, isLoading, isError, isSuccess, trueSuccess])

//     useEffect(() => {
//         if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
//             const verifyRefreshToken = async () => {
//                 try {
//                     await refresh()
//                     setTrueSuccess(true)
//                 } catch (err) {
//                     console.error(err)
//                 }
//             }

//             if (!token && persist) verifyRefreshToken()
//         }

//         return () => { effectRan.current = true }
//     }, [])


//  let content

//     if (!persist) {

//          console.log('no-persist')
//         content = <>{children}</>

//     } else if (isLoading) {

//          console.log('loading..')
//         content = <p className="text-white">Loading...</p>

//     } else if (isError ) {
//         console.log('error')
//          content = (
//             <p className='text-white'>
//                 {`${error?.data?.message} - `}
//                 <Link href="/welcome" >Please login again</Link>.
//             </p>
//         )
//     } else if ((isSuccess && trueSuccess)) {
//         content = <>{children}</>
//     } else if (token && isUninitialized) {  
//         console.log('token and uninit')
//         console.log(isUninitialized)
//         content = <>{children}</>
//     }
//      return content
// }

// export default PersistLogin

'use client'
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRefreshMutation } from './authApiSlice';
import { selectCurrentToken } from './authSlice';
import usePersist from '@/hooks/usePersist';
import Link from 'next/link';
import Loader from '@/component/shared/Loader'

const PersistLogin = ({ children }) => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === false) {
            const verifyRefreshToken = async () => {
                try {
                    await refresh();
                } catch (err) {
                    console.error(err);
                }
            };

            if (!token && persist) {
                verifyRefreshToken();
            }
        }

        return () => {
            effectRan.current = true;
        };
    }, [persist, refresh, token]);

    let content;
    if (!persist) {
        content = children;
    } else if (isLoading) {
        content = <div className="fixed inset-0 z-50 flex justify-center items-cente bg-black">
                    <Loader styleName='w-14 h-14'/>
                 </div>
    } else if (isError) {
        content = (
            <div className='fixed inset-0 z-50 flex justify-center items-center bg-black text-white'>
                {`${error?.data?.message}`}
                <Link href="/sign-in" className="text-[#B391F0]">{' '}Please login again</Link>.
            </div>
        );
    } else if (isSuccess || (token && isUninitialized)) {
        content = children;
    }

    return content;
};

export default PersistLogin;