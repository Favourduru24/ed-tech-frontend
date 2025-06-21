"use client"
import {useGetUserFeedQuery } from '@/features/feed/feedApiSclice'
import { useGetUserTutorQuery } from '@/features/tutor/tutorApiSlice'
import {useGetUserQuizQuery} from '@/features/quiz/quizApiSclice'
import {useGetQuizHistoryQuery, useGetTutorHistoryQuery} from "@/features/history/historyApiSlice"
import {useUpdateUserProfileMutation} from '@/features/user/usersApiSlice'
import {useSendLogoutMutation} from '@/features/auth/authApiSlice'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import Feed from './Feed'
import useAuth from '@/hooks/useAuth'
import Header from '@/component/shared/Header'
import { sideLinks } from '@/constants'
import { useState, useRef, useEffect} from 'react'
import { imageCofig } from '@/app/api/axios'
import Loader from '@/component/shared/Loader'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"

     const ProfilePage = () => {
        const {id: user, username, email, profilePics} = useAuth()

        const [imageUrl, setImageUrl] = useState(null)

        const [items, setItems] = useState(sideLinks[0]) 
        const {data, isLoading: isFeedLoading} = useGetUserFeedQuery(user) 
        const [updateProfile, {isLoading: updateProfileLoading, isSuccess: updateProfileSucces}] = useUpdateUserProfileMutation()
        const {data: userTutor, isLoading: isTutorLoading} = useGetUserTutorQuery(user)
        const {data: quizTutor, isLoading: isQuizLoading} = useGetUserQuizQuery(user)
         const [
           sendLogout,
            {isLoading: logoutLoading,
             isSuccess: logoutIsSuccess
            }] = useSendLogoutMutation()


        const onLogout = () => sendLogout()
        
        const {ids, entities} = data || {}
        const feedCount = ids?.length
        const {ids: userTutorIds, entities: userTutorEntities} = userTutor || {}
        const tutorCount = userTutorIds?.length
        const {ids: userQuizTutorIds, entities: userQuizTutorEntities} = quizTutor || {}
        const quizCount = userQuizTutorIds?.length 

        const {data: userTutorHistory} = useGetTutorHistoryQuery(user)
         
         const {ids: historyTutorIds, entities: historyTutorEntities} = userTutorHistory?.tutors || {}
         
         const {tutorCount: historyTutorCount} = userTutorHistory?.tutorStats || {}

         const {data: userQuizHistory} = useGetQuizHistoryQuery(user)
        
        const {ids: historyQuizIds, entities: historyQuizsEntities} = userQuizHistory?.quizes || {}

        const {quizCount: historyQuizCount} = userQuizHistory?.quizsStats || {}

         const fileInputRef = useRef(null)
         const router = useRouter()

         useEffect(() => {
          if(updateProfileSucces) {
            router.push('/profile')
          }
         }, [updateProfileSucces, router])

         useEffect(() => {
          if(logoutIsSuccess) {
            router.push('/sign-in')
          }
         }, [logoutIsSuccess, router])

         const upload = async () => {
                 try {
                     const formData = new FormData()
                     formData.append('image', imageUrl)
                    const res = await imageCofig.post("/upload", formData)
                     return  res.data
                 } catch (error) {
                   console.log('Error uplading image!', error)
                 } 
              }

              const handleClose = () => {
              setImageUrl(false)
               
              }
              //feedCount

        const handleEditProfile = async (e) => {
     e.preventDefault();
  
    if (!imageUrl || !user) {
    return;
     }

  try {
    const imgUrl = await upload(); 
    
    const result = await updateProfile({ 
      profilePics: imgUrl,
       userId: user
    }).unwrap();  

    
     handleClose()

  } catch (error) {
    console.error('Profile update failed:', error);
  }
}
//isFeedLoading ||

     if( isTutorLoading || isQuizLoading) {
       return (
          <div className="fixed inset-0 z-50 flex justify-center items-cente bg-black">
                             <Loader styleName='w-14 h-14'/>
                          </div>
       )
     }   

     

         return (
          <>
            {imageUrl && 
               <div className='bg-black fixed inset-0 z-50 flex justify-center items-center' >
                        <div className="w-[30rem] h-[30rem] bg-[#1F2225] rounded-xl flex flex-col p-10 justify-center items-center relative border-ring focus-visible:ring-ring/50 shadow-xl border-[2px] border-[#1F2225]">
                                 <div className='flex flex-col justify-center w-full items-center'>
                                       <div className='flex flex-col justify-center w-full items-center gap-8'>
                                      <div className='  bg-black/10 w-32 h-32 rounded-full relative'>
                                   <Image src={URL.createObjectURL(imageUrl)}  width={1000} height={200} alt="image" className='object-cover rounded-full w-full h-full'/>
                                    </div>
                                    </div>
                                 </div>
           
                               <div className='flex gap-3 absolute right-4 bottom-5'>
                                    <button className='w-32 h-12 bg-[#B391F0] font-semibold rounded-lg cursor-pointer text-white' onClick={handleEditProfile} default={updateProfileLoading}>{ updateProfileLoading ? <Loader styleName='w-4 w-4' title='updating...'/> : 'Edit Profile'}</button>
                                    <button className='w-32 h-12 bg-destructive-100 font-semibold rounded-lg cursor-pointer text-white' onClick={handleClose}>Cancel</button>
                               </div>
                         </div> 
                      </div>
             }

            <section className='w-full flex flex-col'>
               <Header title="Profile"/>
                 <div className=' w-full h-full rounded-t-2xl '>
               <div className='flex w-full h-full md:gap-5 max-md:gap-2'>
                 <div className='xl:w-[30%] hidden bg-[#1F2225] xl:flex flex-col rounded-t-xl h-[90vh] relative sticky top-20'>
                  <nav className='h-full flex-col justify-between md:gap-4 p-2 rounded-t-xl hidden xl:flex'>

                                <ul className=' w-full flex-col items-start gap-2'>
                                    {sideLinks?.slice(0, 4).map((link, index) => 
                                        (
                                          <li  className={`hidden w-full flex-col items-start gap-2 xl:flex group ${items.label === link.label ? 'bg-[#B391F0] rounded-lg font-bold text-[#1F2225] text-lg' : 'text-[#FAFAFA] items-center cursor-pointer font-sans font-semibold'} `} key={index} onClick={() => setItems(link)}>
                                             <div className='p-16-semibold flex w-full gap-4 p-4 items-center justify-between'>
                                                 {link.label}
                                                 <Image src="/assets/icons/arrow-right.png" height={24} width={24} alt='logo'/>
                                             </div> 
                                          </li>
                                        )
                                    )}
                                </ul>

                                     <ul className='flex justify-center items-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all flex-col'> 
                                           {sideLinks?.slice(4).map((link, index) => 
                                        (
                                          <li  className={`hidden w-full flex-col items-start gap-2 xl:flex group ${items.label === link.label ? 'bg-[#B391F0] rounded-lg font-bold text-[#1F2225] font-sans text-lg' : 'text-[#FAFAFA] items-center cursor-pointer font-sans font-semibold'} `} key={index} onClick={() => setItems(link)}>
                                             <div className='p-16-semibold flex w-full gap-4 p-4 items-center justify-between'>
                                                 {link.label}
                                                 <Image src="/assets/icons/arrow-right.png" height={24} width={24} alt='logo'/>
                                             </div> 
                                          </li>
                                        )
                                    )}
                                          <li className='hidden w-full flex-col items-start gap-2 xl:flex group rounded-lg font-bold text-[#FAFAFA] items-center cursor-pointer'>
                                             <button className='p-16-semibold flex w-full gap-4 p-4 max-sm:p-0 items-center cursor-pointer' onClick={onLogout}>
                                                 <Image src="/assets/icons/logout.png" height={24} width={24} alt='logo'/>
                                                {logoutLoading ?<Loader styleName='w-4 w-4' title='logging out...' /> : 'Logout'}
                                             </button> 
                                          </li>
                                 </ul>
                             </nav>

                           </div>
            <div className='xl:w-[60%] w-full h-full rounded-t-2xl flex flex-col overflow-hidden bg-[#1F2225] p-3 relative'>

                 <div className="xl:hidden flex absolute top-4 right-4 p-2 max-sm:top-1">
                <Sheet>
                  <SheetTrigger>
                     <div className='bg-[#1F2225] p-2 rounded-full backdrop-blur-xl cursor-pointer hover:bg-black/70'>
                                   <Image src='/assets/icons/dashboard.png' width={20} height={20} alt='star' className='cursor-pointer shrink-0 whitespace-nowrap sm:size-6 size-5 max-sm:size-4'/>
                      </div>
                  </SheetTrigger>
                  <SheetContent className="focus:ring-0 focus-visible:ring-transparent focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-none w-72 bg-[#1F2225]">
                      <nav className='flex h-full flex-col justify-between md:flex md:gap-4 bg-[#1F2225] p-2 rounded-md'>
                
                              <ul className=' w-full flex-col items-start gap-3'>
                                    {sideLinks?.slice(0, 4).map((link, index) => 
                                        (
                                          <li  className={`w-full flex-col items-start gap-2 flex group ${items.label === link.label ? 'bg-[#B391F0] rounded-lg font-bold text-[#1F2225] text-lg' : 'text-[#FAFAFA] items-center cursor-pointer font-sans font-semibold'} `} key={index} onClick={() => setItems(link)}>
                                             <div className='p-16-semibold flex w-full gap-4 p-4 items-center justify-between'>
                                                 {link.label}
                                                 <Image src="/assets/icons/arrow-right.png" height={24} width={24} alt='logo'/>
                                             </div> 
                                          </li>
                                        )
                                    )}
                                </ul>

                                     <ul className='flex justify-center items-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all flex-col gap-3'> 
                                           {sideLinks?.slice(4).map((link, index) => 
                                        (
                                          <li  className={`w-full flex-col items-start gap-2 xl:flex group ${items.label === link.label ? 'bg-[#B391F0] rounded-lg font-bold text-[#1F2225] font-sans text-lg' : 'text-[#FAFAFA] items-center cursor-pointer font-sans font-semibold'} `} key={index} onClick={() => setItems(link)}>
                                             <div className='p-16-semibold flex w-full gap-4 p-4 items-center justify-between'>
                                                 {link.label}
                                                 <Image src="/assets/icons/arrow-right.png" height={24} width={24} alt='logo'/>
                                             </div> 
                                          </li>
                                        )
                                    )}
                                          <li className='w-full flex-col items-start gap-2 xl:flex group rounded-lg font-bold text-[#FAFAFA] items-center cursor-pointer'>
                                             <button className='p-16-semibold flex w-full gap-4 p-4 max-sm:p-0 items-center cursor-pointer' onClick={onLogout}>
                                                 <Image src="/assets/icons/logout.png" height={24} width={24} alt='logo'/>
                                                {logoutLoading ?<Loader styleName='w-4 w-4' title='logging out...' /> : 'Logout'}
                                             </button> 
                                          </li>
                                 </ul>
                
                           </nav>
                  </SheetContent>
                </Sheet> 
                 </div>

               <div className='gap-2 flex flex-col'>

                   {items.label === 'My Tranings' 
                   ?
                    (
                   <div className='flex flex-col gap-2'>
                   <p className='sm:text-3xl font-thin text-light-100 text-xl'>Tutors You have created</p>
                   <p className='sm:text-lg text-light-100 text-sm'>Thanks for sharing Ed-tech!</p> 
                   </div> 
                   ) 
                    : items.label === 'My Feeds' ?
                      (
                    <div className='flex flex-col gap-2'>
                   <p className='sm:text-3xl font-thin text-light-100 text-xl'>Feed You have created</p>
                   <p className='sm:text-lg text-light-100 text-sm'>Thanks for sharing in Ed-tech!</p> 
                   </div>
                    ) : items.label === 'My Quizes' ? 
                      (
                    <div className='flex flex-col gap-2'>
                   <p className='sm:text-3xl font-thin text-light-100 text-xl'>Quiz You have created</p>
                   <p className='sm:text-lg text-light-100 text-sm'>Thanks for sharing in Ed-tech!</p> 
                   </div>
                    ) : items.label === 'My History' ? 
                      (
                    <div className='flex flex-col gap-2'>
                   <p className='sm:text-3xl font-thin text-light-100 text-xl'>Quiz and Lesson Taken</p>
                   <p className='sm:text-lg text-light-100 text-sm'>Keep improving in Ed-tech!</p> 
                   </div>
                    ) : ''
                  }
                    
                    

               </div>

                 <div className={`${items.label === 'Personal Information' || items.label === 'My Feeds' ? '' : items.label === 'My History'
      ? ''  
      : 'xl:gap-5 py-10'}`}>
                         
                  {items.label === 'My Tranings' ? 
                  (
                     
                     <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] min-h-[71vh]">
                       {userTutorIds?.length > 0 ? userTutorIds.map((id) => {
                          const userTut = userTutorEntities[id]

                           const {_id, userId, subject, name, topic, duration } = userTut

                                  return (
                            <div className=' bg-[#1F2225] h-[18rem] rounded-xl border-[1.9px] border-[#4B4D4F] flex flex-col p-2 justify-center relative' key={_id}>
                                           <div className='flex gap-3 items-start'>
                                             <div className='  bg-black/10 w-16 h-16 rounded-full'>
                                                      <Image src={userId?.profilePics.cloudinaryUrl ? userId?.profilePics.cloudinaryUrl : '/assets/images/empty.png'} width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                                </div>
                                                     <div className='flex flex-col leading-0 gap-2 mt-1'>
                                                       <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>{userId?.username}</p>
                                                      <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>pro</p>
                                                     </div>
                                              </div>
                                                <div className='flex flex-col pt-4 pb-2'>
                                                 <p className='text-xl font-semibold leading-8 text-light-100'>Learn {subject}<br/>  With {name}  </p>
                                                 <p className='text-light-100 text-lg leading-6 max-w-72'>Topic: <span className='text-[#B391F0] text-[1rem] semibold text-base leading-6 lowercase max-w-72'>{topic}.</span></p>
                                                </div>
                                                <div className="flex items-center justify-between my-1">
                                                       <Link href={`/training/${_id}`}>
                                                          <div className="w-30 h-10 flex items-center justify-center font-semibold rounded-full bg-[#9E4B9E] backdrop-blur-xl cursor-pointer">
                                                           <p className="text-[#FAFAFA]">Start</p>
                                                          </div>
                                                       </Link>
                                                         <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#696060]  ">
                                                           <p className="text-[#FAFAFA]">{duration}min</p>
                                                          </div>
                                                 </div>
                                                 
                            </div>
                         )
                       }) : (
                            <div className="col-span-full flex justify-center items-center p-4">
      <div className="w-full max-w-4xl rounded-2xl flex flex-col items-center justify-center p-8 bg-[#1F2225] border-[1.9px] border-[#4B4D4F]">
        <div className="mb-4 text-[#B391F0]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#B391F0] text-center mb-4 font-mona-sans">
          You Haven't Made Any Lesons Yet
        </h2>
        <p className="text-light-100 text-sm sm:text-base md:text-lg text-center max-w-2xl mb-6 font-mona-sans leading-relaxed">
           No lessons created yet - but that's easy to change! Click the button below to create your first lesson in just a few minutes.
        </p>
           <Link href="/training/create">
           <button className="px-6 py-3 bg-[#9E4B9E] hover:bg-[#8A3A8A] rounded-full text-[#FAFAFA] font-semibold transition-colors duration-200 cursor-pointer">
          Create Your First Lesson
        </button>
           </Link>
        
      </div>
    </div> 
                        )
                        
                        }
                      </div>

                  ) 
                  : items.label === 'My Feeds' ?  
                  <div className="min-h-[79.6vh]">   
                       {ids?.length > 0 ? ids?.map((id) => {
                         const feedId = entities[id]
                         return (
                          <Feed feed={feedId} id={id} key={feedId.id}/>
                         )
                       }) : (
  <div className="w-full max-w-[58rem] flex gap-2 items-center p-4 justify-center h-[46rem]">
   <div className="w-full rounded-2xl flex flex-col items-center justify-center p-8 bg-[#1F2225] border-[1.9px] border-[#4B4D4F]">
        <div className="mb-4 text-[#B391F0]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#B391F0] text-center mb-4 font-mona-sans">
          You Haven't Created Any Feed Yet
        </h2>
        <p className="text-light-100 text-sm sm:text-base md:text-lg text-center max-w-2xl mb-6 font-mona-sans leading-relaxed">
           No Feed created yet - but that's easy to change! Click the button below to create your first Feed in just a few minutes.
        </p>
           <Link href="/feeds/create">
           <button className="px-6 py-3 bg-[#9E4B9E] hover:bg-[#8A3A8A] rounded-full text-[#FAFAFA] font-semibold transition-colors duration-200 cursor-pointer">
          Create Your First Feed
        </button>
           </Link>
        
      </div>
  </div>
)} 

                     </div> 
                     :  items.label === 'My Quizes' 
                     ?            
                         (
                          <div className="min-h-[71vh] grid gap-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                            {userQuizTutorIds?.length > 0 ? userQuizTutorIds.map((id) => {

                                          const quiz = userQuizTutorEntities[id]

                                           const {_id, userId, subject, name, topic, duration } = quiz
                                                          
                                          return (
                                               <div className='bg-[#1F2225] h-[18rem] rounded-xl border-[1.9px] border-[#4B4D4F] flex flex-col p-2 justify-center' key={_id}>
                                                <div className='flex gap-3 items-start'>
                                                 <div className='  bg-black/10 w-16 h-16 rounded-full'>
                                                   <Image src={userId.profilePics.cloudinaryUrl ? userId.profilePics.cloudinaryUrl : '/assets/images/empty.png' } width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/> 
                                                                     </div>
                                                   <div className='flex flex-col leading-0 gap-2 mt-1'>
                                                  <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>{userId.username}</p>
                                                  <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>pro</p>
                                                  </div>
                                                        </div>
                                                    <div className='flex flex-col pt-4 pb-2'>
                                                    <p className='text-xl font-semibold leading-8 text-light-100'>{subject} Quiz<br/>  With {name}  </p>
                                              <p className='text-light-100 text-lg leading-6 max-w-72'>Topic: <span className='text-[#B391F0] text-[1rem] semibold text-base leading-6 lowercase max-w-72'>{topic}.</span></p>
                                                                     </div>
                                              <div className="flex items-center justify-between my-1">
                                              <Link href={`/quiz/${_id}`}>
                                              <div className="w-30 h-10 flex items-center justify-center font-semibold rounded-full bg-[#9E4B9E] backdrop-blur-xl cursor-pointer">
                                               <p className="text-[#FAFAFA]">Start</p>
                                                                  </div>
                                                            </Link>
                                            <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#696060]  ">
                                                            <p className="text-[#FAFAFA]">{duration}min</p>
                                                            </div>
                                                                      </div>
                                                                      
                                                 </div>
                                                                 )
                                                }) : (
    <div className="col-span-full flex justify-center items-center p-4">
      <div className="w-full max-w-4xl rounded-2xl flex flex-col items-center justify-center p-8 bg-[#1F2225] border-[1.9px] border-[#4B4D4F]">
        <div className="mb-4 text-[#B391F0]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#B391F0] text-center mb-4 font-mona-sans">
          You Haven't Made Any Quizzes Yet
        </h2>
        <p className="text-light-100 text-sm sm:text-base md:text-lg text-center max-w-2xl mb-6 font-mona-sans leading-relaxed">
           No quizzes created yet - but that's easy to change! Click the button below to create your first quiz in just a few minutes.
        </p>
           <Link href="/quiz/create">
           <button className="px-6 py-3 bg-[#9E4B9E] hover:bg-[#8A3A8A] rounded-full text-[#FAFAFA] font-semibold transition-colors duration-200 cursor-pointer">
          Create Your First Quiz
        </button>
           </Link>
        
      </div>
    </div> 
  )}
                                                </div> 
                                               )
                                               
                      : items.label === 'My History' 
                     ?            
                          (
                          <div className="min-h-[95vh] w-full flex flex-col gap-10 ">
                             <div className="w-full py-5">
                              <h2 className="text-xl font-semibold mb-5 text-light-100">Quiz History</h2>
                               <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                               {historyQuizIds?.length > 0 ? historyQuizIds.map((id) => {

                                          const quiz = historyQuizsEntities[id]

                                                const {_id, userId, quizId} = quiz 

                                          return (
                                               <div className=' bg-[#1F2225]  rounded-xl border-[1.9px] border-[#4B4D4F] flex flex-col p-2 justify-center h-[18rem]' key={_id}>
                                                <div className='flex gap-3 items-start'>
                                                 <div className='  bg-black/10 w-16 h-16 rounded-full'>
                                                  <Image src={userId.profilePics.cloudinaryUrl ? userId.profilePics.cloudinaryUrl : '/assets/images/empty.png'} width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                                                     </div>
                                                   <div className='flex flex-col leading-0 gap-2 mt-1'>
                                                  <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>{userId.username}</p>
                                                  <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>pro</p>
                                                  </div>
                                                        </div>
                                                    <div className='flex flex-col pt-4 pb-2'>
                                                    <p className='text-xl font-semibold leading-8 text-light-100'>Learn {quizId?.subject} <br/>  With {quizId?.name}  </p>
                                              <p className='text-light-100 text-lg leading-6 max-w-72'>Topic: <span className='text-[#B391F0] text-[1rem] font semibold text-base leading-6 lowercase'>{quizId?.topic}.</span></p>
                                                                     </div>
                                              <div className="flex items-center justify-between my-1">
                                              <Link href={`/quiz/${quizId?._id}`}>
                                              <div className="w-30 h-10 flex items-center justify-center font-semibold rounded-full bg-[#9E4B9E] backdrop-blur-xl cursor-pointer">
                                               <p className="text-[#FAFAFA]">Start</p>
                                                                  </div>
                                                            </Link>
                                            <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#696060]  ">
                                                            <p className="text-[#FAFAFA]">{quizId?.duration}min</p>
                                                            </div>
                                                                      </div>
                                                                      
                                                 </div>
                                                                 )
                                                }) 
                        : (
                           <div className="col-span-full flex justify-center items-center p-4">
      <div className="w-full max-w-4xl rounded-2xl flex flex-col items-center justify-center p-8 bg-[#1F2225] border-[1.9px] border-[#4B4D4F]">
        <div className="mb-4 text-[#B391F0]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#B391F0] text-center mb-4 font-mona-sans">
           Your Quiz Dashboard is Waiting!
        </h2>
        <p className="text-light-100 text-sm sm:text-base md:text-lg text-center max-w-2xl mb-6 font-mona-sans leading-relaxed">
           Find a quiz that interests you and give it a try—just a few minutes and you’re in
        </p>
           <Link href="/quiz">
           <button className="px-6 py-3 bg-[#9E4B9E] hover:bg-[#8A3A8A] rounded-full text-[#FAFAFA] font-semibold transition-colors duration-200 cursor-pointer">
          Take Your First Quiz
        </button>
           </Link>
        
      </div>
    </div> 
                        )
                      }
                                                </div>
                                                 </div>
                           
                                                   <div className="w-full">
                                                  <p className="text-xl font-semibold mb-5 text-light-100">Your Tutor Lesson Taken.</p>
                                                        <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                                                  {historyTutorIds?.length > 0 ? historyTutorIds.map((id) => {
                                                                            const history = historyTutorEntities[id]

                                                                            const {_id, userId, tutorId} = history

                                                                             return (
                                                                               <div className="bg-[#1F2225] rounded-xl border-[1.9px] border-[#4B4D4F] flex flex-col p-2 justify-center selection:bg-[#B391F0] h-[18rem]" key={_id}>
                                                                       <div className="">
                                                                             <div className='flex gap-4 items-start'>
                                                                                               <div className='bg-black/10 w-16 h-16 rounded-full'>
                                                                                                        <Image src={userId.profilePics.cloudinaryUrl ? userId.profilePics.cloudinaryUrl : '/assets/images/empty.png'} width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                                                                                  </div>
                                                                                                       <div className='flex flex-col leading-0 gap-2 mt-1'>
                                                                                                         <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>{userId.username}</p>
                                                                                                        <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>pro</p>
                                                                                                       </div>
                                                                                                </div>
                                                                                                   </div>
                                                                           <div className="flex flex-col">
                                                                            <h2 className="text-[#FAFAFA] mt-3 text-xl font-semibold leading-8 text-light-100">Learn {tutorId.subject}<br/>  With {tutorId.name}</h2>
                                                                             <p className="text-light-100 text-lg leading-6 max-w-72">Topic: <span className="text-[#B391F0] text-[1rem] font semibold text-base leading-6 lowercase">{tutorId.topic}</span></p>
                                                                           </div>
                                                                           <div className="w-full flex justify-between mt-5 items-end">
                                                                           <Link href={`/training/${tutorId?._id}`}>
                                              <div className="w-30 h-10 flex items-center justify-center font-semibold rounded-full bg-[#9E4B9E] backdrop-blur-xl cursor-pointer">
                                               <p className="text-[#FAFAFA]">Start</p>
                                                                  </div>
                                                            </Link>
                                                                            <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#696060]">
                                                                                                             <p className="text-[#FAFAFA]">{tutorId.duration}min</p>
                                                                                                            </div>
                                                                           </div>
                                                                       </div> 
                                                                      
                                                                            )
                                                                          }) : 
                                                                          (
                           <div className="col-span-full flex justify-center items-center p-4">
      <div className="w-full max-w-4xl rounded-2xl flex flex-col items-center justify-center p-8 bg-[#1F2225] border-[1.9px] border-[#4B4D4F]">
        <div className="mb-4 text-[#B391F0]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#B391F0] text-center mb-4 font-mona-sans">
         Your Lesson Dashboard is Waiting!
        </h2>
        <p className="text-light-100 text-sm sm:text-base md:text-lg text-center max-w-2xl mb-6 font-mona-sans leading-relaxed">
          Find the lessons that interests you and give it a try—just a few minutes and you’re in
        </p>
           <Link href="/training">
           <button className="px-6 py-3 bg-[#9E4B9E] hover:bg-[#8A3A8A] rounded-full text-[#FAFAFA] font-semibold transition-colors duration-200 cursor-pointer">
          Take Your First Lesson
        </button>
           </Link>
        
      </div>
    </div>  
                        )
                        }
                                              </div>
                                              </div>
                                              </div>
                                               )
                      : (
                      <div className='min-h-[87.5vh]'>
                      <div className='flex flex-col gap-4 w-full h-full'>
                             <div className='  bg-black/10 w-32 h-32 rounded-full relative'>
                                  <Image src={profilePics?.cloudinaryUrl ? profilePics?.cloudinaryUrl : '/assets/images/empty.png'}  width={1000} height={200} alt="image" className='object-contain border-[1.9px] border-[#4B4D4F] rounded-full w-full h-full'/>

                              <div className='absolute bottom-2 -right-2 hover:bg-black/50 cursor-pointer h-10 w-10 p-2 rounded-full group'>
                              <span className="absolute bottom-8 mb-1 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-700 rounded-md shadow-md z-30">edit</span>
                               <div onClick={() => fileInputRef.current?.click()}>
                               <input type="file"  className="hidden" onChange={(e) => setImageUrl(e.target.files[0])} accept='image/*' ref={fileInputRef}/>
                            <Image src="/assets/icons/edit.png" height={24} width={24} alt='img' className=''/>
                            </div>
                            </div>
                            </div>
                              
                         <div className='gap-5 grid xl:gap-5 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]'>
                            <div className='bg-black h-28 rounded-xl flex items-center justify-center'>
                                 <div className='flex flex-col items-center'>
                                <p className='text-light-100 font-sans font-bold'>{feedCount}</p>
                                <p className='text-light-100 font-sans font-semibold'>My Feeds</p>
                                 </div>
                            </div>  
                            <div className='bg-black h-28 rounded-xl flex items-center justify-center'>
                                 <div className='flex flex-col items-center'>
                                <p className='text-light-100 font-sans font-bold'>{quizCount}</p>
                                <p className='text-light-100 font-sans font-semibold'>My Quizs</p>
                                 </div>
                            </div> 
                            <div className='bg-black h-28 rounded-xl flex items-center justify-center'>
                                 <div className='flex flex-col items-center'>
                                <p className='text-light-100 font-sans font-bold'>{tutorCount}</p>
                                <p className='text-light-100 font-sans font-semibold'>My Tutors</p>
                                 </div>
                            </div>  
                            <div className='bg-black h-28 rounded-xl flex items-center justify-center'>
                                 <div className='flex flex-col items-center'>
                                <p className='text-light-100 font-sans font-bold'>{historyTutorCount}</p>
                                <p className='text-light-100 font-sans font-semibold'>Tutor Lesson Taken</p>
                                 </div>
                            </div>  
                            <div className='bg-black h-28 rounded-xl flex items-center justify-center'>
                                 <div className='flex flex-col items-center'>
                                <p className='text-light-100 font-sans font-bold'>{historyQuizCount}</p>
                                <p className='text-light-100 font-sans font-semibold'>Quiz Taken</p>
                                 </div>
                            </div>  
                         </div>
                          
                         <div className='flex flex-col gap-4'>
                           <p className='text-light-100 font-sans font-semibold'>Full Name</p>
                            <div className='w-full h-12 bg-black flex items-center p-2 rounded-lg'>
                             <p className='text-light-100 font-sans'>{username}</p>
                          </div>
                           <p className='text-light-100 font-sans font-semibold'>ID</p>
                            <div className='w-full h-12 bg-black flex items-center p-2 rounded-lg'>
                             <p className='text-light-100 font-sans'>{user}</p>
                            </div>
                           <p className='text-light-100 font-sans font-semibold'>Email</p>
                            <div className='w-full h-12 bg-black flex items-center p-2 rounded-lg'>
                             <p className='text-light-100 font-sans'>{email}</p>
                            </div>
                           
                         </div>

                     </div>
                      </div>
                  )}
                
                 </div>
            </div>
            </div>
          </div>
        </section>
        </>
        
  )
}

export default ProfilePage
// The requested resource isn't a valid image for /icons/notification.png received text/html; charset=utf-8
// [Error: The requested resource isn't a valid image.] { statusCode: 400 }