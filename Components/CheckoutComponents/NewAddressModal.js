import React, { useState } from 'react'
import { Modal } from '@nextui-org/react';
import { Radio, Input } from '@nextui-org/react';

const NewAddressModal = (props) => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [type, setType] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={props.isOpen}
            onClose={props.close}
            width='60%'
        >
            <Modal.Body>
                <h1 className='text-lg font-semibold'>Add New Address</h1>
                <div className="address-form  p-4 rounded-lg">
                    <div className="flex justify-between gap-14 my-14 w-full">
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="Name"
                            initialValue=""
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="Phone Number"
                            initialValue=""
                            type="number"
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between gap-14 my-14 w-full">
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="Roo no. / house no. / street"
                            initialValue=""
                            onChange={(e) => setAddress1(e.target.value)}
                        />
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="Area / locality"
                            initialValue=""
                            onChange={(e) => setAddress2(e.target.value)}
                        />
                        <select onChange={(e) => setType(e.target.value)} name='addtype' className='bg-transparent border-b-2 border-gray-200 w-8/12'>
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                        </select>
                    </div>
                    {/* <div className="flex justify-between gap-14 my-8 w-full">
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="Address Type"
                            initialValue={address?.addresstype}
                        />
                        
                    </div> */}
                    <div className="flex justify-between gap-14 my-14 w-full">
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="City / Town"
                            initialValue=""
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="State"
                            initialValue=""
                            onChange={(e) => setState(e.target.value)}
                        />
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="ZipCode"
                            initialValue=""
                            type="number"
                            onChange={(e) => setZipcode(e.target.value)}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='px-4 py-2 bg-theme text-white rounded-lg' onClick={() => props.save({ name, number, address1, address2, type, city, state, zipcode })}>
                    Save
                </button>
                <button className='px-4 py-2 bg-red-400 text-white rounded-lg' onClick={props.close}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewAddressModal