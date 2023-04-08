const extract = (data) => {
    let animals = data.map((d, i) => {
        return i === data.length - 1 ? d.attributes.name : `${d.attributes.name}, `
    })
    return animals
}
export default extract