import React, { useState, useEffect } from 'react'
import { MdSearch } from "react-icons/md";
import Link from 'next/link';
import { useRouter } from 'next/router'

const Header = () => {

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [showSearch, setShowSearch] = useState(true)

    useEffect(() => {
        if (router) {
            if (router.pathname == '/checkout' || router.pathname == '/cart') {
                setShowSearch(false)
            } else {
                setShowSearch(true)
            }
        }
    }, [router])

    const autoSuggest = (e) => {
        if (e.target.value === '') {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
        console.log(e.target.value)
    }

    return (
        <div className="header py-4 fixed top-0 bg-slate-200 w-full z-50">
            <div className="container md:flex justify-between items-center">

                <div className="flex lg-block gap-10">
                    <button className="btn btn-link text-dark menu-btn"><img src="/img/icons/menu.png" alt="" /></button>

                    <Link href='/'>
                        <img src="/img/logo.png" alt="" className="header-logo h-10 cursor-pointer mx-auto" />
                    </Link>
                </div>


                {
                    showSearch ?
                        <div className="flex w-full mt-4 lg:mt-0 lg:w-3/6 relative">
                            <div className="relative w-full mr-1">
                                <MdSearch className='absolute top-3 left-2 text-2xl text-gray-400' />
                                <input onChange={autoSuggest} type="text" className="p-3 w-full rounded-lg pl-10" placeholder="Search store" />
                            </div>
                            <button className='bg-theme p-3 text-xl rounded-lg'>
                                <img src="/img/icons/search.png" alt="" className='' />
                            </button>

                            {
                                isOpen ?
                                    <div className="autocomplete absolute top-14 bg-white p-3 rounded w-11/12">
                                        <ul>
                                            <li>sdas</li>
                                            <li>sdas</li>
                                            <li>sdas</li>
                                        </ul>
                                    </div> :
                                    <></>
                            }
                        </div> :
                        <></>
                }



                <div className="lg:flex justify-between hidden">
                    {/* <span href="" className='text-sm rounded-lg p-3 px-3 bg-white text-gray-600 mx-2'>
                        24/7 help
                    </span> */}
                    <span href="profile.html" className='text-sm rounded-lg p-3 px-3 bg-white flex justify-between items-center text-gray-600 mx-2'>
                        <img src="/img/icons/profile-header.png" alt="" className='h-4 mr-2' />
                        Signup / Login
                    </span>
                </div>

            </div>
        </div>
    )
}

export default Header