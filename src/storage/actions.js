// only common actions should be written here module specific actions should be written in the specific modules

export const saveProfile = (profile) => ({
    type: 'SAVE_PROFILE',
    profile
})

export const getProfile = () => ({
    type: 'GET_PROFILE'
})

export const logoutUser = () => ({
    type: 'LOGOUT'
})

export const saveDeviceInfo = (deviceInfo) => ({
    type: 'SAVE_DEVICE_INFO',
    deviceInfo
})

export const savePostLogin = (postLoginData) => ({
    type: 'SAVE_POST_LOGIN_DATA',
    postLoginData
})

export const resetPostLogin = () => ({
    type: 'RESET_POST_LOGIN_DATA',
})

export const getPostLogin = () => ({
    type: 'GET_POST_LOGIN_DATA',
})

export const saveGroupData = (groupData) => ({
    type:'SAVE_GROUP_DATA',
    groupData
})

export const saveRestarauntData =(restarauntData) =>({
    type:'SAVE_RESTARAUNT_DATA',
    restarauntData
})