


/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {Keyboard, ScrollView, StatusBar, StyleSheet, View,Platform,Text,Share} from 'react-native';
import Color from 'color';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { connect } from 'react-redux';
// import components
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import Button from '../../components/buttons/Button';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import ContainedButton from '../../components/buttons/ContainedButton';
import {Heading6, Caption, Paragraph} from '../../components/text/CustomText';

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
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  instructionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    paddingVertical: 16,
    fontWeight: '700',
    textAlign: 'left',
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
  addButton: {
    width: '49%',
  },
  joinButton: {
    width: '49%',
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
  grpNumText: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.primaryColor,
    textAlign: 'left',
  },
  caption: {
    padding: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
  dishContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    height: 56,
  },
  indicator: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emptyIndicator: {
    marginRight: 24,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Color(Colors.black).alpha(0.4),
    backgroundColor: Colors.background,
  },
  filledIndicator: {
    marginRight: 24,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Color(Colors.black).alpha(0.4),
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
 class MyGroup extends Component {
  constructor(props) {
    super(props);
   // let members=userGroup?( userGroup.hasOwnProperty("members")?userGroup.members:[]):[];
    this.state = {
      groupName: '',
      groupNumber: '',
      groupId: '',
      phoneno:'',
      userGroup:userGroup,
      members: [],
      selectedItems:items,
      loggedInUser:userProfile,
      restaurant:restaurantData,
      emailFocused: false,
      modalVisible: false,
      groupAdded:false,
    };
  }

  componentDidMount () {
    
    this.unsubscribe= this.props.navigation.addListener('focus', () => {
      
      
      this._bootstrap();
    })
  }
  
  componentWillUnmount () {
    this.unsubscribe()
  }

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
  onShare = async () => {
    try {
      const result = await Share.share({
       title: 'App link',
  message: 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en', 
  url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
         
        } else {
          // shared
          
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        
      }
    } catch (error) {
      alert(error.message);
    }
  };
  navigateTo = screen => {
    const {navigation} = this.props;
   // navigation.navigate('JoinGroup');
   navigation.replace(screen);
  };

  _bootstrap = async () => {
    let groupMembers=[];
    
   let groupNumber=''
   let userGroup = await AsyncStorage.getItem('userGroup');
   let group=JSON.parse(userGroup)
   
   if(group)
   {
    this.setState(
      {
        userGroup:group,
        members:group.members
      }
    )
   }
    
   if(this.state.userGroup)
   groupNumber=this.state.userGroup.groupNumber;
   else
   return
   
  
    try {
      this.setState(
        {
          modalVisible: true,
        },
      )
        let catResp=await txnApi.getGroupDetails(groupNumber);
        groupMembers=catResp.data.members
        await AsyncStorage.removeItem('userGroup');
        await AsyncStorage.setItem('userGroup', JSON.stringify(catResp.data));
        const { dispatch } = this.props; 
        dispatch({ type: 'SAVE_GROUP_DATA',
        payload: catResp.data});   
        this.setState(
          {
            
            userGroup:catResp.data,
            members:groupMembers
            
          },
        )
       
       // alert(JSON.stringify(catResp))
  } catch (error) {
    alert(" =error="+error);
      // Error retrieving data
  }
  this.setState(
    {
      modalVisible: false,
    },
  )
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
        
       const { dispatch } = this.props; 
              dispatch({ type: 'SAVE_GROUP_DATA',
              payload: response});
              dispatch({ type: 'CART.EMPTY' });
        await AsyncStorage.removeItem('userGroup');
        await AsyncStorage.setItem('userGroup', JSON.stringify(response));
      this.navigateTo('HomeNavigator');
       this.closeModal();
     
      }
      else
      {
        this.closeModal();
        //this.openAlertModal("We could not find your email. Please try another email id")
        alert("We could not create group. Please try again")
         
      }
    }
    
    
  };
  
 
  addGroup = () => {
   
    Keyboard.dismiss();
   
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
        
    this.navigateTo('HomeNavigator');
     
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
          style={styles.container}>
           

          <ScrollView contentContainerStyle={styles.container}>
          <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />
          <View style={styles.titleContainer}>
            <Heading6 style={styles.titleText}>My Group</Heading6>
          </View>
           <View style={styles.instructionContainer}>
              <View style={styles.iconContainer}>
                <Icon
                  name="account-group-outline"
                  size={36}
                  color={Colors.primaryColor}
                />
              </View>
              <Paragraph style={styles.grpNumText}>
               {this.state.userGroup? "Current Group Number is "+ this.state.userGroup.groupNumber:"" }
              </Paragraph>
            </View>
            <View>
            {this.state.userGroup? (<Caption style={styles.caption}>GROUP MEMBERS</Caption>):(<Text></Text>) }
              
              {this.state.members.map((item, index) => (
                <TouchableItem
                  key={index.toString()}
                  //onPress={this.setExtraDish(item)}
                  useForeground>
                  <View style={styles.dishContainer}>
                    <View style={styles.indicator}>
                      <View>
                        {item.picked ? (
                          <View style={styles.filledIndicator} />
                        ) : (
                          <View style={styles.filledIndicator} />
                        )}
                      </View>

                      <Text style={styles.dishName}>{this.state.loggedInUser.id==item.id?"Me":item.firstName}</Text>
                    </View>

                    <Text style={styles.dishPrice}>
                      
                    </Text>
                  </View>
                </TouchableItem>
              ))}
            </View>
            
           

               
               <View style={styles.bottomButtonsContainer}>
                <Button
                onPress={this.addGroup}
                color={Colors.primaryColor}
                buttonStyle={styles.addButton}
                title={'start a new group'.toUpperCase()}
                titleColor={Colors.onPrimaryColor}
              />
                  <ContainedButton
                    onPress={this.joinGroup}
                    color={Colors.tertiaryColor}
                    buttonStyle={styles.joinButton}
                    iconColor="#3b5998"
                    title="Join Group"
                    titleColor={Colors.onPrimaryColor}
                  />
                  
                </View>
                <View style={styles.instructionContainer}>
                <Paragraph style={styles.grpNumText}>
               
              </Paragraph>
                <Button
                onPress={this.onShare}
                color={Colors.accentColor}
                buttonStyle={styles.addButton}
                title={'Invite Friends'.toUpperCase()}
                titleColor={Colors.onPrimaryColor}
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
    userGroup=state.groupData;
    
    return {
      registeruser: state.postLoginData
    };
  };

export default connect(mapStateToProps)(MyGroup)