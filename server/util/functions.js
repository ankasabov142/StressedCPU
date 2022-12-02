module.exports = {
    trimObjectValues: (obj) => {
        for (const key in obj) {
            if (typeof (obj[key]) === 'string') {
                obj[key] = obj[key].trim();
            }
        }
    }
}