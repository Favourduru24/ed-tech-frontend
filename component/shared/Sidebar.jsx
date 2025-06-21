"use client"
import { navLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const pathname = usePathname()

  return (
    <aside className='hidden h-screen w-72 p-2 shadow-md shadow-purple-200/50 lg:flex relative'>
        <div className='flex size-full flex-col '>
                     <div className="flex flex-col m-[5px]">
                        <div className='w-full h-10 flex gap-2 items-end'>
                        <Image src='/assets/images/ed-tech-logo3.png' alt='ed-tech-logo' width={200} height={200} className='object-cover brightness-100 size-10'/>
                        <p className="font-semibold font-sans text-3xl text-light-100 ">Ed-Tech</p>
                         </div>
                           </div>

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