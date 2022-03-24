import React, { createContext, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import config from '../config.json'
import { useRouter } from 'next/router';
import { AuthContext } from './AuthContext';

export const CartContext = createContext()

const CartContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [qty, setQty] = useState(0)

    const { token } = useContext(AuthContext)

    useEffect(() => {
        if (token) {
            axios.post(
                `${config.api_uri}/user/getcart/post/data`,
                {},
                {
                    headers: {
                        Authorization: token
                    }
                })
                .then(res => {
                    setCartItems(res.data.cartDetails)
                    setTotalAndQuantity(res.data.cartDetails)
                })
                .catch(err => console.log(err))
        }
    }, [token])

    const setTotalAndQuantity = (data) => {
        let total = 0;
        let quantity = 0
        data.forEach(item => {
            total = parseInt(total) + parseInt(item[0].product_total)
            quantity = parseInt(quantity) + parseInt(item[0].quantity)
        })
        setCartTotal(total)
        setQty(quantity)
    }

    const updateCartQuantity = (action, id, quantity) => {
        axios.post(
            `${config.api_uri}/user/${action}/post/data`,
            {
                "product_id": id,
                "quantity": quantity
            },
            {
                headers: {
                    Authorization: token
                }
            }
        )
            .then(res => {
                let oldList = [...cartItems];
                let oldItemIndex = cartItems.findIndex(item => item[0].product_id == id)
                if (action === 'updatecartplus') {
                    oldList[oldItemIndex][0] = { ...oldList[oldItemIndex][0], quantity: parseInt(oldList[oldItemIndex][0].quantity) + 1, product_total: res.data.cartUpdatePlus.product_total }
                } else {
                    oldList[oldItemIndex][0] = { ...oldList[oldItemIndex][0], quantity: parseInt(oldList[oldItemIndex][0].quantity) - 1, product_total: res.data.cartUpdateMinus.product_total }
                }
                setCartItems([...oldList])
                setTotalAndQuantity([...oldList])
            })
            .catch(err => console.log(err))
    }

    const addToCart = (item) => {
        setCartItems([...cartItems, item])
        setTotalAndQuantity([...cartItems, item])
    }

    const removeCartItem = (id, type) => {
        axios.post(
            `${config.api_uri}/user/removecartitem/post/data`,
            {
                "product_id": id
            },
            {
                headers: {
                    Authorization: token
                }
            }
        )
            .then(res => {
                if (type === 'all') {
                    setCartItems([])
                } else {
                    let oldList = [...cartItems];
                    let newList = oldList.filter(item => item[0].product_id !== id)
                    setCartItems([...newList])
                }
            })
            .catch(err => console.log(err))
    }

    const removeAllItems = () => {
        cartItems.forEach(item => {
            removeCartItem(item[0].product_id, 'all')
        })
    }

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, cartTotal, setCartTotal, qty, setQty, removeAllItems, removeCartItem, updateCartQuantity, addToCart }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider