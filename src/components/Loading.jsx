import React from 'react'

export const Loading = ({text}) => {
  return (
    <div className='text-center block m-auto align-sub h-full animate-ping'>
       <p className="text-3xl">{text}</p>  
    </div>    
  )
}
