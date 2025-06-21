"use client"
import Image from 'next/image'
import {useLikeCommentMutation, useDeleteCommentMutation} from '@/features/comment/commentApiSlice'
import {useState} from 'react'
import Loader from './Loader'

const Like = ({userId, likes, commentId, user}) => {

     const [likeComment, {isLoading}] = useLikeCommentMutation()
     const [deleteComment, {isLoading: deleteLoading}] = useDeleteCommentMutation()
     const [likeCount, setLikeCount] = useState(likes?.length || 0)
    
   const handleLike = async (e) => {
  e.preventDefault();
  try {
    const response = await likeComment({ commentId, userId}).unwrap();
    setLikeCount(response.likeCount);
  } catch (error) {
    console.error('Like failed:', error);
  }
};

    const handleDeleteComment = async (e) => {
       e.preventDefault()

        await deleteComment({commentId, userId})
    }

  return (
    <div className='flex gap-1 items-center'>
         <button className="group relative" onClick={handleLike}>
        <Image src="/assets/icons/like.png" height={24} width={24} alt='img' className="cursor-pointer sm:size-5 size-4"/>
        <span className="hidden top-7 absolute z-30 group-hover:flex text-sm text-white bg-gray-700 rounded-sm shadow-md z-30 font-sans p-1">like</span>
        </button>
         <p className="font-zentry-regular font-semibold text-light-100 text-sm ">{likeCount} {likeCount?.length > 1 ? 'Likes' : 'Like'}</p>
            <div className="group relative" >
           {deleteLoading ? <Loader styleName="w-4 h-4"/> : userId === user?._id && <Image src='/assets/icons/more.png' width={20} height={20} alt='more' className='rotate-90 sm:size-4 size-3 cursor-pointer group' onClick={handleDeleteComment}/> }
             <span className="hidden top-7 absolute z-30 group-hover:flex text-sm text-white bg-gray-700 rounded-sm shadow-md z-30 font-sans p-1">delete</span>
             </div>
             
            
            </div>
  )
}

export default Like