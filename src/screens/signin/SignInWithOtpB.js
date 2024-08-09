/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View, BackHandler, Platform
} from 'react-native';
import Color from 'color';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import InfoModal from '../../components/modals/InfoModal';
// import components
import ContainedButton from '../../components/buttons/ContainedButton';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import UnderlinePasswordInput from '../../components/textinputs/UnderlinePasswordInput';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UnderlinePhoneInput from '../../components/textinputs/UnderlinePhoneInput';
import CountryPicker from 'react-native-country-picker-modal'
import { Heading5, Paragraph } from '../../components/text/CustomText';
// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';
import * as api from '../../api/AuthService'
import * as appUtil from '../../utils/AppUtil'

// SignInB Config
const PLACEHOLDER_TEXT_COLOR = 'rgba(255, 255, 255, 0.7)';
const INPUT_TEXT_COLOR = '#fff';
const INPUT_BORDER_COLOR = 'rgba(255, 255, 255, 0.4)';
const INPUT_FOCUSED_BORDER_COLOR = '#fff';
const CHECKMARK_ICON =
  Platform.OS === 'ios'
    ? 'ios-checkmark-circle-outline'
    : 'md-checkmark-circle-outline';
const ERROR_ICON =
  Platform.OS === 'ios'
    ? 'ios-close-circle-outline'
    : 'md-close-circle-outline';
