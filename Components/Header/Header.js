import React from 'react'
import { MdSearch, MdPerson } from "react-icons/md";

const Header = () => {
    return (
        <div className="header container mx-auto pt-4">
            <div className="flex justify-between items-center">

                <button className="btn btn-link text-dark menu-btn"><img src="img/icons/menu.png" alt="" /></button>

                <img src="img/logo.png" alt="" className="header-logo h-10" />


                <div className="flex w-3/6">
                    <div class="relative w-full mx-2">
                        <MdSearch className='absolute top-3 left-2 text-2xl text-gray-400' />
                        <input type="text" class="p-3 w-full rounded-lg pl-10" placeholder="Search store" />
                    </div>
                    <button className='bg-theme p-3 text-xl rounded-lg'>
                        <img src="img/icons/search.png" alt="" className='' />
                    </button>
                </div>


                <div className="flex justify-between">
                    <a href="" className='text-sm rounded-lg p-3 px-3 bg-white text-gray-600 mx-2'>
                        24/7 help
                    </a>
                    <a href="profile.html" className='text-sm rounded-lg p-3 px-3 bg-white flex justify-between items-center text-gray-600 mx-2'>
                        <img src="img/icons/profile-header.png" alt="" className='h-4 mr-2' />
                        Profile
                    </a>
                </div>

            </div>
        </div>
    )
}

export default Header