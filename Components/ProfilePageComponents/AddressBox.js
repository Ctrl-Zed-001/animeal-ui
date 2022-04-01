import React from 'react'
import { IoMdTrash } from 'react-icons/io'

const AddressBox = (props) => {
    return (
        <div className={`address-box bg-slate-200 p-2 rounded-lg text-sm shadow relative ${props.className}`}>
            <IoMdTrash onClick={() => props.deleteAddress(props.address.id)} className='absolute text-red-500 top-2 right-2 text-lg' />
            <h1 className='text-lg font-semibold'>{props.address.addresstype}</h1>
            <p className='my-3'>{props.address.addaddress1} {props.address.addaddress2} {props.address.addcity} {props.address.addstate} {props.address.addpincode}</p>
            <p>{props.address.addnumber}</p>
        </div>
    )
}

export default AddressBox