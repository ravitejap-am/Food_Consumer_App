/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {Keyboard, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import Color from 'color';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// import components
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import Button from '../../components/buttons/Button';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import {Paragraph} from '../../components/text/CustomText';
import SafeAreaView from '../../components/SafeAreaView';
import UnderlineTextInput from '../../components/textinputs/UnderlinePhoneInput';
import * as appUtil from '../../utils/AppUtil'
// import colors
import Colors from '../../theme/colors';

//api
import * as api from '../../api/AuthService'

// ForgotPasswordB Config
const PLACEHOLDER_TEXT_COLOR = 'rgba(255, 255, 255, 0.7)';
const INPUT_TEXT_COLOR = '#fff';
const INPUT_BORDER_COLOR = 'rgba(255, 255, 255, 0.4)';
const INPUT_FOCUSED_BORDER_COLOR = '#fff';

// ForgotPasswordB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 64,
    paddingHorizontal: 24,
  },
  instructionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Color(Colors.surface).alpha(0.96),
  },
  instruction: {
    marginTop: 32,
    paddingHorizontal: 16,
    fontSize: 14,
    color: Colors.onPrimaryColor,
    textAlign: 'center',
  },
  inputContainer: {
    paddingTop: 16,
  },
  inputStyle: {
    textAlign: 'center',
  },
  buttonContainer: {
    paddingTop: 22,
  },
});

// ForgotPasswordB
export default class ForgotPasswordB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailFocused: false,
      modalVisible: false,
      countryCode:'US',
      countryCalligCode:"1"
    };
  }

  componentDidMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  };

  // avoid memory leak
  componentWillUnmount = () => {
    clearTimeout(this.timeout);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  keyboardDidShow = () => {
    this.setState({
      emailFocused: true,
    });
  };

  keyboardDidHide = () => {
    this.setState({
      emailFocused: false,
    });
  };

  emailChange = text => {
    this.setState({
      email: text,
    });
  };

  navigateTo = screen => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };
  sendLink = async() => {
    // for demo purpose after 3s close modal
    let userProfile = {};
    userProfile.email="%2B"+this.state.countryCalligCode+this.state.email;
    var isEmailSent=false;
    try
    {
      
      let response = await api.forgotPassword(userProfile.email);
      isEmailSent=true;
    }
    catch(error)
    {
    // alert(JSON.stringify(error))
    }
    
    if(isEmailSent)
    {
      //this.openAlertModal("We have emailed a password reset link.")
       alert("We have emailed a password reset link.")
      
        this.timeout = setTimeout(() => {
          this.props.navigation.navigate('SignIn',userProfile)
          this.closeModal();
        }, 3000);
   
    }
    else
    {
      this.closeModal();
      //this.openAlertModal("We could not find your email. Please try another email id")
       alert("We could not find your Mobile number. Please try another Mobile number")
       
    }
  };
  resetPassword = () => {
    Keyboard.dismiss();
    this.setState(
      {
        modalVisible: true,
        emailFocused: false,
      },
      this.sendLink
      ,
    );
  };
  onSelect = (country) => {
    this.setState
    (
      {
        countryCode:country.cca2,
        countryCalligCode:country.callingCode
      }
    )
    console.log(JSON.stringify(country))
  }
  closeModal = () => {
    // for demo purpose clear timeout if user request close modal before 3s timeout
    clearTimeout(this.timeout);
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const {emailFocused, modalVisible} = this.state;

    return (
      <GradientContainer>
        <SafeAreaView
          forceInset={{top: 'never'}}
          style={styles.screenContainer}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.instructionContainer}>
              <View style={styles.iconContainer}>
                <Icon
                  name="lock-outline"
                  size={36}
                  color={Colors.primaryColor}
                />
              </View>
              <Paragraph style={styles.instruction}>
                Enter your registered mobile number below to receive your password reset
                instruction
              </Paragraph>
            </View>

            <View style={styles.inputContainer}>
              <UnderlineTextInput
                onChangeText={this.emailChange}
                inputFocused={emailFocused}
                onSubmitEditing={this.resetPassword}
                returnKeyType="done"
                blurOnSubmit={false}
                keyboardType="email-address"
                placeholder="Mobile number"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputStyle={styles.inputStyle}
                countryCode={this.state.countryCode}
                onSelect={this.onSelect}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                onPress={this.resetPassword}
                color={Colors.surface}
                
                title={'  Reset password  '.toUpperCase()}
                titleColor={Colors.primaryColor}
              />
            </View>

            <ActivityIndicatorModal
              statusBarColor={Color(Colors.primaryColor)
                .darken(0.52)
                .rgb()
                .string()}
              message="Please wait . . ."
              onRequestClose={this.closeModal}
              title="Sending instructions"
              visible={modalVisible}
            />
          </ScrollView>
        </SafeAreaView>
      </GradientContainer>
    );
  }
}
