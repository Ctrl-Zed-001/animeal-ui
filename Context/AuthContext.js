import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import config from '../config.json'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userDetails, setUserDetails] = useState()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }

        let token = localStorage.getItem('token')
        if (token) {
            axios.post(
                `${config.api_uri}/user/getauthenticateuser/post/data`,
                {},
                {
                    headers: {
                        "Authorization": token
                    }
                }
            )
                .then(res => {
                    setUserDetails(res.data.user)
                    setIsLoggedIn(true)
                })
                .catch(err => {
                    setIsLoggedIn(false)
                    setUserDetails()
                })
        }
    }, [])

    const getUserDetails = (token) => {
        if (token) {
            axios.post(
                `${config.api_uri}/user/getauthenticateuser/post/data`,
                {},
                {
                    headers: {
                        "Authorization": token
                    }
                }
            )
                .then(res => {
                    setUserDetails(res.data.user)
                    setIsLoggedIn(true)
                })
                .catch(err => {
                    setIsLoggedIn(false)
                    setUserDetails()
                })
        }
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails, isMobile, getUserDetails }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider