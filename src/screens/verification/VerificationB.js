/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  Alert,
  I18nManager,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Color from 'color';

// import components
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import Button from '../../components/buttons/Button';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import {Heading5, Paragraph} from '../../components/text/CustomText';
import NumericKeyboard from '../../components/keyboard/NumericKeyboard';
import SafeAreaView from '../../components/SafeAreaView';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import colors
import Colors from '../../theme/colors';
import { connect } from 'react-redux';
import * as api from '../../api/AuthService'
import * as appUtil from '../../utils/AppUtil'
// VerificationB Config
const isRTL = I18nManager.isRTL;
let userProfile={};
// VerificationB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instructionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {color: Colors.onPrimaryColor},
  instruction: {
    marginTop: 16,
    paddingHorizontal: 40,
    fontSize: 14,
    color: Colors.onPrimaryColor,
    textAlign: 'center',
    opacity: 0.76,
  },
  codeContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 38,
  },
  digitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    width: 48,
    height: 50,
    borderRadius: 4,
    backgroundColor: Color(Colors.onPrimaryColor).alpha(0.84),
  },
  digit: {
    fontWeight: '400',
    fontSize: 17,
    color: Colors.primaryText,
  },
  buttonContainer: {
    marginBottom: 44,
  },
});

// VerificationB
class VerificationB extends Component {
  constructor(props) {
    super(props);
    let user=userProfile
    this.state = {
      modalVisible: false,
      pin: '',
      user:user
    };
  }

  // avoid memory leak
  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  };

  navigateTo = async(screen) => {
    const {navigation} = this.props;
    let otpVerifySuccess = false;
    this.setState(
      {
        modalVisible: true,
      },
    )
   //alert(otpVerifySuccess)
   otpVerifySuccess= await this.verifyOTP();
   
    if (otpVerifySuccess == true) {
      
      let response=this.createUser();
      this.setState(
        {
          modalVisible: false,
        },
      )
    navigation.navigate(screen);
    }
    else
    {
      this.setState(
        {
          modalVisible: false,
        },
      )
    }
  };
  createUser=async()=>
  {
    let success=false;
    let user={};
    user.userName=this.state.user.phone;
    user.email=this.state.user.email;
    user.firstName=this.state.user.firstName;
   // user.newPassword=this.state.user.password;
   user.newPassword="123@qwedsr";
    try
    {
      let response = await api.createUser(user);
    
      if(response.data.data.userDetail!=null)
      {
            
           let userProfile=response.data.data.userDetail
  
           await AsyncStorage.setItem('user', JSON.stringify(userProfile));
           await AsyncStorage.setItem('userToken', response.data.data.token);
            const { dispatch } = this.props; 
            dispatch({ type: 'SAVE_POST_LOGIN_DATA',
            payload: userProfile});
  
           
            
      }
    }
    catch(e)
    {
      alert(JSON.stringify(e))
    }
    
    return success;
  }
  verifyOTP = async() => {
    let requestJson={};
    let response=false;
    let verify=false;
    requestJson.userName=this.state.user.phone;
    requestJson.mobileOTP=this.state.pin;
    console.log(" requestJson verify otp"+JSON.stringify(requestJson))  
    if (this.state.pin.trim() == "")
    {
        //this.openAlertModal("Access code can't be empty");
         alert("Access code can't be empty");
    }
    else
    {
      try
      {
        response = await api.verifyOTP(requestJson);
         
          if(response.data == true)
          {
            verify=true;
          // this.props.navigation.navigate('CreateAccount',userProfile)
          }
          else
          {
           // this.openAlertModal("Access code don't match");
             alert("Access code don't match");
            
          }

      }
      catch(e)
      {
        alert(" verify otp"+JSON.stringify(e))
      }
        
         
      }
    
    return verify;
  };
  pressKeyboardButton = keyboardButton => () => {
    let {pin} = this.state;

    if (keyboardButton === 'backspace') {
      pin = pin.slice(0, -1);
      this.setState({
        pin,
      });
      return;
    }

    if (keyboardButton === 'skip') {
      Alert.alert(
        'Skip verification',
        'You surely want to skip this one?',
        [
          {text: 'Cancel', onPress: () => {}, style: 'cancel'},
          {
            text: 'OK',
            onPress: () => {
              this.navigateTo('HomeNavigator');
            },
          },
        ],
        {cancelable: false},
      );
      return;
    }

    if ((pin + keyboardButton).length > 6) {
      return;
    }

    this.setState({
      pin: pin + keyboardButton,
    });
  };

  submit = () => {
    this.navigateTo('SearchOrScan');
   // this.navigateTo('Scanner');
    //this.navigateTo('HomeNavigator');
    
   /*this.setState(
      {
        modalVisible: true,
      },
      () => {
        // for demo purpose after 3s close modal
        this.timeout = setTimeout(() => {
          this.navigateTo('HomeNavigator');
          this.closeModal();
          
        }, 5000);
      },
    );*/
  };

  closeModal = () => {
    // for demo purpose clear timeout if user request close modal before 3s timeout
    clearTimeout(this.timeout);
    this.setState({
      modalVisible: false,
      
    });
  };

  render() {
    
    const {modalVisible, pin} = this.state;

    return (
      <SafeAreaView forceInset={{top: 'never'}} style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />

        <GradientContainer containerStyle={styles.container}>
          <View style={styles.instructionContainer}>
            <Heading5 style={styles.heading}>Verification Code</Heading5>
            <Paragraph style={styles.instruction}>
              Please, enter the verification code sent to {this.state.user.phone}.
            </Paragraph>

            <View style={styles.codeContainer}>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[0]}</Text>
              </View>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[1]}</Text>
              </View>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[2]}</Text>
              </View>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[3]}</Text>
              </View>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[4]}</Text>
              </View>
              <View style={styles.digitContainer}>
                <Text style={styles.digit}>{pin[5]}</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              onPress={this.submit}
              disabled={pin.length < 6}
              borderRadius={4}
              color={Colors.onPrimaryColor}
              small
              title={'Submit code'.toUpperCase()}
              titleColor={Colors.primaryColor}
            />
          </View>

          <NumericKeyboard
            actionButtonTitle="skip"
            onPress={this.pressKeyboardButton}
          />

          <ActivityIndicatorModal
            message="Please wait . . ."
            onRequestClose={this.closeModal}
            statusBarColor={Color(Colors.primaryColor)
              .darken(0.52)
              .rgb()
              .string()}
            title="Loading"
            visible={modalVisible}
          />
        </GradientContainer>
      </SafeAreaView>
    );
  }
}


const mapStateToProps = (state) => {
 
  let userProfileFrom = {};
  userProfileFrom.email = state.userProfile?state.userProfile.email:"";
  userProfileFrom.phone = state.userProfile?state.userProfile.phone:"";
  userProfileFrom.password = state.userProfile?state.userProfile.password:"";
  userProfileFrom.firstName = state.userProfile?state.userProfile.name:"";
  userProfile=userProfileFrom;
  return {
    registeruser: state.userProfile
  };
};

export default connect(mapStateToProps)(VerificationB)