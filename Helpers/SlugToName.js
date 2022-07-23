const nameCraetor = (text) => {
    let slug = text.toLowerCase()
        .replace(/-/g, ' ')
        .replace(/[^\w-]+/g, ' ');
    return slug
}

export default nameCraetor