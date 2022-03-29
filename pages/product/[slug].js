import React, { useState, useContext, useEffect } from 'react';
import Rating from '../../Components/ProductBox/Rating';
import Breadcrumb from '../../Components/ProductPageComponents/Breadcrumb';
import { BiRupee } from 'react-icons/bi';
import { RiShoppingCartLine, RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import { Input } from '@nextui-org/react';
import ProductRow from '../../Components/HomeComponents/ProductRow'
import Reviews from '../../Components/ProductPageComponents/Reviews';
import Link from 'next/link';
import { AuthContext } from '../../Context/AuthContext'
import { CartContext } from '../../Context/CartContext'
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import toast, { Toaster } from 'react-hot-toast';


import axios from 'axios';


import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


const Product = (props) => {
    const [inWishlist, setInWishlist] = useState(false)
    const [inCart, setInCart] = useState(false)
    const [productImages, setProductImages] = useState([...props.product.productimages])
    const [checkPinCode, setCheckPinCode] = useState('')
    const [isDeliverable, setIsDeliverable] = useState()

    const { setShowAuthModal, isLoggedIn, token } = useContext(AuthContext)
    const { addToCart } = useContext(CartContext)

    const [thumbsSwiper, setThumbsSwiper] = useState(null);


    useEffect(() => {
        if (token) {
            axios.post(
                `${process.env.NEXT_PUBLIC_API_URI}/user/addtocartvalidation/post/data`,
                {
                    product_id: props.product.products.product_id
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
                .then(res => setInCart(res.data.validateAddToCart))
                .catch(err => console.log(err))
        }
    }, [token])

    useEffect(() => {
        let imagesArray = [...props.product.productimages]
        let mainImage = imagesArray.filter(img => img.main_id === 1)
        let mainImageIndex = imagesArray.indexOf(mainImage[0])
        if (mainImageIndex === (imagesArray.length - 1)) {
            let newArray = [...imagesArray].reverse()
            setProductImages([...newArray])
        }


    }, [])



    const cartClicked = () => {
        if (isLoggedIn) {
            axios.post(`${process.env.NEXT_PUBLIC_API_URI}/user/addtocart/post/data`,
                {
                    product_id: props.product.products.product_id,
                    quantity: 1
                },
                {
                    headers: {
                        Authorization: token
                    }
                })
                .then(res => {
                    toast.success('Item added to cart');
                    setInCart(true)
                    addToCart([{
                        ...res.data.success,
                        available_stock: parseInt(props.product.availableStock) - 1
                    }])
                })
                .catch(err => console.log(err))
        } else {
            setShowAuthModal(true)
        }
    }

    const wishlistClicked = (type) => {
        if (isLoggedIn) {
            axios.post(`${process.env.NEXT_PUBLIC_API_URI}/user/${type}/post/data`,
                {
                    product_id: props.product.products.product_id,
                },
                {
                    headers: {
                        Authorization: token
                    }
                })
                .then(res => {
                    if (type === 'addtowishlist') {
                        setInWishlist(true)
                    } else {
                        setInWishlist(false)
                    }
                })
                .catch(err => console.log(err))
        } else {
            setShowAuthModal(true)
        }
    }

    const checkAvailability = (e) => {
        e.preventDefault()
        axios.post(
            `${process.env.NEXT_PUBLIC_API_URI}/valid/pincode/post/data`,
            {
                pincode: checkPinCode
            }
        )
            .then(res => {
                if (res.data.pincode == 'Pincode Found') {
                    setIsDeliverable(true)
                } else {
                    setIsDeliverable(false)
                }

            })
            .catch(err => setIsDeliverable(false))
    }

    return (

        <div className='product-page my-10'>

            <div className="lg:flex container gap-20 mb-20">
                {/* PRODUCT IMAGE SLIDER */}
                <div className='rounded-lg lg:w-5/12 single-product-slider'>
                    {/* MAIN SLIDER */}
                    <Swiper
                        slidesPerView={1}
                        className='mx-auto h-full main-img-container drop-shadow'
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                    >
                        {
                            productImages.map((image, index) => {
                                return (<SwiperSlide key={index} className=''>
                                    <div id='img-container'>
                                        <img src={`${process.env.NEXT_PUBLIC_IMAGE_URI}/${image.product_id}/${image.product_image}`} alt="" id="single-product-image" className='rounded-lg mx-auto bg-white' />
                                    </div>
                                </SwiperSlide>)
                            })
                        }
                    </Swiper>

                    {/* MINI SLIDER */}
                    <Swiper
                        slidesPerView={4}
                        className='mx-auto mt-4 w-6/12 lg:w-9/12'
                        onSwiper={setThumbsSwiper}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        spaceBetween={10}
                    >
                        {
                            productImages.map((image, index) => {
                                return (<SwiperSlide key={index} className=''>
                                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URI}/${image.product_id}/${image.product_image}`} alt="" className='rounded-lg mx-auto h-12 lg:h-20 border border-gray-200' />
                                </SwiperSlide>)
                            })
                        }
                    </Swiper>
                </div>



                {/* DATA */}
                <div className="product-data flex-1 mt-6 lg:mt-0">
                    {/* <Breadcrumb className="hidden lg:block" /> */}
                    <h3 className="text-xs lg:text-sm text-theme font-semibold">{props.product.products.subcategory}</h3>
                    <h1 className="text-base lg:text-3xl font-semibold text-slate-900">
                        {props.product.products.website_pro_name}
                    </h1>
                    <p className='text-sm text-slate-600 font-medium my-2'>by : {props.product.products.brand}</p>
                    <div className="flex">
                        <Rating value={0} />
                        <p className='text-xs lg:text-sm text-slate-600 ml-3 font-medium'>{props.product.ratinglist.length} customer reviews</p>
                    </div>

                    <div className="flex mt-4 items-center">
                        <h3 className="text-sm font-medium text-gray-500 flex items-center mr-2 line-through"><BiRupee />{props.product.products.mrp}</h3>
                        <h1 className="text-2xl flex items-center font-semibold"><BiRupee />{props.product.productPriceApi}</h1>
                    </div>
                    <p className="text-sm flex items-center mt-2 text-green-500 font-semibold">you save <BiRupee /> {parseInt(props.product.products.mrp) - parseInt(props.product.productPriceApi)} </p>
                    {/* <p className='text-sm text-slate-600 mt-3 font-medium'>Free 1-3 day shipping on this item.</p> */}

                    <div className="bg-white rounded-lg p-3 mt-3">
                        {
                            props.product.availableStock == 0 ?
                                <p className='text-red-500 text-sm font-semibold mb-4'>Out Of Stock</p> :
                                props.product.availableStock <= 10 ?
                                    <p className='text-red-500 text-sm font-semibold mb-4'>Only {props.product.availableStock} left in stock</p> :
                                    <p className='text-green-500 text-sm font-semibold mb-4'>In stock</p>
                        }

                        <div className="lg:flex items-center xl:w-full 2xl:w-5/6 gap-6">
                            <div className='flex items-center gap-3'>
                                <p className="text-sm font-semibold">Deliver to : </p>
                                <form onSubmit={checkAvailability}>
                                    <Input onClearClick={() => { setCheckPinCode(); setIsDeliverable() }} onChange={(e) => setCheckPinCode(e.target.value)} clearable placeholder='check for delivery' type={'number'} />
                                </form>
                            </div>
                            {
                                isDeliverable !== undefined ?
                                    <p className={`text-xs font-semibold ${isDeliverable ? 'text-green-600' : 'text-red-400'} mt-3 lg:mt-0 ml-2 lg:ml-0`}>
                                        {
                                            isDeliverable ?
                                                "will reach you in 24hrs" :
                                                "sorry we are not delivering to your area yet"
                                        }
                                    </p> :
                                    <></>
                            }

                        </div>

                        <div className="flex items-start w-full mt-4">

                            {/* <div className='counter mr-10'>
                                <p className="text-center mb-3 text-sm">Quantity</p>
                                <div className="flex items-center justify-between">
                                    <HiPlusSm className='cursor-pointer bg-slate-200 text-slate-600 text-lg rounded' />
                                    <span className="text-sm mx-4">{count}</span>
                                    <HiMinusSm className='cursor-pointer bg-slate-200 text-slate-600 text-lg rounded' />
                                </div>
                            </div> */}

                            {
                                props.product.similarproduct ?
                                    <div className="variations">
                                        <p className="mb-3 text-sm font-medium">Variations</p>
                                        <div className="flex">
                                            {
                                                props.product.similarproduct.map((prod, index) => {
                                                    return <Link key={index} href={`/product/${prod.website_slug_name}`}><div className="size cursor-pointer bg-slate-100 p-2 text-sm rounded mr-4">{prod.product_weight}</div></Link>
                                                })
                                            }

                                        </div>
                                    </div> :
                                    <></>
                            }



                        </div>

                        <div className="flex gap-4">
                            {
                                props.product.availableStock == 0 ?
                                    <></> :
                                    inCart ?
                                        <Link href='/cart'>
                                            <button className='bg-theme flex items-center mt-6 py-2 px-2 lg:px-4 rounded shadow text-sm lg:text-base flex-1 lg:flex-none'>
                                                <RiShoppingCartLine className='lg:text-sm mr-2' />
                                                Go To Cart
                                            </button>
                                        </Link>
                                        :
                                        <button onClick={cartClicked} className='bg-theme flex items-center mt-6 py-2 px-2 lg:px-4 rounded shadow text-sm lg:text-base flex-1 lg:flex-none'>
                                            <RiShoppingCartLine className='lg:text-sm mr-2' />
                                            Add To Cart
                                        </button>
                            }

                            {
                                inWishlist ?
                                    <button onClick={() => wishlistClicked('destroywishlistproduct')} className='bg-slate-100 flex items-center mt-6 py-2 px-2 lg:px-4 rounded shadow text-slate-600 text-sm lg:text-base flex-1 lg:flex-none'>
                                        <RiHeart3Fill className='text-sm mr-2 text-red-400' />
                                        Wishlisted
                                    </button> :
                                    <button onClick={() => wishlistClicked('addtowishlist')} className='bg-slate-100 flex items-center mt-6 py-2 px-2 lg:px-4 rounded shadow text-slate-600 text-sm lg:text-base flex-1 lg:flex-none'>
                                        <RiHeart3Line className='text-sm mr-2' />
                                        Add To Wishlist
                                    </button>
                            }
                        </div>

                    </div>


                    <hr className='border-1 border-gray-300 my-6' />

                    <div className="content-box">
                        <p className={`text-justify text-sm leading-5 text-slate-600 mb-4 font-medium h-16 hover:h-fit overflow-hidden transition-all ease-in-out duration-500`}>
                            {props.product.products.shortdescription}
                        </p>
                    </div>

                </div>

            </div>

            {/* RELATED ITEMS */}
            {/* <ProductRow title="Related products" products={props.product.similarproduct} /> */}

            <div className="container">
                <hr className='border-1 border-gray-300 my-10' />
            </div>

            {/* CUSTOMER REVIEW */}
            {/* <Reviews /> */}
            <Toaster />
        </div>
    )
}

export async function getServerSideProps({ query }) {

    let slug = query.slug;

    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/singleproduct/${slug}`)
    let product = await res.data

    return {
        props: {
            product: product
        }
    }
}

export default Product