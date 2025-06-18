"use client"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useGetCategoryQuery } from "@/features/category/categoryApiSlice"
import { formUrlQuery, removeKeysFromQuery } from "@/libs/utils"
import CustomSelect from "./Select"

const Category = ({ buttons }) => {
  const { data, isLoading } = useGetCategoryQuery()
  const { ids, entities } = data || {}
  const [items, setItems] = useState(buttons[0])
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  if (isLoading) {
    return (
      <div className="h-full w-full rounded-xl outline-none cursor-pointer font-semibold text-lg font-sans border-0 gap-2 p-1">
        Loading...
      </div>
    )
  }

  const DateOptions = [
    { value: '1hr', label: '1 hour' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: '1week', label: '1 Week' }
  ]

  const categoryOptions = ids 
    ? ids.map(id => ({
        value: entities[id].name,
        label: entities[id].name
      }))
    : []

  const onSelectCategory = (selectedCategory) => {
    let newUrl = ''
    if (selectedCategory && selectedCategory !== 'Select Category') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: selectedCategory
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category'],
      })
    }
    router.push(newUrl, { scroll: false })
  }

  const onSelectDate = (selectedDate) => {
    let newUrl = ''
    if (selectedDate && selectedDate !== 'Date Added') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'date',
        value: selectedDate
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['date'],
      })
    }
    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="flex gap-4 h-full rounded-full sm:items-cente justify-cente max-sm:flex-col w-full">
      {buttons.map((id) => (
        <div 
          key={id}
          className="" 
            onClick={() => setItems(id)}
        >
          <div className="font-semibold text-light-100 flex gap-5 w-full ">
            {id === 'Category' ? (

              <div className="w-full">
                <CustomSelect
                  options={[
                    { value: '', label: 'Select Category' },
                    ...categoryOptions
                  ]}
                  value={category}
                  onChange={(value) => {
                    setCategory(value)
                    onSelectCategory(value)
                  }}
                  placeholder="Select Category"
                  className="h-full bg-transparent min-w-[10rem]"
                />
              </div>
            ) : id === 'Date +' ? (

              <div className="w-full">
                <CustomSelect
                  options={[
                    { value: '', label: 'Date Added' },
                    ...DateOptions
                  ]}
                  value={date}
                  onChange={(value) => {
                    setDate(value)
                    onSelectDate(value)
                  }}
                  placeholder="Date Added"
                  className="h-full bg-transparent min-w-[10rem]"
                />
              </div>
            ) : id}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Category
