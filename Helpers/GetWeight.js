const getWeight = (value) => {
    let type = value.substring(value.length - 2, value.length)
    let weight = value.substring(0, value.length - 2)

    if (type == 'GM') {
        let weightInKg = parseInt(weight) / 1000
        return weightInKg;
    } else {
        return parseInt(weight)
    }
}

export default getWeight;