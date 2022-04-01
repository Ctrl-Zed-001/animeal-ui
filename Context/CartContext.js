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

    const [prescriptionUploaded, setPrescriptionUploaded] = useState(false)
    const [prescriptionFiles, setPrescriptionFiles] = useState([])

    const [doctorName, setDoctorName] = useState('')

    const { token, isLoggedIn } = useContext(AuthContext)

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
            let unauthcart = JSON.parse(localStorage.getItem('unauthcart'))
            setCartItems([...unauthcart]);
            validateAndUpdateCart([...unauthcart])
        }
    }, [refreshCart])


    const checkLocalCartAndUpdate = (data) => {
        let localCart = [...cartItems]

        if (localCart && data === null) {
            console.log("sirf local mei hai")
            // LOCAL MEI HAI BUT RES MEI NAI
            // TO LOCAL SE NIKAL K DB MEI DAAL
            pushLocalToDb(localCart)

        } else if (!localCart && data != null) {
            console.log("sirf db mei hai")
            // RES MEI HAI BUT LOCAL MEI NAI
            setCartItems(data)
            validateAndUpdateCart(data)
        } else {
            console.log("Dono mei hai")
            // DONO MEI HAI
            // CHECK K SAME PRODUCT WAPS TO NAI DALA

            data.forEach((item, index) => {
                localCart = localCart.filter(localItem => localItem[0].product_id !== item[0].product_id)
            })

            // abi ye local cart ko db mei push karne ka
            let newList;
            if (localCart.length > 0) {
                pushLocalToDb(localCart)
                newList = [...data, ...localCart]
            } else {
                newList = [...data]
            }
            setCartItems([...newList])
            validateAndUpdateCart([...newList])
        }
        localStorage.removeItem('unauthcart')

    }

    const pushLocalToDb = (localCart) => {
        localCart.forEach((item) => {
            axios.post(`${process.env.NEXT_PUBLIC_API_URI}/user/addtocart/post/data`,
                {
                    product_id: item[0].product_id,
                    quantity: item[0].quantity
                },
                {
                    headers: {
                        Authorization: token
                    }
                })
                .then(res => {
                    // RES AAYA TO LOCAL STORAGE CLEAR KARNE KA
                    console.log(res)

                })
                .catch(err => console.log('Add to cart Error', err))
        })
    }

    const updateCartQuantity = (action, id, quantity) => {
        // CHECK K BANDA LOGGEDIN HAI KYA
        if (isLoggedIn) {
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
                    validateAndUpdateCart([...oldList])

                })
                .catch(err => console.log(err))
        } else {
            // AGAR LOGGEDIN NAHI HAI TO SIRF STATE UPDATE HOYEGA
            let oldList = [...cartItems];
            let oldItemIndex = cartItems.findIndex(item => item[0].product_id == id)
            console.log(oldList[oldItemIndex][0])
            if (action === 'updatecartplus') {
                oldList[oldItemIndex][0] = { ...oldList[oldItemIndex][0], quantity: parseInt(oldList[oldItemIndex][0].quantity) + 1, product_total: parseInt(oldList[oldItemIndex][0].product_total) + parseInt(oldList[oldItemIndex][0].product_price), product_discount_total: parseInt(oldList[oldItemIndex][0].product_discount_total) + parseInt(oldList[oldItemIndex][0].product_discount) }
            } else {
                oldList[oldItemIndex][0] = { ...oldList[oldItemIndex][0], quantity: parseInt(oldList[oldItemIndex][0].quantity) - 1, product_total: parseInt(oldList[oldItemIndex][0].product_total) - parseInt(oldList[oldItemIndex][0].product_price), product_discount_total: parseInt(oldList[oldItemIndex][0].product_discount_total) - parseInt(oldList[oldItemIndex][0].product_discount) }
            }
            setCartItems([...oldList])
            validateAndUpdateCart([...oldList])
        }


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
        if (isLoggedIn) {
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
                    clearCartState(id, type)
                })
                .catch(err => console.log(err))
        } else {
            clearCartState(id, type)
        }
    }

    const clearCartState = (id, type) => {
        if (type === 'all') {
            if (!isLoggedIn) {
                localStorage.removeItem('unauthcart')
            }
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
            if (!isLoggedIn) {
                if (!newList || newList.length === 0) {
                    localStorage.removeItem('unauthcart')
                } else {
                    localStorage.removeItem('unauthcart')
                    localStorage.setItem('unauthcart', JSON.stringify([...newList]))
                }
            }
        }
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
        <CartContext.Provider value={{ cartItems, setCartItems, cartTotal, setCartTotal, qty, setQty, removeAllItems, removeCartItem, updateCartQuantity, addToCart, cartDiscount, subTotal, clearCart, hasMedicine, setRefreshCart, refreshCart, prescriptionUploaded, setPrescriptionFiles, prescriptionFiles, setPrescriptionUploaded, doctorName, setDoctorName }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider