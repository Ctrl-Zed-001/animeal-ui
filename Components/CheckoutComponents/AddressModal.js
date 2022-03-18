import React from 'react'
import { Modal } from '@nextui-org/react';

const AddressModal = (props) => {
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
                <h1 className="text-base font-semibold">Choose Address</h1>
            </Modal.Header>
            <Modal.Body>
                <div className="md:flex justify-between w-full">
                    <div className="border p-3 rounded-lg my-3 text-xs leading-5 bg-yellow-100 border-yellow-100">
                        <h1 className="text-xs font-medium">Home</h1>
                        <p className='my-2'>301, Adil tower mg road old panvel 410 206</p>
                        <p className='font-medium'>8454015530</p>
                    </div>
                    <div className="border p-3 rounded-lg my-3 text-xs leading-5 bg-gray-100 border-gray-100 hover:bg-yellow-100 hover:border-yellow-100">
                        <h1 className="text-xs font-medium mb-2">Home</h1>
                        <p className='my-2'>301, Adil tower mg road old panvel 410 206</p>
                        <p className='font-medium'>8454015530</p>
                    </div>
                    <div className="border p-3 rounded-lg my-3 text-xs leading-5 bg-gray-100 border-gray-100 hover:bg-yellow-100 hover:border-yellow-100">
                        <h1 className="text-xs font-medium mb-2">Office</h1>
                        <p className='my-2'>301, Adil tower mg road old panvel 410 206</p>
                        <p className='font-medium'>8454015530</p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddressModal