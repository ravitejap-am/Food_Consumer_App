import axios from 'axios';

import * as c from '../utils/consts';

export async function getAllMenu(data){
    try{
       
        let res = await axios.get(c.GET_MENU_BY_RESTAURANT+data);
       
        return res.data;
    }catch (e) {
      // alert(JSON.stringify(e))
       throw handler(e)
    }
}
export async function getAllCategories(data){
    try{
       
        let res = await axios.get(c.GET_MENU_CATEGORIES_BY_RESTAURANT+data);
       
        return res.data;
    }catch (e) {
      //  alert(JSON.stringify(e))
       // throw handler(e)
    }
}
export async function getProductsByCategoryId(data){
    try{
       // alert(c.GET_TESTS_BY_CATEGORY+data)
        let res = await axios.get(c.GET_TESTS_BY_CATEGORY+data);
       
        return res.data;
    }catch (e) {
        //alert(JSON.stringify(e))
       throw handler(e)
    }
}
export async function getRestrauntByUrl(url){
    try{
       // alert(c.GET_TESTS_BY_CATEGORY+data)
        let res = await axios.get(c.GET_RESTAURANT_BY_URL+url);
       
        return res.data;
    }catch (e) {
        //alert(JSON.stringify(e))
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