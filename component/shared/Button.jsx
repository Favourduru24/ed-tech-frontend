import Link from 'next/link'
const Button = ({color, otherStyle, title, links}) => {
  return (
    <button className={`${otherStyle} 'text-black rounded-full p-2  cursor-pointer sm:w-40 w-[8rem] border-2'`} style={{backgroundColor: color, width: otherStyle}}>
       <Link href={links} className='font-semibold max-sm:text-sm selection:bg-[#B391F0]'>
        {title}
       </Link>
    </button>
  )
}

export default Button