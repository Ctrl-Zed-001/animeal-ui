import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import config from '../config.json'
import { useRouter } from 'next/router';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userDetails, setUserDetails] = useState()
    const [isMobile, setIsMobile] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [token, setToken] = useState('')

    const router = useRouter()

    useEffect(() => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }

        let token = localStorage.getItem('token')
        if (token) {
            setToken(token)
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
        } else {
            router.replace('/')
        }
    }, [token])

    const getUserDetails = (token) => {
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
                console.log(err)
            })
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false)
        setUserDetails()
        setToken('')
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails, isMobile, getUserDetails, showAuthModal, setShowAuthModal, token, setToken, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider