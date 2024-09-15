import React, { useRef } from 'react'
import Modal from './Modal'
import useClickOutside from '@/utils/useClickOutside'

const ConfirmModal = ({ open, setOpen, title, onConfirm = () => { }, onCancel = () => { } }) => {
    const ref = useRef()
    useClickOutside(ref, () => {
        setOpen(false)
    })
    return (
        <Modal open={open}>
            <div ref={ref}>

                <p className='text-lg'>{title}</p>
                <div className='flex items-center gap-3 mt-3'>
                    <button onClick={() => {
                        onCancel()
                        setOpen(false)
                    }} className='py-2 text-sm rounded-lg text-white bg-black w-1/2'>Cancel</button>
                    <button onClick={() => {
                        onConfirm()
                    }
                    } className='py-2 text-sm rounded-lg text-white bg-black w-1/2'>Confirm</button>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmModal