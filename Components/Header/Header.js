import React, { useState, useEffect, useContext, useRef } from 'react'
import { MdSearch } from "react-icons/md";
import Link from 'next/link';
import { useRouter } from 'next/router'
import axios from 'axios';

import AuthPopup from './AuthPopup';
import { AuthContext } from '../../Context/AuthContext'
import { HiOutlineLogout } from 'react-icons/hi'
import Capitalize from '../../Helpers/Capitalize'


const Header = (props) => {

    const router = useRouter()
    const { isLoggedIn, isMobile, setShowAuthModal, logout } = useContext(AuthContext)
    const autoSuggestDropdownRef = useRef([])

    const [showSearch, setShowSearch] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [suggestionHeading, setSuggestionHeading] = useState('Top Suggestions')
    const [showHelpline, setShowHelpline] = useState(false)
    const [highlightedSuggestion, setHighlightedSuggestion] = useState(0)


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
        axios.post(`${process.env.NEXT_PUBLIC_API_URI}/dyanamicsearch/get/data`, { query: '' })
            .then(res => setSuggestions(res.data.searchValues))
            .catch(err => console.log(err))
    }, [])

    const unHighlightAll = () => {
        autoSuggestDropdownRef.current.forEach(element => element.classList.remove('bg-slate-200'))
    }
    // const highlightSuggestion = (e) => {
    //     console.log(highlightedSuggestion)
    //     console.log(autoSuggestDropdownRef.current[highlightedSuggestion])

    //     if (e.code == "ArrowDown" && highlightedSuggestion === 0) {
    //         unHighlightAll()
    //         autoSuggestDropdownRef.current[0].classList.add('bg-slate-200')
    //         setHighlightedSuggestion(1)
    //     } else if (e.code == "ArrowDown" && highlightedSuggestion !== 5) {
    //         unHighlightAll()
    //         autoSuggestDropdownRef.current[highlightedSuggestion].classList.add('bg-slate-200')
    //         setHighlightedSuggestion(highlightedSuggestion + 1)
    //     } else if (e.code == "ArrowUp" && highlightedSuggestion === 0) {
    //         unHighlightAll()
    //         autoSuggestDropdownRef.current[4].classList.add('bg-slate-200')
    //         setHighlightedSuggestion(3)
    //     } else if (e.code == "ArrowUp" && highlightedSuggestion >= 1) {
    //         unHighlightAll()
    //         autoSuggestDropdownRef.current[highlightedSuggestion].classList.add('bg-slate-200')
    //         setHighlightedSuggestion(highlightedSuggestion - 1)
    //     }
    // }

    const autoSuggest = async (e) => {
        // SET SEARCH VALUE STATE
        setSearchValue(e.target.value)
        // CALL AUTOSUGGEST API
        let suggestionData = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/dyanamicsearch/get/data`, { query: e.target.value.toLowerCase() })

        if (e.target.value === '') {
            // SET SUGGESTION HEADING AS TOP SUGGESTIONS
            setSuggestionHeading("Top Suggestions")

        } else if (suggestionData.data.searchValues.length === 0) {
            // SET SUGGESTION HEADING AS TOP RESULTS..
            setSuggestionHeading("No Results Found")
        } else {
            setSuggestionHeading("Top Results")
        }


        setSuggestions(suggestionData.data.searchValues)
    }

    const search = (query) => {
        setSearchValue(query)
        router.replace(`/shop?slug=${encodeURIComponent(query)}`)
    }


    return (
        <div className="header py-4 fixed top-0 w-full z-50">
            <div className="container lg:flex justify-between items-center">

                <div className={`flex lg-block gap-10 ${showSearch ? '' : 'flex-1'}`}>
                    <button className="btn btn-link text-dark menu-btn"><img src="/img/icons/menu.webp" alt="" /></button>

                    <Link href='/'>
                        <img src="/img/logo.webp" alt="" className="header-logo h-10 cursor-pointer mx-auto" />
                    </Link>
                    {
                        isLoggedIn ?
                            <span onClick={logout} className='block md:hidden text-sm rounded-lg p-3 px-3 bg-red-400 text-white justify-between items-center mx-2 cursor-pointer'>
                                <HiOutlineLogout className='text-lg  mr-1' />
                            </span> :
                            <></>
                    }

                </div>


                {
                    showSearch ?
                        <div className="flex w-full mt-4 lg:mt-0 lg:w-3/6 relative">
                            <form className='flex w-full' onSubmit={(e) => { e.preventDefault(); search(searchValue) }}>
                                <div className="relative w-full mr-1">
                                    <MdSearch className='absolute top-3 left-2 text-2xl text-gray-400' />
                                    <input value={searchValue} onChange={autoSuggest} type="text" className="p-3 w-full rounded-lg pl-10" placeholder="Search store" onClick={() => props.setIsAutoSuggestOpen(!props.isAutoSuggestOpen)} />
                                </div>
                                <button type="submit" className='bg-theme p-3 text-xl rounded-lg'>
                                    <img src="/img/icons/search.webp" alt="" className='' />
                                </button>
                            </form>

                            {
                                props.isAutoSuggestOpen ?
                                    <div className="autocomplete absolute top-14 bg-white rounded-lg w-11/12">
                                        <h1 className='p-2 text-theme text-xs'>{suggestionHeading}</h1>
                                        <ul >
                                            {
                                                suggestions.map((suggestion, index) => {
                                                    return <li ref={el => autoSuggestDropdownRef.current[index] = el} onClick={() => search(suggestion.keyword)} className='hover:bg-slate-100 p-3 rounded cursor-pointer' key={index}>{Capitalize(suggestion.keyword)}</li>
                                                })
                                            }


                                        </ul>
                                    </div> :
                                    <></>
                            }
                        </div> :
                        <></>
                }




                <div className="lg:flex justify-between hidden relative">
                    <a href="tel:+919004485093" className='z-10 text-sm rounded-lg p-3 px-3 bg-white text-gray-600 mx-2 cursor-pointer' onMouseEnter={() => setShowHelpline(true)} onMouseLeave={() => setShowHelpline(false)}>
                        24/7 help
                    </a>
                    {
                        isLoggedIn ?
                            <span onClick={logout} className='hidden lg:flex text-sm rounded-lg p-3 px-3 bg-red-500 text-white justify-between items-center mx-2 cursor-pointer'>
                                <HiOutlineLogout className='text-lg  mr-1' />
                                Logout
                            </span> :
                            <span onClick={() => setShowAuthModal(true)} className='text-sm rounded-lg p-3 px-3 bg-white flex justify-between items-center text-gray-600 mx-2 cursor-pointer'>
                                <img src="/img/icons/profile-header.webp" alt="" className='h-4 mr-2' />
                                Signup / Login
                            </span>
                    }

                    <div className={`${showHelpline ? 'block' : 'hidden'}  helplinepopup bg-white rounded-lg p-4 text-center absolute top-14 -left-28 transition-all z-10`}>
                        <p className="text-sm text-gray-500 pb-2">Get help from our experts 24/7</p>
                        <h2 className="text-2xl">Mumbai - 9004485093, Navi Mumbai - 9004575093</h2>
                    </div>
                </div>

            </div>
            <AuthPopup isMobile={isMobile} />
            <div className={`${showHelpline ? 'block' : 'hidden'}  helplinepopup bg-black opacity-40 z-0 absolute top-0 left-0 transition-all h-screen w-screen`}>
            </div>
        </div>
    )
}

export default Header