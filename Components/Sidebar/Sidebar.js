import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

const Sidebar = () => {

    const { userDetails } = useContext(AuthContext)

    return (
        <div className="sidebar">
            <div className="text-center">
                <div className="figure-menu shadow">
                    <figure><img src={`${userDetails && userDetails.proimg ? userDetails.proimg : '/img/user.png'}`} alt="" /></figure>
                </div>
                <h5 className="mb-1 text-lg font-semibold">{
                    userDetails && userDetails.name ?
                        `Hello! ${userDetails.name}` :
                        'Welcome To Animeal'
                }</h5>
            </div>
            <br />

            <ul>
                <li className='flex items-center'></li>
            </ul>

        </div>
    )
}

export default Sidebar