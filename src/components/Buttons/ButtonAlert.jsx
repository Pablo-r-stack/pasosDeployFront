import React from 'react'

export default function ButtonAlert({onClick, text}) {
  return (
    <button className='min-w-16 min-h-10 bg-blueSecond text-whiteBg rounded-full text-sm font-semibold' onClick={onClick}>{text}</button>
  )
}
