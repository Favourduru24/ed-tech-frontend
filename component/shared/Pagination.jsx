'use client'

import { formUrlQuery } from "@/libs/utils"
import { useRouter, useSearchParams } from "next/navigation"

const Pagination = ({page, totalPages, urlParamName}) => {

    const router = useRouter()
    const searchParams = useSearchParams()
     
     const onClick = (btnTypes) => {
     
        const pageValue = btnTypes === 'next' ? Number(page) + 1 : Number(page) - 1

        const newUrl = formUrlQuery({
             params: searchParams?.toString(),
             key: urlParamName || 'page',
             value: pageValue?.toString()
        })

        router.push(newUrl, {scroll: false})
     }

  return (
    <div className="flex gap-2">
        <button size="lg" variant="outline" className="w-28 bg-dark-200 border-[1.0px] border-[#4B4D4F] text-white h-10 rounded-sm" 
           onClick={() => onClick('prev')}
            disabled={Number(page) <= 1}
          >
              Prevous
          </button>

          <button size="lg" variant="outline" className="w-28 bg-dark-200 border-[1.0px] border-[#4B4D4F] text-white h-10 rounded-sm" 
           onClick={() => onClick('next')}
            disabled={Number(page) >= totalPages} 
          >
              Next
          </button>
    </div>
  )
}

export default Pagination