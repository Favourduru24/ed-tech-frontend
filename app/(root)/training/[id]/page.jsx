import TutorDetail from "@/section/TutorDetails"

const Page = async (props) => {

    const {id} = await props.params

  return (
    <TutorDetail id={id}/>
  )
}

export default Page