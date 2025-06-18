import { calculateTrendPercentage, cn } from "@/libs/utils"
import Image from "next/image"

     const StatCard = ({statTitle, total, currentMonthCount, lastMonthCount}) => {

           const {trend, percentage} = calculateTrendPercentage(currentMonthCount, lastMonthCount)

            const isDecrement = trend === 'decrement'

                 return (
                        <div className="bg-[#1F2225] h-40 border-[1.9px] border-[#4B4D4F] rounded-xl p-2 justify-cente gap-3 selection:bg-[#B391F0]">
                         <div className="flex flex-col gap-4">
                           <p className="font-semibold text-[1.5rem] font-sans text-white">{statTitle}</p>
                            <div className="flex items-center justify-between w-full">
    
                            <div className="flex flex-col gap-2 items-center">
                               <p className="text-3xl font-semibold text-light-100">{total}</p>
    
                               <div className="flex gap-1 items-center">
                                <Image src={`/assets/icons/${isDecrement ? 'arrow-down-red.svg' : 'arrow-up-green.svg' }`} width={100} height={150} alt="graph" className="size-5"/>
                               <p className={cn('text-sm font-semibold font-san', isDecrement ? 'text-destructive-100' : 'text-green-400')}>{Math.round(percentage)}%<span className="text-light-100"> vs last month</span></p>
                              </div>
    
                             </div>
    
                              <div className="flex  gap-2">
                              <Image src={`/assets/images/${isDecrement ? 'decrement.svg' : 'increment.svg'}`} width={150} height={150} alt="graph"/>
                              </div>
                         </div>
                          
                          </div>
                          </div>
                
               )
          }

export default StatCard