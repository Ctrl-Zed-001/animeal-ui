import React, { useState } from 'react'
import { Modal } from '@nextui-org/react';
import { Switch, Input } from '@nextui-org/react';

import { useForm } from "react-hook-form";

const NewAddressModal = (props) => {

    const [defaultAddress, setDefaultAddress] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        props.save({
            ...data,
            defaultAddress
        })
    };

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={props.isOpen}
            onClose={props.close}
            width='60%'
        >
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-lg font-semibold'>Add New Address</h1>
                    <div className="address-form  p-4 rounded-lg">
                        <div className="flex justify-between gap-14 my-14 w-full">
                            <Input
                                fullWidth
                                clearable
                                underlined
                                label="Name"
                                initialValue=""
                                {...register("addname", { required: true })}
                                color={errors?.addname ? "error" : "default"}
                            />
                            <Input
                                fullWidth
                                clearable
                                underlined
                                label="Phone Number"
                                initialValue=""
                                type="number"
                                {...register("addnumber", { required: true, minLength: 10, maxLength: 10 })}
                                color={errors?.addnumber ? "error" : "default"}
                            />
                            <Input
                                fullWidth
                                clearable
                                underlined
                                label="Alternate Number"
                                initialValue=""
                                type="number"
                                {...register("addaltnumber", { minLength: 10, maxLength: 10 })}
                                color={errors?.addaltnumber ? "error" : "default"}
                            />
                        </div>
                        <div className="flex justify-between gap-14 my-14 w-full">
                            <Input
                                fullWidth
                                clearable
                                underlined
                                label="Roo no. / house no. / street"
                                initialValue=""
                                {...register("addaddress1", { required: true })}
                                color={errors?.addaddress1 ? "error" : "default"}
                            />
                            <Input
                                fullWidth
                                clearable
                                underlined
                                label="Area / locality"
                                initialValue=""
                                {...register("addaddress2", { required: true })}
                                color={errors?.addaddress2 ? "error" : "default"}
                            />
                            <select value="Home" {...register("addresstype", { required: true })} name='addtype' className='bg-transparent border-b-2 border-gray-200 w-8/12'>
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
                                {...register("addcity", { required: true })}
                                color={errors?.addcity ? "error" : "default"}
                            />
                            <Input
                                fullWidth
                                clearable
                                underlined
                                label="State"
                                initialValue=""
                                {...register("addstate", { required: true })}
                                color={errors?.addstate ? "error" : "default"}
                            />
                            <Input
                                fullWidth
                                clearable
                                underlined
                                label="Pincode"
                                initialValue=""
                                type="number"
                                {...register("addpincode", { required: true, minLength: 6, maxLength: 6 })}
                                color={errors?.addpincode ? "error" : "default"}
                            />
                        </div>
                        <div className="flex justify-end items-center gap-6">Set as default address <Switch checked={true} initialChecked={true} onChange={(e) => setDefaultAddress(e.target.checked)} color='success' /> </div>
                    </div>
                    <div className="flex justify-end gap-6 mt-6">
                        <button type="submit" className='px-4 py-2 bg-theme text-white rounded-lg'>
                            Save
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default NewAddressModal