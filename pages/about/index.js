import React from 'react'
import axios from 'axios'
import Head from 'next/head'

const About = (props) => {
    return (
        <div className='about-page mt-20 lg:mt-0 text-justify'>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
            </Head>
            <div className="container">
                <div className="bg-white rounded-lg w-full">
                    <img src="/img/about.png" alt="" className="block lg:hidden" />
                    <div className="about-sec-bg px-12 lg:py-20 rounded-t-lg">
                        <div className='xl:w-2/4'>
                            <h1 className='font-semibold text-4xl my-3 uppercase text-left'>About Us  </h1>
                            <p className='text-justify leading-7'>Goodman Chemist embarked on its journey in 1989 as the First Pet medicine store in Mumbai and since then there has been no looking back. Based in Parel, Mumbai, we work as an online retailer of pet food and several other pet products. In 1995, pet food and accessories became an addition to medicines because we have constantly dedicated ourselves to bringing out the best for our pet parents. </p>
                        </div>
                    </div>

                    <div className="px-12 py-20">
                        <div className="lg:grid lg:grid-cols-2 gap-8">
                            <img src="/img/graffiti.png" alt="" className='drop-shadow-xl' />
                            <div className='pt-12'>
                                <h1 className='font-semibold text-4xl my-3 uppercase text-left'>Know our founders </h1>
                                <p className='leading-7'>
                                    Sometimes, it can be overwhelming to be a pet parent and we understand a lot of responsibilities come along. Our founders started the store with a vision to create a safe space for every pet owner across the country to serve every single need of your pet. Goodman Vetcare is committed to achieving maximum quality standards.
                                </p>
                                <p className="leading-7">
                                    Along with our dedicated staff, the company has maintained a strong network by delivering pet supplies all over the city. Our company has been supplying various pet products to zoos across India. Currently, our company is the biggest retailer of Pet medicines & food.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-12">
                        <h1 className='font-semibold text-4xl my-3 uppercase text-left'>Why Should You Choose Us?</h1>
                        <p className="leading-7">
                            Being a parent to different kinds of pets can demand distinct care and attention. Whether you are a dog owner or a cat, you own a rabbit or hamster or even a parrot, we have got everything covered for you by offering a wide range of products, keeping in mind all the requirements of any pet owner.
                        </p>
                        <br />
                        <p className="leading-7">
                            At Goodman Chemist, you won’t find any product below standard as our stock includes products of over 1000 well-reputed brands like- Royal Canin, Pedigree, Whiskas, Arden Grange, Hills, Farmina, Calibra, Canine Creek and many more
                        </p>
                        <br />
                        <p className="leading-7">
                            Managing work-life schedules can be hectic, and going to a store physically to buy essentials can become tough. Also, the unprecedented covid times, made us realize the value of an online setup.
                        </p>
                        <br />
                        <p className="leading-7">
                            Goodman Chemist removes the uncalled hassle for you by delivering products at the comfort of your home. You can easily order pet supplies through your smartphone with the touch of a finger. We have been steadily working to make the home delivery process efficient.
                        </p>
                        <br />
                        <p className="leading-7">
                            In a nutshell, Goodman Chemist,
                        </p>
                        <ul className='pl-8 leading-7 list-disc mt-3'>
                            <li>Delivers quality pet food and medicines of top brands</li>
                            <li>Provides quicker doorstep delivery of products </li>
                        </ul>

                        <br />

                        <p className="leading-7">
                            A pet companion feels like a blessing because of all the perks these adorable beings provide. But there can be times where you need a helping hand. Do not worry, we have got your back! Goodman Vetcare
                        </p>
                        <ul className="pl-8 leading-7 list-disc mt-3">
                            <li>Provides 24*7 assistance to our customers </li>
                            <li>Provides 24*7 assistance to our customers </li>
                            <li>We also set up free vaccination drives for cats & dogs every year</li>
                        </ul>

                        <br />

                        <p className="leading-7">
                            Customer satisfaction is our key focus so we strive to serve you with products that do not cause a burden to your pocket. Our company has made a strong impact in the industry by delivering excellent service to our customers.  Check out our top ratings and customer reviews on Google to witness all of this on your own.
                        </p>
                    </div>

                    <div className="px-12 py-20">
                        <h1 className='font-semibold text-4xl my-3 uppercase text-left'>Here are our newest additions </h1>
                        <ul className='list-disc pl-10 leading-8'>
                            <li>
                                With our team's continuous hard work and efforts, we could make Goodman Vetcare, a Pvt. Ltd. Company.
                            </li>
                            <li>We launched our own website in 2022 to facilitate more users and cater to all customer needs efficiently </li>
                            <li>Animeal is brought up with the hope to improve customer service & deliver pet medicines quicker across Mumbai, Navi Mumbai, and Thane</li>
                        </ul>
                    </div>

                    <div className="px-12">
                        <h1 className='font-semibold text-4xl my-3 uppercase text-left'>How can you avail the products? </h1>
                        <p className="leading-7">
                            The process is quite simple and quick. You can visit our website - Animeal.in or Google “pet shop near me” and use the code “Animeal” to access the greatest brands and order products in just few clicks. Alternatively, you can call us to enquire or order the products from our store.
                        </p>
                        <p className="leading-7">
                            Exciting offers and services await you. So, what are you waiting for? Order best pet care products from one of the best pet stores in Mumbai and avail excellent offers!
                        </p>
                    </div>

                    <div className="px-12 py-20">
                        <h1 className='font-semibold text-4xl my-3 uppercase text-left'>With all this being said,</h1>
                        <p className="leading-7">
                            We aim to continue serving pet parents with a mission to create a positive influence in their lives by letting them embrace each moment in their journey of becoming a family with their pets. Goodman Vetcare promises to be a companion through all the ups and downs.
                        </p>
                        <br />
                        <p className="leading-7 font-bold">
                            Get in touch with us at our social media handles on Facebook and Linkedin!
                        </p>
                    </div>


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

export default About