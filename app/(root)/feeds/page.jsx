import Feeds from "@/section/Feeds"

const Page = async (props) => {

   const searchParams = await props.searchParams

   const search = (searchParams?.query) || ''
   const category = (searchParams?.category) || ''
   const date = (searchParams?.date) || ''
  //  const 

  return (     
    <Feeds search={search} cat={category} date={date}/>    
  )
}

export default Page