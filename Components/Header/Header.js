import React, { useState, useEffect, useContext } from 'react'
import { MdSearch } from "react-icons/md";
import Link from 'next/link';
import { useRouter } from 'next/router'
import axios from 'axios';
import config from '../../config.json'
import AuthPopup from './AuthPopup';
import { AuthContext } from '../../Context/AuthContext'
import { HiOutlineLogout } from 'react-icons/hi'


const Header = (props) => {

    const router = useRouter()
    const { isLoggedIn, isMobile, setShowAuthModal, logout } = useContext(AuthContext)

    const [showSearch, setShowSearch] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [suggestionHeading, setSuggestionHeading] = useState('Top Suggestions')


    useEffect(() => {
        if (router) {
            if (router.pathname == '/checkout' || router.pathname == '/cart') {
                setShowSearch(false)
            } else {
                setShowSearch(true)
            }
        }
    }, [router])

    useEffect(() => {
        // CALL AUTOSUGGEST API
        axios.post(`${config.api_uri}/dyanamicsearch/get/data`, { query: '' })
            .then(res => setSuggestions(res.data.searchValues))
            .catch(err => console.log(err))
    }, [])


    const autoSuggest = async (e) => {
        // SET SEARCH VALUE STATE
        setSearchValue(e.target.value)
        // CALL AUTOSUGGEST API
        let suggestionData = await axios.post(`${config.api_uri}/dyanamicsearch/get/data`, { query: e.target.value.toLowerCase() })

        if (e.target.value === '') {
            // SET SUGGESTION HEADING AS TOP SUGGESTIONS
            setSuggestionHeading("Top Suggestions")

        } else {
            // SET SUGGESTION HEADING AS TOP RESULTS..
            setSuggestionHeading("Top Results")
        }

        setSuggestions(suggestionData.data.searchValues)
    }



    return (
        <div className="header py-4 fixed top-0 bg-slate-200 w-full z-50">
            <div className="container lg:flex justify-between items-center">

                <div className={`flex lg-block gap-10 ${showSearch ? '' : 'flex-1'}`}>
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
                                <input onChange={autoSuggest} type="text" className="p-3 w-full rounded-lg pl-10" placeholder="Search store" onClick={() => props.setIsAutoSuggestOpen(!props.isAutoSuggestOpen)} />
                            </div>
                            <Link href={`/shop?slug=${searchValue}`}>
                                <button className='bg-theme p-3 text-xl rounded-lg'>
                                    <img src="/img/icons/search.png" alt="" className='' />
                                </button>
                            </Link>

                            {
                                props.isAutoSuggestOpen ?
                                    <div className="autocomplete absolute top-14 bg-white rounded-lg w-11/12">
                                        <h1 className='p-2 text-theme text-xs'>{suggestionHeading}</h1>
                                        <ul>
                                            {
                                                suggestions.map((suggestion, index) => {
                                                    return <li className='hover:bg-slate-100 p-3 rounded cursor-pointer' key={index}>{suggestion.metakeywords}</li>
                                                })
                                            }


                                        </ul>
                                    </div> :
                                    <></>
                            }
                        </div> :
                        <></>
                }



                {
                    isLoggedIn ?
                        <span onClick={logout} className='hidden lg:flex text-sm rounded-lg p-3 px-3 bg-white justify-between items-center text-gray-600 mx-2 cursor-pointer'>
                            <HiOutlineLogout className='text-lg  mr-1' />
                            Logout
                        </span>
                        :
                        <div className="lg:flex justify-between hidden">
                            {/* <span href="" className='text-sm rounded-lg p-3 px-3 bg-white text-gray-600 mx-2'>
                        24/7 help
                    </span> */}
                            <span onClick={() => setShowAuthModal(true)} className='text-sm rounded-lg p-3 px-3 bg-white flex justify-between items-center text-gray-600 mx-2 cursor-pointer'>
                                <img src="/img/icons/profile-header.png" alt="" className='h-4 mr-2' />
                                Signup / Login
                            </span>
                        </div>}

            </div>
            <AuthPopup isMobile={isMobile} />
        </div>
    )
}

export default Header