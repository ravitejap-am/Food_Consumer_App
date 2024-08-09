import axios from 'axios';

import * as c from '../utils/consts';

export async function addToCart(data){
    try{
       
        let res = await axios.post(c.ADD_TO_CART, data);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function updateCartGroup(data){
    try{
       
        let res = await axios.put(c.UPDATE_TO_CART_GROUP, data);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function addGroupTable(data){
    try{
       
        let res = await axios.put(c.ADD_TO_GROUP_CART, data);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function addGroup(data){
    try{
       
        let res = await axios.post(c.ADD_GROUP, data);
       
        return res.data;
    }catch (e) {
       // alert(JSON.stringify(e))
        throw handler(e)
    }
}
export async function addMemberToGroup(data){
    try{
       
        let res = await axios.post(c.ADD_MEMBER_TO_GROUP, data);
       
        return res.data;
    }catch (e) {
       
        throw handler(e)
    }
}
export async function deleteMemberToGroup(data){
    try{
       
        let res = await axios.post(c.DELETE_MEMBER_TO_GROUP, data);
       
        return res.data;
    }catch (e) {
      // alert(e)
        throw handler(e)
    }
}
export async function deleteFromCart(data){
    try{
      
        const url = `${c.DELETE_FROM_CART}` 
        let res = await axios.post(url, data);
        
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function getGroupDetails(data){
    try{
        const url = `${c.GET_GROUP_DETAILS}` + data;
        let res = await axios.get(url);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function getCart(data){
    try{
        const url = `${c.GET_CART}` + '?userId=' + data.customerId;
        let res = await axios.get(url);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function getUserCart(data){
    try{
        const url = `${c.GET_USER_CART}` + data;
        let res = await axios.get(url);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function getGroupCart(data){
    try{
        const url = `${c.GET_GROUP_CART}` + data;
        let res = await axios.get(url);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function getOrderDetailForGroup(data){
    try{
        const url = `${c.GET_GROUP_ORDERS}` + data;
        let res = await axios.get(url);
       
        return res.data;
    }catch (e) {
        console.log(" error ",e)
        throw handler(e)
    }
}
export async function getOrderDetailForUser(data){
    try{
        const url = `${c.GET_USER_ORDERS}` + data;
        let res = await axios.get(url);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function toPay(data){
    try{
        const url = `${c.GET_TO_PAY}` + data;
        let res = await axios.get(url);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function toRecieve(data){
    try{
        const url = `${c.GET_TO_RECIEVE}` + data;
        let res = await axios.get(url);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function getOrderList(data){
    try{
        const url = `${c.GET_ORDER_LIST}`;
        let res = await axios.post(url, data);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function getMyResult(data){
    try{
        const url = `${c.GET_RESULT_DETAIL}`+'?orderId='+data.orderId+'&productId='+data.productId;
        let res = await axios.get(url,data);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function getOrderDeatil(data){
    try{
        const url = `${c.GET_ORDER_DETAIL}`+ '/' + data.orderId;
        let res = await axios.get(url);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function cancelOrder(data){
    try{
        const url = `${c.CANCEL_ORDER}`+ '/' + data.orderId;
        let res = await axios.get(url);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function checkProductInCart(data){
    try{
        const url = `${c.CHECK_PRODUCT_INCART}` + '?userId=' + data.userId+"&productId="+data.productId;
        let res = await axios.get(url, data);
       
        return res.data;
    }catch (e) {
        alert(e)
        throw handler(e)
    }
}
export async function checkProductInCartByKey(data){
    try{
        const url = `${c.CHECK_PRODUCT_INCART}` + '?userId=' + data.userId+"&productKey="+data.productKey;
        let res = await axios.get(url, data);
       
        return res.data;
    }catch (e) {
        alert(e)
        throw handler(e)
    }
}
export async function confirmShippingAddress(data){
    try{
        const url = `${c.CONFIRM_SHIPPING_ADDRESS}` + '?userId='+ data.userId+'&shippingAddressId='+data.shippingAddressId;
        let res = await axios.get(url, data);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function orderModify(data){
    try{
        const url = `${c.ORDER_MODIFY}`
        let res = await axios.post(url, data);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function getOrderSummary(data){
    try{
        const url = `${c.GET_ORDER_SUMMARY}` + '?cartId=' + data.cartId;
        let res = await axios.get(url, data);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function getAvailableTimeSlots(data){
    try{
       // const url = `${c.GET_CART}` + '?customerId=' + data.customerId+'&promoCode='+data.date;;
       const url = `${c.GET_AVBL_TIME_SLOTS}` ;
        let res = await axios.post(url, data);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function savePickUpTime(data){
    try{
       // const url = `${c.GET_CART}` + '?customerId=' + data.customerId+'&promoCode='+data.date;;
       const url = `${c.SAVE_PICKUP_TIME}` ;
        let res = await axios.post(url, data);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function applyPromoCode(data){
    try{
        const url = `${c.APPLY_PROMO_CODE}` + '?userId=' + data.customerId+'&promoCode='+data.promoCode;;
        let res = await axios.get(url, data);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function createCharge(data){
    try{
        const url = `${c.CREATE_CHARGE}`;
        let res = await axios.post(url, data);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function createGroupCharge(data){
    try{
        const url = `${c.CREATE_GROUP_CHARGE}`;
        let res = await axios.post(url, data);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function placeOrder(data){
    try{
        const url = `${c.PLACE_ORDER}`;
        let res = await axios.post(url, data);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function createToken(params){
    try{
        const token=await publishableKey();
       
        const url = `https://api.stripe.com/v1/tokens`;
        let config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer `+token.data
            }
          }
          const data = Object.entries(params)
  .map(([key, val]) => `card[${key}]=${encodeURIComponent(val)}`)
  .join('&');
        let res = await axios.post(url, data,config);
       
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}
export async function publishableKey(){
    try{
        const url = `${c.STRIPE_KEY}`;
        let res = await axios.get(url);
       
        return res.data;
    }catch (e) {
        console.log(" error in getting token",e)
        throw handler(e)
    }
}
export function handler(err) {
    let error = err;
    console.log(JSON.stringify(error))
    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();
   
    return new Error(error);
}