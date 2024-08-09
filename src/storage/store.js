// Imports: Dependencies
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from '../storage/reducers';




 function getInitialValue()
{

   

return {
    apps: {
      notificationCount: 0,
    },
    navigation: {
      notificationCount: 0,
    },
    
    loggedIn: false,
    profile: {},
    deviceId:"1234",
    deviceToken:"",
    cart: {
        cartCount: 0,
      },
      userPinCode:"NA",
  }
    
 
}



// Imports: Redux

// Imports: Reducers

// Redux: Root Reducer
const rootReducer = combineReducers({
    authReducer: authReducer
});

// Middleware: Redux Persist Config
const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
        'authReducer','loginReducer'
    ],
    timeout: null,
    // Blacklist (Don't Save Specific Reducers)
    // blacklist: [
    // ],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, authReducer);
// Redux: Store
const store = createStore(
    persistedReducer,getInitialValue(),
    applyMiddleware(
        createLogger(),
    ),
);
// Middleware: Redux Persist Persister
const persistor = persistStore(store);

export { store, persistor };