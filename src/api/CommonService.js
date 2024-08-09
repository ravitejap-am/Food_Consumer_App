import axios from 'axios';

import * as c from '../utils/consts';



export async function checkServiceabilityArea(data) {
    try {
        let res = await axios.get(c.CHECK_SERVICEABILITY_AREA + "/" + data, data);

        return res.data;
    } catch (e) {
        throw handler(e)
    }
}
export async function getAllCoverageZones(data) {
    try {
        let res = await axios.get(c.GET_ALLCOVERAGE_ZONE, data);

        return res.data;
    } catch (e) {
        throw handler(e)
    }
}
export async function saveAddress(data) {
    try {
        let res = await axios.post(c.SAVE_ADDRESS, data);

        return res.data;
    } catch (e) {
        throw handler(e)
    }
}

export async function getSettings(data) {
    try {
        let res = await axios.get(c.GET_SETTINGS, data);

        return res.data;
    } catch (e) {
        alert(e)
        throw handler(e)
    }
}


export async function downloadLabRequisition(data) {
    try {

        const url = `${c.DOWNLOAD_IMAGE_LAB_REQUISITION}`;

        let res = await axios.get(url + "/" + data.id);

        return res;
    } catch (e) {

        throw handler(e);
    }
}

export async function deleteLabRequisition(data) {
    try {
        const URL =c.DELETE_LAB_REQUISITION+data
        let res = await axios.get(URL);

        return res;
    } catch (e) {
        throw handler(e)
    }
}
export async function searchRestaurant(data) {
    try {
        const URL =c.SEARCH_RESTAURANT+data
        let res = await axios.get(URL);

        return res;
    } catch (e) {
       
        throw handler(e)
    }
}
export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}