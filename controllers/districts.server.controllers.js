'use strict';

const config = require('config');
const Utill = require('../utill');

exports.searchByDistrictName = async(req, res, next) => {
    console.log('District Controller: entering searchByDistrictName ');
    if (!req.query.q) {
        return res.status(402).send({
            err: 'Missing required query parameter q'
        });
    }

    const q_parameter = req.query.q;
    const attribute = {
        '_id': 0
    };
    const key = 'District';

    try {
        const result = await Utill.regexUtill(q_parameter, attribute, key);
        console.log(result);
        if (result.length > 0) {
            return res.status(200).send(result);
        }else{
            return res.status(200).send(`No Matching ${key} found with the keyword ${q_parameter}`)
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send('Internal Server error while searching by District');
    }

}