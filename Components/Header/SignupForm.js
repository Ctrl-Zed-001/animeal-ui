import React, { useState } from 'react'
import { useSwiper } from 'swiper/react';
import { Input, Spacer } from '@nextui-org/react';


const SignupForm = (props) => {
    const swiper = useSwiper();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='text-gray-900 signup-form'>
            <h1 className="text-xl font-medium text-center">Create an account</h1>
            <div className="flex justify-around items-center mt-6">
                <div className="with-social-button flex items-center border rounded-lg py-2 px-4 border-yellow-500 font-semibold">
                    <img src="/img/icons/google.png" alt="" className='h-4 mr-2' />
                    Signup with Google
                </div>
                <div className="with-social-button flex items-center border rounded-lg py-2 px-4 border-yellow-500 font-semibold">
                    <img src="/img/icons/fb.png" alt="" className='h-4 mr-2' />
                    Signup with Facebook
                </div>
            </div>
            <h1 className='text-center my-4 text-gray-500 font-bold'>- OR -</h1>

            <div className="form-box mx-auto w-7/12">
                <Spacer y={1.6} />
                <Input labelPlaceholder="Full Name" color='default' fullWidth size='lg' onChange={(e) => setName(e.target.value)} />
                <Spacer y={1.6} />
                <Input labelPlaceholder="Email" color='default' fullWidth size='lg' onChange={(e) => setEmail(e.target.value)} />
                <Spacer y={1.6} />
                <Input.Password labelPlaceholder="Password" color='default' fullWidth size='lg' onChange={(e) => setPassword(e.target.value)} />
                <Spacer y={1.6} />
                <button className="bg-theme px-2 py-4 w-full shadow rounded-lg" onClick={() => props.signup(name, email, password)}>Create Account</button>
            </div>
            <p className="text-center mt-4 font-medium">Already have an account? <span onClick={() => swiper.slidePrev()} className="text-theme">click to Login.</span></p>
        </div>
    )
}

export default SignupForm