// SignInB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  contentContainerStyle: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: Layout.LARGE_PADDING,
  },
  inputContainer: { marginBottom: 7 },
  buttonContainer: {
    paddingTop: 23,
  },
  forgotPassword: {
    paddingVertical: 23,
  },
  forgotPasswordText: {
    fontWeight: '300',
    fontSize: 13,
    color: Colors.white,
    textAlign: 'center',
  },
  separator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 64,
    height: 1,
    backgroundColor: INPUT_BORDER_COLOR,
  },
  orText: {
    top: -2,
    paddingHorizontal: 8,
    color: PLACEHOLDER_TEXT_COLOR,
  },
  buttonsGroup: {
    paddingTop: 23,
  },
  vSpacer: {
    height: 15,
  },
  title: {
    paddingTop: 24,
    paddingBottom: 10,
    color: Colors.onPrimaryColor,
    textAlign: 'left',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  termsContainer: {
    flexDirection: 'row',
  },
  footerText: {
    fontWeight: '300',
    fontSize: 13,
    color: Colors.white,
  },
  descriptionContainer: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 56,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.onPrimaryColor,
    textAlign: 'left',
    opacity: 0.96,
  },
  footerLink: {
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

// SignInB
class SignInWithOtpB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailFocused: false,
      password: '',
      passwordFocused: false,
      secureTextEntry: true,
      modalVisible: false,
      countryCode: 'IN',
      countryCalligCode: "91",
      showLoginView: false,
      msg: '',
      infoModalVisible: false,
      infoMsg: '',
      icon: CHECKMARK_ICON,
      infoModalTitle: 'SUCCESS!',
      successAction: true
    };
  }

  componentDidMount() {

    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      //Will execute when screen is focused

      this._bootstrap();
    })
  }
  _bootstrap = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      const { navigation } = this.props;
      navigation.navigate('HomeNavigator');
    }
    this.setState(
      {
        showLoginView: true
      })

  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  emailChange = text => {
    this.setState({
      email: text,
    });
  };

  emailFocus = () => {
    this.setState({
      emailFocused: true,
      passwordFocused: false,
    });
  };

  passwordChange = text => {
    this.setState({
      password: text,
    });
  };

  passwordFocus = () => {
    this.setState({
      passwordFocused: true,
      emailFocused: false,
    });
  };

  onTogglePress = () => {
    const { secureTextEntry } = this.state;
    this.setState({
      secureTextEntry: !secureTextEntry,
    });
  };

  focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  login = screen => async () => {
    const { navigation } = this.props;
    //removing all stored data in fresh login
    let isUserExists = false;
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userGroup");
    AsyncStorage.removeItem("user");
    AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
    const { dispatch } = this.props;
    dispatch({ type: 'RESET' });
    this.setState(
      {
        modalVisible: true,
      },
    )
    try {
      console.log(" isUserExists userProfile.phone")
      
      isUserExists = await api.checkUserExists("%2B" + this.state.countryCalligCode + this.state.email, 'state');
      console.log(" isUserExists===" + isUserExists)
    }
    catch (e) {
      console.log(" ====error==")
      isUserExists = false;
    }
    if (isUserExists == true) {
      let flag = await this.sendLoginOtp();
       console.log(" flag " + flag)
      if (flag) {
        this.setState(
          {
            modalVisible: false,
          },
        )
        navigation.navigate(screen, { "phone": "+" + this.state.countryCalligCode + this.state.email });
      }
      else {
        navigation.navigate('SignUp', { "phone": "+" + this.state.countryCalligCode + this.state.email });
        this.setState(
          {
            modalVisible: false,
            infoModalVisible: false,
            infoModalTitle: 'FAILURE!',
            msg: "We do not recognize your username. Please try again.",
            icon: ERROR_ICON,
            successAction: false
          },
        )
      }
    }
    else {
      navigation.navigate('SignUp', { "phone": "+" + this.state.countryCalligCode + this.state.email });
      this.setState(
        {
          modalVisible: false,
        },
      )

    }

  };
  navigateTo = screen => async () => {
    const { navigation } = this.props;

    navigation.navigate(screen);


  };
  signIn = () => {
    this.setState(
      {
        emailFocused: false,
        passwordFocused: false,
      },

      this.login('LoginVerification'),


    );


  };
  onSelect = (country) => {
    this.setState
      (
        {
          countryCode: country.cca2,
          countryCalligCode: country.callingCode
        }
      )
    console.log(JSON.stringify(country))
  }
  sendLoginOtp = async () => {
    let userProfile = {};
    let isAuth = false;
    try {
      let userDetail = {};
      let email = this.state.email;
      let password = this.state.password;
      userDetail.userName = "+" + this.state.countryCalligCode + this.state.email;
      userDetail.phoneNumber = "+" + this.state.countryCalligCode + this.state.email;
      // alert(" email "+email)
      if (email == '') {

        //this.openAlertModal("Username can't be blank")
        this.setState(
          {
            modalVisible: false,
            infoModalVisible: true,
            infoModalTitle: 'FAILURE!',
            msg: "Please enter phone number.",
            icon: ERROR_ICON,
            successAction: false
          },
        )
        // alert("Username can't be blank")
        return false
      }


      let response = await api.sendLoginOTP(userDetail);
      isAuth = true
      this.setState
        (
          {
            msg: response.data
          }
        )


    } catch (error) {
      //alert("catch "+JSON.stringify(error))
      isAuth = false;

    }
    //  this.props.navigation.navigate("HomePage")

    return isAuth;
  }
  goBack = () => {
    const { navigation } = this.props;
    if (this.state.successAction)
      navigation.goBack();
  };
  closeInfoModal = value => () => {
    this.setState(
      {
        infoModalVisible: value,
      },
      () => {
        // this.goBack();
      },
    );
  };

  render() {
    const {
      emailFocused,
      password,
      passwordFocused,
      secureTextEntry,
      modalVisible,
      infoModalVisible
    } = this.state;

    return (
      <GradientContainer>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />

        {this.state.showLoginView && (<SafeAreaView style={styles.screenContainer}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.content}>

              <View />

              <View style={styles.form}>
                <Heading5 style={styles.title}>{"What's your number?"}</Heading5>

                <Paragraph style={styles.descriptionText}>
                  {"We'll send you a code to verify your phone number."}
                </Paragraph>

                <UnderlinePhoneInput
                  onRef={r => {
                    this.email = r;
                  }}
                  onChangeText={this.emailChange}
                  onFocus={this.emailFocus}
                  inputFocused={emailFocused}
                  onSubmitEditing={this.focusOn(this.password)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="phone-pad"
                  placeholder="Mobile number"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainer}
                  countryCode={this.state.countryCode}
                  onSelect={this.onSelect}
                />

                <View style={styles.buttonContainer}>
                  <ContainedButton
                    onPress={this.signIn}
                    color={Colors.accentColor}
                    title={'Sign in'.toUpperCase()}
                  />
                </View>



              </View>

              <TouchableWithoutFeedback
                onPress={this.navigateTo('TermsConditions')}>
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    By signing in, you accepts our
                  </Text>
                  <View style={styles.termsContainer}>
                    <Text style={[styles.footerText, styles.footerLink]}>
                      Terms & Conditions
                    </Text>
                    <Text style={styles.footerText}> and </Text>
                    <Text style={[styles.footerText, styles.footerLink]}>
                      Privacy Policy
                    </Text>
                    <Text style={styles.footerText}>.</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>)}
        <InfoModal
          statusBarColor={Color(Colors.primaryColor)
            .darken(0.52)
            .rgb()
            .string()}
          iconName={this.state.icon}
          iconColor={Colors.primaryColor}
          title={this.state.infoModalTitle.toUpperCase()}
          message={this.state.msg}
          buttonTitle="OK"
          onButtonPress={this.closeInfoModal(false)}
          onRequestClose={this.closeInfoModal(false)}
          visible={infoModalVisible}
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

    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps)(SignInWithOtpB)