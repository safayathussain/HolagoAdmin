'use client'
import React, { useEffect, useRef, useState } from 'react'

const Modal = ({ open, setOpen, children, className }) => {

  return (
    <div>
      {
        open &&
        <>
          <div className='absolute top-0 left-0 w-full min-h-[calc(100vh-104px)] h-full bg-black z-[999] opacity-30 blur-2xl'>
          </div>
          <div className={` fixed h-screen top-0 left-0 flex z-[9999] w-full items-center justify-center ${className}`}>
            <div className='bg-white p-4 rounded-lg min-w-[400px]'>
              {children}
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Modal