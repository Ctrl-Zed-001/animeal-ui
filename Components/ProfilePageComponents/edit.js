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
      `${process.env.NEXT_PUBLIC_API_URI}/getauthenticateupdate/post/data`,
      {
        email: userDetails.email,
        name: data.name,
        number: data.number,
        altnumber: data.altnumber
      },
      {
        headers: {
          Authorization: token
        }
      }
    )
      .then(res => {
        toast.success("Address Updated Successfully!")
        console.log(res.data)
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
              <Input placeholder={userDetails?.email} disabled label='Email' />
              <Input color={errors && errors.name ? "error" : "default"} initialValue={userDetails?.name} {...register("name", { required: true })} label='Name' />
              <Input color={errors && errors.name ? "error" : "default"} initialValue={userDetails?.number} {...register("number", { required: true })} label='Number' />
              <Input initialValue={userDetails?.altnumber} {...register("altnumber")} label='Alt Number' />
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