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
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Share,
  View,
} from 'react-native';
import { connect } from 'react-redux';
// import components
import Avatar from '../../components/avatar/Avatar';
import Divider from '../../components/divider/Divider';
import { CommonActions } from "@react-navigation/native";
import Icon from '../../components/icon/Icon';
import {Heading6, Subtitle1, Subtitle2} from '../../components/text/CustomText';
import SafeAreaView from '../../components/SafeAreaView';
import TouchableItem from '../../components/TouchableItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import colors
import Colors from '../../theme/colors';

// SettingsB Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';

const NOTIFICATION_OFF_ICON = IOS
  ? 'ios-notifications-off'
  : 'md-notifications-off';
const NOTIFICATION_ICON = IOS ? 'ios-notifications' : 'md-notifications';

const ADDRESS_ICON = IOS ? 'ios-pin' : 'md-pin';
const PAYMENT_ICON = IOS ? 'ios-share' : 'md-share';
const ORDERS_ICON = IOS ? 'ios-list' : 'md-list';
const MONEY_ICON = IOS ? 'ios-cash' : 'md-cash';
const ABOUT_ICON = IOS ? 'ios-finger-print' : 'md-finger-print';
const UPDATE_ICON = IOS ? 'ios-cloud-download' : 'md-cloud-download';
const TERMS_ICON = IOS ? 'ios-paper' : 'md-paper';
const COPY_RIGHT_ICON = IOS ? 'ios-warning' : 'md-warning';
const PRIVACY_ICON = IOS ? 'ios-book' : 'md-book';

const ADD_ICON = IOS ? 'ios-add-circle-outline' : 'md-add-circle-outline';
const LOGOUT_ICON = IOS ? 'ios-exit' : 'md-exit';

// SettingsB Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainerStyle: {
    paddingBottom: 16,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  profileContainer: {
    // height: 88
    paddingVertical: 16,
  },
  leftSide: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileInfo: {
    paddingLeft: 16,
  },
  name: {
    fontWeight: '500',
    textAlign: 'left',
  },
  email: {
    paddingVertical: 2,
  },
  sectionHeader: {
    paddingTop: 16,
    paddingHorizontal: 16,
    textAlign: 'left',
  },
  sectionHeaderText: {
    textAlign: 'left',
  },
  setting: {
    height: 48,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    width: 24,
    height: 24,
  },
});

// SectionHeader Props
type SectionHeaderProps = {
  title: string,
};

// Setting Props
type SettingProps = {
  icon: string,
  setting: string,
  type: string,
  onPress: () => {},
};

// SettingsB Components
const SectionHeader = ({title}: SectionHeaderProps) => (
  <View style={styles.sectionHeader}>
    <Subtitle1 style={styles.sectionHeaderText}>{title}</Subtitle1>
  </View>
);

const Setting = ({onPress, icon, setting, type}: SettingProps) => (
  <TouchableItem onPress={onPress}>
    <View style={[styles.row, styles.setting]}>
      <View style={styles.leftSide}>
        {icon !== undefined && (
          <View style={styles.iconContainer}>
            <Icon
              name={icon}
              size={20}
              color={
                type === 'logout' ? Colors.secondaryColor : Colors.primaryColor
              }
            />
          </View>
        )}
        <Subtitle2 style={type === 'logout' && {color: Colors.secondaryColor}}>
          {setting}
        </Subtitle2>
      </View>

      {type !== 'logout' && (
        <View style={isRTL && {transform: [{scaleX: -1}]}}>
          <Icon
            name="ios-arrow-forward"
            size={16}
            color="rgba(0, 0, 0, 0.16)"
          />
        </View>
      )}
    </View>
  </TouchableItem>
);
let userProfile={
  
};

// SetingsB
class SettingsB extends Component {
  constructor(props) {
    super(props);
    let user=userProfile
    this.state = {
      notificationsOn: true,
      postLoginData:user
    };
  }

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };
  
