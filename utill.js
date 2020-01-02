const regexUtill = (q, attribute, key) => {
    console.log(' in util')
    return new Promise((resolve, reject) => {
        console.log('in Promise')
        const query = {
            [key]: {
                $regex: `^${q}`,
                $options: 'i'
            }
        }

        console.log(query);
        db.places.find(query, attribute).toArray((err, towns) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(towns)
            }
            // else return res.status(200).send(towns);
        })
    })
}

module.exports = {
    regexUtill: regexUtill
}