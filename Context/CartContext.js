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
    const [refreshCart, setRefreshCart] = useState(1)

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
                    checkLocalCartAndUpdate(res.data.cartDetails)
                })
                .catch(err => console.log(err))
        } else {
            setCartItems([]);
            setCartTotal(0)
            setQty(0)
            setCartDiscount(0)
            setSubtotal(0)
            setHasMedicine(false)
        }
    }, [token])

    useEffect(() => {
        if (localStorage.getItem('unauthcart')) {
            console.log("in here")
            let unauthcart = JSON.parse(localStorage.getItem('unauthcart'))
            setCartItems([...unauthcart]);
            validateAndUpdateCart([...unauthcart])
        }
    }, [refreshCart])


    const checkLocalCartAndUpdate = (data) => {
        let localCart = JSON.parse(localStorage.getItem('unauthcart'))

        if (localCart && data === null) {
            // LOCAL MEI HAI BUT RES MEI NAI
            setCartItems([...localCart]);
            validateAndUpdateCart([...localCart])
        } else if (!localCart && data != null) {
            // RES MEI HAI BUT LOCAL MEI NAI
            setCartItems(data)
            validateAndUpdateCart(data)
        } else {
            // DONO MEI HAI
            // CHECK K SAME PRODUCT WAPS TO NAI DALA

            data.forEach((item, index) => {
                localCart = localCart.filter(localItem => localItem[0].product_id !== item[0].product_id)
            })
            let newList = [...data, ...localCart]

            setCartItems([...newList])
            validateAndUpdateCart([...newList])
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
                if (res.data.cartUpdatePlus === null || res.data.cartUpdateMinus === null) {
                    let localCart = JSON.parse(localStorage.getItem('unauthcart'))
                    let newItem = localCart.filter(item => item[0].product_id == id)
                    axios.post(`${process.env.NEXT_PUBLIC_API_URI}/user/addtocart/post/data`,
                        {
                            product_id: newItem[0][0].product_id,
                            quantity: 2
                        },
                        {
                            headers: {
                                Authorization: token
                            }
                        })
                        .then(res => {
                            setCartItems([...cartItems])
                            validateAndUpdateCart([...cartItems])
                        })
                        .catch(err => console.log(err))
                } else {
                    console.log("in else")
                    let oldList = [...cartItems];
                    let oldItemIndex = cartItems.findIndex(item => item[0].product_id == id)
                    if (action === 'updatecartplus') {
                        oldList[oldItemIndex][0] = { ...oldList[oldItemIndex][0], quantity: parseInt(oldList[oldItemIndex][0].quantity) + 1, product_total: res.data.cartUpdatePlus.product_total, product_discount_total: parseInt(res.data.cartUpdatePlus.product_discount_total) }
                    } else {
                        oldList[oldItemIndex][0] = { ...oldList[oldItemIndex][0], quantity: parseInt(oldList[oldItemIndex][0].quantity) - 1, product_total: res.data.cartUpdateMinus.product_total, product_discount_total: parseInt(res.data.cartUpdateMinus.product_discount_total) }
                    }
                    setCartItems([...oldList])
                    validateAndUpdateCart([...oldList])
                }

            })
            .catch(err => console.log(err))
    }

    const addToCart = (item) => {
        let newCartItems;
        if (!cartItems) {
            newCartItems = [item]
        } else {
            newCartItems = [...cartItems, item]
        }
        setCartItems([...newCartItems])
        validateAndUpdateCart([...newCartItems])
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
                    setCartTotal(0)
                    setQty(0)
                    setCartDiscount(0)
                    setSubtotal(0)
                    setHasMedicine(false)
                } else {
                    let oldList = [...cartItems];
                    let newList = oldList.filter(item => item[0].product_id !== id)
                    setCartItems([...newList])
                    validateAndUpdateCart([...newList])
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

    const validateAndUpdateCart = (data) => {
        let total = 0;
        let quantity = 0;
        let discount = 0;
        let subtotal = 0;
        data.forEach(item => {
            console.log("🚀 ~ file: CartContext.js ~ line 172 ~ validateAndUpdateCart ~ item", item)
            total = parseInt(total) + parseInt(item[0].product_total)
            quantity = parseInt(quantity) + parseInt(item[0].quantity)
            discount = parseInt(discount) + parseInt(item[0].product_discount_total)
            subtotal = parseInt(total) + parseInt(discount)
        })
        setCartTotal(total)
        setQty(quantity)
        setCartDiscount(discount)
        setSubtotal(subtotal)
        checkMedicine(data)
    }

    const checkMedicine = (data) => {
        let containFilter = data.filter(item => item[0].category.toLowerCase() == "medicine")
        if (containFilter.length > 0) {
            setHasMedicine(true)
        } else {
            setHasMedicine(false)
        }
    }

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, cartTotal, setCartTotal, qty, setQty, removeAllItems, removeCartItem, updateCartQuantity, addToCart, cartDiscount, subTotal, clearCart, hasMedicine, setRefreshCart, refreshCart }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider