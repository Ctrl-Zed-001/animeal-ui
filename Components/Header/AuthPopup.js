import React, { useContext } from 'react'
import { Modal, Input, Checkbox, Text, Row } from '@nextui-org/react';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { AuthContext } from '../../Context/AuthContext'
import toast, { Toaster } from 'react-hot-toast';

// Import Swiper styles
import "swiper/css";

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import axios from 'axios';



const AuthPopup = (props) => {

    const { setIsLoggedIn, showAuthModal, setShowAuthModal, setToken, setUserDetails, loginSocial } = useContext(AuthContext)


    const signup = (name, email, password) => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URI}/auth/local/register`,
            {
                username: name,
                email: email,
                password: password
            }
        )
            .then(res => {
                localStorage.setItem('token', `Bearer ${res.data.jwt}`)
                setIsLoggedIn(true)
                setToken(`Bearer ${res.data.jwt}`)
                setUserDetails(res.data.user)
                setShowAuthModal(false)
            })
            .catch(error => {
                error.response.data.errors.map(err => toast.error(err))
            })
    }

    const login = (email, password) => {
        axios
            .post(`${process.env.NEXT_PUBLIC_API_URI}/auth/local`, {
                identifier: email,
                password: password,
            })
            .then(res => {
                localStorage.setItem('token', `Bearer ${res.data.jwt}`)
                setIsLoggedIn(true)
                setToken(`Bearer ${res.data.jwt}`)
                setUserDetails(res.data.user)
                setShowAuthModal(false)
            })
            .catch(error => {
                setIsLoggedIn(false)
                console.log(error)
                toast.error("Invalid Credentials")
            })
    }


    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            className='bg-theme'
            width={props.isMobile ? 'fullscreen' : '60%'}
        >
            <Modal.Body className='p-0 overflow-hidden'>
                <div className="lg:flex justify-end items-center bg-slate-200">
                    <img src="/img/login.jpeg" alt="" className='md:w-6/12 login-image object-cover' />
                    <div className="form-section p-6 lg:p-0  bg-slate-200 h-full md:w-6/12">
                        <Swiper className="mySwiper">
                            <SwiperSlide><LoginForm login={login} loginSocial={loginSocial} close={() => setShowAuthModal(false)} /></SwiperSlide>
                            <SwiperSlide><SignupForm signup={signup} loginSocial={loginSocial} close={() => setShowAuthModal(false)} /></SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default AuthPopup