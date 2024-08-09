
//import { decode as atob, encode as btoa } from 'base-64'
import { Dimensions, Clipboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RegEx } from "../utils/AppConfig";

import * as commonService from '../api/CommonService'

function capitalize(str) {
  str = str.split(" ");

  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}

export function toUpperCase(str) {
  if (str) {
    return str.toUpperCase();
  }
  return str;
}

export function getGenderText(value, defaultValue = "NA") {
  switch (value) {
    case "1":
      text = "Male";
      break;
    case 1:
      text = "Male";
      break;
    case "2":
      text = "Female";
      break;
    case 2:
      text = "Female";
      break;
    case "3":
      text = "Other";
      break;
    case 3:
      text = "Other";
      break;
    default:
      text = defaultValue;
  }
  return text;
}
/*export function base64Encode(value) {
  if (value) {
    return btoa(value);
  }
  return value;
}*/

/*export function base64Decode(value) {
  if (value) {
    return atob(value);
  }
  return value;
}*/

function getFormatedInteger(value) {
  try {
    value = Math.round(parseInt(value))
    return format(value);

  } catch (error) {
    console.log("Error Parsing int");
  }
  return value;
}

function getFormatedFloat(value) {
  try {
    value = Math.round(parseFloat(value))
    return format(value);
  } catch (error) {
    console.log("Error Parsing float");
  }
  return value;
}

function format(x) {
  var negative = x < 0,
    str = String(negative ? -x : x),
    arr = [],
    i = str.indexOf("."),
    j;

  if (i === -1) {
    i = str.length;
  } else {
    for (j = str.length - 1; j > i; j--) {
      arr.push(str[j]);
    }
    arr.push(".");
  }
  i--;

  for (j = 0; i >= 0; i--, j++) {
    if (j > 2 && (j % 2 === 1)) {
      arr.push(",");
    }
    arr.push(str[i]);
  }

  if (negative) {
    arr.push("-");
  }

  return arr.reverse().join("");
}

ascendingSortListBasedOnKey = (key) => {
  return function (a, b) {
    if (a[key] > b[key]) {
      return 1;
    } else if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  }
}

descendingSortListBasedOnKey = (key) => {
  return function (a, b) {
    if (a[key] > b[key]) {
      return -1;
    } else if (a[key] < b[key]) {
      return 1;
    }
    return 0;
  }
}

descendingSortList = () => {
  return function (a, b) {
    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    }
    return 0;
  }
}

descendingDateSortListBasedOnKey = (key) => {
  return function (a, b) {
    const aTime = new Date(a[key]).getTime();
    const bTime = new Date(b[key]).getTime();
    if (aTime > bTime) {
      return -1;
    } else if (aTime < bTime) {
      return 1;
    }
    return 0;
  }
}

getSumFromArray = (array) => {
  let sum = 0.00;
  try {
    sum = array.reduce((accumulator, element) => {
      return accumulator + parseFloat(element);
    }, 0.0);
  } catch (error) {
    console.log("error parsing float value : ", error, array);
  }
  return sum.toFixed(2);
}

getOrderDisplayDate = (value) => {
  if (value) {
    try {
      const d = new Date(value)
      return ("0" + (d.getDate())).slice(-2) + "/" + (("0" + (d.getMonth() + 1)).slice(-2)) + "/" + d.getFullYear();
    } catch (error) {
      console.log("Error displaying date in the required format : ", error);
    }
  }
  return value;
}

let CLIPBOARD = {
  text: "",
};

addTextToClipboard = (text) => {
  CLIPBOARD.text += '\r\n\r\n' + text;
}

getTextFromClipboard = () => {
  return CLIPBOARD.text;
}

clearClipboard = () => {
  CLIPBOARD.text = '';
}

copyClipboard = async () => {
  await Clipboard.setString(APP_UTIL.getTextFromClipboard());
  let string = await Clipboard.getString()
  console.log("Copied String : " + string);
  alert('Copied to Clipboard! ' + string);
}



