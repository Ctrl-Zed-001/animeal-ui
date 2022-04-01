import React, { useContext, useEffect, useState } from 'react'
import ActionBox from '../../Components/ProfilePageComponents/ActionBox'
import ProfileInfoBox from '../../Components/ProfilePageComponents/ProfileInfoBox'
import { AuthContext } from '../../Context/AuthContext'
import { useRouter } from 'next/router'
import { FiChevronRight } from 'react-icons/fi'
import ChangePassword from '../../Components/ProfilePageComponents/change-password'
import Orders from '../../Components/ProfilePageComponents/orders'
import EditProfile from '../../Components/ProfilePageComponents/edit'


const Profile = () => {

    const { isLoggedIn } = useContext(AuthContext)
    const router = useRouter()

    const [activeSection, setActiveSection] = useState(1)

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/')
        }
    })

    return (
        <div className="profile-page my-10">
            <div className="container">
                <h1 className='font-semibold text-2xl mb-4'>My Profile</h1>

                {/* PROFILE INFO */}
                <ProfileInfoBox />

                <div className="blank-col"></div>

                {/* PROFILE ACTIONS */}
                <div className="profile-action-section col-span-8 bg-white rounded-xl p-4 -translate-y-6 h-fit py-12">
                    {/* <div className="grid grid-cols-2 gap-10">
                        <ActionBox title="My Orders" icon="my-orders" link='/profile/orders' />
                        <ActionBox title="Saved Addresses" icon="view-addresses" link='/profile/address' />
                        <ActionBox title="Edit Profile" icon="edit-profile" link='/profile/edit' />
                        <ActionBox title="Change Password" icon="change-password" link='/profile/change-password' />
                    </div> */}

                    <div className="grid grid-cols-12">

                        <div className="empty-col"></div>

                        <div className="left-part col-span-3 items-center">

                            <div className="action-box flex justify-between bg-slate-100 p-4 rounded-lg my-2 font-semibold">
                                <img src="/img/icons/myorders.png" alt="" />
                                <h1>My Orders</h1>
                                <FiChevronRight />
                            </div>
                            <div className="action-box flex justify-between bg-slate-100 p-4 rounded-lg my-2 font-semibold">
                                <img src="/img/icons/addresses.png" alt="" />
                                <h1>Saved Addresses</h1>
                                <FiChevronRight />
                            </div>
                            <div className="action-box flex justify-between bg-slate-100 p-4 rounded-lg my-2 font-semibold">
                                <img src="/img/icons/changepassword.png" alt="" />
                                <h1>Change Password</h1>
                                <FiChevronRight />
                            </div>

                        </div>

                        <div className="empty-col"></div>

                        <div className="right-part col-span-7">
                            {
                                activeSection === 1 ?
                                    <ChangePassword /> :
                                    activeSection === 2 ?
                                        <Orders /> :
                                        <EditProfile />
                            }
                        </div>

                    </div>


                </div>


            </div>
        </div>
    )
}

export default Profile