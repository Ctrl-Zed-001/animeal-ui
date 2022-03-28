import React, { useState, useRef } from 'react'
import { Modal } from '@nextui-org/react';
import { Input } from '@nextui-org/react';


const OtpPopup = (props) => {

    const [value, setValue] = useState('')
    const otpField = useRef()

    const otpValidate = (e) => {
        setValue(e.target.value)
        if (e.target.value.length === 6) {
            otpField.current.blur()
        }
    }

    return (
        <Modal
            closeButton
            open={props.isOpen}
            onClose={props.close}

        >
            <Modal.Body>
                <h1 className="text-xl text-center font-semibold">Enter OTP</h1>
                <Input onClick={otpValidate} maxLength={4} clearable ref={otpField} type='number' required shadow={true} className='text-4xl' onChange={otpValidate} />
                <button onClick={() => props.placeOrder(value)} className='w-full p-2 text-lg font-semibold bg-theme shadow rounded-lg'>Validate</button>
            </Modal.Body>

        </Modal>
    )
}

export default OtpPopup