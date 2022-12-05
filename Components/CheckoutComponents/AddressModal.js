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
                    {
                        props.addresses?.map((adr, index) => {
                            return (
                                <div onClick={() => props.selectAddress(adr)} key={index} className="border p-3 rounded-lg my-3 text-xs leading-5 bg-gray-100 border-gray-100 hover:bg-yellow-100 hover:border-yellow-100">
                                    <h1 className="text-xs font-medium mb-2">{adr.name} ({adr.type})</h1>
                                    <p className='my-2'>{adr.line} {adr.city} {adr.state} {adr.pincode}</p>
                                    <p className='font-medium'>{adr.phone}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddressModal