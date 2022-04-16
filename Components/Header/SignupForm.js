import React, { useState, useEffect } from 'react'
import { useSwiper } from 'swiper/react';
import { Input, Spacer } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import { getProviders, signIn } from "next-auth/react"


const SignupForm = (props) => {
    const swiper = useSwiper();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authProviders, setProviders] = useState()

    useEffect(() => {
        getProv()
    }, [])

    const getProv = async () => {
        const providers = await getProviders()
        setProviders(providers)
    }

    return (
        <div className='text-gray-900 signup-form'>
            <h1 className="text-xl font-medium md:text-center">Create an account</h1>
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
            <h1 className='text-center my-4 text-gray-500 font-semibold'>- OR -</h1>

            <div className="form-box mx-auto md:w-7/12">
                <form onSubmit={(e) => { e.preventDefault(); props.signup(name, email, password) }}>
                    <Input name='fullName' labelPlaceholder="Full Name" color='default' fullWidth size='lg' onChange={(e) => setName(e.target.value)} />
                    <Spacer y={1.6} />
                    <Input type='email' labelPlaceholder="Email" color='default' fullWidth size='lg' onChange={(e) => setEmail(e.target.value)} />
                    <Spacer y={1.6} />
                    <Input.Password labelPlaceholder="Password" color='default' fullWidth size='lg' onChange={(e) => setPassword(e.target.value)} />
                    <Spacer y={1.6} />
                    <button className="bg-theme px-2 py-4 w-full shadow rounded-lg">Create Account</button>
                </form>
            </div>
            <p className="text-center mt-4 font-medium">Already have an account? <span onClick={() => swiper.slidePrev()} className="text-theme">click to Login.</span></p>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </div>
    )
}

export default SignupForm