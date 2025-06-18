import QuizDetail from "@/section/QuizDetail"

const Page = async (props) => {

  const {id} = await props.params
      
  return (
     <QuizDetail id={id}/> 
  )
}

export default Page

