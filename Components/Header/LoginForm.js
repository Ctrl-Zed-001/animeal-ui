import React, { useState, useEffect } from 'react'
import { useSwiper } from 'swiper/react';
import { Input, Spacer } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { getProviders, signIn } from "next-auth/react"
import StatusPopup from '../CheckoutComponents/StatusPopup';


const LoginForm = (props) => {

    const [authProviders, setProviders] = useState()

    useEffect(() => {
        getProv()
    }, [])

    const getProv = async () => {
        const providers = await getProviders()
        setProviders(providers)
    }

    const swiper = useSwiper();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showStatus, setShowStatus] = useState()

    const callForgotPassword = () => {
        if (email !== '') {
            axios.post(
                `${process.env.NEXT_PUBLIC_API_URI}/user/newpassword/post/data`,
                {
                    email_id: email
                }
            )
                .then(res => {
                    if (res.data.oneTimePassword) {
                        setShowStatus(true)
                    } else {
                        toast.error("Entered Email Not Found")
                    }
                })
                .catch(err => console.log(err))
        } else {
            toast.error("please enter your email address")
        }
    }

    return (
        <div className='text-gray-900 login-form'>
            <h1 className="text-xl font-medium text-center">Login Now</h1>
            <div className="flex justify-between gap-4 md:gap-0 md:justify-around items-center mt-6 text-xs md:text-base">
                <div onClick={() => signIn(authProviders.google.id)} className="with-social-button flex items-center border rounded-lg py-2 px-4 border-yellow-500 font-semibold">
                    <img src="/img/icons/google.webp" alt="" className='h-6 mr-2' />
                    Login with Google
                </div>
                <div onClick={() => signIn(authProviders.facebook.id)} className="with-social-button flex items-center border rounded-lg py-2 px-4 border-yellow-500 font-semibold">
                    <img src="/img/icons/fb.webp" alt="" className='h-6 mr-2' />
                    Login with Facebook
                </div>
            </div>
            <h1 className='text-center my-2 md:my-4 text-gray-500 font-semibold'>- OR -</h1>

            <div className="form-box mx-auto md:w-7/12">
                <form onSubmit={(e) => { e.preventDefault(); props.login(email, password) }}>
                    <Input required name='name' type='email' labelPlaceholder="Email" color='default' fullWidth size='lg' onChange={(e) => setEmail(e.target.value)} />
                    <Spacer y={1.6} />
                    <Input.Password labelPlaceholder="Password" color='default' fullWidth size='lg' onChange={(e) => setPassword(e.target.value)} />
                    <p className='mt-2 text-xs ml-2 text-theme cursor-pointer' onClick={callForgotPassword}>forgot password?</p>
                    <Spacer y={1.6} />
                    <button type="submit" className="bg-theme px-2 py-4 w-full shadow rounded-lg">Login</button>
                </form>
            </div>
            <p className="text-center mt-4 font-medium">New To Animeal? <span onClick={() => swiper.slideNext()} className="text-theme">click to Signup.</span></p>
            <Toaster
                position="top-center"
            />
            <StatusPopup
                isOpen={showStatus}
                close={() => setShowStatus(false)}
                image="/img/icons/mail.webp"
                heading="Email with new password has been sent."
                subheading="Please check your email and update the password."
            />
        </div>
    )
}

export default LoginForm