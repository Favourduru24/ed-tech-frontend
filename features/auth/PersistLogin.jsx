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
        content = <div className="fixed inset-0 z-50 flex justify-center  bg-black">
                    <Loader styleName='w-14 h-14'/>
                 </div>
    } else if (isError) {
        content = (
            <div className='fixed inset-0 z-50 flex justify-center items-center bg-black text-white'>
              <Link href="/sign-in" className="text-[#B391F0]">  <p className="undefined text-destructive-200">{`${error?.data?.message}`} <span className='underline text-purple-800'>Please login again</span></p></Link>
            </div>
        );
    } else if (isSuccess || (token && isUninitialized)) {
        content = children;
    }

    return content;
};

export default PersistLogin;