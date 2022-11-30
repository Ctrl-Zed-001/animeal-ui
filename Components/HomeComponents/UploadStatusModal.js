import React from 'react'
import { Modal } from '@nextui-org/react';

const UploadStatusModal = (props) => {
    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={props.isOpen}
            onClose={props.close}
        >
            <Modal.Body>
                {
                    props.status ?
                        <img src="/img/icons/tick.webp" alt="" className='h-40 w-40 mx-auto rounded-full' /> :
                        <img src="/img/icons/delete.webp" alt="" className='h-40 w-40 mx-auto rounded-full' />
                }
                {
                    props.status ?
                        <h1 className="text-center text-3xl font-semibold">Prescription uploaded successfully!</h1> :
                        <h2 className="text-center text-3xl font-semibold">Oops! Something went wrogn.</h2>
                }

                {
                    props.status ?
                        <p className="my-10 text-sm text-center">We will get back to you as soon as possible</p> :
                        <p className="my-10 text-sm text-center">Please try again after some time.</p>
                }
                <button onClick={props.close} className='w-full p-2 text-lg font-semibold bg-theme shadow rounded-lg'>Back To Home</button>
            </Modal.Body>

        </Modal>
    )
}

export default UploadStatusModal