export const APP_UTIL = {
  getFormatedInteger: getFormatedInteger,
  getFormatedFloat: getFormatedFloat,
  ascendingSortListBasedOnKey: ascendingSortListBasedOnKey,
  descendingSortListBasedOnKey: descendingSortListBasedOnKey,
  descendingSortList: descendingSortList,
  getSumFromArray: getSumFromArray,
  addTextToClipboard: addTextToClipboard,
  getTextFromClipboard: getTextFromClipboard,
  clearClipboard: clearClipboard,
  copyClipboard: copyClipboard,
  descendingDateSortListBasedOnKey: descendingDateSortListBasedOnKey,
  
  capitalize: capitalize
}
export function validateEmail(email) {
  let errorEmail = 0;
  if (email.trim() == "") {
    errorEmail = 0;
  }
  else if (RegEx.email.test(email)) {
    errorEmail = 1;
  }
  else {
    errorEmail = 2;
  }
  return errorEmail;
}


export function validateAddress(address) {
  let errorName = 0;
  if (address.toString() == "") {
    errorName = 0;
  }
  else if (RegEx.address.test(address)) {
    errorName = 1;
  }
  else {
    errorName = 2;
  }
  return errorName;
}

export function validateCity(city) {
  let errorName = 0;
  if (city.toString() == "") {
    errorName = 0;
  }
  else if (RegEx.city.test(city)) {
    errorName = 1;
  }
  else {
    errorName = 2;
  }
  return errorName;
}
export function validateHieght(hieght) {
  let errorName = 0;
  if (hieght.trim() == "") {
    errorName = 0;
  }
  else if (RegEx.numberFormat.test(hieght)) {
    errorName = 1;
  }
  else {
    errorName = 2;
  }
  return errorName;
}
export function validateName(name) {
  let errorName = 0;
  if (name.toString() == "") {
    errorName = 0;
  }
  else if (RegEx.name.test(name)) {
    errorName = 1;
  }
  else {
    errorName = 2;
  }
  return errorName;
}

export function validateMedicalId(name) {
  let errorName = 0;
  if (name.toString() == "") {
    errorName = 0;
  }
  else if (RegEx.numberFormat.test(name)) {
    errorName = 1;
  }
  else {
    errorName = 2;
  }
  return errorName;
}

export function validatePass(pass) {
  console.log("pass", pass)
  let errorPassNo = 0;
  console.log("RegEx.password.test(pass)", RegEx.password.test(pass))
  if (pass.trim() == "") {
    errorPass = 0;
  }
 /* else if (RegEx.password.test(pass)) {
    errorPassNo = 1;
  }*/
  else {
    errorPassNo = 2;
  }
  console.log("erropassNo=>", errorPassNo)
  return errorPassNo;
}

export function validatePhoneNumber(phone) {
  console.log("phone number", phone)
  let errorPhoneNo = 0;
  console.log("RegEx.phone.test(pass)", RegEx.mobileNumber.test(phone))
  if (phone.trim() == "") {
    errorPhoneNo = 0;
  }
  else if (RegEx.mobileNumber.test(phone) && phone.length == 10) {
    errorPhoneNo = 1;
  }
  else {
    errorPhoneNo = 2;
  }
  console.log("erropass=>", errorPhoneNo)
  return errorPhoneNo;
}

export function checkProductInCart(productId, productsInCart) {
  let flag = false;
  if (productsInCart.hasOwnProperty("data")) {

    if (productsInCart.data.hasOwnProperty("productList")) {

      productsInCart.data.productList.map((data, index) => {

        if (productId.trim() + "" == data.id.trim() + "") {

          flag = true;
        }
      })

    }


  }
  return flag
}
export async function appSettings() {
  let multiProductInCart = "false"
  let multiProductInCartResp = await commonService.getSettings('')

  multiProductInCartResp.map((item, index) => {
    if (item.hasOwnProperty("settingName")) {
      if (item.settingName == 'multiProductInCart') {
        multiProductInCart = item.settingValue

      }
    }
  })
  return multiProductInCart;
}

export function getDisplayDate(value) {
  if (value) {
    try {
      const d = new Date(value)
      return ("0" + (d.getDate())).slice(-2) + "/" + (("0" + (d.getMonth() + 1)).slice(-2)) + "/" + d.getFullYear();
    } catch (error) {
      console.log("Error displaying date in the required format : ", error);
    }
  }
  return value;
}

export function getCountryCode() {
  const COUNTRY_CODE = "+91";
  
  return COUNTRY_CODE;
}
export function getCountryCodeEncoded() {
  const COUNTRY_CODE = "%2B91";
  
  return COUNTRY_CODE;
}


export async function removeItemValue(key) {
  try {
      await AsyncStorage.removeItem(key);
      return true
  }
  catch(exception) {
      return false
  }
}

