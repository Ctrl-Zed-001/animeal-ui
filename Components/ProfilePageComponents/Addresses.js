import React, { useState, useEffect } from 'react'
import AddressBox from './AddressBox'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { getAddress, removeAddress } from '../../Helpers/Api'

const Addresses = (props) => {

    const [savedAddresses, setSavedAddresses] = useState([])
    const [defaultAddress, setDefaultAddress] = useState()

    useEffect(() => {
        getAddress(props.token)
            .then(res => {
                setSavedAddresses(res.data.data.address)
                let defaultAddress = res.data.data.filter(addr => addr.defaultaddress === 'Yes')
                setDefaultAddress(defaultAddress[0])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const deleteAddress = (id) => {
        removeAddress(id, props.token)
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

                <div className="grid grid-cols-2 gap-4">

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