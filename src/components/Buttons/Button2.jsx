import React from 'react'

export default function Button2({name, onClick}) {
  return (
    <button className='text-xl w-full p-2.5 bg-greenAccent text-white  font-normal drop-shadow-md' onClick={onClick}>{name}</button>
  )
}
