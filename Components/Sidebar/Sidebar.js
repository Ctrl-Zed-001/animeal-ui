import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { BsUnlockFill, BsFillPatchQuestionFill, BsFileRichtextFill } from 'react-icons/bs'
import { MdPets, MdLoop } from 'react-icons/md'
import { FaFileContract } from 'react-icons/fa'

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

            <ul className='pl-5'>
                <li className='flex items-center font-medium text-white gap-2 p-2 my-3 cursor-pointer'><MdPets /> About Us</li>
                <li className='flex items-center font-medium text-white gap-2 p-2 my-3 cursor-pointer'><BsUnlockFill /> Privacy Policy</li>
                <li className='flex items-center font-medium text-white gap-2 p-2 my-3 cursor-pointer'><MdLoop /> Refund & Cancelation</li>
                <li className='flex items-center font-medium text-white gap-2 p-2 my-3 cursor-pointer'><FaFileContract /> Terms & Conditions</li>
                <li className='flex items-center font-medium text-white gap-2 p-2 my-3 cursor-pointer'><BsFillPatchQuestionFill /> FAQ</li>
                <li className='flex items-center font-medium text-white gap-2 p-2 my-3 cursor-pointer'><BsFileRichtextFill /> Blogs</li>
            </ul>

        </div>
    )
}

export default Sidebar