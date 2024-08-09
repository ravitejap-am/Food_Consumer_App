/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, Fragment} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import Color from 'color';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// import components
import Avatar from '../../components/avatar/Avatar';
import Button from '../../components/buttons/Button';
import {Subtitle2} from '../../components/text/CustomText';
import LinkButton from '../../components/buttons/LinkButton';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import InfoModal from '../../components/modals/InfoModal';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import * as api from '../../api/AuthService'
import { connect } from 'react-redux';
import * as appUtil from '../../utils/AppUtil'
// import colors
import Colors from '../../theme/colors';

// EditProfileA Config
const AVATAR_SIZE = 100;
const INPUT_FOCUSED_BORDER_COLOR = Colors.primaryColor;

const CHECKMARK_ICON =
  Platform.OS === 'ios'
    ? 'ios-checkmark-circle-outline'
    : 'md-checkmark-circle-outline';

// EditProfileA Styles
const styles = StyleSheet.create({
  topArea: {flex: 0, backgroundColor: Colors.primaryColor},
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  avatarSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarBg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: AVATAR_SIZE / 2 + 32,
    backgroundColor: Colors.primaryColor,
  },
  whiteCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    width: AVATAR_SIZE + 6,
    height: AVATAR_SIZE + 6,
    borderRadius: (AVATAR_SIZE + 6) / 2,
    backgroundColor: Colors.white,
  },
  linkButton: {
    padding: 2,
    color: Colors.accentColor,
  },
  editForm: {
    paddingHorizontal: 20,
  },
  overline: {
    color: Color(Colors.secondaryText).alpha(0.6),
    textAlign: 'left',
  },
  inputContainerStyle: {
    marginTop: 0,
    marginBottom: 17,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  buttonContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});
let userProfile={
  
};
let restaurantData={
  
};
let userCart={
  
};
let userGroup={
  
};
// EditProfileA
 class EditProfileB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser:userProfile,
      restaurant:restaurantData,
      userGroup:userGroup,
      name: userProfile.firstName,
      nameFocused: false,
      email: userProfile.emailAddress,
      emailFocused: false,
      phone: userProfile.phoneNumber,
      phoneFocused: false,
      modalVisible: false,
      infoModalVisible:false,
    };
  }
  saveUserInfo = async () => {
    let userProfile = {};
    userProfile.phone = this.state.phone;
    let isUserExists = true;
    let firstNameEntry=appUtil.validateName(this.state.name);
    if(firstNameEntry==0)
    {
      alert("First name can not be blank.");
      return isUserExists;
    }
    let emailValidation=appUtil.validateEmail(this.state.email)
    if(emailValidation==0)
    {
      alert("Email address can not be blank.")
      return isUserExists;
    }
    else if(emailValidation==2)
    {
       alert("Please enter valid email address.")
       return isUserExists;
    }
    let phoneNum=userProfile.phone&&userProfile.phone.length>10?userProfile.phone.substring(userProfile.phone.length-10,userProfile.phone.length):userProfile.phone
    
    let result = appUtil.validatePhoneNumber(phoneNum);
    if (result === 1) {
      
    let user = {};
    user.userName = this.state.loggedInUser.phoneNumber;
    user.firstName = this.state.name;
          //  user.phoneNumber=appUtil.getCountryCode()+this.state.user.phone;
    user.emailAddress=this.state.email;
    this.setState(
      {
        modalVisible: true,
      })
    let response = await api.updateUserInfo(user);
    let userProfile1=response.data.userDetail
    console.log("user profile after save..."+JSON.stringify(userProfile1))
    const { dispatch } = this.props; 
    dispatch({ type: 'SAVE_POST_LOGIN_DATA',payload: userProfile1});


    this.setState(
        {
          modalVisible: false,
          infoModalVisible:true
        },
      )
        //this.props.navigation.navigate('EnterAccessCode', userProfile)
    
        
       // this.openAlertModal("Your email is already registered with us. Please try some other email id.");
       //  alert("We could not save your record. Please try again.");
      
    }
    else if (result === 2) {
     // this.openAlertModal("Please enter valid email address.")
       alert("Please enter valid phone number.")
    }
    else if (result === 0) {
     // this.openAlertModal("Email address can not be blank.")
       alert("Phone number can not be blank.")
    }
return isUserExists;
  }
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
  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  nameChange = text => {
    this.setState({
      name: text,
    });
  };

  nameFocus = () => {
    this.setState({
      nameFocused: true,
      emailFocused: false,
      phoneFocused: false,
    });
  };

  emailChange = text => {
    this.setState({
      email: text,
    });
  };

  emailFocus = () => {
    this.setState({
      nameFocused: false,
      emailFocused: true,
      phoneFocused: false,
    });
  };

  phoneChange = text => {
    this.setState({
      phone: text,
    });
  };

  phoneFocus = () => {
    this.setState({
      nameFocused: false,
      emailFocused: false,
      phoneFocused: true,
    });
  };

  focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  render() {
    const {
      name,
      nameFocused,
      email,
      emailFocused,
      phone,
      phoneFocused,
      modalVisible,
      infoModalVisible,
    } = this.state;

    return (
      <Fragment>
        <SafeAreaView style={styles.topArea} />
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <KeyboardAwareScrollView alwaysBounceVertical={false}>
            <View style={styles.avatarSection}>
              <View style={styles.avatarBg} />
              <View style={styles.whiteCircle}>
                <Avatar
                  imageUri={require('../../assets/img/profile_1.jpeg')}
                  rounded
                  size={AVATAR_SIZE}
                />
              </View>

              <LinkButton title="Change Photo" titleStyle={styles.linkButton} />
            </View>

            <View style={styles.editForm}>
              <Subtitle2 style={styles.overline}>NAME</Subtitle2>
              <UnderlineTextInput
                onRef={r => {
                  this.name = r;
                }}
                value={name}
                onChangeText={this.nameChange}
                onFocus={this.nameFocus}
                inputFocused={nameFocused}
                onSubmitEditing={this.focusOn(this.email)}
                returnKeyType="next"
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainerStyle}
              />

              <Subtitle2 style={styles.overline}>E-MAIL ADDRESS</Subtitle2>
              <UnderlineTextInput
                onRef={r => {
                  this.email = r;
                }}
                value={email}
                onChangeText={this.emailChange}
                onFocus={this.emailFocus}
                inputFocused={emailFocused}
                onSubmitEditing={this.focusOn(this.phone)}
                returnKeyType="next"
                keyboardType="email-address"
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainerStyle}
              />

              <Subtitle2 style={styles.overline}>PHONE NUMBER</Subtitle2>
              <Text
                
                inputContainerStyle={styles.inputContainerStyle}
              >{phone}</Text>
            </View>
          </KeyboardAwareScrollView>

          <View style={styles.buttonContainer}>
            <Button onPress={this.saveUserInfo} title="Save Changes" rounded />
          </View>
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
          <InfoModal
            statusBarColor={Color(Colors.primaryColor)
              .darken(0.52)
              .rgb()
              .string()}
            iconName={CHECKMARK_ICON}
            iconColor={Colors.primaryColor}
            title={'Success!'.toUpperCase()}
            message="Your information has been updated successfully."
            buttonTitle="Sure!"
            onButtonPress={this.closeInfoModal(false)}
            onRequestClose={this.closeInfoModal(false)}
            visible={infoModalVisible}
          />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
 
  userProfile=state.postLoginData;
  restaurantData=state.restarauntData;
  userCart=state.cart;
  userGroup=state.groupData;
  return {
    registeruser: state.postLoginData
  };
};
export default connect(mapStateToProps)(EditProfileB)