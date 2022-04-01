import React, { useContext } from 'react'
import dayjs from 'dayjs'
import { AuthContext } from '../../Context/AuthContext'

const ProfileInfoBox = () => {
    const { userDetails } = useContext(AuthContext)
    return (
        <div className="profile info-section bg-theme p-4 rounded-lg col-span-3 pb-10">

            <div className="grid grid-cols-12">

                <div className="left-part flex col-span-5 items-center">
                    <img src="/img/user.png" alt="" className="mx-auto h-40" />
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

                <div className="right-part col-span-4 flex items-center">
                    <table className='w-full'>
                        <tbody>
                            <tr>
                                <td className="font-semibold p-2">Number :</td>
                                <td>{userDetails?.number}</td>
                            </tr>
                            <tr className='border-slate-300'>
                                <td className="font-semibold p-2">Alt Number :</td>
                                <td>{userDetails?.altnumber}</td>
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