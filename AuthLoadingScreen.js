import React, { Component } from 'react'
import { View, StatusBar, ActivityIndicator, StyleSheet,BackHandler } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigation/MainNavigatorB';
export default class AuthLoadingScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
        loading: false,
        email:''
    }
    this._bootstrap();
}
_bootstrap = async () => {
  const userToken = await AsyncStorage.getItem('userToken');
 if(!userToken)
 {
    const {navigation} = this.props;
    navigation.navigate('Onboarding');
 }
  
  }
 
   
logout=async()=> {
    AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    //   this.navigator.h(NavigationActions.navigate({ routeName: 'Login', params: {} })
        this.props.navigation.navigate('GetStarted', {
            headerBackTitle: () => null,
            headerBackImage: () => null
        });
    //   );
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