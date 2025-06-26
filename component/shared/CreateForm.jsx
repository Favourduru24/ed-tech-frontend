 "use client"
 import MDEditor from  '@uiw/react-md-editor'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import SelectDropdown from './Dropdown'
import { useAddNewFeedMutation } from '@/features/feed/feedApiSclice'
import { useRouter } from 'next/navigation'
import { imageCofig } from '@/app/api/axios'
import useAuth from '../../hooks/useAuth'
import { useAddNewCategoryMutation} from '@/features/category/categoryApiSlice'
import Header from './Header'
import Loader from './Loader'

const CreateForm = () => {

   const [addFeed, {
    isLoading, 
    isSuccess,
     isError}] = useAddNewFeedMutation()

  const [
    addCategory, 
    {isLoading: catIsLoading,
    isSuccess: catIsSuccess
  }] = useAddNewCategoryMutation()

    const router = useRouter()

     useEffect(() => {
       if(isSuccess) {
            setCategory('')
            setImageUrl(null)
            setPitch('')
            setDescription('')
           router.push('/feeds')
        }
     }, [isSuccess, router])

     useEffect(() => {
      if(catIsSuccess) {
           setName('')
          router.push('/feeds/create')
       }
    }, [catIsSuccess, router])

       

    const [title, setTitle] = useState('')
    const [pitch, setPitch] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const fileInputRef = useRef(null)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [errMsg, setErrMsg] = useState('')
    
    const {id} = useAuth()

       useEffect(() => {
         if(errMsg) {
           setErrMsg('')
         }
     }, [title, pitch, imageUrl, category, description])

      const upload = async () => {
         try {
             const formData = new FormData()
             formData.append('image', imageUrl)
            const res = await imageCofig.post("/upload", formData)
             return  res.data
         } catch (error) {
           console.log('Error uplading image!', error)
         } 
      }

    const handleCreateFeed = async (e) => {
      e.preventDefault()
         
      let imgUrl = ''
      if (imageUrl) imgUrl = await upload()

        if(!title || !pitch || !imageUrl || !description || !category) {
           setErrMsg('All field are required!')
           return
        }

       await addFeed({title, pitch, image: imgUrl, description, category, userId: id})
    }

    const handleCreateCategory = async (e) => {
       e.preventDefault()

       await addCategory({name})
    }

  
  return (
         <>
          <Header title="Create Feed"/>
          {open && (
  <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
    <div className="w-[45rem] h-[12rem] bg-[#1F2225] rounded-xl flex flex-col p-10 justify-center items-center">
      <form className="flex flex-col gap-4 flex-grow max-w-[560px] h-full">
        <input
          type="text"
          className="w-[560px] h-13 p-2 font-sans text-light-100 text-lg border-[1.6px] border-[#4B4D4F] rounded-lg outline-none"
          placeholder="Add a category name.."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="flex gap-2 items-center justify-end">
          <button
            className="w-20 h-10 bg-[#B391F0] font-semibold rounded-lg cursor-pointer text-white"
            onClick={handleCreateCategory}
            type="submit"
          >
            {catIsLoading ? <Loader styleName='w-5 w-5'/> : catIsSuccess ? 'Added' : "Add"}
          </button>
          <button
            className="w-20 h-10 bg-[#9E4B9E] font-semibold rounded-lg cursor-pointer text-white"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      <form className="flex flex-col sm:py-10 py-5 gap-5 h-full mt-10 sm:mt-0" onSubmit={handleCreateFeed}>
            <div className="flex sm:flex-row justify-between items-center w-full gap-4 flex-col h-full ">
               <div className="sm:w-[50%] w-full sm:mb-0 mb-2">
                   <input type="text" placeholder="Feed Title" className="w-full h-15 bg-[#1F2225] border-[1.0px] border-[#4B4D4F] rounded-xl p-2 placeholder:text-gray-500 placeholder:text-sm p-2 placeholder:font-sans placeholder:font-semibold text-white" value={title} onChange={(e) => setTitle(e.target.value)}/>
               </div>
               <div className="sm:w-[50%] w-full flex gap-2">
                    <SelectDropdown category={category} setCategory={setCategory}/>
                     <div className="h-15 bg-[#1F2225] w-[10%] border-[1.0px] border-[#4B4D4F] rounded-lg text-gray-500 flex items-center justify-center cursor-pointer" onClick={() => setOpen(true)}>
                       <Image src='/assets/icons/new.png' width={24} height={24} alt="create"/>
                     </div>
               </div>
            </div>

            <div data-color-mode="dark" className='w-[100%] h-[50%]  '>
        <MDEditor 
      preview='edit'
      id="pitch"
      onChange={(value) => setPitch(value)}
      height={300}
      width={300}
      value={pitch}
      style={{borderRadius: 20, overflow: 'hidden', backgroundColor: '#1F2225', fontSize: '10px', fontFamily: 'sans-serif'}}
      previewOptions={{disalloedElement: ['style'], }}
      textareaProps={{
       placeholder:
       "Create your feed.."
      }}
      components={{
        img: (props) => (
          <Image 
            {...props} 
            width={600} 
            height={300}
            loader={({ src }) => src} // Bypass Next.js optimization if needed
          />
        )
      }}
      />
      </div>
      <div className="flex justify-between items-center w-full gap-4 h-full sm:flex-row flex-col">
               <div className="sm:w-[50%] h-56 w-full sm:mb-0 mb-2">
                    <textarea name="textarea" className="w-full h-full bg-[#1F2225] border-[1.0px] border-[#4B4D4F] rounded-xl p-2 placeholder:text-gray-500 placeholder:text-sm p-2 placeholder:font-sans placeholder:font-semibold text-white " placeholder='Write brief feeds description (at least 150 char)' value={description} onChange={(e) => setDescription(e.target.value)} maxLength={300}/>

               </div>

               <div className="sm:w-[50%] h-56 w-full flex items-center justify-center border-[#4B4D4F] rounded-xl bg-[#1F2225] border-[1.0px] cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                   <input type="file"  className="hidden" onChange={(e) => setImageUrl(e.target.files[0])} accept='image/*' ref={fileInputRef}/>
                     
                     {!imageUrl && (
                        <div className='text-white flex flex-col justify-center w-full items-center'>
                          <h3 className='text-2xl text-gray-500 '>Upload Image</h3>
                          <p className='text-center text-sm text-gray-500 font-semibold'>image must be less than 20mb</p>
                        </div>
                     )}
                   {imageUrl && 
                        <Image src={URL.createObjectURL(imageUrl)}  width={1000} height={200} alt="image" className='object-contai rounded-xl w-full h-full'/>
             }
             
               </div>

            </div>
                {errMsg && 
                   <div className="bg-destructive-200 w-full h-10 rounded-md items-center flex justify-center">
                    <p className='text-white text-base text-sm font-semibold'>{errMsg}</p>
                   </div>
                }
              <button className="w-[100%] bg-[#9E4B9E] font-semibold h-15 text-white rounded-xl cursor-pointer sm:mt-0 mt-2" type='submit' default={isLoading}>
                 {isLoading ? <Loader styleName='w-5 w-5' title='loading...'/> : isSuccess ? 'Feed Created.' : 'Create Feed'}
               </button>
                
          </form>
          </>
  )
}

export default CreateForm