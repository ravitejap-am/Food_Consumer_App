/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {Platform, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import components
import HeaderIconButton from '../components/navigation/HeaderIconButton';

// import Onboarding screen
import Onboarding from '../screens/onboarding/OnboardingD';

// import Welcome screen
import Welcome from '../screens/welcome/WelcomeB';

// import SignUp screen
//import SignUp from '../screens/signup/SignUpB';

// import SignUp screen
import SignUp from '../screens/signup/SignUpWithOtpB';
// AddGroup
import AddGroup from '../screens/group/AddGroup';
// JoinGroup
import JoinGroup from '../screens/group/JoinGroup';


// import Verification screen
import Verification from '../screens/verification/VerificationB';
// import Verification screen
import LoginVerification from '../screens/verification/LoginOtpVerificationB';

// import SignIn screen
//import SignIn from '../screens/signin/SignInB';

import SignIn from '../screens/signin/SignInWithOtpB';

// import ForgotPassword screen
import ForgotPassword from '../screens/forgotpassword/ForgotPasswordB';
// import ForgotPassword screen
import ChangePassword from '../screens/changepassword/ChangePasswordB';

// import Scanner screen
import Scanner from '../screens/scanner/QRScanner';

// import TermsConditions screen
import TermsConditions from '../screens/terms/TermsConditionsB';

// import HomeNavigator
import HomeNavigator from './HomeNavigatorB';

// import Product screen
import Product from '../screens/product/ProductB';

// import Group Detail screen
import GroupDetail from '../screens/group/GroupDetailB';

// import Categories screen
import Category from '../screens/categories/CategoryB';
import Categories from '../screens/categories/CategoriesB';

// import Search Filter screen
import SearchFilter from '../screens/search/SearchFilterB';

// import Search Filter screen
import SearchOrScan from '../screens/common/SearchOrScan';

// import Search Results screen
import SearchResults from '../screens/search/SearchResultsB';

// import Checkout screen
import Checkout from '../screens/checkout/CheckoutB';

// import Payment screen
import PaymentMethod from '../screens/payment/PaymentMethodB';

// import AddCreditCard screen
import AddCreditCard from '../screens/payment/AddCreditCardB';

// import EditProfile screen
import EditProfile from '../screens/profile/EditProfileB';

// import Notifications screen
import Notifications from '../screens/notifications/NotificationsB';

// import DeliveryAddress screen
import DeliveryAddress from '../screens/address/DeliveryAddressB';

// import AddAddress screen
import AddAddress from '../screens/address/AddAddressB';

// import EditAddress screen
import EditAddress from '../screens/address/EditAddressB';

// import Orders screen
import Orders from '../screens/orders/OrdersB';

// import Orders screen
import PastOrders from '../screens/orders/PastOrders';

// import Settlements screen
import Settlements from '../screens/settlements/SettlementsB';

// import Orders screen
import Billing from '../screens/billing/BillingB';

// import AboutUs screen
import AboutUs from '../screens/about/AboutUsB';

// import colors
import Colors from '../theme/colors';
import AuthLoadingScreen from '../../AuthLoadingScreen'

// MainNavigatorA Config
const SAVE_ICON = Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark';

// create stack navigator
const Stack = createStackNavigator();
// MainNavigatorA
function MainNavigatorB() {
  return (
    <View
      style={[
        {flex: 1},
        // FIX ME: react navigation white glitch (flicker), remove this backgroundColor
        Platform.OS === 'android' && {backgroundColor: Colors.primaryColor},
      ]}>
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName={AuthLoadingScreen}
          screenOptions={{
            cardOverlayEnabled: false,
            cardShadowEnabled: false,
            // FIX ME: added to prevent some minor navigation glitches
            cardStyle: {
              backgroundColor: Colors.primaryColor,
            },
            headerStyle: {
              elevation: 1,
              shadowOpacity: 0,
            },
            headerBackTitleVisible: false,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTintColor: Colors.onPrimaryColor,
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
          />
          
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: 'Create Account',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
                elevation: 0,
                shadowOpacity: 0,
              },
            }}
          />
          <Stack.Screen
            name="AddGroup"
            component={AddGroup}
            options={{
              title: 'Add Group',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
                elevation: 0,
                shadowOpacity: 0,
              },
            }}
          />
          <Stack.Screen
            name="JoinGroup"
            component={JoinGroup}
            options={{
              title: 'Join Group',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
                elevation: 0,
                shadowOpacity: 0,
              },
            }}
          />
          <Stack.Screen
            name="Scanner"
            component={Scanner}
            options={{
              title: 'Scan Menu',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
                elevation: 0,
                shadowOpacity: 0,
              },
            }}
          />
          
          <Stack.Screen
            name="Verification"
            component={Verification}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginVerification"
            component={LoginVerification}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
                elevation: 0,
                shadowOpacity: 0,
              },
              title: 'Sign In',
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
                elevation: 0,
                shadowOpacity: 0,
              },
              title: 'Forgot Password?',
            }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
                elevation: 0,
                shadowOpacity: 0,
              },
              title: 'Forgot Password?',
            }}
          />
          <Stack.Screen
            name="TermsConditions"
            component={TermsConditions}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'Terms and Conditions',
            }}
          />
          <Stack.Screen
            name="HomeNavigator"
            component={HomeNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Categories"
            component={Categories}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'All Categories',
            }}
          />
          <Stack.Screen
            name="Category"
            component={Category}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'Pizza',
            }}
          />
          <Stack.Screen
            name="Product"
            component={Product}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GroupDetail"
            component={GroupDetail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SearchResults"
            component={SearchResults}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'Search Results',
            }}
          />
          <Stack.Screen
            name="SearchOrScan"
            component={SearchOrScan}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'Search Results',
            }}
          />
          <Stack.Screen
            name="SearchFilter"
            component={SearchFilter}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'Filter',
            }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{
              title: 'Checkout',
              headerStyle: {
                backgroundColor: Colors.primaryColor,
                elevation: 0,
                shadowOpacity: 0,
              },
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={({navigation}) => ({
              headerStyle: {
                backgroundColor: Colors.primaryColor,
                elevation: 0,
                shadowOpacity: 0,
              },
              title: 'Edit Profile',
              headerRight: () => (
                <HeaderIconButton
                  onPress={() => navigation.goBack()}
                  name={SAVE_ICON}
                  color={Colors.onPrimaryColor}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'Notifications',
            }}
          />
          <Stack.Screen
            name="DeliveryAddress"
            component={DeliveryAddress}
            options={({navigation}) => ({
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'Delivery Address',
              headerRight: () => (
                <HeaderIconButton
                  onPress={() => navigation.goBack()}
                  name={SAVE_ICON}
                  color={Colors.onPrimaryColor}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddAddress"
            component={AddAddress}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'Add New Address',
            }}
          />
          <Stack.Screen
            name="EditAddress"
            component={EditAddress}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'Edit Address',
            }}
          />
          <Stack.Screen
            name="PaymentMethod"
            component={PaymentMethod}
            options={({navigation}) => ({
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'Payment Method',
              headerRight: () => (
                <HeaderIconButton
                  onPress={() => navigation.goBack()}
                  name={SAVE_ICON}
                  color={Colors.onPrimaryColor}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddCreditCard"
            component={AddCreditCard}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'Add Credit Card',
            }}
          />
          <Stack.Screen
            name="Orders"
            component={Orders}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'Current Order',
            }}
          />
          <Stack.Screen
            name="PastOrders"
            component={PastOrders}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'Past Orders',
            }}
          />
          <Stack.Screen
            name="Settlements"
            component={Settlements}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'My Settlements',
            }}
          />
          <Stack.Screen
            name="Billing"
            component={Billing}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'My Billing',
            }}
          />
          <Stack.Screen
            name="AboutUs"
            component={AboutUs}
            options={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              title: 'About Us',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default MainNavigatorB;
