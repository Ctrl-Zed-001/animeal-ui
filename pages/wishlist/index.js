import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import WishlistBox from '../../Components/WishlistComponents/WishlistBox'
import { AuthContext } from '../../Context/AuthContext'

const Wishlist = () => {

    const { token } = useContext(AuthContext)
    const [wishlistProducts, setWishlistProducts] = useState([])

    useEffect(() => {
        if (token) {
            axios.post(
                `${process.env.NEXT_PUBLIC_API_URI}/wishlist/getall`,
                {},
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
                .then(res => setWishlistProducts(res.data.data))
                .catch(err => console.log(err))
        }

    }, [token])

    const remove = (id) => {
        if (token) {
            axios.post(`${process.env.NEXT_PUBLIC_API_URI}/wishlist/remove`,
                {
                    id: id,
                },
                {
                    headers: {
                        Authorization: token
                    }
                })
                .then(res => {
                    let oldList = [...wishlistProducts]
                    let newList = oldList.filter(item => item.id !== id)
                    setWishlistProducts([...newList])
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="container wishlist-page my-16 lg:my-10">
            <h1 className="font-medium text-2xl">My Wishlist</h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                {
                    wishlistProducts && wishlistProducts.length > 0 ?
                        wishlistProducts.map((item, index) => {
                            return <WishlistBox key={index} item={item} product={item.product} remove={remove} />
                        }) :
                        <p>No items in your wishlist.</p>
                }
            </div>
        </div>
    )
}

export default Wishlist