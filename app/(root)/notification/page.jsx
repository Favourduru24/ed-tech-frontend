import Notification from '@/section/Notification'
import React from 'react'

const Page = async (props) => {

  const searchParams = await props.searchParams

  const notification = (searchParams?.notification) || ''

  return (
    <Notification notification={notification}/>
  )
}

export default Page