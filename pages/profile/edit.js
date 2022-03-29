import React from 'react'
import ProfileInfoBox from '../../Components/ProfilePageComponents/ProfileInfoBox'

const edit = () => {
  return (
    <div className="change-password">
      <div className="container">
        <h1 className='font-semibold text-2xl mb-4'>Change Password</h1>

        <div className="grid grid-cols-12">
          {/* PROFILE INFO */}
          <ProfileInfoBox />

          <div className="blank-col"></div>

          {/* PROFILE ACTIONS */}
          <div className="profile-action-section col-span-8">

          </div>
        </div>

      </div>
    </div>
  )
}

export default edit