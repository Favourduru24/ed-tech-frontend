// "use client"
// import Header from '@/component/shared/Header'
// import {useGetTutorIdQuery} from '@/features/tutor/tutorApiSlice'
// import { vapi } from '@/libs/vapi.sdk'
// import Image from 'next/image'
// import { useEffect, useState } from 'react'
// import { cn, configureAssistant } from '@/libs/utils'
// import {useAddNewHistoryMutation} from '@/features/history/historyApiSlice'
// import { useRouter } from 'next/navigation'
// import useAuth from '@/hooks/useAuth'
// import Loader from '@/component/shared/Loader'

// const TutorDetail = ({id}) => {

//     const {data, isLoading} = useGetTutorIdQuery(id)
//     const [addHistory, {isSuccess}] = useAddNewHistoryMutation()
//     const {id: user, profilePics} = useAuth()
    
//     const tutorId = data?.entities[id]
//     const router = useRouter()

//      const {voice, subject, topic, voicePattern: style, name, duration, userId} = tutorId || {}

//     const CallStatus = {
//        INACTIVE: 'INACTIVE',
//        CONNECTING: 'CONNECTING',
//        ACTIVE: 'ACTIVE',
//        FINISHED: 'FINISHED'
//     }

//     const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE)
//     const [isSpeaking, setIsSpeaking] = useState(false)
//     const [isMuted, setIsMuted] = useState(false)
//     const [messages, setMessages] = useState([])

//     const toggleMicrophone = () => {
//       const isMuted = vapi.isMuted()
//       vapi.setMuted(!isMuted)
//       setIsMuted(!isMuted)
//     }

//     useEffect(() => {
//      const onCallStart = () => setCallStatus(CallStatus.ACTIVE)

//      const onCallEnd = async () => {
//       setCallStatus(CallStatus.FINISHED)
//       // Add to session history
//      }

//      const onSpeechStart = () => setIsSpeaking(true)
//      const onSpeechEnd = () => setIsSpeaking(false)

//      const onMessage = (message) => {
//           if(message.type === 'transcript' && message.transcriptType === 'final') {
//              const newMessage = {role: message.role, content: message.transcript}

//              setMessages((prev) => [newMessage, ...prev])
//           }
//      }

//      const onError = (error) => console.log('Error', error)

//       vapi.on("call-start", onCallStart)
//       vapi.on("call-end", onCallEnd)
//       vapi.on("message", onMessage)
//       vapi.on("error", onError)
//       vapi.on("speech-start", onSpeechStart)
//       vapi.on("speech-end", onSpeechEnd)
      
//        return () => {
//          vapi.off("call-start", onCallStart)
//          vapi.off("call-end", onCallEnd)
//          vapi.off("message", onMessage)
//          vapi.off("error", onError)
//          vapi.off("speech-start", onSpeechStart)
//          vapi.off("speech-end", onSpeechEnd)
//        }

//     }, [])

//     useEffect(() => {
//         if(isSuccess) {
//           router.push('/training') 
//         }
//       }, [isSuccess, router])

//     const handleCall = async () => {
//            if(vapi) {
//               setCallStatus(CallStatus.CONNECTING)

//        const assistantOverides = {
//           variableValues: {
//            subject, topic, style
//          },
//          clientMessages: ["transcript"],
//          serverMessages: [],
//        }

//         vapi.start(configureAssistant(voice, style), assistantOverides)

//            }
//     }

//     const handleDisconnect = async () => {
//        setCallStatus(CallStatus.FINISHED)
//        vapi.stop()
//       await addHistory({tutorId: id, user})
//     }

//      if(isLoading) {
//         return (
//            <div className="fixed inset-0 z-50 flex justify-center items-cente bg-black">
//                              <Loader styleName='w-14 h-14'/>
//                           </div>
//         )
//      }
      
