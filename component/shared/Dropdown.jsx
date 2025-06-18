"use client"

import { useGetCategoryQuery } from "@/features/category/categoryApiSlice";

const SelectDropdown = ({ category, setCategory }) => {
  const { data, isLoading, isError } = useGetCategoryQuery();
  const { ids = [], entities = {} } = data || {};

  const onChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="w-[90%]">
        <select
          disabled
          className="h-15 bg-[#1F2225] w-full border-[1.0px] border-[#4B4D4F] rounded-xl text-gray-500
          focus:outline-none focus:ring-2 focus:ring-dark-100 cursor-pointer font-semibold text-sm font-sans"
        >
          <option>Loading...</option>
        </select>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-[90%]">
        <select
          disabled
          className="h-15 bg-[#1F2225] w-full border-[1.0px] border-[#4B4D4F] rounded-xl text-gray-500
          focus:outline-none focus:ring-2 focus:ring-dark-100 cursor-pointer font-semibold text-sm font-sans"
        >
          <option>Failed to load categories</option>
        </select>
      </div>
    );
  }

  return (
    <div className="w-[90%]">
      <select
        value={category}
        onChange={onChangeHandler}
        className="h-15 bg-[#1F2225] w-full border-[1.0px] border-[#4B4D4F] rounded-xl text-gray-500
        focus:outline-none focus:ring-2 focus:ring-dark-100 cursor-pointer font-semibold text-sm font-sans"
      >
        <option value="" disabled>Select a category</option>
        {ids.map((id) => {
          const cat = entities[id];
          return (
            <option 
              key={cat.id} 
              value={cat.id} 
              style={{ backgroundColor: '#1F2225', color: '#A3A3A3' }}
            >
              {cat.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectDropdown;
