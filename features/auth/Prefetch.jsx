"use client"
import { useEffect } from 'react'
import { usersApiSlice } from '../user/usersApiSlice'
import {feedsApiSlice} from '../feed/feedApiSclice'
import { store } from '@/app/store'



const Prefetch = ({children}) => {

    useEffect(() => {

        console.log('subscribing')
       const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
    //    const feeds = store.dispatch(feedsApiSlice.endpoints.getFeeds.initiate())

        return () => {
            console.log('unsubscribing')
            users.unsubscribe()
            // feeds.unsubscribe()
        }
    }, [])

    return <>{children}</>
     
}

export default Prefetch