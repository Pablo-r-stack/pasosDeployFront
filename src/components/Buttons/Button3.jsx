import React from 'react'

export default function Button3({name, onClick}) {
    return (
        <button className='text-xl w-full p-2.5 bg-whiteBg text-greenAccent  font-normal drop-shadow-md' onClick={onClick}>{name}</button>
      )
}
