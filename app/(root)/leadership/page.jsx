"use client"
import CustomSelect from '@/component/shared/CustomSelect'
import React from 'react'
import { useState } from 'react'

const Leadership = () => {

const [selectedTopic, setSelectedTopic] = useState('All')

const topics = [
  { value: 'All', label: 'All Topics' },
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Programming', label: 'Programming' }
]

  return (
    <CustomSelect
    options={topics}
    value={selectedTopic}
    onChange={setSelectedTopic}
    placeholder="Select a topic"
    className="w-64"
  />
  )
}

export default Leadership

  


