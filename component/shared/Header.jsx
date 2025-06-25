 "use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navLinks } from '@/constants';

const Header = ({title}) => {

      
      const pathname = usePathname()

   return (
    <div className='sm:h-16 h-8 w-full flex items-center justify-between py-10 sm:py-10'>
         <div>
         <p className='text-light-100 text-2xl capitalize font-semibold whitespace-nowrap'>{title}</p>
         </div>

          <div className='flex sm:gap-4 items-center gap-2 justify-between'>
          <div className='flex gap-2 items-center bg-[#1F2225] p-2 rounded-full backdrop-blur-xl cursor-pointer hover:bg-black/70  max-sm:hidden'>
              <Image src='/assets/icons/training.png' width={20} height={20} alt='star' className='cursor-pointer shrink-0 whitespace-nowrap sm:size-6 max-sm:size-4'/>
               <p className='text-[#FAFAFA] text-sm'>420</p>
          </div>
              
          
            <div className='flex gap-2 items-center rounded-full backdrop-blur-xl cursor-pointer relative hover:bg-[#1F2225] hover:rounded-full p-2'>
              <Image src='/assets/icons/notify.png' width={24} height={24} alt='notification' className='cursor-pointer shrink-0 whitespace-nowrap sm:size-5 max-sm:size-4'/>
                <div className='bg-[#B391F0] h-5 w-5 items-center justify-center rounded-full absolute -top-1 -right-2 flex'>
                <p className='text-[#FAFAFA] text-sm '>2</p>
                </div>
          </div>
          <Link href='/training/create'>
              <div className='flex gap-2 items-center bg-[#9E4B9E] sm:px-4 py-1 sm:py-2 px-1 rounded-full cursor-pointer'>
              <Image src='/assets/icons/new.png' width={20} height={20} alt='star' className='cursor-pointer shrink-0 whitespace-nowrap sm:size-6 max-sm:size-5'/>
               <p className='text-[#FAFAFA] text-sm font-semibold hidden sm:flex'>Create</p>
          </div>
              </Link>

            <div className='text-white hover:bg-[#1F2225] p-[0.5px] lg:hidden flex'>
               <Sheet>
  <SheetTrigger>
     <Image src='/assets/icons/menu.png' width={32} height={32} alt='menu' className='cursor-pointer shrink-0 whitespace-nowrap sm:size-6 max-sm:size-5'/>
  </SheetTrigger>
  <SheetContent className="focus:ring-0 focus-visible:ring-transparent focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-none sm:w-64 bg-[#1F2225] w-72">
     <h3 className='text-light-100 py-1 pl-2 font-semibold text-2xl'>Ed- Tech</h3>
      <nav className='flex h-full flex-col justify-between md:flex md:gap-4 bg-[#1F2225] p-2 rounded-md'>

              <ul className='w-full flex-col items-start gap-2 md:flex'>
                  {navLinks?.slice(0, 3).map((link) => {
                     const isActive = link.route === pathname 
                      return (
                        <li key={link.route} className={`w-full flex-col items-start gap-2 md:flex group ${isActive ? 'bg-[#B391F0] rounded-lg font-bold' : 'text-[#FAFAFA] items-center'} `}>
                           <Link className='p-16-semibold flex w-full gap-4 p-4 items-center' href={link.route}>
                               <Image className={`${isActive && 'brightness-200'}`} src={link.icon} height={24} width={24} alt='logo'/>
                               {link.label}
                           </Link> 
                        </li>
                      )
                  })}
              </ul>

               <ul className='flex justify-center items-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all flex-col'> 
               {navLinks?.slice(3).map((link) => {
                     const isActive = link.route === pathname 
                      return (
                        <li key={link.route} className={`w-full flex-col items-start gap-2 md:flex group ${isActive ? 'bg-[#B391F0] rounded-lg font-bold' : 'text-[#FAFAFA] items-center'} `}>
                           <Link className='p-16-semibold flex w-full gap-4 p-4 items-center' href={link.route}>
                               <Image className={`${isActive && 'brightness-200'}`} src={link.icon} height={24} width={24} alt='logo'/>
                               {link.label}
                           </Link> 
                        </li>
                      )
                  })}
               </ul>

           </nav>
  </SheetContent>
</Sheet> 
          </div>
          </div>
    </div>
  )
}

export default Header