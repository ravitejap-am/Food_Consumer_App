


/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {Keyboard, ScrollView, StatusBar, StyleSheet, View,Platform,Text} from 'react-native';
import Color from 'color';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { connect } from 'react-redux';
// import components
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import Button from '../../components/buttons/Button';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import ContainedButton from '../../components/buttons/ContainedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Paragraph} from '../../components/text/CustomText';
import SafeAreaView from '../../components/SafeAreaView';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import TouchableItem from '../../components/TouchableItem';
// import colors
import Colors from '../../theme/colors';
// import MultiSelect library
//import MultiSelect from 'react-native-multiple-select'
//api
import * as api from '../../api/AuthService'
import * as txnApi from '../../api/TransactionService'
import * as appUtil from '../../utils/AppUtil'
// ForgotPasswordB Config
const IOS = Platform.OS === 'ios';
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
  deleteIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Color(Colors.surface).alpha(0.96),
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    width: '100%',
    padding: 16,
    
  },
  skipbutton: {
    width: '36%',
  },
  button: {
    width: '98%',
  },
  inline: {
    
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  memberText: {
   
    fontWeight: '300',
    color: Colors.onPrimaryColor,
  },
  memberTextHeading: {
    fontWeight: '700',
    color: Colors.onPrimaryColor,
    paddingBottom: 10,
  },
  membersContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5,
   
  },
  separator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {
    top: -2,
    paddingHorizontal: 8,
    color: PLACEHOLDER_TEXT_COLOR,
  },
  
});
let userProfile={
  
};
let restaurantData={
  
};
let userCart={
  
};
// Dummy Data for the MutiSelect
const items = [
  // name key is must. It is to show the text in front
  {id: 1, name: 'angellist'},
  {id: 2, name: 'codepen'},
  {id: 3, name: 'envelope'},
  {id: 4, name: 'etsy'},
  {id: 5, name: 'facebook'},
  {id: 6, name: 'foursquare'},
  {id: 7, name: 'github-alt'},
  {id: 8, name: 'github'},
  {id: 9, name: 'gitlab'},
  {id: 10, name: 'instagram'},
];
// ForgotPasswordB
 class AddGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupName: '',
      groupNumber: '',
      groupId: '',
      phoneno:'',
      selectedItems:items,
      loggedInUser:userProfile,
      restaurant:restaurantData,
      emailFocused: false,
      modalVisible: false,
      groupAdded:false,
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

  groupNameChange = text => {
    this.setState({
      groupName: text,
    });
  };
  phoneChange = text => {
    this.setState({
      phoneno: text,
    });
  };
  navigateTo = screen => {
    const {navigation} = this.props;
   // navigation.navigate('JoinGroup');
   navigation.navigate(screen);
  };
  createGroup = async() => {
    // for demo purpose after 3s close modal
    let jsonData = {};
    let response ={};
    if(!this.state.restaurant)
    {
      alert(" Please Scan Restaraunt Menu QR Code or Join Group")
      //return;
    }
    else
    {
    jsonData.userId=this.state.loggedInUser.id;
    jsonData.resId=this.state.restaurant.id;
    var isEmailSent=false;
    try
    {
      response = await txnApi.addGroup(jsonData);
      
      isEmailSent=true;
    }
    catch(error)
    {
      alert(JSON.stringify(error))
    }
    
    if(isEmailSent)
    {
      //this.openAlertModal("We have emailed a password reset link.")
     //  alert("We have emailed a password reset link.")
     await AsyncStorage.removeItem('userGroup');
     await AsyncStorage.setItem('userGroup', JSON.stringify(response));
     const { dispatch } = this.props; 
            dispatch({ type: 'SAVE_GROUP_DATA',
            payload: response});
      
            dispatch({ type: 'CART.EMPTY' });
    this.navigateTo('HomeNavigator');
     this.closeModal();
   
    }
    else
    {
      this.closeModal();
      //this.openAlertModal("We could not find your email. Please try another email id")
      // alert("We could not find your email. Please try another email id")
       
    }
  }
    
  };
  
  createGroupForSingleUser = async() => {
    // for demo purpose after 3s close modal
    let jsonData = {};
    let response ={};
    if(!this.state.restaurant)
    {
      alert(" Please Scan Restaraunt Menu QR Code or Join Group")
      //return;
    }
    else
    {
    jsonData.userId=this.state.loggedInUser.id;
    jsonData.resId=this.state.restaurant.id;
    var isEmailSent=false;
    try
    {
      response = await txnApi.addGroup(jsonData);
      
      isEmailSent=true;
    }
    catch(error)
    {
      alert(JSON.stringify(error))
    }
    
    if(isEmailSent)
    {
      //this.openAlertModal("We have emailed a password reset link.")
     //  alert("We have emailed a password reset link.")
     await AsyncStorage.removeItem('userGroup');
     await AsyncStorage.setItem('userGroup', JSON.stringify(response));
     const { dispatch } = this.props; 
            dispatch({ type: 'SAVE_GROUP_DATA',
            payload: response});
            
            dispatch({ type: 'CART.EMPTY' });
    const {navigation} = this.props;
    navigation.navigate('HomeNavigator',{"groupNotCreated":true});
     this.closeModal();
   
    }
    else
    {
      this.closeModal();
      //this.openAlertModal("We could not find your email. Please try another email id")
      // alert("We could not find your email. Please try another email id")
       
    }
  }
    
  };
  addGroup = () => {
   
    this.createGroup()
    
  };

  closeModal = () => {
    // for demo purpose clear timeout if user request close modal before 3s timeout
    clearTimeout(this.timeout);
    this.setState({
      modalVisible: false,
    });
  };
  skip = e => {
    this.createGroupForSingleUser()
   // this.navigateTo('HomeNavigator');
     
 };
 joinGroup = e => {
        
  this.navigateTo('JoinGroup');
   
};
 onSelectedItemsChange = (selectedItems) => {
  // Set Selected Items
  setSelectedItems(selectedItems);
};
  render() {
    const {emailFocused, modalVisible,selectedItems} = this.state;
   
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
                  name="account-group-outline"
                  size={36}
                  color={Colors.primaryColor}
                />
              </View>
              <Paragraph style={styles.instruction}>
               
              </Paragraph>
            </View>
           
            
            <View style={styles.bottomButtonsContainer}>
            
               <Button
                onPress={this.addGroup}
                color={Colors.surface}
                buttonStyle={styles.button}
                title={'start a new group'.toUpperCase()}
                titleColor={Colors.primaryColor}
              />
              
            </View>
            <View style={styles.separator}>
                  <View style={styles.line} />
                  <Text style={styles.orText}>or</Text>
                  <View style={styles.line} />
                </View>

                <View style={styles.bottomButtonsContainer}>
                  <ContainedButton
                    onPress={this.joinGroup}
                    color={Colors.surface}
                    buttonStyle={styles.button}
                    iconColor="#3b5998"
                    title="Join Group"
                    titleColor="#3b5998"
                  />
                  
                </View>
                <View style={styles.bottomButtonsContainer}>
                  <ContainedButton
                    onPress={this.skip}
                    buttonStyle={styles.button}
                    color={Colors.tertiaryColor}
                    
                    title="Skip"
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
const mapStateToProps = (state) => {
 
    userProfile=state.postLoginData;
    restaurantData=state.restarauntData;
    userCart=state.cart;
    return {
      registeruser: state.postLoginData
    };
  };

export default connect(mapStateToProps)(AddGroup)