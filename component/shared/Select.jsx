"use client"
import { useState, useEffect, useRef } from "react"

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (value, label) => {
    setSelectedValue(label)
    onChange(value)
    setIsOpen(false)
  }

  return (
    <div 
      ref={dropdownRef}
      className={`relative ${className} w-full`}
    >
      <button
        type="button"
        className={`w-full flex items-center justify-between p-2 rounded-xl cursor-pointer 
         text-light-100 font-semibold text-lg font-sans border border-[#4B4D4F]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {selectedValue || placeholder}
        </span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-[#1F2225] border border-[#4B4D4F] rounded-lg shadow-lg max-h-[40rem] overflow-hidden">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-[#9E4B9E] font-semibold font-sans text-light-100 ${
                selectedValue === option.label ? "bg-[#9E4B9E]" : ""
              }`}
              onClick={() => handleSelect(option.value, option.label)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomSelect
