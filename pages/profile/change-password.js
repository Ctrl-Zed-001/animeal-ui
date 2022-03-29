import React, { useState, useContext } from 'react'
import ProfileInfoBox from '../../Components/ProfilePageComponents/ProfileInfoBox'
import { Input, Spacer } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext'
import LogoutPopup from '../../Components/ProfilePageComponents/LogoutPopup';

const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [logoutModal, setLogoutModal] = useState(false)

    const { token, logout } = useContext(AuthContext)

    const changePassword = (e) => {
        e.preventDefault()
        axios.post(
            `${process.env.NEXT_PUBLIC_API_URI}/user/changepassword/post/data`,
            {
                onetimepassword: oldPassword,
                password: newPassword,
                password_confirmation: checkPassword
            },
            {
                headers: {
                    Authorization: token
                }
            }
        )
            .then(res => {
                if (res.data.passwordChanged) {
                    setLogoutModal(true)
                }
            })
            .catch(err => {
                if (err.response.data.newPasswordError) {
                    toast.error(err.response.data.newPasswordError)
                } else {
                    toast.error(err.response.data.errors)
                }
            })
    }

    return (
        <div className="change-password">
            <div className="container">
                <h1 className='font-semibold text-2xl mb-4'>Change Password</h1>

                <div className="grid grid-cols-12">
                    {/* PROFILE INFO */}
                    <ProfileInfoBox />

                    <div className="blank-col"></div>

                    {/* PROFILE ACTIONS */}
                    <div className="col-span-8">
                        <div className="bg-white rounded-lg p-4 w-5/12">
                            <form onSubmit={changePassword}>
                                <Input.Password onChange={(e) => setOldPassword(e.target.value)} fullWidth label="Old Password" />
                                <Spacer y={1} />
                                <Input.Password onChange={(e) => setNewPassword(e.target.value)} fullWidth label="New Password" />
                                <Spacer y={1} />
                                <Input.Password onChange={(e) => setCheckPassword(e.target.value)} fullWidth label="Retype New Password" />
                                <Spacer y={1} />
                                <button type="submit" className='w-full bg-theme p-3 rounded-lg'>Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Toaster
                    position="top-center"
                />
            </div>

            <LogoutPopup isOpen={logoutModal} close={() => { setLogoutModal(false); logout() }} />
        </div>
    )
}

export default ChangePassword