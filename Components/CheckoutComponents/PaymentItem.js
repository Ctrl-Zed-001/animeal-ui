import React from 'react'
import { BiRupee } from 'react-icons/bi';

const PaymentItem = (props) => {
    return (
        <div className={`flex justify-between items-center text-xs text-slate-500 my-2 ${props.className ? props.className : ''}`}>
            <span>{props.title}</span>
            <span className='flex items-center'><BiRupee /> {props.price}</span>
        </div>
    )
}

export default PaymentItem