import React, { useContext } from 'react'
import { Modal, Input, Checkbox, Text, Row } from '@nextui-org/react';
import config from '../../config.json'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { AuthContext } from '../../Context/AuthContext'

// Import Swiper styles
import "swiper/css";

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import axios from 'axios';



const AuthPopup = (props) => {

    const { setIsLoggedIn, getUserDetails, showAuthModal, setShowAuthModal, setToken } = useContext(AuthContext)


    const signup = (name, email, password) => {
        axios.post(`${config.api_uri}/user/registration/post/data`,
            {
                name,
                email,
                password
            }
        )
            .then(res => console.log(res.data))
            .catch(error => console.log(error.response.data))
    }

    const login = (email, password) => {
        axios.post(`${config.api_uri}/user/login/post/data`,
            {
                email,
                password
            }
        )
            .then(res => {
                localStorage.setItem('token', `Bearer ${res.data.access_token}`)
                setIsLoggedIn(true)
                setToken(`Bearer ${res.data.access_token}`)
                getUserDetails(`Bearer ${res.data.access_token}`)
                setShowAuthModal(false)
            })
            .catch(error => {
                setIsLoggedIn(false)
                console.log(error)
            })
    }

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={showAuthModal}
            blur
            onClose={() => setShowAuthModal(false)}
            className='bg-theme'
            width={props.isMobile ? 'fullscreen' : '50%'}
        >
            <Modal.Body className='p-0 overflow-hidden'>
                <div className="md:flex justify-end items-center">
                    <img src="/img/authbanner.png" alt="" className='h-80 mx-auto' />
                    <div className="form-section p-6 rounded-l-xl bg-slate-200 h-full md:w-8/12">
                        <Swiper className="mySwiper">
                            <SwiperSlide className=''><LoginForm login={login} /></SwiperSlide>
                            <SwiperSlide><SignupForm signup={signup} /></SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AuthPopup