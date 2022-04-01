import React, { useContext, useEffect } from 'react'
import ProfileInfoBox from './ProfileInfoBox'
import { AuthContext } from '../../Context/AuthContext'
import { useRouter } from 'next/router'

const EditProfile = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/')
    }
  })

  return (
    <div className="change-password">
      <div className="container">
        <h1 className='font-semibold text-2xl mb-4'>Edit Profile</h1>

        <div className="grid grid-cols-12">
          {/* PROFILE INFO */}
          <ProfileInfoBox />

          <div className="blank-col"></div>

          {/* EDIT PROFILE */}
          <div className="profile-action-section col-span-8">
            <form></form>
          </div>


        </div>

      </div>
    </div>
  )
}

export default EditProfile