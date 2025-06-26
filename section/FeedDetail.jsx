"use client"
 import {  useGetFeedQuery, useGetFeedByCategoryQuery} from '@/features/feed/feedApiSclice'
 import {useAddNewCommentMutation, useGetCommentQuery} from '@/features/comment/commentApiSlice'
 import Header from '@/component/shared/Header'
 import Like from '@/component/shared/Like'
import MDEditor from '@uiw/react-md-editor'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import useAuth from '@/hooks/useAuth'
import markdownIt from "markdown-it"
import Feed from './Feed'
import { formatDate } from '@/libs/utils'
import Loader from '@/component/shared/Loader'

const FeedDetail = ({id}) => {

    const {data: feedId, isLoading} = useGetFeedQuery(id)
    const [addComment, {isLoading: isCommentLoading, isSuccess}] = useAddNewCommentMutation()
    const {data, isLoading: loadingComment} = useGetCommentQuery(id)
     const feed = feedId?.entities[id]
    const {data: feedCategory} = useGetFeedByCategoryQuery({id, categoryId: feed?.category?._id})

     const {ids: feedCategoryIds, entities: feedCategoryEntities} = feedCategory || {}

    const [content, setContent] = useState('')

     const md = markdownIt()

     const parsedContent = md.render(feed?.pitch || '')

      const {ids, entities} = data || {}

      const {id: user} = useAuth()


     useEffect(() => {
       if(isSuccess) {
         setContent('')
       }
     }, [isSuccess])


     if(isLoading){
         return(
          <div className="fixed inset-0 z-50 flex justify-center items-cente bg-black">
                                       <Loader styleName='w-14 h-14'/>
                                    </div>
         )
     }

     const handleComment = async (e) => {
         e.preventDefault()
          if(!content) {
             return
           }
         await addComment({feedId: id, content, userId: user})
     }

      

  return (
    <section className='flex flex-col my-2'>
       <Header title="Explore Feed"/>
       
           <div className='min-h-[100vh] bg-[#1F2225] flex flex-col  p-4 rounded-2xl mt-4'>
           {feed?.image?.cloudinaryUrl && (
         <div className="w-full h-96 rounded-2xl">
         <Image src={feed?.image.cloudinaryUrl} width={1000} height={400} alt='img' className='w-full h-full rounded-2xl object-center'/> 
        </div>
        )}
         
              

             <div className='flex gap-3 items-center mt-10'>
                                      <div className='  bg-black/10 w-16 h-16 rounded-full'>
                                                 <Image src={feed.userId.profilePics?.cloudinaryUrl ? feed.userId.profilePics?.cloudinaryUrl : '/assets/images/empty.png'} width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                               </div>
                                                <div className='flex flex-col leading-0 gap-3'>
                                                  <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>{feed?.userId?.username}</p>
                                                 <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>{formatDate(feed.createdAt)}</p>
                                                </div>
                                             </div> 

                                             <div className='p-2 flex flex-col gap-3 '>
                       <h2 className='font-bold max-sm:text-center font-sans capitalize text-gray-300 leading-16 text-[min(10vw,50px)]'>{feed?.title}</h2>
                      <p className='leading-6 text-justify font-sans text-[#B391F0] text-[1rem] max-sm:text-sm italic'><span className='text-white'>#</span>{feed?.category?.name}</p>
                   </div> 
               
                  <p className='mt-2 leading-12 sm:text-2xl text-xl text-light-100 pl-2 font-sans font-normal max-sm:text-center'>{feed?.description}.</p>
                       <div className="py-10 px-5 leading-10 sm:text-xl text-gray-300 w-full justify-center flex text-lg">
                         {parsedContent ? (
                           <article
                            className='prose max-w-4xl break-all'
                              dangerouslySetInnerHTML={{__html: parsedContent}}
                           />
                         ): <p>No details provided</p>}
                       </div>
                 <div data-color-mode="dark" className='w-[100%] sm:h-[25%] mt-10 relative min-h-[10rem]'>
                        <MDEditor 
                      preview='edit'
                      id="pitch"
                      onChange={(value) => setContent(value)}
                      height={200}
                      width={300}
                      value={content}
                      style={{borderRadius: 20, overflow: 'hidden', backgroundColor: '#1F2225', fontSize: '10px', fontFamily: 'sans-serif'}}
                      previewOptions={{disalloedElement: ['style'], }}
                      textareaProps={{
                       placeholder:
                       "Add comment..."
                      }}
                      />

                    <button className='absolute bottom-4 sm:w-28 sm:h-12 w-20 h-8 right-10 bg-[#B391F0] p-2 font-bold font-sans  cursor-pointer sm:text-lg  sm:rounded-lg rounded-sm text-sm text-white' onClick={handleComment} type='submit' disabled={isCommentLoading}>
                         {isCommentLoading ? 
                           '...'
                         : 'Comment' }
                    </button>
                      </div>
                   
                      <div className='flex items-center mt-10 gap-2 mb-5'>
                          <p className='font-semibold font-sans sm:text-2xl text-white text-lg max-sm:text-sm'>Comments</p>
                           <div className='bg-[#B391F0] h-7 w-8 flex items-center justify-center rounded-sm font-semibold'>
                                  <p>{ids?.length}</p>
                           </div>
                     </div>
                     <div className='flex flex-col gap-4'>
                              {ids ? ids.map((id) => {
                                 const comment = entities[id]
                                   const {_id, userId, createdAt, content, likes} = comment
                                   
                                  return (
                                     <div className='flex flex-col' key={_id}>
                                     <div className='flex gap-3 items-cente mt-5'>
                                                <div className='  bg-black/10 sm:w-16 sm:h-16 rounded-full w-10 h-10 shrink-0 whitespace-nowrap'>
                                                 <Image src={userId?.profilePics?.cloudinaryUrl ? userId?.profilePics?.cloudinaryUrl : '/assets/images/empty.png'} width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full size-'/>
                                               </div>
                                                <div className='flex flex-col justify-center'>
                                                <div className='sm:flex leading-0 gap-3 items-center flex-co'>
                                                  <p className='sm:text-lg font-semibold text-[#FAFAFA] font-sans relative text-sm whitespace-nowrap'>{userId?.username}<span className="bg-[#B391F0] h-2 w-2 rounded-full flex top-2 absolute -right-3 hidden sm:flex"/></p>
                                                 <p className='font-semibold text-[#B391F0] font-sans sm:ml-2 text-sm max-sm:text-xs'>{formatDate(createdAt)}</p>
                                                </div>
                                                <p className='mt-2 leading-6 sm:text-[1rem] text-gray-300 font-sans max-w-3xl mb-2 text-sm break-all'>{content} </p>
                                                    <Like userId={user} commentId={_id} likes={likes} user={userId}/>
                                                </div>
                                                 </div>
                                               </div>

                                      )
                                     }) : isCommentLoading ? (
                                     <Loader styleName='w-10 h-10'/>
                                ) : (
                                  ''
                                )}
                                                   
                             </div>
                         <div className='flex items-center mt-10 gap-2 mb-5'>
                          <p className='font-semibold font-sans text-2xl text-white'>Related Feeds</p>
                           <div className='bg-[#B391F0] h-7 w-8 flex items-center justify-center rounded-sm font-semibold'>
                            <Image src='/assets/icons/search.png' width={20} height={20} alt='more' className='rotate-90 size-5 cursor-pointer group' />
                           </div>
                     </div>
                <div className="flex flex-col items-center w-full">
     <div className="w-full max-w-[70rem]">
       {feedCategoryIds?.length > 0 ? feedCategoryIds?.map(id => {
       const feed = feedCategoryEntities[id];
        return (
        <Feed feed={feed} id={feed._id} key={feed?._id} />
       )
    }) : <p>No Feed Found!</p>}
  </div>
</div>
            </div> 

                  
    </section>
  )
}

export default FeedDetail