import React, { useRef } from 'react'
import { Modal } from '@nextui-org/react';
import { HiPlusSm } from 'react-icons/hi';

const PrescriptionModal = (props) => {

    const fileInput = useRef(null);

    return (
        <Modal
            scroll
            closeButton
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={props.visible}
            onClose={props.close}
            width='40%'
        >
            <Modal.Header>
                <h1 className="text-base font-semibold">Upload Prescriptions</h1>
            </Modal.Header>
            <Modal.Body>
                <div className="md:flex justify-between">
                    <div className="left-sec">
                        <h1 className="text-xs font-semibold mb-4">Click here to upload prescription</h1>
                        <div className="upload-box bg-slate-200 rounded-lg w-16 h-16 flex items-center cursor-pointer">
                            <input ref={fileInput} type="file" className='hidden' />
                            <HiPlusSm className='bg-white rounded-full h-8 w-8 mx-auto' onClick={() => fileInput.current.click()} />
                        </div>
                    </div>
                    <div className="right-sec">
                        <h1 className="text-xs font-semibold">Valid prescription guidelines</h1>
                        <p className="text-xs my-4">image should be sharp and must contain these 4 points.</p>
                        <img src="/img/prescription-demo.png" alt="" className='h-72' />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default PrescriptionModal