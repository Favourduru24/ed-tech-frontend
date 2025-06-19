//  "use client"
//  import MDEditor from  '@uiw/react-md-editor'
// import Image from 'next/image'
// import { useState, useRef, useEffect } from 'react'
// import {useGetFeedQuery, useUpdateFeedMutation } from '@/features/feed/feedApiSclice'
// import { useRouter } from 'next/navigation'
// import useAuth from '../../hooks/useAuth'
// import { imageCofig } from '@/app/api/axios'
// import SelectDropdown from './Dropdown'
// import Header from "./Header"

//   const EditForm = ({ id }) => {

//   const { data: feed, isLoading: isFeedLoading } = useGetFeedQuery(id)

//   const feedId = feed?.entities[id]

//   const [updateFeed, {
//     isLoading, 
//     isSuccess,
//     isError, 
//     error
//   }] = useUpdateFeedMutation()

//   // Initialize states with null and update when feed loads
//   const [title, setTitle] = useState('')
//   const [pitch, setPitch] = useState('')
//   const [imageUrl, setImageUrl] = useState(null)
//   const [newImageFile, setNewImageFile] = useState(null)
//   const fileInputRef = useRef(null)
//   const [category, setCategory] = useState('')
//   const [description, setDescription] = useState('')
//   const [open, setOpen] = useState(false)
//   const [name, setName] = useState('')
//   const router = useRouter()

//   // Update states when feed data loads
//   useEffect(() => {
//     if (feedId) {
//       console.log("Loaded feed data:", feedId); // Check if data exists
//       setTitle(feedId.title || "");
//       setPitch(feedId.pitch || "");
//       setCategory(feedId.category || "");
//       setDescription(feedId.description || "");
//       setImageUrl(feedId.image?.cloudinaryUrl || null);
//     }
//   }, [feedId]);

//   useEffect(() => {
//     if (isSuccess) {
//       router.push('/feeds')
//     }
//   }, [isSuccess, router])

//   const upload = async () => {
//     try {
//       if (!newImageFile) return imageUrl // Return existing URL if no new file
      
//       const formData = new FormData()
//       formData.append('image', newImageFile)
//       const res = await imageCofig.post("/upload", formData)
//       return res.data
//     } catch (error) {
//       console.log('Error uploading image!', error)
//       throw error
//     } 
//   }

   
   
//   // const handleUpdateFeed = async (e) => {
//   //         e.preventDefault()
             
//   //         let imgUrl = imageUrl // Start with existing URL
//   //     if (newImageFile) {   // Only upload if there's a new file
//   //       imgUrl = await upload()
//   //        }
    
//   //         await updateFeed({title, pitch, image: imgUrl, description, category, id })
//   //          console.log({title, pitch, image: imageUrl, description, category})
//   //       }

//   const handleUpdateFeed = async (e) => {
//   e.preventDefault()
  
//   try {
//     let imgUrl = imageUrl
//     if (newImageFile) {
//       imgUrl = await upload()
//     }

//     await updateFeed({
//       title, 
//       pitch, 
//       image: imgUrl, 
//       description, 
//       category, 
//       id 
//     }).unwrap()

//   } catch (error) {
//     console.error('Update failed:', error)
//   }
// }

  

//   if (isFeedLoading) return <div>Loading feed data...</div>

//   return (
//     <>
//        <Header title="Edit Feed"/>
//       {open && (
//         <div className='bg-black min-h-[91vh] w-[130vh] absolute z-50 flex justify-center items-center'>
//           <div className="w-[45rem] h-[12rem] bg-[#1F2225] rounded-xl flex flex-col p-10 justify-center items-center">
//             <form className='flex flex-col gap-4 flex-grow max-w-[560px] h-full'>
//               <input 
//                 type="text" 
//                 className='w-[560px] h-13 p-2 font-sans text-light-100 text-lg border-[1.6px] border-[#4B4D4F] rounded-lg outline-none' 
//                 placeholder='Add a category name..' 
//                 value={name} 
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <div className='flex gap-2 items-center justify-end'>
//                 <button className='w-20 h-10 bg-[#B391F0] font-semibold rounded-lg cursor-pointer'>Edit</button>
//                 <button 
//                   className='w-20 h-10 bg-[#9E4B9E] font-semibold rounded-lg cursor-pointer' 
//                   onClick={() => setOpen(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div> 
//         </div>
//       )}

