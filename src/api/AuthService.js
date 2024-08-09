import axios from 'axios';

import * as c from '../utils/consts';


export async function createUser(data) {
    try {
        let res = await axios.post(c.CREATE_USER, data);

        return res;
    } catch (e) {
        throw handler(e)
    }
}

export async function login(data) {
    try {
        
        let res = await axios.post(c.LOGIN, data);
        
        return res;

    } catch (e) {
alert(e)
        return e.response;
       
    }
}

export async function forgotPassword(data) {
    try {
        
        let url = c.FORGOT_PASSWORD + '?userName=' + data;
        
        let res = await axios.get(url);
        
        return res.data;
    } catch (e) {
       // alert(JSON.stringify(e))
        throw handler(e);
    }
}

export async function updateUserInfo(data) {
    try {
       
     let res = await axios.post(c.UPDATE_USER_INFO, data);
        
        return res.data;
    } catch (e) {
        alert(e)
        throw handler(e)
    }
}

export async function checkUserExists(userName, data) {
    try {
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };
        const url = `${c.CHECK_USER_EXISTS}` + '?userName=' + userName;

        const form_data = new FormData();
        for (let key in data)
            form_data.append(key, data[key]);

        let res = await axios.get(url, form_data, options);

        return res.data;
    } catch (e) {
        
        throw handler(e);
    }
}

export async function getGuestDetail(userName) {
    try {
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };
        const url = `${c.GUEST_DETAIL}` + '?userName=' + userName;
        const form_data = new FormData();

        let res = await axios.get(url,userName);

        return res.data;
    } catch (e) {
        alert(e)
        throw handler(e);
    }
}
export async function register(userName, data) {
    try {
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };
        const url = `${c.REGISTER}` + '?userName=' + userName;

        let res = await axios.get(url, options);

        return res.data;
    } catch (e) {
        console.log("register error==>"+JSON.stringify(e))
        throw handler(e);
    }
}
export async function sendOTP(userName, data) {
    try {
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };
        const url = `${c.SEND_OTP}` + '?userName=' + userName;
        const form_data = new FormData();
        let res = await axios.get(url, form_data, options);

        return res.data;
    } catch (e) {

        throw handler(e);
    }
}
export async function sendLoginOTP(data) {
    
    try {

        // const url=`${c.VERIFY_OTP}`+'?userName='+userName+"&otp="+data; 
        const url = `${c.SEND_LOGIN_OTP}`;

        let res = await axios.post(url, data);

        return res.data;
    } catch (e) {
       console.log(JSON.stringify(e))
        throw handler(e);
    }
}
export async function sendSMSOTP(data) {
    try {
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };
        const url = `${c.SEND_SMS_OTP}`;
        const form_data = new FormData();
        let res = await axios.post(url, data);

        return res.data;
    } catch (e) {
        alert(e)
        throw handler(e);
    }
}

export async function verifyOTP(data) {
    try {

        // const url=`${c.VERIFY_OTP}`+'?userName='+userName+"&otp="+data; 
        const url = `${c.MOBILE_VERIFICATION}`;

        let res = await axios.post(url, data);

        return res.data;
    } catch (e) {

        throw handler(e);
    }
}
export async function verifyLoginOTP(data) {
    try {

        // const url=`${c.VERIFY_OTP}`+'?userName='+userName+"&otp="+data; 
        const url = `${c.LOGIN_OTP_VERIFICATION}`;

        let res = await axios.post(url, data);

        return res.data;
    } catch (e) {

        throw handler(e);
    }
}
export async function verifyMOBILEOTP(data) {
    try {

        // const url=`${c.VERIFY_OTP}`+'?userName='+userName+"&otp="+data; 
        const url = `${c.VERIFY_MOBILE_OTP}`;

        const form_data = new FormData();
        for (let key in data)
            form_data.append(key, data[key]);

        let res = await axios.post(url, data);

        return res.data;
    } catch (e) {

        throw handler(e);
    }
}

export async function changePassword(data) {
    try {
        let res = await axios.post(c.CHANGE_PASSWORD, data);

        return res;
    } catch (e) {
        if (e.response.status == 400) {
            alert("Please Enter Valid Old Password.")
        }
        else {
            alert(e)
            throw handler(e)
        }
    }
}



export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.response);
}
