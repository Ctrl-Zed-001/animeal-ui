import React from 'react'
import { Modal } from '@nextui-org/react';

const PrescriptionModal = (props) => {
    return (
        <Modal
            scroll
            closeButton
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={props.visible}
            onClose={props.close}
            width='80%'
        >
            <Modal.Header>
                <h1 className="text-base font-semibold">Upload Prescription</h1>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
        </Modal>
    )
}

export default PrescriptionModal