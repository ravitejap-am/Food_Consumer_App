import React from 'react';


export const API_URL = 'http://3.95.39.240:8080/app/api';



//Test names
export const FLU_SHOTS='Flu Shots';
export const COVID_ANTIBODY_TEST="COVID Antibody Test";
export const GROUP_BOOKINGS="Group Bookings";

//API End Points
export const REGISTER = `${API_URL}/auth/register`;
export const VERIFY_OTP = `${API_URL}/common/verifyOTP`;
export const SEND_OTP = `${API_URL}/common/sendOTP`;
export const SEND_LOGIN_OTP = `${API_URL}/common/sendLoginOtp`;
export const SEND_SMS_OTP = `${API_URL}/common/sendOTPSMS`;
export const VERIFY_MOBILE_OTP = `${API_URL}/common/verifyOTPSMS`;
export const MOBILE_VERIFICATION = `${API_URL}/common/mobileVerification`;
export const LOGIN_OTP_VERIFICATION = `${API_URL}/auth/verifyLoginOTP`;
export const LOGIN = `${API_URL}/auth/login`;

export const UPLOAD_IMAGE = `${API_URL}/user/upload`;
export const FORGOT_PASSWORD = `${API_URL}/user/forgotPassword`;
export const CHECK_USER_EXISTS = `${API_URL}/auth/checkUserExists`;
export const GUEST_DETAIL = `${API_URL}/user/getGuestDetail`;
export const CREATE_USER = `${API_URL}/user/createUser`;
export const UPDATE_USER_INFO = `${API_URL}/user/updateUserInfo`;
export const GET_ALL_TESTS = `${API_URL}/productCategory/getAllCategories`;
export const CHECK_SERVICEABILITY_AREA = `${API_URL}/coverageArea/getServiceability`;
export const GET_ALLCOVERAGE_ZONE = `${API_URL}/coverageArea/getAllCoverageZones`;
export const SAVE_ADDRESS = `${API_URL}/address/save`;
export const ADD_TO_CART = `${API_URL}/cart/addToCart`;
export const UPDATE_TO_CART_GROUP = `${API_URL}/cart/updateCartGroup`;

export const ADD_TO_GROUP_CART = `${API_URL}/restrauntGroup/addGroupTable`;
export const GET_GROUP_DETAILS = `${API_URL}/restrauntGroup/getGroupDetails/`;

export const GET_CART = `${API_URL}/cart/getCart`;
export const GET_USER_CART = `${API_URL}/cart/getCartByUser/`;
export const GET_USER_ORDERS = `${API_URL}/order/getOrderDetailsByUser/`;
export const GET_TO_PAY = `${API_URL}/order/toPay/`;
export const GET_TO_RECIEVE = `${API_URL}/order/recievePay/`;
export const GET_GROUP_CART = `${API_URL}/cart/getCartByGroup/`;
export const GET_GROUP_ORDERS = `${API_URL}/order/getOrderDetailsByGroup/`;
export const CHANGE_PASSWORD=`${API_URL}/user/changePassword`;
export const CREATE_CHARGE=`${API_URL}/order/makePayment`;
export const CREATE_GROUP_CHARGE=`${API_URL}/order/makePaymentGroup`;
export const PLACE_ORDER=`${API_URL}/order/orderPlace`;
export const APPLY_PROMO_CODE=`${API_URL}/cart/getVarifyPromocode`;
export const DELETE_FROM_CART = `${API_URL}/cart/deleteCartProduct`;
export const GET_AVBL_TIME_SLOTS = `${API_URL}/timeSlot/getAvailableTimeSlot`;
export const SAVE_PICKUP_TIME = `${API_URL}/appointment/save`;
export const GET_ORDER_SUMMARY = `${API_URL}/order/confirmOrder`;
export const CONFIRM_SHIPPING_ADDRESS=`${API_URL}/cart/confirmShippingAddress`;
export const UPLOAD_IMAGE_LAB_REQUISITION=`${API_URL}/labRequisition/save`;
export const GET_SETTINGS=`${API_URL}/setting/getSetting`;
export const CHECK_PRODUCT_INCART=`${API_URL}/cart/isProductExistInCart`;
export const DELETE_LAB_REQUISITION=`${API_URL}/labRequisition/deleteLabRequisition/`;
export const SEARCH_RESTAURANT=`${API_URL}/restraunt/getRestaurantBySearchText?searchText=`;
export const GET_TESTS_BY_CATEGORY=`${API_URL}/product/getProductsByCategory/`;
export const GET_RESTAURANT_BY_URL=`${API_URL}/restraunt/getRestrauntByUrl?url=`;
export const ADD_GROUP=`${API_URL}/restrauntGroup/addGroup`;
export const ADD_MEMBER_TO_GROUP=`${API_URL}/restrauntGroup/addGroupMember`;
export const DELETE_MEMBER_TO_GROUP=`${API_URL}/restrauntGroup/removeGroupMemberByUserId`;
export const GET_MENU_BY_RESTAURANT=`${API_URL}/product/getProductsByRestraunt/`;
export const GET_MENU_CATEGORIES_BY_RESTAURANT=`${API_URL}/productCategory/getCategoriesByRestraunt/`;
export const STRIPE_KEY=`${API_URL}/stripe/publishKey`;
export const GET_ORDER_LIST = `${API_URL}/order/orderList`;
export const GET_ORDER_DETAIL = `${API_URL}/order/getMyOrderDetail`;
export const CANCEL_ORDER = `${API_URL}/order/cancelOrder`;
export const ORDER_MODIFY = `${API_URL}/order/orderModify`;
export const GET_RESULT_DETAIL = `${API_URL}/orderResult/resultDetail`;
export const DOWNLOAD_IMAGE_LAB_REQUISITION = `${API_URL}/labRequisition/downloadLabRequisition`;