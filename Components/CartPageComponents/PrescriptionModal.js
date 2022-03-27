import React, { useState, useRef } from 'react'
import { Modal } from '@nextui-org/react';
import { HiPlusSm } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai'

const PrescriptionModal = (props) => {

    const fileInput = useRef(null);
    const [files, setFiles] = useState([])
    const [previews, setPreviews] = useState([])

    const addFiles = (file) => {
        const objectUrl = URL.createObjectURL(file[0])
        setFiles([...files, file[0]])
        setPreviews([...previews, objectUrl])
    }

    const removeImage = (index) => {
        let allFiles = [...files];
        let allPreviews = [...previews]

        allFiles.splice(index, 1)
        allPreviews.splice(index, 1)

        let newFiles = [...allFiles]
        let newPreviews = [...allPreviews]

        setFiles([...newFiles])
        setPreviews([...newPreviews])
    }

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
                <div className="md:flex justify-between gap-8">
                    <div className="left-sec">
                        <h1 className="text-xs font-semibold">Click here to upload prescription</h1>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {
                                previews ?
                                    previews.map((preview, index) => {
                                        return (
                                            <div key={index} className='h-16 w-full shadow rounded-lg relative'>
                                                <AiFillCloseCircle onClick={() => removeImage(index)} className='text-red-400 h-4 w-4 absolute top-0 right-3' />
                                                <img className='h-full w-auto mx-auto' src={preview} />
                                            </div>
                                        )
                                    }) :
                                    <></>
                            }
                            <div className="upload-box bg-slate-200 rounded-lg w-full h-16 flex items-center cursor-pointer">
                                <input onChange={(e) => addFiles(e.target.files)} name='prescription' ref={fileInput} type="file" className='hidden' />
                                <HiPlusSm className='bg-white rounded-full h-8 w-8 mx-auto' onClick={() => fileInput.current.click()} />
                            </div>
                        </div>
                        <button className='bg-theme w-full py-2 rounded-lg mt-6'>Upload</button>
                    </div>
                    <div className="right-sec">
                        <h1 className="text-xs font-semibold">Valid prescription guidelines</h1>
                        <p className="text-xs my-4">image should be sharp and must contain these 4 points.</p>
                        <img src="/img/prescription-demo.png" alt="" className='h-60 mx-auto' />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default PrescriptionModal