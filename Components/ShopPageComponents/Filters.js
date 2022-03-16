import React from 'react'
import { Checkbox } from '@nextui-org/react';

const Filters = () => {
    return (
        <div className="filters bg-slate-100 p-4 rounded-lg shadow">
            <div className="filter-group ">
                <h1 className='text-xl'>Brands</h1>

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
                <h1 className='text-xl'>Brands</h1>

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
                <h1 className='text-xl'>Brands</h1>

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

        </div>
    )
}

export default Filters