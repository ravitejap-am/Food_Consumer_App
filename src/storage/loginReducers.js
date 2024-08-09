// Common Reducers should only be written here module specific reducers should be written in sepcific modules
// Initial State
const initialState = {
    postLoginData: {
        page:"",
        pageParams:{},
        backAction:""
        }
};


// Reducers (Modifies The State And Returns A New State)
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET_POST_LOGIN_DATA':
            return { ...state, ...initialState }
        case 'SAVE_POST_LOGIN_DATA': {
            return {
                // State
                ...state,
                // Redux Store
                postLoginData: action.postLoginData,
            }
        }
        case 'GET_POST_LOGIN_DATA': {
            return state.postLoginData
        }
        case 'SAVE_RESTARAUNT_DATA': {
            return {
                // State
                ...state,
                // Redux Store
                postLoginData: action.postLoginData,
            }
        }
        
        
        // Default
        default: {
            return state;
        }
    }
};
// Exports
export default loginReducer;