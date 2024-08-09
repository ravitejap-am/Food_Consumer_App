/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
// import components
import ContainedButton from '../../components/buttons/ContainedButton';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import {Heading5, Paragraph} from '../../components/text/CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import colors
import Colors from '../../theme/colors';

// OnboardingD Config
const bgImg = 'https://picsum.photos/id/122/720/1280';

const slide1Img = require('../../assets/img/onboarding_1.png');
const slide2Img = require('../../assets/img/onboarding_2.png');
const slide3Img = require('../../assets/img/onboarding_3.png');
const slide4Img = require('../../assets/img/onboarding_4.png');

const slides = [
  {
    id: 'slide1',
    img: slide1Img,
    title: 'Find your flavour',
    description:
      'Welcome to Easy Diners - A Digital Dining Experience on your fingertip.',
  },
  {
    id: 'slide2',
    img: slide2Img,
    title: 'Contactless Menu',
    description: 'Use the barcode menu and order directly from the app.',
  },
  {
    id: 'slide3',
    img: slide4Img,
    title: 'Share, Split And Group Dining',
    description: 'Just pay what you eat or buy some a drink or dinner.',
  },
  {
    id: 'slide4',
    img: slide3Img,
    title: 'Easy payment',
    description: 'Pay online with Credit Card, Debit Card, Apple Pay, Android Pay and paypal.',
  },
];

// OnboardingD Styles
const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
},
  screenContainer: {
    flex: 1,
  },
  skipLink: {
    position: 'absolute',
    right: 0,
    marginTop: StatusBar.currentHeight + 16,
    marginHorizontal: 16,
    padding: 8,
    color: Colors.white,
    letterSpacing: 0.4,
  },
  swiperContainer: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  slideContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  slideImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  slideImg: {
    width: 144,
    height: 104,
    resizeMode: 'cover',
  },
  title: {
    paddingTop: 24,
    color: Colors.onPrimaryColor,
    textAlign: 'center',
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
    textAlign: 'center',
    opacity: 0.96,
  },
  buttonContainer: {
    marginHorizontal: 64,
    marginBottom: 24,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    width: '100%',
    height: 56,
  },
  dot: {
    margin: 4,
    width: 16,
    height: 2,
    borderRadius: 1,
  },
  activeDot: {
    backgroundColor: Colors.onPrimaryColor,
  },
  inactiveDot: {
    backgroundColor: Colors.black,
    opacity: 0.32,
  },
});

// OnboardingD
 class OnboardingD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      showView:false
    };
    this._bootstrap();
  }
  componentDidMount () {
    
    this.unsubscribe= this.props.navigation.addListener('focus', () => {
      //Will execute when screen is focused
      
      this._bootstrap();
    })
  }
  
  componentWillUnmount () {
    this.unsubscribe()
  }
  _bootstrap = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.setState(
      {
        showView:false
      }
    )
   if(userToken)
   {
    
      const {navigation} = this.props;
      let user = await AsyncStorage.getItem('user');
      let userGroup = await AsyncStorage.getItem('userGroup');
      // let restaurantdata = await AsyncStorage.getItem('restaurantData');
      let userGroupInfo = JSON.parse(userGroup);
      let userInfo=JSON.parse(user)
      
      const { dispatch } = this.props; 
      dispatch({ type: 'SAVE_POST_LOGIN_DATA',
            payload: userInfo});
      dispatch({ type: 'SAVE_GROUP_DATA',
        payload: userGroupInfo});
        // dispatch({ type: 'SAVE_RESTARAUNT_DATA',
        //       payload: restaurantdata}); 
      navigation.navigate('HomeNavigator');

   }
   else
   {
   this.setState(
    {
      showView:true
    }
    
  )
   }
    
      }
  onIndexChanged = index => {
    this.setState({
      activeIndex: index,
    });
  };

  previousSlide = () => {
    this.swiper.scrollBy(-1, true);
  };

  nextSlide = () => {
    this.swiper.scrollBy(1, true);
  };

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  render() {
    const {activeIndex} = this.state;

    return (
     !this.state.showView?(<View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
  </View>)
     :(<ImageBackground source={{uri: bgImg}} style={styles.bgImg}>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
        />

        <GradientContainer
          colors={[Colors.secondaryGradientColor, 'transparent']}
          start={{x: 0, y: 0.64}}
          end={{x: 0, y: 0}}>
          <SafeAreaView style={styles.screenContainer}>
            <View style={styles.swiperContainer}>
              <Swiper
                ref={swiper => {
                  this.swiper = swiper;
                }}
                onIndexChanged={this.onIndexChanged}
                loop={false}
                showsPagination={false}>
                {slides.map(item => (
                  <View key={item.id} style={styles.slide}>
                    <View style={styles.slideContent}>
                      <View style={styles.slideImgContainer}>
                        <Image source={item.img} style={styles.slideImg} />
                      </View>

                      <Heading5 style={styles.title}>{item.title}</Heading5>

                      <View style={styles.descriptionContainer}>
                        <Paragraph style={styles.descriptionText}>
                          {item.description}
                        </Paragraph>
                      </View>
                    </View>
                  </View>
                ))}
              </Swiper>
            </View>

            {activeIndex < slides.length - 1 && (
              <Text
                onPress={this.navigateTo('SignIn')}
                style={styles.skipLink}>
                Skip
              </Text>
            )}

            <View style={styles.buttonContainer}>
              {activeIndex < slides.length - 1 ? (
                <ContainedButton
                  onPress={this.nextSlide}
                  title="next"
                  titleColor={Colors.black}
                  color={Colors.white}
                  rounded
                />
              ) : (
                <ContainedButton
                  onPress={this.navigateTo('SignIn')}
                  title="get started"
                  titleColor={Colors.black}
                  color={Colors.white}
                  rounded
                />
              )}
            </View>

            <View style={styles.paginationContainer}>
              {slides.map((item, i) => (
                <View
                  key={`dot_${item.id}`}
                  style={[
                    styles.dot,
                    activeIndex === i ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>
          </SafeAreaView>
        </GradientContainer>
      </ImageBackground>)
    );
  }
}
const mapStateToProps = (state) => {
  return {
    registeruser: state.postLoginData
  };
  
};
export default connect(mapStateToProps)(OnboardingD)