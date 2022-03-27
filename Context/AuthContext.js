import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userDetails, setUserDetails] = useState()
    const [isMobile, setIsMobile] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [token, setToken] = useState('')

    const { data: session, status } = useSession()
    console.log("🚀 ~ file: AuthPopup.js ~ line 21 ~ AuthPopup ~ session", session, status)

    const router = useRouter()

    useEffect(() => {
        if (window.screen.width <= 425) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }

        let token = localStorage.getItem('token')
        if (token) {
            setToken(token)
            axios.post(
                `${process.env.NEXT_PUBLIC_API_URI}/user/getauthenticateuser/post/data`,
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
    }, [token])

    const getUserDetails = (token) => {
        axios.post(
            `${process.env.NEXT_PUBLIC_API_URI}/user/getauthenticateuser/post/data`,
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

    const loginSocial = async () => {
        // signIn()
        let crfToken = await axios.get('/api/auth/csrf')
        let auth = await axios.post('/api/auth/signin/google', { data: crfToken.data.csrfToken })
        console.log(auth.data)
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails, isMobile, getUserDetails, showAuthModal, setShowAuthModal, token, setToken, logout, loginSocial }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider