import React from 'react'
import { MdStore, MdAccountCircle, MdFavorite, MdLocalMall, MdPets } from "react-icons/md";

const BottomNavigation = () => {
    return (
        <div className="bottom-navigation">

            <div className="mx-auto">
                <div className="flex justify-center items-center text-gray-400 text-2xl">
                    <div className="p-4">
                        <a href="index.html" className="btn btn-link-default active">
                            <MdStore className='footer-icons' />
                        </a>
                    </div>
                    <div className="p-4">
                        <a href="statistics.html" className="btn btn-link-default">
                            <MdPets className='footer-icons' />
                        </a>
                    </div>
                    <div className="p-4">
                        <a href="cart.html" className="btn btn-default shadow centerbutton bg-theme">
                            <img src="img/icons/cart.png" alt="" />
                        </a>
                    </div>
                    <div className="p-4">
                        <a href="favorite-products.html" className="btn btn-link-default">
                            <MdFavorite className='footer-icons' />
                        </a>
                    </div>
                    <div className="p-4">
                        <a href="profile.html" className="btn btn-link-default">
                            <MdAccountCircle className='footer-icons' />
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BottomNavigation