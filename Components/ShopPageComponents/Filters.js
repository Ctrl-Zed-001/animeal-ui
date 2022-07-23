import { useState, useEffect } from 'react'
import { Checkbox } from '@nextui-org/react';
import Rating from '../ProductBox/Rating';
import Capitalize from '../../Helpers/Capitalize';

const Filters = ({ filterData, applyFilters, sort, sortResults, hideFilter, clearAll, apppliedFilters }) => {

    const [subcategory, setSubCategory] = useState([])
    const [brands, setBrands] = useState([])

    useEffect(() => {
        setSubCategory(filterData.subcategories)
        setBrands(filterData.brands)
    }, [filterData])


    const searchInFilter = (type, value) => {
        if (type === 'brands') {
            if (value !== '') {
                setBrands((prevbrands) => filterData.brands.filter(brand => {
                    if (brand.toLowerCase().includes(value.toLowerCase())) {
                        return brand
                    }
                }))
            } else {
                setBrands(filterData.brands)
            }
        } else {
            if (value !== '') {
                setSubCategory((prevSubCategory) => filterData.subcategories.filter(subcat => {
                    if (subcat.toLowerCase().includes(value.toLowerCase())) {
                        return subcat
                    }
                }))
            } else {
                setSubCategory(filterData.brands)
            }
        }
    }


    return (
        <div className="filters bg-slate-100 p-4 rounded-lg shadow">

            <div className="flex justify-between items-center">
                <h1 className='text-lg order-2 xl:order-1'>Filters</h1>
                <p className="text-theme text-xs cursor-pointer order-1" onClick={clearAll}>clear all</p>
                <p className="text-red-400 font-bold text-xs cursor-pointer order-3 xl:hidden" onClick={hideFilter}>Close</p>
            </div>
            <hr className='my-4' />

            <div className='flex xl:hidden items-center justify-evenly'>
                <span className='text-gray-800 text-sm'>sort by</span>

                <select value={sort} name="sorting" id="sorting" onChange={(e) => sortResults(e)} className='text-sm text-left rounded-lg px-2 py-3 bg-white-100 text-gray-600 mx-2 flex justify-between items-center shadow'>
                    <option value="relevent">Popularity</option>
                    <option value="hightolow">price : high to low</option>
                    <option value="lowtohigh">price : low to high</option>
                    <option value="ratinghigh">rating : high to low</option>
                </select>
            </div>

            <div className="filter-group ">
                <h1 className='text-lg text-theme'>Pet</h1>

                <div className="flex flex-col gap-3 mt-4">
                    {
                        filterData.animals?.map((animal, index) => {
                            return (<Checkbox checked={apppliedFilters.animal?.includes(animal.category_url)} onChange={(e) => applyFilters({ type: 'animal', value: animal.category_url, checked: e.target.checked })} key={index} value={animal.category_url} size='sm' color='warning' css={{ 'z-index': '0' }}>
                                {animal.category_name}
                            </Checkbox>)
                        })
                    }
                </div>
            </div>

            <hr className='my-4' />

            <div className="filter-group ">
                <h1 className='text-lg text-theme'>Category</h1>

                <div className="flex flex-col gap-3 mt-4">
                    {
                        filterData.categories?.map((category, index) => {
                            return (<Checkbox checked={apppliedFilters.category?.includes(category.category_url)} onChange={(e) => applyFilters({ type: 'category', value: category.category_url, checked: e.target.checked })} key={index} value={category.category_url} size='sm' color='warning' css={{ 'z-index': '0' }}>
                                {category.category_name}
                            </Checkbox>)
                        })
                    }
                </div>
            </div>

            <hr className='my-4' />

            <div className="filter-group ">
                <h1 className='text-lg text-theme'>Sub Category</h1>

                <div className="flex flex-col gap-3 mt-4 h-60 overflow-y-scroll">
                    <input onChange={(e) => searchInFilter("subcategory", e.target.value)} type="text" className='rounded shadow w-11/12 p-2 px-2 text-sm' placeholder='search...' />
                    {
                        subcategory?.map((subcategory, index) => {
                            return (<Checkbox checked={apppliedFilters.subcategory?.includes(subcategory.category_url)} onChange={(e) => applyFilters({ type: 'subcategory', value: subcategory.category_url, checked: e.target.checked })} key={index} value={subcategory.category_url} size='sm' color='warning' css={{ 'z-index': '0' }}>
                                {subcategory.category_name}
                            </Checkbox>)
                        })
                    }
                </div>
            </div>

            <hr className='my-4' />

            <div className="filter-group ">
                <h1 className='text-lg text-theme'>Brand</h1>

                <div className="flex flex-col gap-3 mt-4 h-60 overflow-y-scroll">
                    <input onChange={(e) => searchInFilter("brands", e.target.value)} type="text" className='rounded shadow w-11/12 p-2 px-2 text-sm' placeholder='search...' />
                    {
                        brands?.map((brand, index) => {
                            return (<Checkbox checked={apppliedFilters.brand?.includes(Capitalize(brand))} onChange={(e) => applyFilters({ type: 'brand', value: brand, checked: e.target.checked })} key={index} value={brand} size='sm' color='warning' css={{ 'z-index': '0' }}>
                                {brand}
                            </Checkbox>)
                        })
                    }
                </div>
            </div>

            <hr className='my-4' />

            <div className="filter-group ">
                <h1 className='text-lg text-theme'>User Rating</h1>

                <div className="flex flex-col gap-3 mt-4">
                    <Checkbox checked={apppliedFilters.category?.includes(0)} onChange={(e) => applyFilters({ type: 'userrating', value: 0, checked: e.target.checked })} value='0' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={0} />
                    </Checkbox>
                    <Checkbox checked={apppliedFilters.category?.includes(1)} onChange={(e) => applyFilters({ type: 'userrating', value: 1, checked: e.target.checked })} value='1' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={1} />
                    </Checkbox>
                    <Checkbox checked={apppliedFilters.category?.includes(2)} onChange={(e) => applyFilters({ type: 'userrating', value: 2, checked: e.target.checked })} value='2' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={2} />
                    </Checkbox>
                    <Checkbox checked={apppliedFilters.category?.includes(3)} onChange={(e) => applyFilters({ type: 'userrating', value: 3, checked: e.target.checked })} value='3' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={3} />
                    </Checkbox>
                    <Checkbox checked={apppliedFilters.category?.includes(4)} onChange={(e) => applyFilters({ type: 'userrating', value: 4, checked: e.target.checked })} value='4' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={4} />
                    </Checkbox>
                    <Checkbox checked={apppliedFilters.category?.includes(5)} onChange={(e) => applyFilters({ type: 'userrating', value: 5, checked: e.target.checked })} value='5' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={5} />
                    </Checkbox>
                </div>
            </div>

        </div>
    )
}

export default Filters