//   return (
//     <section className='flex flex-col'>
//      <Header title="Companion Tutor"/>
//        <div className='flex flex-col gap-4 bg-dark-200 py-5 sm:pt-4 rounded-t-xl max-md:mt-5'>
//         <div className='md:flex justify-between items-center w-full gap-2 backdrop-blur-lg max-md:flex-col'>

//            <div className='bg-[#1F2225] h-[36rem] w-[50%] rounded-xl flex items-center justify-center max-md:w-full '>
//               <div className={cn('bg-[#9E4B9E] rounded-full p-1', callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0', callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse')}>
//                <div className='rounded-full bg-dark-200 h-30 w-30 flex items-center justify-center relative'>
//                   <Image src="/assets/images/ai-avatar.png" width={50} height={50} alt='ai-avatar' className='rounded-full object-contain'/>
//                   { isSpeaking && <div className='flex items-center justify-center rounded-full cursor-pointer bg-[#9E4B9E] hover:rounded-full p-2 shrink-0 absolute -bottom-3 right-0'>
//                             <Image src='/assets/icons/white-mic.png' width={20} height={20} alt='white-mic/image' className="size-6"/>
//                         </div> }

//                </div>
//                </div>
                 
//                  <div className='absolute top-4 flex gap-2 text-white left-4 w-fit h-8 bg-black/40 backdrop-blur-2xl items-center p-2 justify-center rounded-full'>
//                     <Image src="/assets/icons/mic.png" width={50} height={50} alt="mic" className='size-6'/>
//                      <p className="font-sans font-semibold text-sm text-light-100">{name}</p>
//                  </div>
//            </div>


//              <div className='bg-[#1F2225] h-[36rem] w-[50%] rounded-xl  items-center justify-center relative md:flex hidden'>
//               <div className='bg-[#B391F0] rounded-full p-1'>
//                <div className='rounded-full bg-dark-200 h-30 w-30 flex items-center justify-center relative'>
//                   <Image src={profilePics?.cloudinaryUrl ? profilePics?.cloudinaryUrl : '/assets/images/empty.png'} width={80} height={80} alt='ai-avatar' className='rounded-full object-contain'/>
//                          <div className='flex items-center justify-center rounded-full cursor-pointer bg-[#B391F0] hover:rounded-full p-2 shrink-0 absolute -bottom-3 right-0'>
//                             <Image src='/assets/icons/white-mic.png' width={20} height={20} alt='white-mic/image' className="size-6"/>
//                         </div>
//                </div>
//                </div>

//                <div className='absolute top-4 flex gap-2 text-white left-4 w-fit h-8 bg-black/40 backdrop-blur-2xl items-center p-2 justify-center rounded-full'>
//                     <Image src="/assets/icons/mic.png" width={50} height={50} alt="mic" className='size-6'/>
//                      <p className="font-sans font-semibold text-sm text-light-100">{userId?.username}</p>
//                  </div>

//                <div className='absolute top-4 flex gap-2 text-white right-4 w-fit h-8 bg-black/40 backdrop-blur-2xl items-center p-2 justify-center rounded-full'>
//                     <Image src="/assets/icons/clock.png" width={50} height={50} alt="clock" className='size-6'/>
//                      <p className="font-sans font-semibold text-sm text-light-100">{duration}min</p>
//                  </div>
//            </div>

//       </div>
//              <div className='w-full h-24 rounded-xl bg-[#1F2225] flex items-center justify-center'>
//                    <div className='flex gap-4 items-center'>
//                        <button className='flex items-center justify-center rounded-full cursor-pointer bg-black/40 hover:rounded-full p-2 shrink-0' onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
//                         <Image src={`${isMuted ? '/assets/icons/end.png' : '/assets/icons/mic.png'}`} width={20} height={20} alt='mic/image' className="size-6"/>
//                         </button>

