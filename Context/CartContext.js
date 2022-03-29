import React, { createContext, useEffect, useState, useContext } from 'react'
import axios from 'axios'

import { useRouter } from 'next/router';
import { AuthContext } from './AuthContext';

export const CartContext = createContext()

const CartContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [qty, setQty] = useState(0)
    const [cartDiscount, setCartDiscount] = useState(0)
    const [subTotal, setSubtotal] = useState(0)
    const [hasMedicine, setHasMedicine] = useState(false)

    const { token } = useContext(AuthContext)

    useEffect(() => {
        if (token) {
            axios.post(
                `${process.env.NEXT_PUBLIC_API_URI}/user/getcart/post/data`,
                {},
                {
                    headers: {
                        Authorization: token
                    }
                })
                .then(res => {
                    setCartItems(res.data.cartDetails)
                    setTotalAndQuantity(res.data.cartDetails)
                    checkMedicine(res.data.cartDetails)
                })
                .catch(err => console.log(err.response))
        }
    }, [token])

    const setTotalAndQuantity = (data) => {
        let total = 0;
        let quantity = 0;
        let discount = 0;
        let subtotal = 0;
        data.forEach(item => {
            total = parseInt(total) + parseInt(item[0].product_total)
            quantity = parseInt(quantity) + parseInt(item[0].quantity)
            discount = parseInt(discount) + parseInt(item[0].product_discount_total)
            subtotal = parseInt(total) + parseInt(discount)
        })
        setCartTotal(total)
        setQty(quantity)
        setCartDiscount(discount)
        setSubtotal(subtotal)
    }

    const checkMedicine = (data) => {
        let containFilter = data.filter(item => item[0].category == "MEDICINE")
        if (containFilter.length > 0) {
            setHasMedicine(true)
        }
    }

    const updateCartQuantity = (action, id, quantity) => {
        axios.post(
            `${process.env.NEXT_PUBLIC_API_URI}/user/${action}/post/data`,
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
                    oldList[oldItemIndex][0] = { ...oldList[oldItemIndex][0], quantity: parseInt(oldList[oldItemIndex][0].quantity) + 1, product_total: res.data.cartUpdatePlus.product_total, product_discount_total: parseInt(res.data.cartUpdatePlus.product_discount_total) }
                } else {
                    oldList[oldItemIndex][0] = { ...oldList[oldItemIndex][0], quantity: parseInt(oldList[oldItemIndex][0].quantity) - 1, product_total: res.data.cartUpdateMinus.product_total, product_discount_total: parseInt(res.data.cartUpdateMinus.product_discount_total) }
                }
                setCartItems([...oldList])
                setTotalAndQuantity([...oldList])
            })
            .catch(err => console.log(err))
    }

    const addToCart = (item) => {
        setCartItems([...cartItems, item])
        setTotalAndQuantity([...cartItems, item])
        checkMedicine([...cartItems, item])
    }

    const removeCartItem = (id, type) => {
        axios.post(
            `${process.env.NEXT_PUBLIC_API_URI}/user/removecartitem/post/data`,
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

    const clearCart = () => {
        setCartItems([])
    }

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, cartTotal, setCartTotal, qty, setQty, removeAllItems, removeCartItem, updateCartQuantity, addToCart, cartDiscount, subTotal, clearCart, hasMedicine }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider