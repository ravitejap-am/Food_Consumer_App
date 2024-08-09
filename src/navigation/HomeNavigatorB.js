/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';

import { connect } from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';


// import components
import TabBadgeIcon from '../components/navigation/TabBadgeIcon';

// import Home screen
import Home from '../screens/home/HomeB';

// import Search screen
import Search from '../screens/search/SearchB';
import QRCode from '../screens/scanner/SearchAtTab';

// import Favorites screen
import Favorites from '../screens/group/MyGroup';

// import Cart screen
import Cart from '../screens/cart/CartB';

// import Settings screen
import Settings from '../screens/settings/SettingsB';

// import colors
import Colors from '../theme/colors';
import { useRoute } from '@react-navigation/native';
// HomeNavigator Config

type Props = {
  color: string,
  focused: string,
  size: number,
};

// create bottom tab navigator
const Tab = createBottomTabNavigator();

// HomeNavigator
function HomeNavigator({userGroup,cartCount}) {
  const route = useRoute();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused, size}: Props) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = `book-open${focused ? '' : '-outline'}`;
            
          } else if (route.name === 'Search') {
            iconName = 'qrcode-scan';
          } else if (route.name === 'Group') {
            iconName = `account-group${focused ? '' : '-outline'}`;
          } 
          else if (route.name === 'Settings') {
            iconName = `account${focused ? '' : '-outline'}`;
          }
          // else if (route.name === 'Settings') {
          //   iconName = `settings${focused ? '' : '-outline'}`;
          // }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: Colors.secondaryText,
        showLabel: false, // hide labels
        style: {
          backgroundColor: Colors.surface, // TabBar background
        },
      }}>
      <Tab.Screen name="Home" component={Home}  initialParams={{ groupNotCreated:route.params?route.params.groupNotCreated?route.params.groupNotCreated:false:false,
        isScanDone:route.params?route.params.isScanDone?route.params.isScanDone:false:false }}/>
      <Tab.Screen name="Search" component={QRCode} 
      options={{
        title: 'Scan Menu',
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}

      
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        
        
       // children={() => <Cart groupData={userGroup} />}
        options={{
          tabBarIcon: props => (
            <TabBadgeIcon
              name={`cart${props.focused ? '' : '-outline'}`}
              badgeCount={cartCount.count}
              {...props}
            />
          ),
          
        }}
      />
      <Tab.Screen name="Group" component={Favorites} initialParams={{ userGroup:userGroup}}/>
      <Tab.Screen name="Settings" component={Settings} 
      // options={{
      //   tabBarLabel: () => { return null },
       
      //   tabBarIcon: ({color, focused, size}) => (
      //     <Icon name="search-outline" size={size} color={color} />
      //   ),
      // }}
      />
    </Tab.Navigator>
  );
}
const mapStateToProps = state => ({
  
  userGroup:state.groupData,
  cartCount: {
   
    count: state.cart.cartCount,
  },
});



export default connect(mapStateToProps)(HomeNavigator)

