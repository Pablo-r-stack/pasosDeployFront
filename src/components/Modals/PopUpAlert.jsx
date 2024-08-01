import ButtonAlert from '../Buttons/ButtonAlert'

export default function PopUpAlert({title, description, isVisible, onClose}) {
  if(!isVisible) return null;

  return (
    <div className='fixed top-0 left-0 flex flex-col w-full h-screen items-center pt-32 bg-black bg-opacity-85'>
      <div className='relative flex flex-col items-center justify-evenly w-80 h-60 bg-whiteBg rounded-3xl border drop-shadow-lg text-blueSecond text-center'>
        <h3 className='text-xl font-semibold'>{title}</h3>
        <span className='text-sm'>{description}</span>
        <ButtonAlert onClick={onClose} text={'Ok'} />
      </div>
    </div>
  )
}
