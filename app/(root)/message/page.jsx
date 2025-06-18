import Search from '@/component/shared/Search'
import Image from 'next/image'
import React from 'react'
 
 const page = () => {
      const UserInfo = [
        {
           username: 'Envato Mastery' ,
           title: 'Keren is typing...',
           time: '3:00 PM',
           no: '2',
           image: '/images/user1.jpeg'
        },
        {
           username: 'Javascript Mastery' ,
           title: 'You: Thanks! everyone',
           time: '3:00 PM',
           no: '3',
           image: '/images/user2.jpg'
        },
        {
           username: 'Ms Nina' ,
           title: 'Ok i think i already Understand!',
           time: '3:00 AM',
           no: '1',
           image: '/images/user5.png'
        },
        {
           username: 'Jambite 2025' ,
           title: 'Summary Evalution.pdf',
           time: '3:00 PM',
           no: '2',
           image: '/images/user3.jpg'

        },
        {
           username: 'Ielt Student' ,
           title: 'Keren is typing...',
           time: '3:00 PM',
           image: '/images/user4.png'
        },
        {
           username: 'Javascript Mastery' ,
           title: 'You: Thanks! everyone',
           time: '3:00 PM',
           image: '/images/user5.png'
        },
        {
           username: 'Web Developer' ,
           title: 'Ok i think i already Understand!',
           time: '3:00 AM',
           no: '4',
           image: '/images/user4.png'
        },
        {
           username: 'Marteen GOWLE' ,
           title: 'Summary Evalution.pdf',
           time: '3:00 PM',
           image: '/images/user5.png'
        },
        {
           username: 'Ms Nina' ,
           title: 'Ok i think i already Understand!',
           time: '3:00 AM',
           image: '/images/user4.png'
        },
        {
           username: 'Oxford Group' ,
           title: 'Summary Evalution.pdf',
           time: '3:00 PM',
           no: '3',
           image: '/images/user3.jpg'
        }
        
      ]

   return (
     <section className='w-full sm:pt-5 pt-5'>
          <div className=' w-full h-[90.8vh] rounded-t-2xl '>
              <div className='flex w-full h-full gap-0.5'>
                 <div className='h-full w-[35%] rounded-tl-2xl bg-[#1F2225] flex flex-col'>
                     <div className='h-[12%] border-b-[2px] border-black p-2 flex justify-between items-center'>
                       <div className='flex items-end gap-2'>
                       <p className='font-semibold text-lg text-light-100'>All Message</p>
                       <div className='flex cursor-pointer hover:bg-black hover:rounded-full   shrink-0'>
                      <Image src='/icons/arrow-down.png' width={24} height={24} alt='arrow-down' />
                        </div>
                       </div>
                   <div className='flex items-center justify-center rounded-full cursor-pointer hover:bg-black hover:rounded-full p-2 shrink-0'>
                      <Image src='/icons/more.png' width={24} height={24} alt='more' />
                                          </div>
                     </div>
                        <div className='max-h-full overflow-auto'> 
                      {
                        UserInfo.map((items, index) => (
                          <div className='h-[10%] bg-[#1F2225] cursor-pointer flex  items-center justify-between p-4 hover:bg-black/40' key={index}>
                             <div className='justify-between flex items-center'>
                              <div className='flex gap-4 items-center'>
                                  <div className='  bg-black/10 w-15 h-15 rounded-full'>
                                    <Image src={items.image} width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                  </div>
                                   <div className='flex flex-col leading-0 gap-3'>
                                     <p className='text-lg font-semibold text-[#FAFAFA] font-sans capitalize'>{items.username}</p>
                                    <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>{items.title}</p>
                                   </div>
                                </div>   
                                     
                                </div>
                                <div className='flex flex-col items-center gap-2'>
                                      <p className='text-sm text-[#9E4B9E]/80'>{items.time}</p>
                                      <div className='bg-[#B391F0] h-5 w-5 items-center justify-center rounded-full flex'>
                <p className='text-[#FAFAFA] text-[0.7rem] '>{items.no}</p>
                </div>
                                     </div>
                            </div> 
                      
                        ))}
                        </div>
                 </div>



                 <div className='w-[65%] h-full rounded-tr-2xl flex flex-col overflow-hidden '>
                      <div className=' h-[10%] bg-[#1F2225] flex justify-between p-4'>
                      <div className='flex gap-4 items-center'>
                      <div className='  bg-black/10 w-15 h-15 rounded-full'>
                                    <Image src="/images/user5.png" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                  </div>
                                   <div className='flex flex-col leading-0 gap-2'>
                                     <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>Javascript Mastery</p>
                                    <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>Javascript is typing...</p>
                                   </div>
                                </div>
                                <div className='flex gap-1 items-center'>
                 <Image src="/icons/feed.png" height={24} width={24} alt='img'/>
                    <Image src="/icons/search.png" height={24} width={24} alt='img'/>
                    <div className='flex items-center justify-center rounded-full cursor-pointer hover:bg-black hover:rounded-full p-2 shrink-0'>
                    <Image src='/icons/more.png' width={20} height={20} alt='more' className='rotate-90' />
                                     </div>
                </div>
                      </div>
                      <div className='min-h-[80%] max-h-[80%] bg-black flex flex-col items-center p-4 gap-4 w-full '>
                           <div className='bg-[#1F2225] w-28 h-10 flex items-center justify-center rounded-full backdrop-blur-2xl'>
                              <p className='text-sm text-light-100'>Today, sep 3</p>
                           </div> 
                           <div className='w-full flex flex-col gap-4 justify-center '>

                                <div className='w-[20rem] h-fit bg-[#1F2225] rounded-xl  flex self-end backdrop-blur-2xl flex-col p-4 gap-2 break-all'>
                                <div className='flex gap-4 items-center'>
                                   <div className='  bg-black/10 w-15 h-15 rounded-full'>
                                    <Image src="/images/user5.png" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                  </div>
                                   <div className='flex flex-col leading-0 gap-2'>
                                     <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>Javascript Mastery</p>
                                    <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>Javascript is typing...</p>
                                   </div>
                                </div>
                                   
                                  <p className='font-sans text-md text-[#FAFAFA] font-semibold'>Hey it's me i saw what you posted on the group and i wanted to ask for some assistance i don't know if you are open to connect!</p>
                                </div>
                                <div className='w-[20rem] h-fit bg-[#B391F0] rounded-xl flex backdrop-blur-2xl flex-col p-4 gap-2 break-all'>
                                <div className='flex gap-4 items-center'>
                                   <div className='  bg-black/10 w-15 h-15 rounded-full'>
                                    <Image src="/images/user1.jpeg" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                  </div>
                                   <div className='flex flex-col leading-0 gap-2'>
                                     <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>Javascript Mastery</p>
                                    <p className='text-[0.8rem] font-semibold text-[#FAFAFA] font-sans'>Javascript is typing...</p>
                                   </div>
                                </div>
                                   
                                  <p className='font-sans text-md text-black font-semibold'>Hey it's me i saw what you posted on the group and i wanted to ask for some assistance i don't know if you are open to connect!</p>
                                </div>
                                 
                           </div>
                      </div>
                      <div className=' h-[10%] bg-[#1F2225] flex items-center justify-between pt-2'>
                           <form className='h-full flex-grow'>
                                <input type='text' className='h-full min-w-[650px] bg-dark-100 rounded-tr-2xl text-lg p-2 placeholder:text-lg outline-none placeholder:font-medium font-sans placeholder:font-sans text-light-100 font-md' placeholder='Type a message here...'/>
                           </form>
                      </div>
                 </div>
              </div>
          </div>
     </section>
   )
 }
 
 export default page