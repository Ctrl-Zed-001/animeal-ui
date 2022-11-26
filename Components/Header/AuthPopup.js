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

    const { setIsLoggedIn, getUserDetails, showAuthModal, setShowAuthModal, setToken, setUserDetails, loginSocial } = useContext(AuthContext)


    const signup = (name, phone, password) => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URI}/user/signup`,
            {
                name,
                phone,
                password
            }
        )
            .then(res => {
                localStorage.setItem('token', `${res.data.token}`)
                setIsLoggedIn(true)
                setToken(`${res.data.token}`)
                setUserDetails(res.data.user)
                setShowAuthModal(false)
            })
            .catch(error => {
                toast.error(error.response.data.msg)
            })
    }

    const login = (phone, password) => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URI}/user/login`,
            {
                phone,
                password
            }
        )
            .then(res => {
                localStorage.setItem('token', `${res.data.token}`)
                setIsLoggedIn(true)
                setToken(`${res.data.token}`)
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
                <div className="md:flex justify-end items-center">
                    <img src="/img/authbanner.webp" alt="" className='h-44 md:h-80 mx-auto' />
                    <div className="form-section p-6 rounded-l-xl bg-slate-200 h-full md:w-8/12">
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