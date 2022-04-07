import React from 'react'
import { IoMdTrash } from 'react-icons/io'

const AddressBox = (props) => {
    return (
        <div className={`address-box bg-slate-100 text-slate-600 p-2 rounded-lg text-sm shadow relative ${props.className}`}>
            <IoMdTrash onClick={() => props.deleteAddress(props.address.id)} className='absolute text-red-500 top-2 right-2 text-lg' />
            <h1 className='text-lg font-semibold'>{props.address.addname} <span className='text-xs'>({props.address.addresstype})</span> </h1>
            <p className='my-3 text-xs text-justify'>{props.address.addaddress1} {props.address.addaddress2} {props.address.addcity} {props.address.addstate} {props.address.addpincode}</p>
            <p className='text-xs'>{props.address.addnumber}</p>
        </div>
    )
}

export default AddressBox