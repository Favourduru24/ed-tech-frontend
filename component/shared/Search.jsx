"use client"
import Image from 'next/image'
import  { useState, useEffect } from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/libs/utils'

const Search = () => {

      const [notification , setNotification] = useState()

       const searchParams = useSearchParams()
       

       const router = useRouter()

       useEffect(() => {
        const delayDebounce = setTimeout(() => {
            let newUrl = ''

              if(notification) {
                newUrl = formUrlQuery({
                  params: searchParams.toString(),
                  key: 'notification',
                  value: notification
                })
              } else {
                 newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['notification']
                 })

              }

             router.push(newUrl, {scroll: false})
        }, 200)       
      return () =>  clearTimeout(delayDebounce)
    }, [notification, searchParams, router])

      return (
    <form className='flex flex-grow'>
            <div className='flex gap-2 flex-grow  max-w-[450px] rounded-full p-2 bg-[#1F2225]' >
           <Image src='/assets/icons/search.png' width={28} height={28} alt='search' className='object-cover cursor-pointer'/>
         <input type="text"  placeholder='What U looking for'  onChange={(e) => setNotification(e.target.value)} className='text-light-100 flex-grow  p-1 rounded-full outline-none'/> 
         </div>
    </form>
     )
}

export default Search
