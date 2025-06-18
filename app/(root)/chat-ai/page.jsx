import Header from '@/component/shared/Header'
import React from 'react'

const Chat = () => {
  return (
    <section className='flex flex-col'>
       <Header title="Prompt Your Ai"/>
      <div className='flex gap-2 items-center w-full py-5 sm:pt-4'>
           <div className='bg-[#1F2225] h-[30rem] w-[50%] rounded-xl border-[1.9px] border-[#B391F0]'>

           </div>
           <div className='bg-[#1F2225] h-[30rem] w-[50%] rounded-xl border-[1.9px] border-[#4B4D4F]'>
          
           </div>
      </div>
        
        <div className='flex flex-col justify-center items-center gap-8'>
           <div className='w-full h-12 rounded-xl bg-[#1F2225] flex items-center justify-center'>
              <p className='text-light-100 font-semibold text-center '>.....</p>
           </div>

            <div className='flex gap-2 items-center justify-center'>
                {/* <button className='w-28 h-10 bg-red-400 rounded-full cursor-pointer'>
                       <p className='font-semibold'>End Call</p>
                </button> */}
                <button className='w-28 h-10 bg-[#9E4B9E] rounded-full cursor-pointer'>
                <p className='font-semibold text-light-100'>Voice Me</p>
                </button>
            </div>
        </div>
        <div className="h-36 w-full sm:mb-0 mb-2 mt-5">
                    <textarea name="textarea" className="w-full h-full bg-[#1F2225] border-[1.0px] border-[#4B4D4F] rounded-xl p-2 placeholder:text-gray-500 placeholder:text-sm p-2 placeholder:font-sans placeholder:font-semibold text-white outline-none " placeholder='Ask Me Anything'  />

               </div>
    </section>
  )
}

export default Chat