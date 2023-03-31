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
                    <option value="rating%3Aasc">Popularity</option>
                    <option value="selling_price%3Adesc">price : high to low</option>
                    <option value="selling_price%3Aasc">price : low to high</option>
                    <option value="rating%3Adesc">rating : high to low</option>
                </select>
            </div>

            <div className="filter-group ">
                <h1 className='text-lg text-theme'>Pet</h1>

                <div className="flex flex-col gap-3 mt-4">
                    {
                        filterData.animals?.map((animal, index) => {
                            return (
                                <Checkbox checked={apppliedFilters.animal?.includes(animal.attributes.slug)} onChange={(e) => applyFilters({ type: 'animal', value: animal.attributes.slug, checked: e.target.checked })} key={index} value={animal.attributes.slug} size='sm' color='warning' css={{ 'z-index': '0' }}>
                                    {animal.attributes.name}
                                </Checkbox>
                            )
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
                            return (<Checkbox checked={apppliedFilters.category?.includes(category.attributes.slug)} onChange={(e) => applyFilters({ type: 'category', value: category.attributes.slug, checked: e.target.checked })} key={index} value={category.attributes.slug} size='sm' color='warning' css={{ 'z-index': '0' }}>
                                {category.attributes.name}
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
                            return (<Checkbox checked={apppliedFilters.subcategory?.includes(subcategory.attributes.slug)} onChange={(e) => applyFilters({ type: 'subcategory', value: subcategory.attributes.slug, checked: e.target.checked })} key={index} value={subcategory.attributes.slug} size='sm' color='warning' css={{ 'z-index': '0' }}>
                                {subcategory.attributes.name}
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
                            return (<Checkbox checked={apppliedFilters.brand?.includes(brand.attributes.slug)} onChange={(e) => applyFilters({ type: 'brand', value: brand.attributes.slug, checked: e.target.checked })} key={index} value={brand.attributes.slug} size='sm' color='warning' css={{ 'z-index': '0' }}>
                                {brand.attributes.name}
                            </Checkbox>)
                        })
                    }
                </div>
            </div>

            <hr className='my-4' />

            <div className="filter-group ">
                <h1 className='text-lg text-theme'>User Rating</h1>

                <div className="flex flex-col gap-3 mt-4">
                    <Checkbox checked={apppliedFilters.userrating?.includes(0)} onChange={(e) => applyFilters({ type: 'userrating', value: 0, checked: e.target.checked })} value='0' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={0} />
                    </Checkbox>
                    <Checkbox checked={apppliedFilters.userrating?.includes(1)} onChange={(e) => applyFilters({ type: 'userrating', value: 1, checked: e.target.checked })} value='1' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={1} />
                    </Checkbox>
                    <Checkbox checked={apppliedFilters.userrating?.includes(2)} onChange={(e) => applyFilters({ type: 'userrating', value: 2, checked: e.target.checked })} value='2' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={2} />
                    </Checkbox>
                    <Checkbox checked={apppliedFilters.userrating?.includes(3)} onChange={(e) => applyFilters({ type: 'userrating', value: 3, checked: e.target.checked })} value='3' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={3} />
                    </Checkbox>
                    <Checkbox checked={apppliedFilters.userrating?.includes(4)} onChange={(e) => applyFilters({ type: 'userrating', value: 4, checked: e.target.checked })} value='4' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={4} />
                    </Checkbox>
                    <Checkbox checked={apppliedFilters.userrating?.includes(5)} onChange={(e) => applyFilters({ type: 'userrating', value: 5, checked: e.target.checked })} value='5' size='sm' color='warning' css={{ 'z-index': '0' }}>
                        <Rating value={5} />
                    </Checkbox>
                </div>
            </div>

        </div>
    )
}

export default Filters