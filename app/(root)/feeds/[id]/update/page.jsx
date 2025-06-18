import EditForm from '@/component/shared/EditForm'
import React from 'react'

const UpdatePage = async (props) => {
  const { id } = await props.params

  return (
     <EditForm id={id}/>
  )
}

export default UpdatePage