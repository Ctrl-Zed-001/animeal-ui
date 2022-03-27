import React from 'react'
import Link from 'next/link'
import { BiRupee } from 'react-icons/bi';

const CartSummary = (props) => {
    return (
        <div className="cart-summary bg-slate-100 p-4 rounded-xl flex-1 h-fit">
            <div className="flex gap-4 items-center w-full">
                <img src="/img/icons/cart-delivery.png" alt="" />
                <h1 className='font-semibold'>Free shipping in 24hr.</h1>
            </div>
            <div className="flex w-full items-center justify-between my-6">
                <h1 className="">Subtotal ({props.qty} items)</h1>
                <h1 className='font-semibold flex items-center'><BiRupee /> {props.subTotal} </h1>
            </div>
            <table className='w-full'>
                <tbody>
                    <tr className='border-b'>
                        <td className='py-3'>Qty</td>
                        <td className='text-right py-3'>{props.qty}</td>
                    </tr>
                    <tr className='border-b'>
                        <td className='py-3'>Shipping</td>
                        <td className='text-right py-3 flex items-center justify-end'><BiRupee /> 0</td>
                    </tr>
                    <tr className='border-b text-green-500'>
                        <td className='py-3'>Discount</td>
                        <td className='text-right py-3 flex items-center justify-end'>- <BiRupee /> {props.cartDiscount}</td>
                    </tr>
                    <tr className='border-b'>
                        <td className='py-3'>Total Amount</td>
                        <td className='text-right py-3 flex items-center justify-end'><BiRupee /> {props.cartTotal}</td>
                    </tr>

                </tbody>
            </table>
            <Link href='/checkout'>
                <button className='bg-theme px-4 rounded-lg w-full font-semibold py-3 mt-4'>Proceed to checkout</button>
            </Link>
        </div>
    )
}

export default CartSummary