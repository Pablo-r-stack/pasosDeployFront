import React from 'react'

export default function ButtonAlert2({onClick, text}) {
  return (
    <button className='min-w-16 min-h-10 bg-whiteBg border border-solid border-blueSecond text-blueSecond rounded-full text-sm font-semibold' onClick={onClick}>{text}</button>
  )
}
