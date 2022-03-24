import React from 'react'
import { Radio } from "@nextui-org/react";
import { AiFillEdit } from 'react-icons/ai'

const AddressBox = (props) => {
    return (
        <div className='address-box bg-white p-4 rounded-lg'>
            <div className="flex justify-between w-full">
                <Radio onC checked={false} size='xs' color='success' value="A" />
                <div className="flex items-center gap-2 text-xs text-gray-600">
                    <AiFillEdit /> Edit
                </div>
            </div>
            <div className="address text-xs mt-6 text-gray-600">
                <h1 className='text-base text-medium mb-1'>{props.address.addname}</h1>
                <p>{props.address.addaddress1 + ' ' + props.address.addaddress2 + ' ' + props.address.addcity + ' ' + props.address.addstate + ' ' + props.address.addpincode}</p>
                <p className="text-medium">{props.address.addnumber}</p>
            </div>
        </div>
    )
}

export default AddressBox