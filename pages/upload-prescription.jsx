import React, { useState, useRef } from 'react'
import { Modal } from '@nextui-org/react';
import { Input, Textarea } from '@nextui-org/react';
import { HiPlusSm } from 'react-icons/hi';
import { AiFillCloseCircle, AiOutlineWhatsApp } from 'react-icons/ai'
import { useForm } from "react-hook-form";
import FormData from 'form-data';
import axios from 'axios';
import UploadStatusModal from '../Components/HomeComponents/UploadStatusModal';
import { useRouter } from 'next/router';




const uploadPrescription = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const form = new FormData();
    const fileInput = useRef(null);
    const [files, setFiles] = useState([])
    const [previews, setPreviews] = useState([])
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
    const [status, setStatus] = useState()

    const router = useRouter()

    const onSubmit = data => {
        if (files.length === 0) {
            alert("please choose prescription")
        } else {
            form.append('petname', data.petname)
            form.append('pettype', data.pettype)
            form.append('drname', data.drname)
            form.append('name', data.name)
            form.append('email', data.email)
            form.append('number', data.number)
            form.append('altnumber', data.altnumber)
            form.append('address', data.address)
            form.append(`prescription[]`, files[0])
            form.append(`prescription[]`, files[1])


            axios.post(
                `${process.env.NEXT_PUBLIC_API_URI}/user/prescription/post/data`,
                form
            )
                .then(res => {
                    console.log(res)
                    setStatus(true)
                    setIsStatusModalOpen(true)
                })
                .catch(err => {
                    console.log(err)
                    setStatus(false)
                    setIsStatusModalOpen(false)
                })
        }
    };

    const addFiles = (file) => {
        const objectUrl = URL.createObjectURL(file[0])
        let fileArray = [...files, file[0]]
        setFiles([...fileArray])
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
        <div className="container p-20 lg:pt-10 rounded shadow bg-white w-full lg:w-8/12 ">
            <UploadStatusModal isOpen={isStatusModalOpen} close={() => {
                setIsStatusModalOpen(false)
                router.push('/')
            }} status={status} />


            <div className="text-center">
                <h1 className="text-lg font-semibold text-theme ">Don't want the hassle to search for the product?</h1>
                <p className="text-center text-slate-500 text-sm">Just upload your prescription here and get it delivered</p>
                <h1 className='my-3'>OR</h1>
                <a href="https://wa.me/+919004485093" target="_blank" class="learn-more flex justify-between items-center gap-2 m-auto w-fit">
                    <AiOutlineWhatsApp className='h-5 w-5' />
                    Whatsapp Us
                </a>
            </div>

            <h1 className="my-6 text-lg text-left">Upload Prescription</h1>
            <div className="flex items-center gap-4">
                {
                    previews ?
                        previews.map((preview, index) => {
                            return (
                                <div key={index} className='h-28 w-28 shadow rounded-lg relative'>
                                    <AiFillCloseCircle onClick={() => removeImage(index)} className='text-red-400 h-4 w-4 absolute top-0 right-3' />
                                    <img className='h-full w-auto mx-auto object-cover' src={preview} />
                                </div>
                            )
                        }) :
                        <></>
                }
                <div className={`${previews.length === 2 ? 'hidden' : ''} upload-box h-28 w-28 bg-slate-100 p-4 rounded-lg flex items-center justify-center`}>
                    <input {...register("prescription")} onChange={(e) => addFiles(e.target.files)} ref={fileInput} type="file" className='hidden' />
                    <HiPlusSm className='bg-white rounded-full h-12 w-12 mx-auto' onClick={() => fileInput.current.click()} />
                </div>
            </div>

            <h1 className="my-6 text-lg text-left">Basic Info</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:flex justify-between gap-8 items-center">
                    <Input
                        label="Pet's Name"
                        fullWidth
                        {...register("petname")}
                        color={errors.petname ? "error" : 'default'}
                    />
                    <Input
                        label="Type Of Pet"
                        fullWidth
                        {...register("pettype")}
                        color={errors.pettype ? "error" : 'default'}
                    />
                    <Input
                        label="Doctor's Name"
                        fullWidth
                        {...register("drname", { required: true })}
                        color={errors.drname ? "error" : 'default'}
                    />
                </div>

                <div className="grid grid-cols-1 xl:flex justify-between gap-8 items-center mt-4">
                    <Input
                        label="Your Name"
                        fullWidth
                        {...register("name", { required: true })}
                        color={errors.name ? "error" : 'default'}
                    />
                    <Input
                        label="email"
                        fullWidth
                        type='email'
                        {...register("email")}
                        color={errors.email ? "error" : 'default'}
                    />
                </div>
                <div className="grid grid-cols-1 xl:flex justify-between gap-8 items-center mt-4">
                    <Input
                        label="Phone Number"
                        fullWidth
                        type='number'
                        {...register("number", { required: true })}
                        color={errors.number ? "error" : 'default'}
                    />
                    <Input
                        label="Alternate Phone Number"
                        fullWidth
                        type='number'
                        {...register("altnumber")}
                        color={errors.altnumber ? "error" : 'default'}
                    />
                </div>
                <div className="flex justify-between gap-8 items-center mt-4">
                    <Textarea
                        label="Full Address"
                        fullWidth
                        {...register("address")}
                        color={errors.address ? "error" : 'default'}
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button className='bg-theme rounded-lg px-4 py-2'>Submit</button>
                </div>
            </form>


        </div>
    )
}
export default uploadPrescription