//                         <button className={cn('flex items-center justify-center rounded-full cursor-pointer hover:rounded-full p-2 shrink-0', callStatus === CallStatus.ACTIVE ? 'bg-destructive-100' : 'bg-[#B391F0]', callStatus === CallStatus.CONNECTING && 'animate-pulse') 
//                           } onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
//                             <Image src={`${callStatus === CallStatus.ACTIVE ? '/assets/icons/end.png' : '/assets/icons/mic.png'}`} width={20} height={20} alt='mic/image' className="size-6"/>
//                         </button>

//                   </div>
//            </div>
//          </div>
     
//            {messages?.length > 0 && <section className="bg-dark-200/40 w-full h-fit rounded-b-xl flex flex-col justify-center items-cente break-all p-4">
//                {messages.map((message, index) => {
//                    if(message.role === 'assistant') {
//                      return (
//                        <p key={index} className="max-sm:text-sm text-center text-light-100">
//                          {name.split(' ')[0].replace('/[.,]/g', '')} : {message.content}
//                        </p>
//                      )
//                    }else {
//                        return (
//                          <p key={index} className='text-light-100 max-sm:text-sm '>{userId?.username}: {message.content}</p>
//                        )
//                    }
//                })}
//            </section>}
//       </section>
//     )
//   }

// export default TutorDetail


'use client'
import Header from '@/component/shared/Header'
import { useGetTutorIdQuery } from '@/features/tutor/tutorApiSlice'
import { vapi } from '@/libs/vapi.sdk'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { cn, configureAssistant } from '@/libs/utils'
import { useAddNewHistoryMutation } from '@/features/history/historyApiSlice'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import Loader from '@/component/shared/Loader'

