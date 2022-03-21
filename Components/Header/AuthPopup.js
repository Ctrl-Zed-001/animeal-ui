import React from 'react'
import { Modal, Input, Checkbox, Text, Row } from '@nextui-org/react';
import config from '../../config.json'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import axios from 'axios';



const AuthPopup = (props) => {


    const signup = (name, email, password) => {
        axios.post(`${config.api_uri}/user/registration/post/data`,
            {
                name: name,
                email, email,
                password: password
            }
        )
            .then(res => console.log(res.data))
            .catch(error => console.log(error.response.data))
    }

    const login = (email, password) => {
        axios.post(`${config.api_uri}/user/login/post/data`,
            {
                email, email,
                password: password
            }
        )
            .then(res => console.log(res.data))
            .catch(error => console.log(error.response.data))
    }

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={props.showAuthModal}
            blur
            onClose={props.close}
            className='bg-theme'
            width='55%'

        >
            <Modal.Body className='p-0 overflow-hidden'>
                <div className="md:flex items-center">
                    <img src="/img/authbanner.png" alt="" className='h-96' />
                    <div className="form-section p-6 rounded-l-xl bg-slate-200 h-full w-8/12">
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