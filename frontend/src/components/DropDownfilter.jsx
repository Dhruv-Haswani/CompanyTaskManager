import { useState } from 'react'

export default function DropdownFilter({ selectedFilter, onSelectFilter }) {
  const [isOpen, setIsOpen] = useState(false)
  const options = ['All', 'Pending', 'Completed']

  return (
    <div className="relative inline-block text-left mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
      >
        Filter: <span className="font-bold text-blue-600">{selectedFilter}</span>
      </button>

      {/* Conditional Rendering based on useState */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelectFilter(option)
                setIsOpen(false)
              }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}