const TutorDetail = ({ id }) => {
  const { data, isLoading } = useGetTutorIdQuery(id)
  const [addHistory, { isSuccess }] = useAddNewHistoryMutation()
  const { id: user, profilePics } = useAuth()
  const router = useRouter()

  const tutorId = data?.entities[id]
  const { voice, subject, topic, voicePattern: style, name, duration, userId } = tutorId || {}

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
  const [microphoneAccess, setMicrophoneAccess] = useState(false)
  const [audioStream, setAudioStream] = useState(null)

  // Request microphone permissions on component mount
  useEffect(() => {
    const requestMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100
          }
        })
        setAudioStream(stream)
        setMicrophoneAccess(true)
        
        // Immediately stop the stream since we just needed permission
        stream.getTracks().forEach(track => track.stop())
      } catch (error) {
        console.error('Microphone access denied:', error)
        setMicrophoneAccess(false)
      }
    }

    requestMicrophone()
  }, [])

  const toggleMicrophone = () => {
    if (!vapi) return
    
    const currentlyMuted = vapi.isMuted()
    vapi.setMuted(!currentlyMuted)
    setIsMuted(!currentlyMuted)
  }

  useEffect(() => {
    const onCallStart = () => {
      console.log('Call started - microphone status:', microphoneAccess)
      setCallStatus(CallStatus.ACTIVE)
    }

    const onCallEnd = async () => {
      setCallStatus(CallStatus.FINISHED)
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop())
      }
    }

    const onSpeechStart = () => {
      console.log('Speech started')
      setIsSpeaking(true)
    }

    const onSpeechEnd = () => {
      console.log('Speech ended')
      setIsSpeaking(false)
    }

    const onMessage = (message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript }
        setMessages((prev) => [newMessage, ...prev])
      }
    }

    const onError = (error) => {
      console.error('VAPI Error:', error)
      if (error.message.includes('microphone') || error.message.includes('audio')) {
        console.log('Audio configuration error detected')
      }
    }

    // Audio-specific events
    const onAudioLevel = (level) => {
      console.log('Audio level:', level)
      // You can use this to show visual feedback for user's microphone
    }

    // Set up event listeners
    vapi.on("call-start", onCallStart)
    vapi.on("call-end", onCallEnd)
    vapi.on("message", onMessage)
    vapi.on("error", onError)
    vapi.on("speech-start", onSpeechStart)
    vapi.on("speech-end", onSpeechEnd)
    vapi.on("audio-level", onAudioLevel)

    return () => {
      vapi.off("call-start", onCallStart)
      vapi.off("call-end", onCallEnd)
      vapi.off("message", onMessage)
      vapi.off("error", onError)
      vapi.off("speech-start", onSpeechStart)
      vapi.off("speech-end", onSpeechEnd)
      vapi.off("audio-level", onAudioLevel)
    }
  }, [CallStatus.ACTIVE, CallStatus.FINISHED, microphoneAccess, audioStream])

  useEffect(() => {
    if (isSuccess) {
      router.push('/training')
    }
  }, [isSuccess, router])

  const handleCall = async () => {
    if (!vapi || !microphoneAccess) {
      console.error('Vapi not available or microphone access denied')
      return
    }

    try {
      setCallStatus(CallStatus.CONNECTING)

      // Get fresh microphone stream for the call
      const freshStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleSize: 16,
          channelCount: 1,
          sampleRate: 44100
        }
      })

      setAudioStream(freshStream)

      const assistantOverrides = {
        variableValues: {
          subject,
          topic,
          style
        },
        clientMessages: ["transcript"],
        serverMessages: [],
        // Ensure microphone is enabled in config
        audio: {
          enable: true,
          stream: freshStream // Pass the microphone stream explicitly
        }
      }

      console.log('Starting call with microphone stream:', freshStream.getAudioTracks())
      vapi.start(configureAssistant(voice, style), assistantOverrides)

    } catch (error) {
      console.error('Error starting call:', error)
      setCallStatus(CallStatus.INACTIVE)
    }
  }

  const handleDisconnect = async () => {
    try {
      setCallStatus(CallStatus.FINISHED)
      vapi.stop()
      
      // Clean up audio stream
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop())
        setAudioStream(null)
      }
      
      await addHistory({ tutorId: id, user })
    } catch (error) {
      console.error('Error disconnecting:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black">
        <Loader styleName='w-14 h-14'/>
      </div>
    )
  }

  return (
    <section className='flex flex-col'>
      <Header title="Companion Tutor"/>
      
      {/* Microphone Access Warning */}
      {!microphoneAccess && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>Microphone access is required for this feature. Please allow microphone permissions in your browser.</p>
        </div>
      )}

      <div className='flex flex-col gap-4 bg-dark-200 py-5 sm:pt-4 rounded-t-xl max-md:mt-5'>
        <div className='md:flex justify-between items-center w-full gap-2 backdrop-blur-lg max-md:flex-col'>

          {/* AI Avatar Section */}
          <div className='bg-[#1F2225] h-[36rem] w-[50%] rounded-xl flex items-center justify-center max-md:w-full relative'>
            <div className={cn(
              'bg-[#9E4B9E] rounded-full p-1',
              callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0',
              callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
            )}>
              <div className='rounded-full bg-dark-200 h-30 w-30 flex items-center justify-center relative'>
                <Image 
                  src="/assets/images/ai-avatar.png" 
                  width={80} 
                  height={80} 
                  alt='ai-avatar' 
                  className='rounded-full object-contain'
                />
                {isSpeaking && (
                  <div className='flex items-center justify-center rounded-full cursor-pointer bg-[#9E4B9E] hover:rounded-full p-2 shrink-0 absolute -bottom-3 right-0'>
                    <Image 
                      src='/assets/icons/white-mic.png' 
                      width={20} 
                      height={20} 
                      alt='white-mic' 
                      className="size-6"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className='absolute top-4 flex gap-2 text-white left-4 w-fit h-8 bg-black/40 backdrop-blur-2xl items-center p-2 justify-center rounded-full'>
              <Image 
                src="/assets/icons/mic.png" 
                width={20} 
                height={20} 
                alt="mic" 
                className='size-6'
              />
              <p className="font-sans font-semibold text-sm text-light-100">{name}</p>
            </div>
          </div>

          {/* User Avatar Section */}
          <div className='bg-[#1F2225] h-[36rem] w-[50%] rounded-xl items-center justify-center relative md:flex hidden'>
            <div className='bg-[#B391F0] rounded-full p-1'>
              <div className='rounded-full bg-dark-200 h-30 w-30 flex items-center justify-center relative'>
                <Image 
                  src={profilePics?.cloudinaryUrl || '/assets/images/empty.png'} 
                  width={80} 
                  height={80} 
                  alt='user-avatar' 
                  className='rounded-full object-contain'
                />
                {/* Show microphone status for user */}
                <div className={cn(
                  'flex items-center justify-center rounded-full cursor-pointer p-2 shrink-0 absolute -bottom-3 right-0',
                  isMuted ? 'bg-gray-500' : 'bg-[#B391F0]'
                )}>
                  <Image 
                    src={isMuted ? '/assets/icons/mic-off.png' : '/assets/icons/white-mic.png'} 
                    width={20} 
                    height={20} 
                    alt='mic-status' 
                    className="size-6"
                  />
                </div>
              </div>
            </div>

            <div className='absolute top-4 flex gap-2 text-white left-4 w-fit h-8 bg-black/40 backdrop-blur-2xl items-center p-2 justify-center rounded-full'>
              <Image 
                src="/assets/icons/user.png" 
                width={20} 
                height={20} 
                alt="user" 
                className='size-6'
              />
              <p className="font-sans font-semibold text-sm text-light-100">{userId?.username}</p>
            </div>

            <div className='absolute top-4 flex gap-2 text-white right-4 w-fit h-8 bg-black/40 backdrop-blur-2xl items-center p-2 justify-center rounded-full'>
              <Image 
                src="/assets/icons/clock.png" 
                width={20} 
                height={20} 
                alt="clock" 
                className='size-6'
              />
              <p className="font-sans font-semibold text-sm text-light-100">{duration}min</p>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className='w-full h-24 rounded-xl bg-[#1F2225] flex items-center justify-center'>
          <div className='flex gap-4 items-center'>
            <button 
              className={cn(
                'flex items-center justify-center rounded-full cursor-pointer p-2 shrink-0',
                isMuted ? 'bg-destructive-100' : 'bg-success-100'
              )} 
              onClick={toggleMicrophone} 
              disabled={callStatus !== CallStatus.ACTIVE || !microphoneAccess}
            >
              <Image 
                src={isMuted ? '/assets/icons/mic-off.png' : '/assets/icons/mic.png'} 
                width={20} 
                height={20} 
                alt='mic-toggle' 
                className="size-6"
              />
            </button>

            <button 
              className={cn(
                'flex items-center justify-center rounded-full cursor-pointer p-2 shrink-0',
                callStatus === CallStatus.ACTIVE ? 'bg-destructive-100' : 'bg-[#B391F0]',
                callStatus === CallStatus.CONNECTING && 'animate-pulse'
              )} 
              onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
              // disabled={callStatus === CallStatus.CONNECTING || !microphoneAccess}
            >
              <Image 
                src={callStatus === CallStatus.ACTIVE ? '/assets/icons/end.png' : '/assets/icons/call.png'} 
                width={20} 
                height={20} 
                alt='call-control' 
                className="size-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Section */}
      {messages.length > 0 && (
        <section className="bg-dark-200/40 w-full h-fit rounded-b-xl flex flex-col justify-center items-center break-all p-4">
          {messages.map((message, index) => (
            <div key={index} className="w-full mb-2">
              {message.role === 'assistant' ? (
                <p className="max-sm:text-sm text-light-100">
                  <strong>{name?.split(' ')[0]?.replace(/[.,]/g, '')}:</strong> {message.content}
                </p>
              ) : (
                <p className="max-sm:text-sm text-light-100 text-right">
                  <strong>You:</strong> {message.content}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </section>
  )
}

export default TutorDetail