//       <form className="flex flex-col sm:py-10 py-5 gap-5 h-full mt-10 sm:mt-0" onSubmit={handleUpdateFeed}>
//         <div className="flex sm:flex-row justify-between items-center w-full gap-4 flex-col h-full">
//           <div className="sm:w-[50%] w-full sm:mb-0 mb-2">
//             <input 
//               type="text" 
//               placeholder="Feed Title" 
//               className="w-full h-15 bg-[#1F2225] border-[1.0px] border-[#4B4D4F] rounded-xl p-2 placeholder:text-gray-500 placeholder:text-sm p-2 placeholder:font-sans placeholder:font-semibold text-white" 
//               value={title} 
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>
//           <div className="sm:w-[50%] w-full flex gap-2">
//             <SelectDropdown category={category} setCategory={setCategory}/>
//             <div 
//               className="h-15 bg-[#1F2225] w-[10%] border-[1.0px] border-[#4B4D4F] rounded-lg text-gray-500 flex items-center justify-center cursor-pointer" 
//               onClick={() => setOpen(true)}
//             >
//               <Image src='/icons/plus.png' width={24} height={24} alt="create"/>
//             </div>
//           </div>
//         </div>

//         <div data-color-mode="dark" className='w-[100%] h-[50%]'>
//           <MDEditor 
//             preview='edit'
//             id="pitch"
//             onChange={setPitch}
//             height={300}
//             width={300}
//             value={pitch}
//             style={{
//               borderRadius: 20, 
//               overflow: 'hidden', 
//               backgroundColor: '#1F2225', 
//               fontSize: '10px', 
//               fontFamily: 'sans-serif'
//             }}
//             previewOptions={{disallowedElements: ['style']}}
//             textareaProps={{
//               placeholder: "Create your feed.."
//             }}
//             components={{
//               img: (props) => (
//                 <Image 
//                   {...props} 
//                   width={600} 
//                   height={300}
//                   loader={({ src }) => src}
//                 />
//               )
//             }}
//           />
//         </div>

//         <div className="flex justify-between items-center w-full gap-4 h-full sm:flex-row flex-col">
//           <div className="sm:w-[50%] h-56 w-full sm:mb-0 mb-2">
//             <textarea 
//               name="textarea" 
//               className="w-full h-full bg-[#1F2225] border-[1.0px] border-[#4B4D4F] rounded-xl p-2 placeholder:text-gray-500 placeholder:text-sm p-2 placeholder:font-sans placeholder:font-semibold text-white" 
//               placeholder='Write brief feeds description (at least 150 char)' 
//               value={description} 
//               onChange={(e) => setDescription(e.target.value)} 
//               maxLength={150}
//             />
//           </div>

//           <div 
//             className="sm:w-[50%] h-56 w-full flex items-center justify-center border-[#4B4D4F] rounded-xl bg-[#1F2225] border-[1.0px] cursor-pointer" 
//             onClick={() => fileInputRef.current?.click()}
//           >
//             <input 
//               type="file"  
//               className="hidden" 
//               onChange={(e) => setNewImageFile(e.target.files[0])} 
//               accept='image/*' 
//               ref={fileInputRef}
//             />
              
//             {!newImageFile && !imageUrl ? (
//               <div className='text-white flex flex-col justify-center w-full items-center'>
//                 <h3 className='text-2xl text-gray-500'>Upload Image</h3>
//                 <p className='text-center text-sm text-gray-500 font-semibold'>image must be less than 20mb</p>
//               </div>
//             ) : (
//               <Image 
//                 src={newImageFile ? URL.createObjectURL(newImageFile) : imageUrl}  
//                 width={1000} 
//                 height={200} 
//                 alt="image" 
//                 className='object-contain rounded-xl w-full h-full'
//               />
//             )}
//           </div>
//         </div>

//         <button 
//           className="w-[100%] bg-[#9E4B9E] font-semibold h-15 text-white rounded-xl cursor-pointer sm:mt-0 mt-2" 
//           type='submit'
//           disabled={isLoading}
//         >
//           {isLoading ? 'Loading...' : 'Update Feed'}
//         </button>
//       </form>
//     </>
//   )
// }

