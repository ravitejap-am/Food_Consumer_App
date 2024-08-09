/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,BackHandler
} from 'react-native';
import Color from 'color';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

// import components
import ContainedButton from '../../components/buttons/ContainedButton';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import UnderlinePasswordInput from '../../components/textinputs/UnderlinePasswordInput';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UnderlinePhoneInput from '../../components/textinputs/UnderlinePhoneInput';
import CountryPicker from 'react-native-country-picker-modal'
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

// SignInB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  contentContainerStyle: {flex: 1},
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: Layout.LARGE_PADDING,
  },
  inputContainer: {marginBottom: 7},
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

// SignInB
class SignInB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailFocused: false,
      password: '',
      passwordFocused: false,
      secureTextEntry: true,
      modalVisible: false,
      countryCode:'US',
      countryCalligCode:"1",
      showLoginView:false
    };
  }
  
  componentDidMount () {
    
    this.unsubscribe= this.props.navigation.addListener('focus', () => {
      //Will execute when screen is focused
      
      this._bootstrap();
    })
  }
  _bootstrap = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
   if(userToken)
   {
      const {navigation} = this.props;
      navigation.navigate('HomeNavigator');
   }
    this.setState(
    {
      showLoginView:true
    })
    
      }
  componentWillUnmount () {
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
    const {secureTextEntry} = this.state;
    this.setState({
      secureTextEntry: !secureTextEntry,
    });
  };

  focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  login = screen => async() => {
    const {navigation} = this.props;
    //removing all stored data in fresh login
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
    let flag=await this.loginApi();
    if(flag)
    {
      this.setState(
        {
          modalVisible: false,
        },
      )
      navigation.navigate(screen);
    }
    else
    {
      //this.openAlertModal("We do not recognize your password. Please try again.")
      this.setState(
        {
          modalVisible: false,
        },
      )
       alert("We do not recognize your password. Please try again.")

    }
      
    
    
  };
  navigateTo = screen => async() => {
    const {navigation} = this.props;
   
      navigation.navigate(screen);
    
    
  };
  signIn = () => {
    this.setState(
      {
        emailFocused: false,
        passwordFocused: false,
      },
      
      this.login('Scanner'),
      
      
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
  loginApi = async () => {
    let userProfile = {};
    let isAuth = false;
    try {
      let userDetail = {};
      let email=this.state.email;
      let password=this.state.password;
      userDetail.userName="+"+this.state.countryCalligCode+this.state.email;
      userDetail.password=this.state.password
     if(email.trim()=='')
     {
      //this.openAlertModal("Username can't be blank")
       alert("Username can't be blank")
      return false
     }
     if(password.trim()=='')
     {
     // this.openAlertModal("password can't be blank")
      alert("password can't be blank")
       return false
     }
     
      let response = await api.login(userDetail);
      
      if(response.status==200)
      {
        
        let userProfile = {};
        if(response.data.data.userDetail!=null)
        {
          isAuth=true;
          userProfile=response.data.data.userDetail
          await AsyncStorage.setItem('userToken', response.data.data.token);
          await AsyncStorage.setItem('user', JSON.stringify(userProfile));
          const { dispatch } = this.props; 
          dispatch({ type: 'SAVE_POST_LOGIN_DATA',
          payload: userProfile});
                   
        }
      }
      
    
     

    } catch (error) {
     // alert(error)

    }
    //  this.props.navigation.navigate("HomePage")

return isAuth;
  }

  render() {
    const {
      emailFocused,
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

       {this.state.showLoginView&& (<SafeAreaView style={styles.screenContainer}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.content}>
              <View />

              <View style={styles.form}>
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
                  keyboardType="email-address"
                  placeholder="Mobile number"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainer}
                  countryCode={this.state.countryCode}
                  onSelect={this.onSelect}
                />

                <UnderlinePasswordInput
                  onRef={r => {
                    this.password = r;
                  }}
                  onChangeText={this.passwordChange}
                  onFocus={this.passwordFocus}
                  inputFocused={passwordFocused}
                  onSubmitEditing={this.signIn}
                  returnKeyType="go"
                  placeholder="Password"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  secureTextEntry={secureTextEntry}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  toggleVisible={password.length > 0}
                  toggleText={secureTextEntry ? 'Show' : 'Hide'}
                  onTogglePress={this.onTogglePress}
                  inputContainerStyle={styles.inputContainer}
                />

                <View style={styles.buttonContainer}>
                  <ContainedButton
                    onPress={this.signIn}
                    color={Colors.accentColor}
                    title={'Sign in'.toUpperCase()}
                  />
                </View>

                <View style={styles.forgotPassword}>
                  <Text
                    onPress={this.navigateTo('ForgotPassword')}
                    style={styles.forgotPasswordText}>
                    Forgot password?
                  </Text>
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
    loggedIn:state.loggedIn,
    profile:state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(mapStateToProps)(SignInB)