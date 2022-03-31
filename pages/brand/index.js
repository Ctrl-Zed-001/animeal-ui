import React from 'react'

const index = () => {
    return (
        <div>index</div>
    )
}

export async function getServerSideProps({ query }) {

    let brandRes = axios.post(`${process.env.NEXT_PUBLIC_API_URI}/brand/homepagebrand`)
    let brands = brandRes.data

    return {
        props: {
            brands: brands
        }
    }
}

export default index