 import Tutor from '@/section/Tutor'
import React from 'react'
 
 const Page = async (props) => {

   const searchParams = await props.searchParams

   const subject = (searchParams?.subject) || ''
   const duration = (searchParams?.duration) || ''
   const search = (searchParams?.search) || ''
   const page = Number(searchParams?.page) || 1
   
   return (
     <Tutor subject={subject} duration={duration} query={search} page={page}/>
   )
 }
 
 export default Page