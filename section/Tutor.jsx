'use client'
import Header from '@/component/shared/Header'
import Loader from '@/component/shared/Loader'
import Pagination from '@/component/shared/Pagination'
import TutorCategory from '@/component/shared/TutorCategory'
import { useGetTutorQuery } from '@/features/tutor/tutorApiSlice'
import { formUrlQuery, removeKeysFromQuery } from '@/libs/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const Tutor = ({subject, duration, query, page, urlParamName}) => {

 const [search, setSearch] = useState('')
 const searchParams = useSearchParams()
 const router = useRouter()

 const buttons = ["Category", "Date +"]

  useEffect(() => {
                  const delayDebounce = setTimeout(() => {
                      let newUrl = ''
          
                        if(search) {
                          newUrl = formUrlQuery({
                            params: searchParams.toString(),
                            key: 'search',
                            value: search
                          })
                        } else {
                           newUrl = removeKeysFromQuery({
                              params: searchParams.toString(),
                              keysToRemove: ['search']
                           })
          
                        }
          
                       router.push(newUrl, {scroll: false})
                  }, 300)       
                return () =>  clearTimeout(delayDebounce)
              }, [search, searchParams, router])

   const {data, isLoading} = useGetTutorQuery({
    subject,
    duration,
    search: query,
    limit: 9,
    page
    })
 
    const {ids, entities} = data?.tutor || {}

     if(isLoading) {
       return (
          <div className="fixed inset-0 z-50 flex justify-center items-cente bg-black">
                             <Loader styleName='w-14 h-14'/>
                          </div>
       )
     }
          
     console.log({data})
  return (
    <>
         <Header title="Explore Trainings"/>
     
    <section className='flex w-full items-center max-2xl:flex-col max-2xl:gap-2 py-5 sm:pt-4'>

      <form className='flex flex-grow bg-[#1F2225] justify-between h-20 items-center max-2xl:rounded-lg p-2 xl:rounded-l-xl 2xl:w-[50%] sm:w-full w-full '>
        <div className='flex gap-2 flex-grow sm:min-w-[250px] rounded-full p-2 items-center'>
          <Image src='/assets/icons/search.png' width={28} height={28} alt='search' className='object-cover cursor-pointer'/>
          <input 
            type="text"  
            placeholder='Search or create a companions...' 
            onChange={(e) => setSearch(e.target.value)} 
            className='text-white flex-grow p-1 rounded-full outline-none placeholder:text-gray-300 placeholder:text-xl bg-transparent'
          /> 
        </div>
      </form>
      <div className='sm:flex justify-between items-center sm:h-20 h-full p-4 max-2xl:rounded-lg bg-[#1F2225] 2xl:w-[50%] sm:w-full w-full rounded-r-xl'>
        <div className='bg-dark p-2 rounded-full'>
          <TutorCategory buttons={buttons}/>
        </div>
        <Link href="/training/create">
          <button className="text-white bg-[#B391F0] sm:w-36 w-full flex items-center justify-center p-2 rounded-full cursor-pointer font-semibold h-11 m-2">
             <Image src="/assets/icons/new.png" width={24} height={24} alt='create'/>
                    <p>Create Tutor</p>
          </button>
        </Link>
      </div>
    </section>

       <section className='py-5 sm:pt-3'>
                      {ids?.length > 0 ?  
                       <div className="flex flex-col items-center gap-5 grid"> 
                           <div className='gap-5 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] py-10'>
                               {ids.map((id) => {
                                  const tutor = entities[id]
                                     return (
                                   <div key={tutor._id}>

                                    <div className='bg-[#1F2225] h-[18rem] rounded-xl border-[1.9px] border-[#4B4D4F] flex flex-col p-2 justify-center break-all' >
                                       <div className='flex gap-3 items-start'>
                                             <div className='  bg-black/10 w-16 h-16 rounded-full'>
                                                      <Image src={tutor.userId.profilePics.cloudinaryUrl} width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                                </div>
                                                     <div className='flex flex-col leading-0 gap-2 mt-1'>
                                                       <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>{tutor.userId.username}</p>
                                                      <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>pro</p>
                                                     </div>
                                              </div>
                                                <div className='flex flex-col pt-4 pb-2'>
                                                 <p className='text-xl font-semibold leading-8 text-light-100'>Learn {tutor.subject} <br/>  With {tutor.name}  </p>
                                                 <p className='text-gray-300 text-lg leading-6 max-w-72'>Topic: <span className='text-[#B391F0] text-[1rem] font semibold text-base leading-6 lowercase'>{tutor.topic}.</span></p>
                                                </div>
                                            <div className="flex items-center justify-between">
                                                           <Link href={`/training/${tutor._id}`}>
                                                         <div className="w-30 h-10 flex items-center justify-center font-semibold rounded-full bg-[#9E4B9E] backdrop-blur-xl cursor-pointer">
                                                           <p className="text-[#FAFAFA]">Start</p>
                                                          </div>
                                                          </Link>
                                      
                                                         <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#696060]  ">
                                                           <p className="text-[#FAFAFA]">{tutor.duration}min</p>
                                                          </div>
                                                 </div>
                                      </div> 
                                       </div>

                                            )})}
                                      </div>
                                      {data?.totalPages > 1 && <Pagination page={page} urlParamName={urlParamName} totalPages={data?.totalPages}/>}
                
                              </div>
                       
                               : (
                                                                             <div className="w-full  rounded-2xl flex gap-2 items-center p-4 h-[60vh] flex items-center justify-center bg-[#1F2225]">
                                                                                 <div className="w-full h-52 rounded-2xl flex flex-col items-center justify-center">
                                                                                    <h2 className="text-3xl text-white font-semibold font-serif">Notification Not Found!</h2>
                                                                                      <p className="text-gray-300 max-w-md leading-6 text-center mb-5 font-serif ">No notification or reminder for you today seems you have a clean slate!</p>
                                                                                           <Image src='/icons/notification.png' width={50} height={50} alt="notification/icon"/>
                                                                                 </div>
                                                                    </div> )}
                           </section>
                            </>

  )
}

export default Tutor