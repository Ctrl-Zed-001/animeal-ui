import React from 'react'
import { Checkbox } from '@nextui-org/react';
import Rating from '../ProductBox/Rating';

const Filters = () => {
    return (
        <div className="filters bg-slate-100 p-4 rounded-lg shadow">

            <div className="flex justify-between items-center">
                <h1 className='text-lg '>Filters</h1>
                <p className="text-theme text-xs cursor-pointer">clear all</p>
            </div>
            <hr className='my-4' />
            <div className="filter-group ">
                <h1 className='text-lg'>Pet</h1>

                <div className="flex flex-col gap-3 mt-4">
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        Dog
                    </Checkbox>
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        Cat
                    </Checkbox>
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        Small Pets
                    </Checkbox>
                </div>
            </div>

            <hr className='my-4' />

            <div className="filter-group ">
                <h1 className='text-lg'>Category</h1>

                <div className="flex flex-col gap-3 mt-4">
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        Whiskers
                    </Checkbox>
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        Whiskers
                    </Checkbox>
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        Whiskers
                    </Checkbox>
                </div>
            </div>

            <hr className='my-4' />

            <div className="filter-group ">
                <h1 className='text-lg'>Sub Category</h1>

                <div className="flex flex-col gap-3 mt-4">
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        Whiskers
                    </Checkbox>
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        Whiskers
                    </Checkbox>
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        Whiskers
                    </Checkbox>
                </div>
            </div>

            <hr className='my-4' />

            <div className="filter-group ">
                <h1 className='text-lg'>Brand</h1>

                <div className="flex flex-col gap-3 mt-4">
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        Whiskers
                    </Checkbox>
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        Whiskers
                    </Checkbox>
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        Whiskers
                    </Checkbox>
                </div>
            </div>

            <hr className='my-4' />

            <div className="filter-group ">
                <h1 className='text-lg'>User Rating</h1>

                <div className="flex flex-col gap-3 mt-4">
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={0} />
                    </Checkbox>
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={1} />
                    </Checkbox>
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={2} />
                    </Checkbox>
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={3} />
                    </Checkbox>
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={4} />
                    </Checkbox>
                    <Checkbox value='whiskers' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={5} />
                    </Checkbox>
                </div>
            </div>

        </div>
    )
}

export default Filters