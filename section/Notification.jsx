"use client"
import Category from "@/component/shared/Category";
import Header from "@/component/shared/Header";
import Search from "@/component/shared/Search"
import { notify } from "@/constants";
import Image from "next/image";
import { useDeleteNotificationMutation, useGetNotificationQuery } from "@/features/notification/notifyApiSclice";
import useAuth from "@/hooks/useAuth";
import useSocket from "@/features/socket/socket";
import Select from "@/component/shared/Select";
import { data5} from '@/constants'
import { useState } from "react";

  const Notification = ({notification}) => {
 
  // const {username, id: userId} = useAuth()
   
   const { data } = useGetNotificationQuery({
       notification
   })
  //  const {notifications } = useSocket({ username, userId })
   const [deleteNotification] = useDeleteNotificationMutation()

  const buttons = ["All", "Reminders", "Systems"];

  console.log({data})

  const handleDeleteNotification = async (e) => {
      e.preventDefault()

      await deleteNotification()
  }

  const [visibility, setVisibility] = useState('')

  //  console.log({notifications})


   const hasNotification = notify?.length

  return (
        
      <section className='flex flex-col'>
      <Header title="Notification"/>
       <div className='flex justify-between items-center w-full py-5 sm:pt-4'>
            <Search />
               <div className="flex items-center gap-4">
            <div className="flex gap-2 bg-[#1F2225] h-5 rounded-full items-center justify-center ">
            {/* <div className="w-full flex gap-2">
                               <select
                value={visibility} 
             onChange={(e) => setVisibility(e.target.value)}
                className="h-12 bg-[#1F2225] border-[1.0px] border-[#4B4D4F] rounded-full text-gray-500
              focus:outline-none focus:ring-2 focus:ring-dark-100 cursor-pointer font-semibold text-sm font-sans w-[20rem]"
           >
            <option value="" disabled className="text-white">Notification</option>
            {data5.map((item) =>  (
            <option 
              key={item.id} 
              value={item.title} 
              style={{ backgroundColor: '#1F2225', color: '#928e8e' }}
            >
              {item.title}
            </option>
          ))}
        
      </select>
                           </div> */}
            </div>
            <div className='flex items-center justify-center rounded-full cursor-pointer bg-[#1F2225] hover:rounded-full p-2 shrink-0 group relative'>
                  <Image src='/icons/more.png' width={20} height={20} alt='more/image' className="size-6"/>
                  <span className="hidden top-10 absolute z-30 group-hover:flex text-sm text-white bg-gray-700 rounded-sm shadow-md z-30 font-sans p-1 whitespace-nowrap">delete All</span>
             </div>
                 </div>
       </div>

            <div className="mt-8 w-full rounded-xl flex flex-col gap-4">

                  {hasNotification ? notify.map((notify, index) => (
               <div className="w-full h-full bg-[#1F2225] rounded-2xl flex gap-2 items-center p-4 max-sm:p-2 break-all" key={index}>
                         <div className="flex flex-col gap-1 w-full">
                       <div className="flex ">
                         <p className="text-white font-semibold relative sm:text-xl text-md">{notify.title}<span className="bg-[#B391F0] h-2 w-2 rounded-full flex top-2 absolute -right-3"/></p>
                       </div>
                       <div className=" ">
                          <p className="text-gray-300 text-[1rem] max-sm:text-sm truncate">{notify.subtitle}</p>
                       </div>
                   </div>
                    <div className='flex items-center justify-center rounded-full cursor-pointer p-2 shrink-0 group relative' onClick={handleDeleteNotification}>
                  <Image src='/icons/more.png' width={20} height={20} alt='more/image' className="size-5"/>
                  <span className="hidden -top-2 absolute z-30 group-hover:flex text-xs text-white bg-gray-700 rounded-sm shadow-md z-30 font-sans whitespace-nowrap p-0.5">delete</span>
             </div>
               </div>

                      )) : (
                      <div className="w-full  rounded-2xl flex gap-2 items-center p-4 h-[60vh] flex items-center justify-center">
                          <div className="bg-[#1F2225] w-full h-52 rounded-2xl flex flex-col items-center justify-center">
                             <h2 className="text-3xl text-white font-semibold font-serif">Notification Not Found!</h2>
                               <p className="text-gray-300 max-w-md leading-6 text-center mb-5 font-serif ">No notification or reminder for you today seems you have a clean slate!</p>
                                    <Image src='/icons/notification.png' width={50} height={50} alt="notification/icon"/>
                          </div>
             </div> )
             }
                
            </div>

    </section>
  )
}

export default Notification