import Quiz from '@/section/Quiz'
import React from 'react'

const Page = async (props) => {

 const searchParams = await props?.searchParams

  const level = (searchParams.level) || ''
  const subject = (searchParams.subject) || ''
  const search = (searchParams.search) || ''
  const page = Number(searchParams?.page) || 1

  return (
    <Quiz level={level} subject={subject} query={search} page={page}/>
  )
}

export default Page