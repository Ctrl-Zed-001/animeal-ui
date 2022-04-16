import React from 'react'
import axios from 'axios'
import Head from 'next/head'

const Refund = (props) => {
    return (
        <div className='refund-page'>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
            </Head>
            <div className="container">
                <div className="bg-white rounded-lg w-full p-4">
                    <h1 className='font-semibold text-2xl'>Refund & Cancelation</h1>

                    <p>
                        Animeal exists with one purpose: to help ordinary pet parents become extraordinary pet parents. We make every effort to ensure our product range is diverse, sourced locally from India and overseas, to meet yours and your pet’s needs.
                    </p>

                    <p>
                        This policy is to give you comfort that, subject to the conditions below, if any product purchased from Animeal is defective or not suitable for you/your pet, we will happily repair or replace the product.
                    </p>

                    <h1 className='font-semibold text-2xl'>Cancellation of Orders</h1>

                    <p>
                        In the event you have placed an order and wish to cancel it before the shipment has been dispatched, please notify our customer service team on WhatsApp via 9004485093 or via email on bark@animeal.in. If the order has been prepaid then a refund will be processed to the original mode of payment.
                    </p>

                    <p>
                        Please note that once an order has been dispatched, we cannot cancel the order. You can choose to accept the delivery, or alternatively reject the delivery / refuse to accept. Once the order has been returned to us, if the order has been prepaid then a refund will be processed to the original mode of payment.
                    </p>

                    <h1 className='font-semibold text-2xl'>Return Eligibility</h1>

                    <p>
                        The following items are not eligible for returns or exchanges unless the item has been received by the customer in a damaged or faulty condition.
                    </p>

                    <p>
                        Edible and perishable items such as food, treats, supplements.
                        Toys<br />
                        Any personalised product e.g. personalised engraved identification tag
                        Bedding, crates, pens e.g. mats, beds, blankets, tipi tents etc.<br />
                        Cat litter, trays & accessories<br />
                        Cat furniture and scratchers<br />
                        Grooming Products
                    </p>

                    <p>
                        However, please note the list above is not exhaustive. There may be other individual products which are non-returnable unless damaged. Products pages outline whether that product is returnable or not.
                    </p>

                    <h1 className='font-semibold text-2xl'>Receiving a return item </h1>

                    <p>
                        This will be determined at the time the product is received at the Animeal warehouse for investigation.
                    </p>

                    <h1 className='font-semibold text-2xl'>When will I receive this? </h1>

                    <p>
                        After you have placed your return request, once we have received the product in our warehouse. This can take anywhere from 2-3 days in Mumbai.
                    </p>

                    <h1 className='font-semibold text-2xl'>Return Process</h1>

                    <p>
                        Please log your return request through our returns portal here and we will get in touch with you from there on processing your request.
                    </p>

                    <p>
                        If for some reason we are unable to have the item picked up from your location, it will be your responsibility to ship the item to us at the following address:
                    </p>

                    Warehouse No - 501 5th floor <br />
                    Bharat industrial estate, <br />
                    Tokershi Jivraj Rd, Sewri, <br />
                    Mumbai, Maharashtra 400015<br />

                    <p>
                        Once the item has been received at our warehouse, we can process the return/exchange for you.
                    </p>




                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {

    let metaData = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/metaurl/post/data`,
        {
            slug: "https://animeal.in" + context.resolvedUrl
        }
    )
    return {
        props: {
            title: metaData.data.success.meta_title,
            description: metaData.data.success.meta_description
        }
    }
}

export default Refund