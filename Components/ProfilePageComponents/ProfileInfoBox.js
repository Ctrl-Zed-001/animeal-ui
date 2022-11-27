import React, { useContext } from 'react'
import dayjs from 'dayjs'
import { AuthContext } from '../../Context/AuthContext'

const ProfileInfoBox = () => {
    const { userDetails } = useContext(AuthContext)
    console.log("🚀 ~ file: ProfileInfoBox.js ~ line 7 ~ ProfileInfoBox ~ userDetails", userDetails)
    return (
        <div className="profile info-section bg-theme p-4 rounded-lg col-span-3 pb-10">

            <div className="xl:grid grid-cols-12">

                <div className="left-part xl:flex col-span-5 items-center text-center lg:text-left">
                    <img src="/img/user.webp" alt="" className="mx-auto h-40" />
                    <div className="name">
                        <h1 className="text-2xl font-bold">
                            {userDetails?.name}
                        </h1>
                        <h1 className="text-xl font-semibold">
                            {userDetails?.email}
                        </h1>
                    </div>
                </div>
                <div className="col-span-3"></div>

                <div className="right-part col-span-4 flex items-center mt-4 lg:mt-0">
                    <table className='w-full'>
                        <tbody>
                            <tr>
                                <td className="font-semibold p-2">Number :</td>
                                <td>{userDetails?.phone}</td>
                            </tr>
                            <tr className='border-slate-300'>
                                <td className="font-semibold p-2">Alt Number :</td>
                                <td>{userDetails?.alt_phone}</td>
                            </tr>
                            <tr className='border-slate-300'>
                                <td className="font-semibold p-2">Joined on :</td>
                                <td>{dayjs(userDetails?.created_at).format('DD MMM YYYY')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}

export default ProfileInfoBox