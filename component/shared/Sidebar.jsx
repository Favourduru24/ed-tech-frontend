"use client"
import { navLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname()

  return (
    <aside className='hidden h-screen w-72  p-4 shadow-md shadow-purple-200/50 lg:flex'>
        <div className='flex size-full flex-col gap-4'>
           <h3 className='text-white py-1 pl-2 font-semibold text-2xl'>Ed- Tech</h3>
           <nav className='h-full flex-col justify-between md:flex md:gap-4 bg-[#1F2225] p-2 rounded-md'>
              <ul className='hidden w-full flex-col items-start gap-2 md:flex'>
                  {navLinks?.slice(0, 3).map((link) => {
                     const isActive = link.route === pathname 
                      return (
                        <li key={link.route} className={`hidden w-full flex-col items-start gap-2 md:flex group ${isActive ? 'bg-[#B391F0] rounded-lg font-bold' : 'text-[#FAFAFA] items-center'} `}>
                           <Link className='p-16-semibold flex w-full gap-4 p-4 items-center' href={link.route}>
                               <Image className={`${isActive && 'brightness-200'}`} src={link.icon} height={24} width={24} alt='logo'/>
                               {link.label}
                           </Link> 
                        </li>
                      )
                  })}
              </ul>

               <ul className='flex justify-center items-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all flex-col'> 
                  <li>
                      <div className='w-32 h-32 '>

                      </div>
                  </li>
               {navLinks?.slice(3).map((link) => {
                     const isActive = link.route === pathname 
                      return (
                        <li key={link.route} className={`hidden w-full flex-col items-start gap-2 md:flex group ${isActive ? 'bg-[#B391F0] rounded-lg font-bold' : 'text-[#FAFAFA] items-center'} `}>
                           <Link className='p-16-semibold flex w-full gap-4 p-4 items-center' href={link.route}>
                               <Image className={`${isActive && 'brightness-200'}`} src={link.icon} height={24} width={24} alt='logo'/>
                               {link.label}
                           </Link> 
                        </li>
                      )
                  })}
               </ul>
           </nav>
        </div>
    </aside>
  )
}

export default Sidebar