// export default EditForm



// //  "use client"
// //  import MDEditor from  '@uiw/react-md-editor'
// // import Image from 'next/image'
// // import { useState, useRef, useEffect } from 'react'
// // import {useGetFeedQuery, useUpdateFeedMutation } from '@/features/feed/feedApiSclice'
// // import { useRouter } from 'next/navigation'
// // import useAuth from '../../hooks/useAuth'
// // import { imageCofig } from '@/app/api/axios'
// // import SelectDropdown from './Dropdown'
// // import Header from "./Header"

// // const EditForm = ({ id }) => {
// //   const router = useRouter()
// //   const { data: feed, isLoading: isFeedLoading } = useGetFeedQuery(id)
// //   const feedId = feed?.entities[id]

// //   const [updateFeed, { isLoading, isSuccess, isError, error }] = useUpdateFeedMutation()

// //   // Initialize states with feed data if available
// //   const [title, setTitle] = useState(feedId?.title || '')
// //   const [pitch, setPitch] = useState(feedId?.pitch || '')
// //   const [imageUrl, setImageUrl] = useState(feedId?.image?.cloudinaryUrl || null)
// //   const [newImageFile, setNewImageFile] = useState(null)
// //   const [category, setCategory] = useState(feedId?.category || '')
// //   const [description, setDescription] = useState(feedId?.description || '')
// //   const [open, setOpen] = useState(false)
// //   const [name, setName] = useState('')
  
// //   const fileInputRef = useRef(null)

// //   // Handle successful update
// //   useEffect(() => {
// //     if (isSuccess) {
// //       router.push('/feeds')
// //     }
// //   }, [isSuccess, router])

// //   // Clean up object URLs
// //   useEffect(() => {
// //     return () => {
// //       if (newImageFile) {
// //         URL.revokeObjectURL(URL.createObjectURL(newImageFile))
// //       }
// //     }
// //   }, [newImageFile])

// //   const upload = async () => {
// //     try {
// //       const formData = new FormData()
// //       formData.append('image', newImageFile)
// //       const res = await imageCofig.post("/upload", formData)
// //       return res.data.url // Assuming your API returns the URL in data.url
// //     } catch (error) {
// //       console.error('Error uploading image!', error)
// //       throw error
// //     } 
// //   }

// //   const handleUpdateFeed = async (e) => {
// //     e.preventDefault()
    
// //     // Basic validation
// //     if (!title || !pitch || !description) {
// //       alert('Please fill all required fields')
// //       return
// //     }

// //     try {
// //       let imgUrl = imageUrl // Use existing URL by default
      
// //       // Only upload if there's a new image file
// //       if (newImageFile) {
// //         imgUrl = await upload()
// //       }

// //       // Update the feed
// //       await updateFeed({
// //         title, 
// //         pitch, 
// //         image: imgUrl, 
// //         description, 
// //         category, 
// //         id 
// //       }).unwrap()

// //     } catch (error) {
// //       console.error('Update failed:', error)
// //     }
// //   }

// //   if (isFeedLoading) return <div className="flex justify-center items-center h-screen">Loading feed data...</div>

// //   return (
// //     <>
// //       <Header title="Edit Feed"/>
      
// //       {/* Category Modal */}
// //       {open && (
// //         <div className='bg-black min-h-[91vh] w-[130vh] absolute z-50 flex justify-center items-center'>
// //           <div className="w-[45rem] h-[12rem] bg-[#1F2225] rounded-xl flex flex-col p-10 justify-center items-center">
// //             <form className='flex flex-col gap-4 flex-grow max-w-[560px] h-full'>
// //               <input 
// //                 type="text" 
// //                 className='w-[560px] h-13 p-2 font-sans text-light-100 text-lg border-[1.6px] border-[#4B4D4F] rounded-lg outline-none' 
// //                 placeholder='Add a category name..' 
// //                 value={name} 
// //                 onChange={(e) => setName(e.target.value)}
// //               />
// //               <div className='flex gap-2 items-center justify-end'>
// //                 <button 
// //                   type="button"
// //                   className='w-20 h-10 bg-[#B391F0] font-semibold rounded-lg cursor-pointer'
// //                 >
// //                   Edit
// //                 </button>
// //                 <button 
// //                   type="button"
// //                   className='w-20 h-10 bg-[#9E4B9E] font-semibold rounded-lg cursor-pointer' 
// //                   onClick={() => setOpen(false)}
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </form>
// //           </div> 
// //         </div>
// //       )}