componentDidMount () {
    
    this.unsubscribe= this.props.navigation.addListener('focus', () => {
      //Will execute when screen is focused
      
      this.setState(
        {
          modalVisible: false,
          postLoginData:userProfile
        })
    })
  }
  
  componentWillUnmount () {
    this.unsubscribe()
  }
  toggleNotifications = value => {
    this.setState({
      postLoginData: userProfile,
    });
  };
 
  logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'OK', onPress: () => {
          AsyncStorage.removeItem("userToken");
          AsyncStorage.removeItem("userGroup");
          AsyncStorage.getAllKeys()
          .then(keys => AsyncStorage.multiRemove(keys))
          const { dispatch } = this.props; 
        dispatch({ type: 'RESET' });
         // this.props.navigation.navigate("SignIn")
          this.props.navigation.dispatch(
            CommonActions.reset({
               index: 0,
               routes: [{ name: "SignIn" }],
           })
       );
        }},
      ],
      {cancelable: false},
    );
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
  render() {
    const {notificationsOn} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.titleContainer}>
            <Heading6 style={styles.titleText}>Settings</Heading6>
          </View>

          <TouchableItem useForeground onPress={this.navigateTo('EditProfile')}>
            <View style={[styles.row, styles.profileContainer]}>
              <View style={styles.leftSide}>
                <Avatar
                  imageUri={require('../../assets/img/profile_1.jpeg')}
                  size={60}
                  rounded
                />
                <View style={styles.profileInfo}>
                  <Subtitle1 style={styles.name}>{this.state.postLoginData.firstName}</Subtitle1>
                  <Subtitle2 style={styles.email}>
                  {this.state.postLoginData.emailAddress}
                  </Subtitle2>
                </View>
              </View>
            </View>
          </TouchableItem>

          <Divider />

          {/*<SectionHeader title="Notifications" />
          <TouchableItem onPress={this.navigateTo('Notifications')}>
            <View style={[styles.row, styles.setting]}>
              <View style={styles.leftSide}>
                <View style={styles.iconContainer}>
                  {notificationsOn ? (
                    <Icon
                      name={NOTIFICATION_ICON}
                      size={20}
                      color={Colors.primaryColor}
                    />
                  ) : (
                    <Icon
                      name={NOTIFICATION_OFF_ICON}
                      size={20}
                      color={Colors.primaryColor}
                    />
                  )}
                </View>
                <Subtitle2>Notifications</Subtitle2>
              </View>

              <Switch
                trackColor={{
                  true: IOS && Colors.primaryColor,
                }}
                thumbColor={IOS ? Colors.onPrimaryColor : Colors.primaryColor}
                value={notificationsOn}
                onValueChange={this.toggleNotifications}
              />
            </View>
          </TouchableItem>

          <SectionHeader title="Address" />
          <Setting
            onPress={this.navigateTo('DeliveryAddress')}
            icon={ADDRESS_ICON}
            setting="Set Delivery Address"
          />

          <SectionHeader title="Payments" />
          <Setting
            onPress={this.navigateTo('PaymentMethod')}
            icon={PAYMENT_ICON}
            setting="Choose Payment Method"
              />*/}

          <SectionHeader title="Orders" />
          <Setting
            onPress={this.navigateTo('Orders')}
            icon={ORDERS_ICON}
            setting="Current Order"
          />
          <Setting
            onPress={this.navigateTo('PastOrders')}
            icon={ORDERS_ICON}
            setting="Past Orders"
          />
          <SectionHeader title="Settlements" />
          <Setting
            onPress={this.navigateTo('Settlements')}
            icon={MONEY_ICON}
            setting="My Settlements"
          />
          <SectionHeader title="About" />
          <Setting
            onPress={this.navigateTo('AboutUs')}
            icon={ABOUT_ICON}
            setting="Who We Are"
          />
          <SectionHeader title="Legal" />
          <Setting
            onPress={this.navigateTo('TermsConditions')}
            icon={COPY_RIGHT_ICON}
            setting="Copyright"
          />
          <Setting
            onPress={this.navigateTo('TermsConditions')}
            icon={PRIVACY_ICON}
            setting="Privacy Policy"
          />
          <Setting
            onPress={this.navigateTo('TermsConditions')}
            icon={TERMS_ICON}
            setting="Terms of Use"
          />

          <SectionHeader title="Logins" />
          <Setting icon={ADD_ICON} setting="Edit Account" onPress={this.navigateTo('EditProfile')} />
          
          <Setting
            onPress={this.onShare}
            icon={PAYMENT_ICON}
            setting="Invite"
            
          />
          <Setting
            onPress={this.logout}
            icon={LOGOUT_ICON}
            setting="Log Out"
            type="logout"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
 
  userProfile=state.postLoginData;
 
  return {
    registeruser: state.postLoginData
  };
};
export default connect(mapStateToProps)(SettingsB)