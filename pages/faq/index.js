import React from 'react'
import axios from 'axios'
import Head from 'next/head'

const Faq = (props) => {
    return (
        <div className='faq-page'>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
            </Head>
            <div className="container">
                <div className="bg-white rounded-lg w-full p-4">
                    <h1 className='font-semibold text-2xl'>General Questions</h1>
                    Do we sell pets? <br />
                    No, we do not sell pets, we only sell products that pets need.
                    <br />
                    <br />
                    What are the modes of payment we accept? <br />
                    Credit Cards, Cash on Delivery, Debit Cards, UPI and NetBanking.<br />

                    <h1 className='font-semibold text-2xl'>General Questions</h1>
                    <p>
                        Orders are normally dispatched within 24 hours and usually take 1-3 working days to be delivered based on your location. Orders placed for the Mumbai location are delivered in 1 Business Day (subject to availability of products in our warehouse).
                    </p>

                    Orders can be tracked through our whatsapp chatbot as well.<br />

                    What shipping charges can I expect to incur?<br />
                    It's absolutely free. No minimum order requirement.<br />
                    <br />
                    What locations do you ship to?<br />
                    We know that pet lovers are all over the place, so we can ship to most areas in Mumbai<br />

                    <h1 className='font-semibold text-2xl'>Exchange Policy</h1>

                    I’ve received my order, but I want to return it. Can I receive a refund?<br />
                    Please make sure that you raise an exchange request within 7 days of the product delivery.<br />
                    <br />
                    Can I cancel my online order?<br />
                    Cancellations can be made before the product is dispatched. You can make cancellation on the website or by emailing us on bark@animeal.in<br />


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
export default Faq