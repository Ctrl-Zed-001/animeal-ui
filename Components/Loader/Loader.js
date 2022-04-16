import React from 'react'

const Loader = () => {
    return (
        <div className='fixed top-0 w-screen h-screen bg-white z-50 flex items-center justify-center loader'>
            <img src="/img/loader.gif" alt="" className='h-32' />
        </div>
    )
}

export default Loader