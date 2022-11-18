import axios from 'axios'
import { useState, useEffect } from 'react'

const payment = () => {
    const [iframe, setIframe] = useState()
    const [formData, setFormData] = useState({
        merchant_id: '1529688',
        order_id: '4334',
        currency: "INR",
        amount: "1000.00",
        redirect_url: 'https://animeal.in/api/ccavResponseHandler',
        cancel_url: 'https://animeal.in/api/ccavResponseHandler',
        language: 'EN',
        integration_type: 'iframe_normal',
        billing_name: "zed",
        billing_address: "panvel",
        billing_city: "mumbai",
        billing_state: "MH",
        billing_zip: '410206',
        billing_country: 'India',
        billing_tel: '8454015530',
        billing_email: 'zshake11@gmail.com',
    })

    const pay = () => {
        axios.post('/api/ccavRequestHandler', formData)
            .then(res => setIframe(res.data))
            .catch(err => console.log(err))
    }

    return (

        <div className='container mx-auto flex'>
            <div>
                <div className="form-control my-4">
                    <label htmlFor="">Merchant Id : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, merchant_id: e.target.value })} value={formData.merchant_id} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">Order Id : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, order_id: e.target.value })} value={formData.order_id} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">currency : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, currency: e.target.value })} value={formData.currency} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">Amount : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, amount: e.target.value })} value={formData.amount} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">Rediret Url : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, redirect_url: e.target.value })} value={formData.redirect_url} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">Cancel URL : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, cancel_url: e.target.value })} value={formData.cancel_url} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">Language : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, language: e.target.value })} value={formData.language} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">Integration type : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, integration_type: e.target.value })} value={formData.integration_type} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">Billing Name : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, billing_name: e.target.value })} value={formData.billing_name} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">Billing Address : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, billing_address: e.target.value })} value={formData.billing_address} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">billing_country : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, billing_country: e.target.value })} value={formData.billing_country} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">billing_tel : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, billing_tel: e.target.value })} value={formData.billing_tel} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">billing_state : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, billing_state: e.target.value })} value={formData.billing_state} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">billing_zip : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, billing_zip: e.target.value })} value={formData.billing_zip} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">billing_city : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, billing_city: e.target.value })} value={formData.billing_city} />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="">Billing email : </label>
                    <input type="text" onChange={(e) => setFormData({ ...formData, billing_email: e.target.value })} value={formData.billing_email} />
                </div>
                <button onClick={pay} className='mt-2 border bg-gray-400 p-2'>Submit</button>
            </div>

            <div dangerouslySetInnerHTML={{ __html: iframe }}>

            </div>

        </div>
    )
}


// {
//     merchant_id: '1529688',
//     order_id: '4334',
//     currency: "INR",
//     amount: "1000.00",
//     redirect_url: '/api/ccavResponseHandler',
//     cancel_url: '/api/ccavResponseHandler',
//     language: 'EN',
//     integration_type: 'iframe_normal',
//     billing_name: "zed",
//     billing_address: "panvel",
//     billing_city: "mumbai",
//     billing_state: "MH",
//     billing_zip: '410206',
//     billing_country: 'India',
//     billing_tel: '8454015530',
//     billing_email: 'zshake11@gmail.com',
//     delivery_name: 'zed',
//     delivery_address: "panvel",
//     delivery_city: "mumbai",
//     delivery_state: "MH",
//     delivery_zip: '410206',
//     delivery_country: 'India',
//     delivery_tel: '8454015530',
//     customer_identifier: '44870'
// }
export default payment