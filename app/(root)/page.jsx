"use client"
import Button from "@/component/shared/Button"
import Category from "@/component/shared/Category"
import {useGetTutorHistoryQuery, useGetQuizHistoryQuery, useGetTutorStatsQuery, useGetQuizStatsQuery} from "@/features/history/historyApiSlice"
import Header from "@/component/shared/Header"
import {data2, LineChartData} from "@/constants"
import Image from "next/image"
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import StatCard from "@/component/shared/StatCard"
// import CustomSelect from "@/component/shared/CustomSelect"
import { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import {Bar, Line} from 'react-chartjs-2'
import {Chart, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement} from 'chart.js'
import Loader from "@/component/shared/Loader"

Chart.register(
 LinearScale,
 CategoryScale,
 BarElement,
 LineElement,
 PointElement,
 Title,
  Tooltip, 
  Legend 
)

 const Dashboard = () => {
  
   const {id: user, username} = useAuth()
   

   const [date, setDate] = useState(
     new Date()
   )

  const {data: tutorStats, isLoading: isTutorStatLoading} = useGetTutorStatsQuery({userId: user})
  const {data: quizStats, isLoading: isQuizStatLoading} = useGetQuizStatsQuery({userId: user})

  console.log({tutorStats})

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      }
    }
  }

  const BarChartData = {
    labels: tutorStats ? tutorStats?.map(stat => stat.subject) : {},
     datasets: [
       {
        label: "Your Tutor monthly progress",
        data: tutorStats ? tutorStats?.map(stat => stat.count) : {},
        borderColor: "#B391F0",
        backgroundColor: ["rbga(255, 99, 132, 0.2)"],
        borderWidth: 1
     },
    ],
  }

  const LineChartData = {
    labels: quizStats ? quizStats?.map(stat => stat.subject) : {},
     datasets: [
       {
        label: "Your Quiz monthly progress",
        data: quizStats ? quizStats?.map(stat => stat.count) : {},
        borderColor: "#B391F0",
        backgroundColor: ["rbga(255, 99, 132, 0.2)"],
        borderWidth: 1
     },
    ],
  }

  const [filter, setFilter] = useState('')

    const statCard = {
       totalTutor: 12450,
       totalTutorLessonTaken: {
       currentMonth: 40, lastMonth: 17
      },
       totalQuiz: 3210,
       totalQuizTaken: {
       currentMonth: 15, lastMonth: 20
       },
       totalQuizTakenToday: 200,
       totalTutorLessonTakenToday: 200
    }

    const {totalTutor, totalTutorLessonTaken, totalTutorLessonTakenToday, totalQuiz, totalQuizTaken, totalQuizTakenToday} = statCard


    const {data: userTutorHistory, isLoading: isLoadingTutorHistory} = useGetTutorHistoryQuery(user)
    const {data: userQuizHistory, isLoading: isLoadingQuizHistory} = useGetQuizHistoryQuery(user)

     if(isLoadingQuizHistory || isTutorStatLoading || isQuizStatLoading || isLoadingTutorHistory) {
       return ( 
        <div className="fixed inset-0 z-50 flex justify-center items-cente bg-black">
                           <Loader styleName="w-14 h-14"/>
                        </div>
      )
      }


        const {ids: historyTutorIds, entities: historyTutorEntities} = userTutorHistory?.tutors || { }
        const {ids: historyQuizIds, entities: historyQuizsEntities} = userQuizHistory?.quizes || {}

        const {currentMonthQuizzes, lastMonthQuizzes, quizCount} = userQuizHistory?.quizsStats || {}
        const {currentMonthLessons, tutorCount, lastMonthLessons, currentDayLesson} = userTutorHistory?.tutorStats || {}

         console.log({userTutorHistory})
         
        const stats = [
          {
            userId: {
               username: 'Duru Pristine'
            },
           quizId: {
            name:'Andrian Ai',
            topic: 'socket.io client',
            subject: 'Mathematic',
            _id: 'hhdshcvaawujb',
            duration: 10
           },
          },
          {
            userId: {
               username: 'Duru Pristine'
            },
           quizId: {
            userId: {
               username: 'Duru Pristine'
            },
             name:'Andrian Ai',
            topic: 'socket.io client',
            subject: 'Mathematic',
            _id: 'hhdshcvaawujb',
            duration: 10
           },
          },
          {
            userId: {
               username: 'Duru Pristine'
            },
           quizId: {
            userId: {
               username: 'Duru Pristine'
            },
             name:'Andrian Ai',
            topic: 'socket.io client',
            subject: 'Mathematic',
            _id: 'hhdshcvaawujbs',
            duration: 10
           },
          },
          {
            userId: {
               username: 'Duru Pristine'
            },
           quizId: {
            userId: {
               username: 'Duru Pristine'
            },
             name:'Andrian Ai',
            topic: 'socket.io client',
            subject: 'Mathematic',
            _id: 'hhdshcvaawujbw',
            duration: 10
           },
          }
         ]



         const fakeStats = [
          {
            userId: {
               username: 'Duru Pristine'
            },
           tutorId: {
            name:'Andrian Ai',
            topic: 'socket.io client',
            subject: 'Mathematic',
            _id: 'hhdshcvaawujb',
            duration: 10
           },
          },
          {
            userId: {
               username: 'Duru Pristine'
            },
           tutorId: {
            userId: {
               username: 'Duru Pristine'
            },
             name:'Andrian Ai',
            topic: 'socket.io client',
            subject: 'Mathematic',
            _id: 'hhdshcvaawujb',
            duration: 10
           },
          },
          {
            userId: {
               username: 'Duru Pristine'
            },
           tutorId: {
            userId: {
               username: 'Duru Pristine'
            },
             name:'Andrian Ai',
            topic: 'socket.io client',
            subject: 'Mathematic',
            _id: 'hhdshcvaawujbs',
            duration: 10
           },
          },
          {
            userId: {
               username: 'Duru Pristine'
            },
           tutorId: {
            userId: {
               username: 'Duru Pristine'
            },
             name:'Andrian Ai',
            topic: 'socket.io client',
            subject: 'Mathematic',
            _id: 'hhdshcvaawujbw',
            duration: 10
           },
          }
         ]




  return (
    <section className="flex flex-col"> 
        <Header title="Dashboard"/>
        <p className="text-[#FAFAFA] text-2xl font-medium leading-10 sm:pt-1 pt-5  selection:bg-[#B391F0]">Welcome, <span className="text-light-100">{username}</span></p>
        <p className="text-light-100 font-sans selection:bg-[#B391F0] max-sm:text-sm">Here's is a brief summary of your progress and<br/> quizes and lesson taken.</p>

         <div className="w-full bg-[#1F2225] my-10 rounded-2xl flex items-cente p-8 justify-between max-lg:flex-col gap-20 ">
            <div className="flex flex-col gap-4">
                <h2 className="text-white  text-[min(10vw,40px)] selection:bg-[#B391F0]">Enhance Your Critical Thinking!</h2>
                 <p className="text-gray-300 max-w-md leading-8 selection:bg-[#B391F0]">Improve your ability to analyze solutions, evaluate information and make logical decisions, Strengthen this essential skill for better problem-solving decision making in everyday life</p>
                  <Button color='#B391F0' otherStyle='max-sm:w-full' title="Start Improving" links="/training"/>
            </div>
                 <div className="flex gap-5 max-xl:hidden">
                 <Image src='/images/robot.png' alt="robotnic" width={280} height={280} />
                 </div>
           </div>
          
             <div className="flex flex-col">
               <div className="w-full flex">
               <p className="text-[#FAFAFA] text-2xl font-medium leading-16  selection:bg-[#B391F0]">My Skills & Values</p>
               </div>
                   
            <div className="gap-5 grid xl:gap-3 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                 <StatCard 
                   statTitle='Total Lesson taken'
                   total={tutorCount}
                   currentMonthCount={currentMonthLessons}
                   lastMonthCount={lastMonthLessons}
                 />
                 <StatCard 
                   statTitle='Total Quiz taken'
                   total={quizCount}
                   currentMonthCount={currentMonthQuizzes}
                   lastMonthCount={lastMonthQuizzes}
                 />
                 <StatCard 
                   statTitle='Today Quiz taken'
                   total={currentDayLesson}
                   currentMonthCount={totalQuizTaken.currentMonth}
                   lastMonthCount={totalQuizTaken.lastMonth}
                 />
             </div>
             </div>

             <div className="flex flex-col mt-5">
             <div className="w-full flex justify-between items-center">
                    <p className="underline text-[#FAFAFA] text-lg outline-b-4 cursor-pointer leading-10  selection:bg-[#B391F0]">Recently Taken Lesson</p>
                 <p className="underline text-[#FAFAFA] text-lg outline-b-4 cursor-pointer leading-10  selection:bg-[#B391F0]">Recently Taken Quizes</p>
               </div>
                    
               <div className="grid grid-cols-2 gap-5 max-xl:grid-cols-1">
                        <div className="flex flex-col gap-5">

                      {/* Todo here ... */}
                        
                        {historyTutorIds?.length > 0 ? historyTutorIds?.slice(0, 3)?.map((id) => {
                          const history = historyTutorEntities[id]
                           return (
                             <div className="bg-[#1F2225] rounded-r-2xl p-5 border-l-4 border-l-[#9E4B9E] xl:h-[17.2rem] selection:bg-[#B391F0]" key={history?._id}>
                     <div className="flex justify-between items-center">

                           <div className='flex gap-4 items-start'>
                                             <div className='bg-black/10 w-16 h-16 rounded-full'>
                                                      <Image src="/images/user2.jpg" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                                </div>
                                                     <div className='flex flex-col leading-0 gap-2 mt-1'>
                                                       <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>{history?.userId.username}</p>
                                                      <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>pro</p>
                                                     </div>
                                              </div>

                          <Image src='/icons/book.png' width={24} height={24} alt="book" className="justify-end"/>
                         </div>
                         <div className="flex flex-col">
                          <h2 className="text-[#FAFAFA] mt-3 text-xl font-semibold leading-8 text-light-100">Learn {history.tutorId.subject}<br/>  With {history.tutorId.name}</h2>
                           <p className="text-gray-300 max-w-md text-sm leading-6"><span className="text-[#B391F0] text-lg semibold">Topic: </span>{history.tutorId.topic}</p>
                         </div>
                         <div className="w-full flex justify-between mt-5 items-end">
                         <Button title="Start" color='#B391F0' links={`/training/${history.tutorId._id}`} />
                          <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#696060]">
                                                           <p className="text-[#FAFAFA]">{history.tutorId.duration}min</p>
                                                          </div>
                         </div>
                     </div> 
                    
                          )
                        }) : (
                                              <div className="w-full  rounded-2xl flex gap-2 items-center p-4 h-[60vh] flex items-center justify-center bg-[#1F2225]">
                                                  <div className="w-full h-52 rounded-2xl flex flex-col items-center justify-center">
                                                     <h2 className="text-3xl text-white font-semibold font-serif">Notification Not Found!</h2>
                                                       <p className="text-gray-300 max-w-md leading-6 text-center mb-5 font-serif ">No notification or reminder for you today seems you have a clean slate!</p>
                                                            <Image src='/icons/notification.png' width={50} height={50} alt="notification/icon"/>
                                                  </div>
                                     </div> )}
                     
                   
                      {/* End Todo here */}

 
                 </div>

                      <div className="flex flex-col xl:gap-2 gap-5">

                      {/* Todo here ... */}
                       <Calendar
                    mode="single"
                    defaultMonth={date}
                    numberOfMonths={2}
                    selected={date}
                    onSelect={setDate}
                    className="rounded-xl border-ring focus-visible:ring-ring/50 shadow-xl bg-black/50 text-white outline-none border-[2px] border-[#1F2225] font-bold font-sans w-full xl:h-[18.5rem] overflow-y-hidden"
                  />
                        
                        {historyQuizIds?.length > 0 ? historyQuizIds?.slice(0, 2)?.map((id) => {
                          const history = historyQuizsEntities[id]
                           return (
                             <div className="bg-[#1F2225] rounded-r-2xl p-5 border-l-4 border-l-[#9E4B9E] xl:h-[17.3rem] selection:bg-[#B391F0]" key={history?._id}>
                     <div className="flex justify-between items-center">

                           <div className='flex gap-4 items-start'>
                                             <div className='bg-black/10 w-16 h-16 rounded-full'>
                                                      <Image src="/images/user2.jpg" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                                </div>
                                                     <div className='flex flex-col leading-0 gap-2 mt-1'>
                                                       <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>{history.userId.username}</p>
                                                      <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>pro</p>
                                                     </div>
                                              </div>

                          <Image src='/icons/book.png' width={24} height={24} alt="book" className="justify-end"/>
                         </div>
                         <div className="flex flex-col">
                          <h2 className="text-[#FAFAFA] mt-3 text-xl font-semibold leading-8 text-light-100">{history.quizId.subject} Quiz <br/> With {history.quizId.name}</h2>
                           <p className="text-gray-300 max-w-md text-sm leading-6"><span className="text-[#B391F0] text-lg semibold">Topic: </span>{history.quizId.topic}</p>
                         </div>
                         <div className="w-full flex justify-between mt-5 items-end">
                         <Button title="Start" color='#B391F0' links={`/quiz/${history.quizId._id}`}/>
                          <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#696060]  ">
                              <p className="text-[#FAFAFA]">{history.quizId.duration}min</p>
                          </div>
                         </div>
                     </div> 
                    
                          )
                        }) : (
                                              <div className="w-full  rounded-2xl flex gap-2 items-center p-4 h-[27vh] flex items-center justify-center bg-[#1F2225]">
                                                  <div className="w-full h-52 rounded-2xl flex flex-col items-center justify-center">
                                                     <h2 className="text-3xl text-white font-semibold font-serif">Notification Not Found!</h2>
                                                       <p className="text-gray-300 max-w-md leading-6 text-center mb-5 font-serif ">No notification or reminder for you today seems you have a clean slate!</p>
                                                            <Image src='/icons/notification.png' width={50} height={50} alt="notification/icon"/>
                                                  </div>
                                     </div> )}
                 </div>
                </div>
             </div>

             <div className="flex flex-col mt-5">
             </div>
               <div className="mt-10 rounded-md text-white flex flex-col gap-5" >
                  <p className=" text-[min(10vw,40px)] selection:bg-[#B391F0] font-semibold text-[#B391F0]">Graph of your Lesson Taken.</p>
                 <div className="bg-[#1F2225] rounded-md xl:h-[35rem]">
               {/* <Bar options={options} data={BarChartData} /> */}
               </div>
                <p className=" text-[min(10vw,40px)] selection:bg-[#B391F0] font-semibold text-[#B391F0]">Graph of your Quizzes Taken.</p>
               <div className="bg-[#1F2225] rounded-md cursor-pointer xl:h-[35rem]">
               {/* <Line options={options} data={LineChartData} /> */}
               </div>
               </div>
                  
              <div className="h-[1rem]"/>
            </section>
  )
}

export default Dashboard