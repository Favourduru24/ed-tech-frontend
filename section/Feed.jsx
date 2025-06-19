"use client"
import { useDeleteFeedMutation, useLikeFeedMutation } from '@/features/feed/feedApiSclice'
import Image from 'next/image'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'
import useSocket from '@/features/socket/socket'
import { useRouter } from 'next/navigation'
import { formatDate } from '../libs/utils'


     const Feed = ({feed, id}) => {

       const Feature = [
           {
              icons: '/icons/edit.svg',
               name: 'edit' 
            },
              {
              icons: '/icons/delete.svg',
               name: 'delete',
    
             }
          ]

          const router = useRouter()
    
                

           const [likeFeed, {isLoading}] = useLikeFeedMutation(id)
           const [deleteFeed, {isLoading: delLoading, isSuccess}] = useDeleteFeedMutation()
           const pathname = usePathname()
           const [openModal, setOpenModal] = useState(false)
           const [open, setOpen] = useState(false)
           const [share, setShare] = useState(false)
           const [copy, setCopy] = useState('')
           const [likeCount, setLikeCount] = useState(feed?.likes?.length);
           const {id: userId, username} = useAuth()

          const handleDelete = async(e) => {
              e.preventDefault()
                 
                 await deleteFeed(id) 
            }
        
               useEffect(() => {
                  setTimeout(() => {
               if(copy) setCopy(false)
                }, 3000)
               }, [copy])

               useEffect(() => {
                   if(isSuccess) {
                     router.push('/feeds') 
                   }
               }, [isSuccess])

              const { socket, notifications } = useSocket({ userId, username });

                const handleLike = async (e) => {
                      e.preventDefault();
                    try {
                    const response = await likeFeed({ id, userId }).unwrap();
                      setLikeCount(response.likeCount);
     
                      if(userId !== feed.userId._id ) {
                          socket?.emit("sendNotification", {
                          senderName: username,
                          senderId: userId,
                          receiverId: feed.userId._id,
                          receiverName: feed.userId.username,  // Use the post owner's userId
                          postId: id,
                          type: 'like'
                              });
                               }
                             } catch (err) {
                               console.error('Failed to like:', err);
                             }
                          };
    
                     console.log(notifications)

                     const handleOpen = () => {
                       setOpen((prev) => !prev)
                    }
    
                       const handleModal = () => {
                       setOpenModal((prev) => !prev)
                      }
                      
                      const handleShare = () => {
                       setShare((prev) => !prev)
                      } 

                      const handleCopyLink = (e) => {
                           e.preventDefault()
                          navigator.clipboard.writeText(`${window.location.origin}/feeds/${id}`)
                          setCopy(true)
                      }

        return (
      <>
      
        {openModal && <div className='bg-black fixed inset-0 z-50 flex justify-center items-center' key={id}>
             <div className="w-[45rem] h-[12rem] bg-[#1F2225] rounded-xl flex flex-col p-10 justify-center items-center">
                 <form  className='flex flex-col gap-4 flex-grow max-w-[560px] h-full justify-center items-center'>
                      <div className='flex flex-col justify-center w-full items-center'>
                          <p className='font-bold text-4xl font-light leading-12'>Are you sure you want to delete.</p>
                          <p className='text-[#B391F0] text-xl'>This action can't be undone!</p>
                      </div>
                    <div className='flex gap-3 items-center'>
                         <button className='w-24 h-10 bg-red-400 font-semibold rounded-lg cursor-pointer' type='submit' onClick={handleDelete}>{delLoading ? 'loading...' : 'Delete'}</button>
                         <button className='w-24 h-10 bg-[#B391F0] font-semibold rounded-lg cursor-pointer' onClick={handleModal}>Cancel</button>
                    </div>
                 </form>
              </div> 
           </div>}

            {share && <div className='bg-black fixed inset-0 z-50 flex justify-center items-center' >
                        <div className="w-[45rem] h-[12rem] bg-[#1F2225] rounded-xl flex flex-col p-10 justify-center items-center">
                            <form  className='flex flex-col gap-4 flex-gro h-full items-end'>
           
                                 <div className='flex flex-col justify-center w-full items-center'>
                                       <div className='flex flex-col justify-center w-full items-center gap-2'>
                                       <p className="text-[#B391F0] font-sans text-sm">Links to share this feed.</p>
                                      <div className='w-[32rem] h-12 rounded-md bg-black/50 flex items-center justify-center'>
                                        <p className="text-[#B391F0] font-sans text-sm">{`${window.location.origin}/feeds/${id}`}</p>
                                      </div>
                                    </div>
                                 </div>
           
                               <div className='flex gap-3 '>
                                    <button className='w-20 h-8 bg-[#B391F0] font-semibold rounded-lg cursor-pointer' onClick={handleCopyLink}>{copy ? 'Copied': 'Copy'}</button>
                                    <button className='w-20 h-8 bg-destructive-100 font-semibold rounded-lg cursor-pointer'  onClick={handleShare}>Cancel</button>
                               </div>
                            </form>
                         </div> 
                      </div>}

             <section className='flex flex-col py-3 w-full gap-2' >
                 <div className='rounded-2xl relative bg-dark-200 border-[1.0px] border-[#4B4D4F] flex flex-col p-4' >
                 <div className='flex sm:justify-between items-center mb-2 gap-3 justify-between max-sm:justify-envenly'>
                     <div className='flex sm:gap-2 items-center gap-1 '>
                       <div className='  bg-black/10 sm:w-16 sm:h-16 w-10 h-10 shrink-0 whitespace-nowrap rounded-full'>
                  <Image src={feed?.userId?.profilePics?.cloudinaryUrl} width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                          </div>
                     <p className='text-lg text-white font-semibold sm:text-[1rem] text-sm whitespace-nowrap'>{feed.userId.username}</p>
                     </div>
                      <div>
                         <div className='flex gap-2 items-center'>
                         <p className='font-semibold font-sans text-[#B391F0] sm:text-sm text-xs whitespace-nowrap' >{formatDate(feed?.createdAt)}</p>
                         </div>
                      </div>
                  </div>
    
                   <div className='p-2 flex flex-col gap-3 ' key={id}>
                     <h2 className='sm:text-4xl font-bold  font-sans capitalize text-gray-300 text-xl break-all'>{feed?.title?.length > 52 
                              ? `${feed.title.substring(0, 52)}...` 
                                   : feed?.title
  }</h2> 
                    <p className='leading-8 text-justify font-sans text-gray-300 text-lg max-sm:text-[1rem]  sm:font-semibold max-w-4xl trauncate break-all'>{feed?.description?.length > 300 
                              ? `${feed.description.substring(0, 300)}...` 
                                   : feed?.description
  }</p>
                  </div> 
    
                  <div className='flex items-center mt-2 p-2 w-full justify-between'>
                    <div className='flex gap-2 items-center'>
                         <button onClick={handleLike}>
                            {isLoading ? '..' : <Image src="/assets/icons/like.png" height={24} width={24} alt='img' className="cursor-pointer sm:size-6 size-4"/>  }
                         </button>
                         <p className="font-zentry-regular font-semibold text-light-100 sm:text-[1rem] text-sm">{likeCount} </p>

                          <button >
                            <Image src="/assets/icons/comment.png" height={24} width={24} alt='img' className="cursor-pointer sm:size-6 size-4"/> 
                         </button>
                         <p className="font-zentry-regular font-semibold text-light-100 sm:text-[1rem] text-sm">{feed?.commentCount} </p>
                        <Image src="/assets/icons/share.png" height={24} width={24} alt='img' onClick={handleShare} className="cursor-pointer sm:size-6 size-4"/>
                         
                        {pathname === '/profile' ? (
                          <div className='flex items-center justify-center rounded-full cursor-pointer   hover:rounded-full p-2 shrink-0 relative' >
                          <Image src='/assets/icons/more.png' width={20} height={20} alt='more' className='rotate-90' onClick={handleOpen} />

                          {open && <div className='absolute top-11 p-2 flex w-32 h-10 rounded-full flex justify-between items-center  bg-[#4B4D4F] rounded-full p-2'>
                          {Feature.map((items, index) => (
                          <div className='relative group' key={index}>
                          <span className="absolute top-8 mb-1 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-700 rounded-md shadow-md z-30">{items.name}</span>

                          
                            <Link href={items.name === "edit" ? `/feeds/${feed?._id}/update` : ''}>
                            <Image src={items.icons} height={24} width={24} alt={items.name} className='size-5' onClick={items.name === "delete" ? handleModal : null}/>
                            </Link>
                          
                          </div>
                          ))}

           </div> }
           </div> 

                     ) : ''} 
                    </div>
                       <Link href={`/feeds/${feed?._id}`}>
                       <p className='underline font-semibold underline-offset-1 cursor-pointer text-[#B391F0] whitespace-nowrap'>Check out</p>  
                       </Link>
                    </div>  
                    
            </div>
            </section>
      </>

  )
}

export default Feed