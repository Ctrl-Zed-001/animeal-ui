export const getProducts = async (query) => {
    let res = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/products/getall`, {
        query: '',
        animal: query.animal ? [query.animal] : [],
        category: query.category ? [query.category] : [],
        subcategory: query.subcategory ? [query.subcategory] : [],
        brand: [],
        rating: [],
        sort: sort
    })
    return res.data
}