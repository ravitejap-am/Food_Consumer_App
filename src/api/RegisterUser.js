import React, { Component } from 'react'
import { Text,View, StatusBar, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class RegisterUser extends Component {

  constructor (props) {
    super(props)
    this.state = {
        loading: false,
        email:''
    }
    this._bootstrap();
}

async storeItem(key, item) {
    try {
        //we want to wait for the Promise returned by AsyncStorage.setItem()
        //to be resolved to the actual value before returning the value
        var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }
_bootstrap = async () => {

  const userToken = await AsyncStorage.getItem('userToken');
 // this.props.navigation.navigate(userToken ? 'HomePage' : 'GetStarted');

 
      let email=this.props.navigation.state.params.emailAddress
      let userId=this.props.navigation.state.params.id
      let userName=this.props.navigation.state.params.userName
      let firstName=this.props.navigation.state.params.firstName
      

      let userProfile = 
        [{
          "firstName": firstName,
          "userName": userName,
          "email": email,
        }]
      
        await AsyncStorage.setItem('firstName', firstName);
        await AsyncStorage.setItem('pinCode', 'NA');


  this.props.navigation.navigate('ConfirmServiceAddress',userProfile);
}
    componentDidMount() {
     
        
    }

    render() {
        return (
            <View style={styles.container}>
              
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});