import React, { useContext, useEffect } from 'react'
import ActionBox from '../../Components/ProfilePageComponents/ActionBox'
import ProfileInfoBox from '../../Components/ProfilePageComponents/ProfileInfoBox'
import { AuthContext } from '../../Context/AuthContext'
import { useRouter } from 'next/router'


const Profile = () => {

    const { isLoggedIn } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/')
        }
    })

    return (
        <div className="profile-page my-10">
            <div className="container">
                <h1 className='font-semibold text-2xl mb-4'>My Profile</h1>

                <div className="grid grid-cols-12">
                    {/* PROFILE INFO */}
                    <ProfileInfoBox />

                    <div className="blank-col"></div>

                    {/* PROFILE ACTIONS */}
                    <div className="profile-action-section col-span-8">
                        <div className="grid grid-cols-2 gap-10">
                            <ActionBox title="My Orders" icon="my-orders" link='/profile/orders' />
                            <ActionBox title="Saved Addresses" icon="view-addresses" link='/profile/address' />
                            <ActionBox title="Edit Profile" icon="edit-profile" link='/profile/edit' />
                            <ActionBox title="Change Password" icon="change-password" link='/profile/change-password' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile