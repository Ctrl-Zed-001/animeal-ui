import Link from 'next/link';
import React, { useContext } from 'react'
import { MdStore, MdAccountCircle, MdFavorite, MdPets } from "react-icons/md";
import { AuthContext } from '../../Context/AuthContext'

const BottomNavigation = (props) => {

    const { setShowAuthModal, isLoggedIn } = useContext(AuthContext)

    return (
        <div className="bottom-navigation">

            <div className="mx-auto">
                <div className="flex justify-center items-center text-gray-400 text-2xl">
                    <div className="p-4">
                        <Link href="/">
                            <div className="btn btn-link-default cursor-pointer">
                                <MdStore className='footer-icons' />
                            </div>
                        </Link>
                    </div>
                    <div className="p-4">
                        <Link href="/">
                            <div className="btn btn-link-default cursor-pointer">
                                <MdPets className='footer-icons' />
                            </div>
                        </Link>
                    </div>
                    <div className="p-4">
                        <Link href="/cart">
                            <div className="btn btn-default shadow centerbutton bg-theme cursor-pointer">
                                <img src="/img/icons/cart.png" alt="" />
                            </div>
                        </Link>
                    </div>
                    <div className="p-4">
                        {
                            isLoggedIn ?
                                <Link href="/wishlist">
                                    <div className="btn btn-link-default cursor-pointer">
                                        <MdFavorite className='footer-icons' />
                                    </div>
                                </Link> :
                                <div onClick={() => setShowAuthModal(true)} className="btn btn-link-default cursor-pointer">
                                    <MdFavorite className='footer-icons' />
                                </div>
                        }
                    </div>
                    <div className="p-4">
                        {
                            isLoggedIn ?
                                <Link href='/profile'>
                                    <div className="btn btn-link-default cursor-pointer">
                                        <MdAccountCircle className='footer-icons' />
                                    </div>
                                </Link> :
                                <div onClick={() => setShowAuthModal(true)} className="btn btn-link-default cursor-pointer">
                                    <MdAccountCircle className='footer-icons' />
                                </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BottomNavigation