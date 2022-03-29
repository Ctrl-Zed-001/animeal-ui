import React from 'react'
import { Modal } from '@nextui-org/react';

const LogoutPopup = (props) => {
    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={props.isOpen}
            onClose={props.close}
        >
            <Modal.Body>
                <img src="/img/icons/password-change-success.svg" alt="" className='h-44' />
                <h1 className='text-center font-semibold'>Your password has been changed successfully</h1>
                <p className='text-center text-sm text-slate-500'>You will now be loggedout. Please login again to continue.</p>
                <button onClick={props.close} className='w-full bg-green-600 rounded-lg p-3 text-white' >Done</button>
            </Modal.Body>
        </Modal>
    )
}

export default LogoutPopup