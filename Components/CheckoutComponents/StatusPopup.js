import React from 'react'
import { Modal } from '@nextui-org/react';

const StatusPopup = (props) => {
    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={props.isOpen}
            onClose={props.close}
        >
            <Modal.Body>

                <img src={props.image} alt="" className={`h-60 w-60 mx-auto rounded-full ${props.class ? props.class : ''}`} />

                <h1 className="text-center text-3xl font-semibold">{props.heading}</h1>

                {
                    props.subheading ?
                        <p className="my-10 text-sm text-center">{props.subheading}</p> :
                        <></>
                }

                {
                    props.button ?
                        <button onClick={props.close} className='w-full p-2 text-lg font-semibold bg-theme shadow rounded-lg'>{props.button}</button> :
                        <></>
                }

            </Modal.Body>

        </Modal>
    )
}

export default StatusPopup