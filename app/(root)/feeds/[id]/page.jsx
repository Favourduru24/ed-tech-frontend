import FeedDetail from '@/section/FeedDetail'

const Page = async (props) => {

   const { id } = await props.params
  return (
     <FeedDetail id={id}/>
  )
}

export default Page