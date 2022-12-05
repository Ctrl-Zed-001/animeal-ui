import axios from "axios"


export const getProducts = async (query) => {
    let res = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/products/getall`, {
        query: '',
        animal: query.animal ? [query.animal] : [],
        category: query.category ? [query.category] : [],
        subcategory: query.subcategory ? [query.subcategory] : [],
        brand: [],
        rating: [],
        sort: sort
    })
    return res.data
}

export const getAddress = (token) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/user/getaddress`,
        {},
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const removeAddress = (id, token) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/user/removeaddress`,
        {
            id: id
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const saveAddress = (address, token) => {
    let body = {
        id: address.id ? address.id : undefined,
        name: address.name,
        phone: address.phone,
        alt_phone: address.alt_phone,
        line: address.line,
        city: address.city,
        pincode: address.pincode,
        state: address.state,
        type: address.type ? address.type : 'Home',
        primary: address.primary ? address.primary : true,
    }
    return axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/user/saveaddress`,
        body,
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const generateOtp = (phone, token) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URI}/order/generateotp`,
        {
            number: phone
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}