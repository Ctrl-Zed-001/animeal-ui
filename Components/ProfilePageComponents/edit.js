import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useRouter } from 'next/router'
import { Input } from '@nextui-org/react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'


const EditProfile = () => {
  const { isLoggedIn, userDetails, token } = useContext(AuthContext)

  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = data => {
    axios.post(
      `${process.env.NEXT_PUBLIC_API_URI}/user/update`,
      {
        email: data.email,
        name: data.name,
        alt_phone: data.alt_phone
      },
      {
        headers: {
          Authorization: token
        }
      }
    )
      .then(res => {
        toast.success("Profile Updated Successfully!")
        router.reload()
      })
      .catch(err => {
        toast.error("Something went wrong")
        console.log(err)
      })
  }

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/')
    }
  }, [])

  return (
    <div className="edit-profile">
      <Toaster
        position='top-center'
      />
      <div className="container">
        <h1 className='font-semibold text-2xl mb-4'>Edit Profile</h1>

        {/* EDIT PROFILE */}
        <div className="profile-action-section col-span-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-10">
              <Input initialValue={userDetails?.email} label='Email' {...register("email", { required: true })} color={errors && errors.email ? "error" : "default"} />
              <Input color={errors && errors.name ? "error" : "default"} initialValue={userDetails?.name} {...register("name", { required: true })} label='Name' />
              <Input initialValue={userDetails?.phone} label='Number' disabled />
              <Input initialValue={userDetails?.alt_phone} {...register("alt_phone")} label='Alt Number' />
            </div>
            <div className="flex justify-end">
              <button className='px-6 bg-theme p-2 rounded-xl mt-6'>Save</button>
            </div>
          </form>
        </div>


      </div>
    </div>
  )
}

export default EditProfile