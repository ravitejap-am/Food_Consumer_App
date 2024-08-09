// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;


/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from 'react';
import { LogBox } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {enableScreens} from 'react-native-screens';
import { createAppContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// enableScreens();

// TODO: Remove when fixed
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended',
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
]);

// import MainNavigatorA or MainNavigatorB to preview design differnces
import MainNavigator from './src/navigation/MainNavigatorB';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/storage/store';
// import AuthLoading from './AuthLoadingScreen'

// APP

/*const AppNavigator = createStackNavigator({
  MainNavigator: {
    screen: MainNavigator,
    navigationOptions: { header: null }
  },
  AuthLoadingScreen: {
    screen: AuthLoading,
    navigationOptions: { header: null }
  },

}, {
  initialRouteName: 'AuthLoadingScreen',
  defaultNavigationOptions: {
    headerBackTitle: () => null,
    headerBackImage: () => null
  }
});*/
class App extends Component {

  constructor (props) {
    super(props);
    this.state = { 
      loading: false,
      isMesgModalVisible:false,
    };
    
  }
  render(){
    console.log("called ")
  return (
    <Provider store={store}>
       <PersistGate persistor={persistor}>
    <SafeAreaProvider>
     <MainNavigator />
  
    </SafeAreaProvider>
    </PersistGate>
    </Provider>
  );
  }
}

//const AppContainer = createAppContainer(AppNavigator)
export default App;
