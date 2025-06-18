"use client"
import Header from '@/component/shared/Header'
import { vapi } from '@/libs/vapi.sdk'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {useAddNewHistoryMutation} from "@/features/history/historyApiSlice"
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import { useGetQuizIdQuery } from '@/features/quiz/quizApiSclice'
import { configureQuizTutor, cn } from '../libs/utils'
import Loader from '@/component/shared/Loader'

   const QuizDetail = ({id}) => {

    const {data, isLoading} = useGetQuizIdQuery(id)
    const [addHistory, {isSuccess}] = useAddNewHistoryMutation()
    const {id: user} = useAuth()

     console.log({data})

    const quizId = data?.entities[id]
    const router = useRouter()

    console.log({quizId})

     const {voice, subject, topic, voicePattern: style, name, duration, userId, questions} = quizId || {}


    const CallStatus = {
       INACTIVE: 'INACTIVE',
       CONNECTING: 'CONNECTING',
       ACTIVE: 'ACTIVE',
       FINISHED: 'FINISHED'
    }

    const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [messages, setMessages] = useState([])

    const toggleMicrophone = () => {
      const isMuted = vapi.isMuted()
      vapi.setMuted(!isMuted)
      setIsMuted(!isMuted)
    }

    useEffect(() => {
     const onCallStart = () => setCallStatus(CallStatus.ACTIVE)

     const onCallEnd = async () => {
      setCallStatus(CallStatus.FINISHED)
      // Add to session history
     }

     const onSpeechStart = () => setIsSpeaking(true)
     const onSpeechEnd = () => setIsSpeaking(false)

     const onMessage = (message) => {
          if(message.type === 'transcript' && message.transcriptType === 'final') {
             const newMessage = {role: message.role, content: message.transcript}

             setMessages((prev) => [newMessage, ...prev])
          }
     }

     const onError = (error) => console.log('Error', error)

      vapi.on("call-start", onCallStart)
      vapi.on("call-end", onCallEnd)
      vapi.on("message", onMessage)
      vapi.on("error", onError)
      vapi.on("speech-start", onSpeechStart)
      vapi.on("speech-end", onSpeechEnd)
      
       return () => {
         vapi.off("call-start", onCallStart)
         vapi.off("call-end", onCallEnd)
         vapi.off("message", onMessage)
         vapi.off("error", onError)
         vapi.off("speech-start", onSpeechStart)
         vapi.off("speech-end", onSpeechEnd)
       }

    }, [])

    useEffect(() => {
        if(isSuccess) {
          router.push('/quiz') 
        }
      }, [isSuccess, router])

      const handleCall = async () => {
           if(vapi) {
          setCallStatus(CallStatus.CONNECTING)

          // let formattedQuestions = ''
            
          //   if(questions) {
          //      formattedQuestions = questions.map((question) => `-${question}`).join('\n')
          //   }

           let formattedQuestions = '';
      
           if (questions && questions.length > 0) {
        formattedQuestions = questions.map((question, index) => {
          // Handle both string and object question formats
          const questionText = typeof question === 'string' 
            ? question 
            : question.text;
          const options = typeof question === 'string'
            ? '' 
            : `\nOptions: ${question.options}`;
            
          return `${index + 1}. ${questionText}${options}`;
        }).join('\n\n');
      }

             await vapi.start(configureQuizTutor(voice, style), {
               variableValues: {
                  questions: formattedQuestions, subject, topic, style
               }
        })

          }
    }

    const handleDisconnect = async () => {
     setCallStatus(CallStatus.FINISHED)
     vapi.stop()
      await addHistory({quizId: id, user})
    }


     if(isLoading) {
     return (
        <div className="fixed inset-0 z-50 flex justify-center items-cente bg-black">
            <Loader styleName='w-14 h-14'/>
        </div>
     )
      }
      
  return (
    <section className='flex flex-col'>
     <Header title="Quiz Companion"/>
       <div className='flex flex-col gap-4 bg-dark-200 py-5 sm:pt-4 rounded-t-xl mt-5'>
        <div className='md:flex justify-between items-center w-full gap-2 backdrop-blur-lg max-md:flex-col'>

           <div className='bg-[#1F2225] h-[36rem] w-[50%] rounded-xl flex items-center justify-center max-md:w-full'>
              <div className={cn('bg-[#9E4B9E] rounded-full p-1', callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0', callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse')}>
               <div className='rounded-full bg-dark-200 h-30 w-30 flex items-center justify-center relative'>
                  <Image src="/images/ai-avatar.png" width={50} height={50} alt='ai-avatar' className='rounded-full object-contain'/>
                  { isSpeaking && <div className='flex items-center justify-center rounded-full cursor-pointer bg-[#9E4B9E] hover:rounded-full p-2 shrink-0 absolute -bottom-3 right-0'>
                            <Image src='/icons/white-mic.png' width={20} height={20} alt='white-mic/image' className="size-6"/>
                        </div> }

               </div>
               </div>
                 
                 <div className='absolute top-4 flex gap-2 text-white left-4 w-fit h-8 bg-black/40 backdrop-blur-2xl items-center p-2 justify-center rounded-full'>
                    <Image src="/icons/mic.png" width={50} height={50} alt="mic" className='size-6'/>
                     <p className="font-sans font-semibold text-sm text-light-100">{name}</p>
                 </div>
           </div>


             <div className='bg-[#1F2225] h-[36rem] w-[50%] rounded-xl flex items-center justify-center relative md:flex hidden'>
              <div className='bg-[#B391F0] rounded-full p-1'>
               <div className='rounded-full bg-dark-200 h-30 w-30 flex items-center justify-center relative'>
                  <Image src="/images/user5.png" width={80} height={80} alt='ai-avatar' className='rounded-full object-contain'/>
                         <div className='flex items-center justify-center rounded-full cursor-pointer bg-[#B391F0] hover:rounded-full p-2 shrink-0 absolute -bottom-3 right-0'>
                            <Image src='/icons/white-mic.png' width={20} height={20} alt='white-mic/image' className="size-6"/>
                        </div>
               </div>
               </div>

               <div className='absolute top-4 flex gap-2 text-white left-4 w-fit h-8 bg-black/40 backdrop-blur-2xl items-center p-2 justify-center rounded-full'>
                    <Image src="/icons/mic.png" width={50} height={50} alt="mic" className='size-6'/>
                     <p className="font-sans font-semibold text-sm text-light-100">{userId?.username}</p>
                 </div>

               <div className='absolute top-4 flex gap-2 text-white right-4 w-fit h-8 bg-black/40 backdrop-blur-2xl items-center p-2 justify-center rounded-full'>
                    <Image src="/icons/clock.png" width={50} height={50} alt="clock" className='size-6'/>
                     <p className="font-sans font-semibold text-sm text-light-100">{duration}min</p>
                 </div>
           </div>

      </div>
             <div className='w-full h-24 rounded-xl bg-[#1F2225] flex items-center justify-center'>
                   <div className='flex gap-4 items-center'>
                       <button className='flex items-center justify-center rounded-full cursor-pointer bg-black/40 hover:rounded-full p-2 shrink-0' onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                        <Image src={`${isMuted ? '/icons/end.png' : '/icons/mic.png'}`} width={20} height={20} alt='mic/image' className="size-6"/>
                        </button>

                        <button className={cn('flex items-center justify-center rounded-full cursor-pointer hover:rounded-full p-2 shrink-0', callStatus === CallStatus.ACTIVE ? 'bg-destructive-100' : 'bg-[#B391F0]', callStatus === CallStatus.CONNECTING && 'animate-pulse') 
                          } onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
                            <Image src={`${callStatus === CallStatus.ACTIVE ? '/icons/end.png' : '/icons/mic.png'}`} width={20} height={20} alt='mic/image' className="size-6"/>
                        </button>

                  </div>
           </div>
         </div>
     
           {messages?.length > 0 && <section className="bg-dark-200/40 w-full h-fit rounded-b-xl flex flex-col justify-center items-cente break-all p-4">
               {messages.map((message, index) => {
                   if(message.role === 'assistant') {
                     return (
                       <p key={index} className="max-sm:text-sm text-center">
                         {name.split(' ')[0].replace('/[.,]/g', '')}: {message.content}
                       </p>
                     )
                   }else {
                       return (
                         <p key={index} className='text-light-100 max-sm:text-sm '>{userId?.username}: {message.content}</p>
                       )
                   }
               })}
           </section>}
      </section>
    )
  }

export default QuizDetail