// //       {/* Main Form */}
// //       <form 
// //         className="flex flex-col sm:py-10 py-5 gap-5 h-full mt-10 sm:mt-0" 
// //         onSubmit={handleUpdateFeed}
// //       >
// //         {/* Error Message */}
// //         {isError && (
// //           <div className="text-red-500 p-2 bg-red-100 rounded-lg">
// //             Error: {error?.data?.message || 'Failed to update feed'}
// //           </div>
// //         )}

// //         <div className="flex sm:flex-row justify-between items-center w-full gap-4 flex-col h-full">
// //           <div className="sm:w-[50%] w-full sm:mb-0 mb-2">
// //             <input 
// //               type="text" 
// //               placeholder="Feed Title" 
// //               className="w-full h-15 bg-[#1F2225] border-[1.0px] border-[#4B4D4F] rounded-xl p-2 placeholder:text-gray-500 placeholder:text-sm p-2 placeholder:font-sans placeholder:font-semibold text-white" 
// //               value={title} 
// //               onChange={(e) => setTitle(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="sm:w-[50%] w-full flex gap-2">
// //             <SelectDropdown category={category} setCategory={setCategory}/>
// //             <div 
// //               className="h-15 bg-[#1F2225] w-[10%] border-[1.0px] border-[#4B4D4F] rounded-lg text-gray-500 flex items-center justify-center cursor-pointer" 
// //               onClick={() => setOpen(true)}
// //             >
// //               <Image src='/icons/plus.png' width={24} height={24} alt="create"/>
// //             </div>
// //           </div>
// //         </div>

// //         <div data-color-mode="dark" className='w-[100%] h-[50%]'>
// //           <MDEditor 
// //             preview='edit'
// //             id="pitch"
// //             onChange={setPitch}
// //             height={300}
// //             width={300}
// //             value={pitch}
// //             style={{
// //               borderRadius: 20, 
// //               overflow: 'hidden', 
// //               backgroundColor: '#1F2225', 
// //               fontSize: '10px', 
// //               fontFamily: 'sans-serif'
// //             }}
// //             previewOptions={{disallowedElements: ['style']}}
// //             textareaProps={{
// //               placeholder: "Create your feed.."
// //             }}
// //             components={{
// //               img: (props) => (
// //                 <Image 
// //                   {...props} 
// //                   width={600} 
// //                   height={300}
// //                   loader={({ src }) => src}
// //                 />
// //               )
// //             }}
// //           />
// //         </div>

// //         <div className="flex justify-between items-center w-full gap-4 h-full sm:flex-row flex-col">
// //           <div className="sm:w-[50%] h-56 w-full sm:mb-0 mb-2">
// //             <textarea 
// //               name="textarea" 
// //               className="w-full h-full bg-[#1F2225] border-[1.0px] border-[#4B4D4F] rounded-xl p-2 placeholder:text-gray-500 placeholder:text-sm p-2 placeholder:font-sans placeholder:font-semibold text-white" 
// //               placeholder='Write brief feeds description (at least 150 char)' 
// //               value={description} 
// //               onChange={(e) => setDescription(e.target.value)} 
// //               maxLength={150}
// //               required
// //             />
// //           </div>

// //           <div 
// //             className="sm:w-[50%] h-56 w-full flex items-center justify-center border-[#4B4D4F] rounded-xl bg-[#1F2225] border-[1.0px] cursor-pointer" 
// //             onClick={() => fileInputRef.current?.click()}
// //           >
// //             <input 
// //               type="file"  
// //               className="hidden" 
// //               onChange={(e) => setNewImageFile(e.target.files[0])} 
// //               accept='image/*' 
// //               ref={fileInputRef}
// //             />
              
