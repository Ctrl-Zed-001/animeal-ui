const getPercent = (mrp, selling_price) => {
    let diff = parseInt(mrp) - parseInt(selling_price)
    let percentOfDiff = (diff * 100) / parseInt(mrp)
    return percentOfDiff
}

export default getPercent