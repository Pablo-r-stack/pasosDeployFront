import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function BackButton({direction}) {
    const navigate = useNavigate();
    const handleBackClick = ()=>{
        navigate(direction)
    }
  return (
    <button
            type="button"
            onClick={handleBackClick}
            className="mr-2 bg-white text-gray-700 hover:text-gray-900 focus:outline-none rounded-full p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
  )
}
