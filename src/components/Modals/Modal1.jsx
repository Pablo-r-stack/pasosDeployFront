import React from 'react'
import ButtonAlert from '../Buttons/ButtonAlert'
import ButtonAlert2 from '../Buttons/ButtonAlert2'

export default function Modal1({title, description, isVisible, onClose, textBtn, onAction}) {
    if(!isVisible) return null;
    const btnText = textBtn ? textBtn : 'Ok';
    return (
      <div className='fixed top-0 left-0 flex flex-col w-full h-screen items-center pt-32 bg-black bg-opacity-85'>
        <div className='relative flex flex-col items-center justify-evenly w-80 h-60 bg-whiteBg rounded-3xl border drop-shadow-lg text-blueSecond text-center'>
          <h3 className='text-xl font-semibold'>{title}</h3>
          <span className='text-sm'>{description}</span>
          <div className=' w-full flex items-center justify-evenly'>
          <ButtonAlert2 onClick={onClose} text={'Cancelar'} />
          <ButtonAlert text={btnText} onClick={onAction} />
          </div>
        </div>
      </div>
    )
}
