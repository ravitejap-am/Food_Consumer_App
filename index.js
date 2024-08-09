/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
axios.interceptors.request.use(async function(config) {
    const userToken = await AsyncStorage.getItem('userToken');
    config.headers.common['Content-Type'] = "application/json; charset=utf-8";
    config.headers.common['Accept'] = "application/json"
    // config.headers['access_token'] = loggedInUserDetails().token
    config.headers['access_token']= userToken
    return config;
  }, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
});

AppRegistry.registerComponent(appName, () => App);