// //             {!newImageFile && !imageUrl ? (
// //               <div className='text-white flex flex-col justify-center w-full items-center'>
// //                 <h3 className='text-2xl text-gray-500'>Upload Image</h3>
// //                 <p className='text-center text-sm text-gray-500 font-semibold'>image must be less than 20mb</p>
// //               </div>
// //             ) : (
// //               <Image 
// //                 src={newImageFile ? URL.createObjectURL(newImageFile) : imageUrl}  
// //                 width={1000} 
// //                 height={200} 
// //                 alt="image preview" 
// //                 className='object-contain rounded-xl w-full h-full'
// //               />
// //             )}
// //           </div>
// //         </div>

// //         <button 
// //           className="w-[100%] bg-[#9E4B9E] font-semibold h-15 text-white rounded-xl cursor-pointer sm:mt-0 mt-2 disabled:opacity-50" 
// //           type='submit'
// //           disabled={isLoading}
// //         >
// //           {isLoading ? 'Updating...' : 'Update Feed'}
// //         </button>
// //       </form>
// //     </>
// //   )
// // }

// // export default EditForm


"use client"
import MDEditor from '@uiw/react-md-editor'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useGetFeedQuery, useUpdateFeedMutation } from '@/features/feed/feedApiSclice'
import { useRouter } from 'next/navigation'
import { imageCofig } from '@/app/api/axios'
import SelectDropdown from './Dropdown'
import Header from "./Header"

