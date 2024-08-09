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
  View,
} from 'react-native';
import Color from 'color';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import components
import ContainedButton from '../../components/buttons/ContainedButton';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import UnderlinePasswordInput from '../../components/textinputs/UnderlinePasswordInput';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import UnderlinePhoneInput from '../../components/textinputs/UnderlinePhoneInput';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import CountryPicker from 'react-native-country-picker-modal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Heading5, Paragraph } from '../../components/text/CustomText';
// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

import * as api from '../../api/AuthService'
import { connect } from 'react-redux';
import * as appUtil from '../../utils/AppUtil'
// SignUpB Config
const PLACEHOLDER_TEXT_COLOR = 'rgba(255, 255, 255, 0.7)';
const INPUT_TEXT_COLOR = '#fff';
const INPUT_BORDER_COLOR = 'rgba(255, 255, 255, 0.4)';
const INPUT_FOCUSED_BORDER_COLOR = '#fff';

// SignUpB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  title: {
    paddingTop: 24,
    paddingBottom: 10,
    color: Colors.onPrimaryColor,
    textAlign: 'left',
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.onPrimaryColor,
    textAlign: 'left',
    opacity: 0.96,
  },
  contentContainerStyle: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: Layout.LARGE_PADDING,
  },
  inputContainer: { marginBottom: 7 },
  vSpacer: {
    height: 15,
  },
  buttonContainer: {
    paddingVertical: 23,
  },
  buttonsGroup: {
    paddingTop: 23,
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
  footerLink: {
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

// SignUpB
class SignUpWithOtpB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameFocused: false,
      email: '',
      emailFocused: false,
      phone: '',
      phoneFocused: false,
      password: '',
      passwordFocused: false,
      secureTextEntry: true,
      modalVisible: false,
      countryCode: 'US',
      country: "",
      withCountryNameButton: true,
      withFlag: true,
      withCallingCode: true,
      countryCalligCode: "1"

    };
  }

  emailChange = text => {
    this.setState({
      email: text,
    });
  };

  emailFocus = () => {
    this.setState({
      emailFocused: true,
      phoneFocused: false,
      passwordFocused: false,
      nameFocused: false,
    });
  };
  nameChange = text => {
    this.setState({
      name: text,
    });
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
  nameFocus = () => {
    this.setState({
      nameFocused: true,
      emailFocused: false,
      phoneFocused: false,
      passwordFocused: false,
    });
  };
  phoneChange = text => {
    this.setState({
      phone: text,
    });
  };

  phoneFocus = () => {
    this.setState({
      phoneFocused: true,
      emailFocused: false,
      passwordFocused: false,
      nameFocused: false,
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
      phoneFocused: false,
      nameFocused: false,
    });
  };

  onTogglePress = () => {
    const { secureTextEntry } = this.state;
    this.setState({
      secureTextEntry: !secureTextEntry,
    });
  };
  // avoid memory leak
  componentDidMount() {

    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      //Will execute when screen is focused
      let phone = ''

      if (this.props.route.params)
        phone = this.props.route.params.phone
      console.log("phone==>" + JSON.stringify("%2B" + phone))
      this.setState
        (
          {
            phone: phone
          }
        )
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
  register = screen => async () => {
    const { navigation } = this.props;
    let isUserExists = false;
    //removing all stored data in fresh SignUp
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userGroup");
    AsyncStorage.removeItem("user");

    isUserExists = await this.ButtonNextClick();

    if (isUserExists == false) {
      let userProfile = {};
      userProfile.email = this.state.email;
      userProfile.phone = this.state.phone;
      userProfile.password = this.state.password;
      userProfile.name = this.state.name;
      const { dispatch } = this.props;
      dispatch({
        type: 'SAVE_PRE_REGISTER_DATA',
        payload: userProfile
      });
      this.props.navigation.navigate(screen);
    }
  };
  navigateTo = screen => async () => {
    const { navigation } = this.props;
    navigation.navigate(screen);

  };
  ButtonNextClick = async () => {
    let userProfile = {};
    userProfile.phone = this.state.phone;
    let isUserExists = true;
    let firstNameEntry = appUtil.validateName(this.state.name);
    if (firstNameEntry == 0) {
      alert("First name can not be blank.");
      return isUserExists;
    }
    let emailValidation = appUtil.validateEmail(this.state.email)
    if (emailValidation == 0) {
      alert("Email address can not be blank.")
      return isUserExists;
    }
    else if (emailValidation == 2) {
      alert("Please enter valid email address.")
      return isUserExists;
    }

    try {
      let formattedPhoneNum = userProfile.phone.replace('+', "%2B")
      console.log("register error==>" + JSON.stringify(formattedPhoneNum))
      let response = await api.register(formattedPhoneNum, 'state');
      isUserExists = false;
    }
    catch (e) {
      alert("Something went wrong. Please try again")
      console.log("user exist:",JSON.stringify(e));
    }
    this.setState(
      {
        modalVisible: false,
      },
    )
    console.log(" isUserExists signup" + isUserExists)


    return isUserExists;

  }
  createAccount = () => {
    // const { email, phone, password } = this.state;
    this.setState(
      {
        emailFocused: false,
        phoneFocused: false,
        passwordFocused: false,
        nameFocused: false,
      },
      this.register('Verification'),
    );
  };

  focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  render() {
    const {
      nameFocused,
      name,
      emailFocused,
      phoneFocused,
      password,
      passwordFocused,
      secureTextEntry,
      modalVisible,
    } = this.state;

    return (
      <GradientContainer>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />

        <SafeAreaView style={styles.screenContainer}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.content}>
              <View />

              <View style={styles.form}>
                <Heading5 style={styles.title}>{"What's your name and email?"}</Heading5>

                <Paragraph style={styles.descriptionText}>
                  {"This is where we'll send your payment reciepts."}
                </Paragraph>
                <UnderlineTextInput
                  onRef={r => {
                    this.name = r;
                  }}
                  onChangeText={this.nameChange}
                  onFocus={this.nameFocus}
                  inputFocused={nameFocused}
                  onSubmitEditing={this.focusOn(this.email)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="default"
                  placeholder="Name"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainer}
                />
                <UnderlineTextInput
                  onRef={r => {
                    this.email = r;
                  }}
                  onChangeText={this.emailChange}
                  onFocus={this.emailFocus}
                  inputFocused={emailFocused}
                  onSubmitEditing={this.focusOn(this.phone)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="email-address"
                  placeholder="E-mail"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainer}
                />

                <View style={styles.buttonContainer}>
                  <ContainedButton
                    onPress={this.createAccount}
                    color={Colors.accentColor}
                    title={'Create Account'.toUpperCase()}
                  />
                </View>


              </View>

              <TouchableWithoutFeedback
                onPress={this.navigateTo('TermsConditions')}>
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    By registering, you accepts our
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
        </SafeAreaView>
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

export default connect(mapStateToProps)(SignUpWithOtpB)