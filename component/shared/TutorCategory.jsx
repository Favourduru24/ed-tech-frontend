 "use client"
import { useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { formUrlQuery, removeKeysFromQuery } from "@/libs/utils"
import CustomSelect from "./Select"


const TutorCategory = ({buttons}) => {

    
    const [items, setItems] = useState(buttons[0])
    const [subject, setSubject] = useState('')
    const [duration, setDuration] = useState('')
    const [level, setLevel] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()


    const Duration = [
      { value: '10', label: '10 minute' },
      { value: '20', label: '20 minute' },
      {  value: '30', label: '30 minute' },
      { value: '40', label: '40 minute' },
      { value: '50', label: '50 minute' },
      { value: '60', label: '60 minute' }
  ]

   const data2 = [
      {
       value: 'Mathematics',
       label: 'Mathematics'
        },
      {
       value: 'Chemistry',
       label: 'Chemistry'
        },
       {
       value: 'Physic',
       label: 'Physic'
        },
       {
       value: 'Coding',
       label: 'Coding'
        },
       {
       value: 'Biology',
       label: 'Biology'
        },
       {
       value: 'Economics',
       label: 'Economics'
        },
        {
       value: 'English',
       label: 'English'
        },
        {
       value: 'History',
       label: 'History'
        },
        {
       value: 'Art',
       label: 'Art'
        }
     ]

    const data5 = [
           {
            value: 'Beginner',
            label: 'Beginner'
             },
            {
            value: 'Intermediate',
            label: 'Intermediate'
             },
            {
            value: 'Advance',
            label: 'Advance'
             },
            {
            value: 'Under Graduate',
            label: 'Under Graduate'
             },
            {
            value: 'Post Graduate',
            label: 'Post Graduate'
             },
            {
            value: 'Graduate',
            label: 'Graduate'
             },
            {
            value: 'Master',
            label: 'Master'
             },
            {
            value: 'SS1',
            label: 'SS1'
             },
            {
            value: 'SS2',
            label: 'SS2'
             },
            {
            value: 'SS3',
            label: 'SS3'
             },
          ]

 

const onSelectSubject = (subject) => {
  let newUrl = ''
 if(subject && subject !== 'Select Subject') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key:'subject',
        value: subject
     })
 } else{
  newUrl = removeKeysFromQuery({
    params: searchParams.toString(),
    keysToRemove:['subject'],
 })
 }

   router.push(newUrl, {scroll: false})
}

const onSelectDuration = (duration) => {
  let newUrl = ''
 if(duration && duration !== 'Select Level') { //selectedDate && selectedDate !== 'Date Added'
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key:'duration',
        value: duration
     })
 } else{
  newUrl = removeKeysFromQuery({
    params: searchParams.toString(),
    keysToRemove:['duration'],
 })
 }

   router.push(newUrl, {scroll: false})
}

const onSelectLevel = (level) => {
  let newUrl = ''
 if(level && level !== 'Select Level') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key:'level',
        value: level
     })
 } else{
  newUrl = removeKeysFromQuery({
    params: searchParams.toString(),
    keysToRemove:['level'],
 })
 }

   router.push(newUrl, {scroll: false})
}
     

  return (
     <div className="gap-2 flex h-full rounded-full max-sm:flex-col w-full ">
    {buttons.map((id) => (
      <div className="" onClick={() => setItems(id)} key={id}>
      <div className="font-semibold text-light-100 w-full">{id === 'Category' ? 
         (
         <div className="w-full"> 
         <CustomSelect
                          options={[
                            { value: '', label: 'Select Subject' },
                            ...data2
                          ]}
                          value={subject}
                          onChange={(value) => {
                            setSubject(value)
                            onSelectSubject(value)
                          }}
                          placeholder="Select Subject"
                          className="h-full bg-transparent min-w-[12rem]"
                        />
         </div>
      ) : id === 'Level' && pathname === '/quiz' ? 
      (
        <div className=""> 
        <CustomSelect
                          options={[
                            { value: '', label: 'Select Level' },
                            ...data5
                          ]}
                          value={level}
                          onChange={(value) => {
                            setLevel(value)
                            onSelectLevel(value)
                          }}
                          placeholder="Select Level"
                          className="h-full bg-transparent w-full min-w-[12rem]"
                        />
        </div>
     ) :
       pathname === '/training' && id === 'Date +' ? 
        (
        <div className=""> 
         <CustomSelect
                          options={[
                            { value: '', label: 'Select Duration' },
                            ...Duration
                          ]}
                          value={duration}
                          onChange={(value) => {
                            setDuration(value)
                            onSelectDuration(value)
                          }}
                          placeholder="Select Duration"
                          className="h-full bg-transparen min-w-[12rem] w-full"
                        />
        </div>
     ) : 
    id }</div>
    </div>
    ))}
    </div>
  )
}

export default TutorCategory