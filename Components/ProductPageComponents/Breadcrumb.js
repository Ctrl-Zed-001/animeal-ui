import React from 'react'
import Link from 'next/link'

const Breadcrumb = (props) => {
    return (
        <ol className={`${props.className} list-reset md:flex text-grey-dark text-xs text-slate-500`}>
            <li><a href="#" className="text-blue">Home</a></li>
            <li><span className="mx-2">/</span></li>
            <li><a href="#" className="text-blue">Library</a></li>
            <li><span className="mx-2">/</span></li>
            <li>Data</li>
        </ol>
    )
}

export default Breadcrumb