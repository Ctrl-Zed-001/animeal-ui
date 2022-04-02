import React, { useState, useEffect } from 'react'
import AddressBox from './AddressBox'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const Addresses = (props) => {

    const [savedAddresses, setSavedAddresses] = useState([])
    const [defaultAddress, setDefaultAddress] = useState()

    useEffect(() => {
        axios.post(
            `${process.env.NEXT_PUBLIC_API_URI}/user/getsavedaddresses/post/data`,
            {},
            {
                headers: {
                    Authorization: props.token
                }
            }
        )
            .then(res => {
                setSavedAddresses(res.data.savedAddresses)
                let defaultAddress = res.data.savedAddresses.filter(addr => addr.defaultaddress === 'Yes')
                setDefaultAddress(defaultAddress[0])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const deleteAddress = (id) => {
        console.log("🚀 ~ file: Addresses.js ~ line 32 ~ deleteAddress ~ id", id)
        axios.post(
            `${process.env.NEXT_PUBLIC_API_URI}/user/addressremoved/post/data`,
            {
                addressid: id
            },
            {
                headers: {
                    Authorization: props.token
                }
            }
        )
            .then(res => {
                if (res.status === 200) {
                    let oldList = [...savedAddresses]
                    let newList = oldList.filter(addr => addr.id != id)

                    setSavedAddresses([...newList])

                    toast.success("Address deleted successfully.")
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="addresses">
            <Toaster
                position='top-center'
            />
            <div className="container">
                <h1 className='font-semibold text-2xl mb-4'>My Addresses</h1>

                <div className="grid grid-cols-3 gap-4">

                    {
                        savedAddresses && savedAddresses.map((address, index) => {
                            return <AddressBox key={index} deleteAddress={deleteAddress} address={address} />
                        })
                    }


                </div>

            </div>
        </div>
    )
}

export default Addresses