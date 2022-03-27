import React from 'react'
import { Modal } from '@nextui-org/react';

const OrderStatusPopup = (props) => {
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
                        <img src="/img/order-success.png" alt="" className='h-60 w-60 mx-auto rounded-full bg-cyan-200' /> :
                        <img src="/img/order-fail.png" alt="" className='h-60 w-60 mx-auto rounded-full bg-red-300' />
                }
                {
                    props.status ?
                        <h1 className="text-center text-3xl font-semibold">Your Order has been accepted</h1> :
                        <h1 className="text-center text-3xl font-semibold">Oops! Order Failed</h1>
                }

                {
                    props.status ?
                        <p className="my-10 text-sm text-center">Your items has been placcd and is on it’s way to being processed</p> :
                        <p className="my-10 text-sm text-center">Lookes like something went wrong while placing your order. Please try again after some time.</p>
                }
                <button onClick={props.close} className='w-full p-2 text-lg font-semibold bg-theme shadow rounded-lg'>Back To Home</button>
            </Modal.Body>

        </Modal>
    )
}

export default OrderStatusPopup