const EditForm = ({ id }) => {
  const router = useRouter()
  const { data: feed, isLoading: isFeedLoading } = useGetFeedQuery(id)
  const feedId = feed?.entities[id]

  const [updateFeed, { isLoading, isSuccess, isError, error }] = useUpdateFeedMutation()

  // State initialization
  const [title, setTitle] = useState('')
  const [pitch, setPitch] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [newImageFile, setNewImageFile] = useState(null)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const fileInputRef = useRef(null)

  // Update states when feed data loads
  useEffect(() => {
    if (feedId) {
      setTitle(feedId.title || "")
      setPitch(feedId.pitch || "")
      setCategory(feedId.category || "")
      setDescription(feedId.description || "")
      // Ensure the image URL is properly formatted
      if (feedId.image?.cloudinaryUrl) {
        const url = feedId.image.cloudinaryUrl.startsWith('http') 
          ? feedId.image.cloudinaryUrl 
          : `https://${feedId.image.cloudinaryUrl}`
        setImageUrl(url)
      }
    }
  }, [feedId])

  useEffect(() => {
    if (isSuccess) {
      router.push('/feeds')
    }
  }, [isSuccess, router])

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (newImageFile) {
        URL.revokeObjectURL(URL.createObjectURL(newImageFile))
      }
    }
  }, [newImageFile])

  const upload = async () => {
    try {
      if (!newImageFile) return imageUrl
      
      const formData = new FormData()
      formData.append('image', newImageFile)
      const res = await imageCofig.post("/upload", formData)
      return res.data.url || res.data // Adjust based on your API response
    } catch (error) {
      console.error('Error uploading image!', error)
      throw error
    } 
  }

  const handleUpdateFeed = async (e) => {
    e.preventDefault()
    
    try {
      let imgUrl = imageUrl
      if (newImageFile) {
        imgUrl = await upload()
      }

      await updateFeed({
        title, 
        pitch, 
        image: imgUrl, 
        description, 
        category, 
        id 
      }).unwrap()

    } catch (error) {
      console.error('Update failed:', error)
    }
  }

  if (isFeedLoading) return <div className="flex justify-center items-center h-screen">Loading feed data...</div>

  return (
    <>
      <Header title="Edit Feed"/>
      
      {/* Category Modal */}
      {open && (
        <div className='bg-black min-h-[91vh] w-[130vh] absolute z-50 flex justify-center items-center'>
          <div className="w-[45rem] h-[12rem] bg-[#1F2225] rounded-xl flex flex-col p-10 justify-center items-center">
            <form className='flex flex-col gap-4 flex-grow max-w-[560px] h-full'>
              <input 
                type="text" 
                className='w-[560px] h-13 p-2 font-sans text-light-100 text-lg border-[1.6px] border-[#4B4D4F] rounded-lg outline-none' 
                placeholder='Add a category name..' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
              <div className='flex gap-2 items-center justify-end'>
                <button 
                  type="button"
                  className='w-20 h-10 bg-[#B391F0] font-semibold rounded-lg cursor-pointer'
                >
                  Edit
                </button>
                <button 
                  type="button"
                  className='w-20 h-10 bg-[#9E4B9E] font-semibold rounded-lg cursor-pointer' 
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div> 
        </div>
      )}

      {/* Main Form */}
      <form 
        className="flex flex-col sm:py-10 py-5 gap-5 h-full mt-10 sm:mt-0" 
        onSubmit={handleUpdateFeed}
      >
        {/* Error Message */}
        {isError && (
          <div className="text-red-500 p-2 bg-red-100 rounded-lg">
            Error: {error?.data?.message || 'Failed to update feed'}
          </div>
        )}

        <div className="flex sm:flex-row justify-between items-center w-full gap-4 flex-col h-full">
          <div className="sm:w-[50%] w-full sm:mb-0 mb-2">
            <input 
              type="text" 
              placeholder="Feed Title" 
              className="w-full h-15 bg-[#1F2225] border-[1.0px] border-[#4B4D4F] rounded-xl p-2 placeholder:text-gray-500 placeholder:text-sm p-2 placeholder:font-sans placeholder:font-semibold text-white" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="sm:w-[50%] w-full flex gap-2">
            <SelectDropdown category={category} setCategory={setCategory}/>
            <div 
              className="h-15 bg-[#1F2225] w-[10%] border-[1.0px] border-[#4B4D4F] rounded-lg text-gray-500 flex items-center justify-center cursor-pointer" 
              onClick={() => setOpen(true)}
            >
              <Image src='/assets/icons/plus.png' width={24} height={24} alt="create"/>
            </div>
          </div>
        </div>

        <div data-color-mode="dark" className='w-[100%] h-[50%]'>
          <MDEditor 
            preview='edit'
            id="pitch"
            onChange={(value) => setPitch(value || '')}
            height={300}
            value={pitch}
            style={{
              borderRadius: 20, 
              overflow: 'hidden', 
              backgroundColor: '#1F2225', 
              fontSize: '10px', 
              fontFamily: 'sans-serif'
            }}
            textareaProps={{
              placeholder: "Create your feed.."
            }}
          />
        </div>

        <div className="flex justify-between items-center w-full gap-4 h-full sm:flex-row flex-col">
          <div className="sm:w-[50%] h-56 w-full sm:mb-0 mb-2">
            <textarea 
              name="textarea" 
              className="w-full h-full bg-[#1F2225] border-[1.0px] border-[#4B4D4F] rounded-xl p-2 placeholder:text-gray-500 placeholder:text-sm p-2 placeholder:font-sans placeholder:font-semibold text-white" 
              placeholder='Write brief feeds description (at least 150 char)' 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              maxLength={150}
              required
            />
          </div>

          <div 
            className="sm:w-[50%] h-56 w-full flex items-center justify-center border-[#4B4D4F] rounded-xl bg-[#1F2225] border-[1.0px] cursor-pointer relative overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file"  
              className="hidden" 
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setNewImageFile(e.target.files[0])
                }
              }} 
              accept='image/*' 
              ref={fileInputRef}
            />
              
            {!newImageFile && !imageUrl ? (
              <div className='text-white flex flex-col justify-center w-full items-center'>
                <h3 className='text-2xl text-gray-500'>Upload Image</h3>
                <p className='text-center text-sm text-gray-500 font-semibold'>image must be less than 20mb</p>
              </div>
            ) : (
              <Image 
                src={newImageFile ? URL.createObjectURL(newImageFile) : imageUrl}  
                width={1000} 
                height={200} 
                alt="feed image"
                className='object-contain w-full h-full'
                unoptimized={!!newImageFile} // Disable optimization for local files
              />
            )}
          </div>
        </div>

        <button 
          className="w-[100%] bg-[#9E4B9E] font-semibold h-15 text-white rounded-xl cursor-pointer sm:mt-0 mt-2 disabled:opacity-50" 
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Feed'}
        </button>
      </form>
    </>
  )
}

export default EditForm