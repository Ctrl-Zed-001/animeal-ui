import React, {useContext} from 'react'
import dayjs from 'dayjs'
import { AuthContext } from '../../Context/AuthContext'

const ProfileInfoBox = () => {
    const { userDetails } = useContext(AuthContext)
  return (
    <div className="profile info-section bg-white p-4 rounded-lg col-span-3">
                        <img src="/img/user.png" alt="" className="mx-auto h-40" />

                        <table className="w-full mt-8 text-sm">
                            <tr className='border-b border-slate-300'>
                                <td className="font-semibold p-2">Name :</td>
                                <td>{userDetails?.name}</td>
                            </tr>
                            <tr className='border-b border-slate-300'>
                                <td className="font-semibold p-2">email :</td>
                                <td>{userDetails?.email}</td>
                            </tr>
                            <tr className='border-b border-slate-300'>
                                <td className="font-semibold p-2">Number :</td>
                                <td>{userDetails?.number}</td>
                            </tr>
                            <tr className='border-b border-slate-300'>
                                <td className="font-semibold p-2">Alt Number :</td>
                                <td>{userDetails?.altnumber}</td>
                            </tr>
                            <tr className='border-b border-slate-300'>
                                <td className="font-semibold p-2">Joined on :</td>
                                <td>{dayjs(userDetails?.created_at).format('DD MMM YYYY')}</td>
                            </tr>
                        </table>
                    </div>
  )
}

export default ProfileInfoBox