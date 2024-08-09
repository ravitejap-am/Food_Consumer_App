/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  Animated,
  I18nManager,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import Color from 'color';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import InfoModal from '../../components/modals/InfoModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import components
import Button from '../../components/buttons/Button';
import {Caption, Heading6, Subtitle2} from '../../components/text/CustomText';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';
import * as api from '../../api/TransactionService'
import * as appUtil from '../../utils/AppUtil'
// AddCreditCardB Config
const isRTL = I18nManager.isRTL;
const INPUT_FOCUSED_BORDER_COLOR = '#000';
const INPUT_ERROR_BORDER_COLOR = '#FF0000';
const CHECKMARK_ICON =
  Platform.OS === 'ios'
    ? 'ios-checkmark-circle-outline'
    : 'md-checkmark-circle-outline';
  const ERROR_ICON =
  Platform.OS === 'ios'
    ? 'ios-close-circle-outline'
    : 'md-close-circle-outline';
// AddCreditCardB Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Layout.SCREEN_WIDTH,
    height: 228,
  },
  creditCard: {
    width: Layout.SCREEN_WIDTH - 32,
    height: 196,
    backfaceVisibility: 'hidden',
  },
  creditCardContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cardBrand: {
    height: 38,
  },
  cardNumberContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    maxWidth: 290,
  },
  digitsGroup: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
  digit: {
    width: 13,
    color: Colors.white,
    textAlign: 'center',
  },
  lowOpacity: {
    opacity: 0.4,
  },
  caption: {
    marginRight: 38,
    color: Color(Colors.white).alpha(0.76),
    textAlign: 'left',
  },
  whiteText: {
    color: Colors.white,
  },
  cardHolder: {
    flex: 1,
    marginRight: 12,
    height: 44,
  },
  cardHolderName: {
    textAlign: 'left',
  },
  expiryDate: {
    flexDirection: 'row',
  },
  expiry: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
  },
  creditCardBack: {
    position: 'absolute',
  },
  creditCardBackContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 10,
  },
  magneticStripe: {
    width: '100%',
    height: 40,
    backgroundColor: Colors.black,
  },
  cvcRow: {
    flexDirection: 'row',
    justifyContent: isRTL ? 'flex-start' : 'flex-end',
    marginTop: 24,
    paddingHorizontal: 28,
    width: '100%',
    height: 40,
  },
  cvcContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 36,
    backgroundColor: Colors.white,
  },
  cvc: {
    textAlign: 'center',
  },
  form: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  horizontalForm: {
    paddingLeft: 24,
  },
  overline: {
    color: Color(Colors.secondaryText).alpha(0.6),
    textAlign: 'left',
  },
  inputWrapper: {
    marginRight: 24,
    width: Layout.SCREEN_WIDTH / 1.7,
  },
  smallInputWrapper: {
    marginRight: 24,
    width: Layout.SCREEN_WIDTH / 4,
  },
  inputContainerStyle: {
    marginTop: 0,
    marginBottom: 16,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  flipButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    width: 48,
    height: 48,
    backgroundColor: 'rgba(35, 47, 52, 0.12)',
  },
  button: {width: '82%'},
});

// AddCreditCardB
let userProfile={
  
};
let restaurantData={
  
};
let userCart={
  
};
let userGroup={
  
};
class AddCreditCardB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser:userProfile,
      restaurant:restaurantData,
      userGroup:userGroup,
      frontCardVisible: true,
      backspacePress: false,
      cardNumber: '',
      isValidCard: true,
      isValidCVV:true,
      cardNumberFocused: false,
      cardHolder: '',
      cardHolderFocused: false,
      expiry: '',
      expiryFocused: false,
      cvc: '',
      cvcFocused: false,
      totalAmt:0,
      modalVisible: false,
      infoModalVisible: false,
      msg:'',
      cardType: 'visa',
      icon:CHECKMARK_ICON,
      infoModalTitle:'SUCCESS!',
      successAction:true,
      cvvSize:0
    };

    this.animatedValue = new Animated.Value(0);
    this.value = 0;

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });

    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  }
  closeInfoModal = value => () => {
    this.setState(
      {
        infoModalVisible: value,
      },
      () => {
        this.goBack();
      },
    );
  };
  
  componentDidMount = () => {
    let amount=0;
    if(this.props.route.params)
    amount=this.props.route.params.amount
  
    this.setState(
      {
        totalAmt:amount
      }
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  };

  // avoid memory leak
  componentWillUnmount = () => {
    this.keyboardDidHideListener.remove();
  };

  keyboardDidHide = () => {
    this.setState({
      cardNumberFocused: false,
      cardHolderFocused: false,
      expiryFocused: false,
      cvcFocused: false,
    });
  };
   getCreditCardToken = async (params) => {
    let successMsg="";
    try{
    
   let activeIndex=1;
   let orderIdList=[]
    
    if(this.props.route.params)
    {
     
    orderIdList=this.props.route.params.orderNumber
    activeIndex=this.props.route.params.activeIndex
    
    }
    let token=await api.createToken(params);
    console.log(" token ",token)

  if(activeIndex==0)
  {
    let requestJson = {};
    let orderNumber=orderIdList;
    let tokenId=token.id;
    
    requestJson.userId=this.state.loggedInUser.id
    requestJson.orderId=orderNumber
    requestJson.token=tokenId
    requestJson.amount=this.state.totalAmt
    let response=await api.createCharge(requestJson);

    successMsg=response.data
    //alert(JSON.stringify(successMsg))
    if(successMsg=="Payment Failed")
    {
    this.setState(
      {
        msg:"Your transaction was not successful. Please try again.",
        icon:ERROR_ICON,
        successAction:false,
        infoModalTitle:'FAILURE!',
      }
    )
    }
    else
    {
      this.setState(
        {
          msg:"You have successfully made the payment.",
          icon:CHECKMARK_ICON,
          successAction:true,
          infoModalTitle:'SUCCESS!',
        }
      )
    }
    
  }
  else
  {
    let requestJson = {};
    let tokenId=token.id;
    
    requestJson.userId=this.state.loggedInUser.id
    requestJson.orderIds=orderIdList
    requestJson.token=tokenId
    
   let response=await api.createGroupCharge(requestJson);
   successMsg=response.data
   if(successMsg=="Payment Failed")
    {
    this.setState(
      {
        msg:"Your transaction was not successful. Please try again.",
        icon:ERROR_ICON,
        successAction:false,
        infoModalTitle:'FAILURE!',
      }
    )
    }
    else
    {
      this.setState(
        {
          msg:"You have successfully made the payment.",
          icon:CHECKMARK_ICON,
          successAction:true,
          infoModalTitle:'SUCCESS!',
        }
      )
    }
 
  }
    
   // const {navigation} = this.props;
    //navigation.navigate('Orders')
    return successMsg;
    }
    catch(e)
    {
   
    this.setState(
      {
        msg:"Payment failed!. Please try again.",
        icon:ERROR_ICON,
        successAction:false,
        infoModalTitle:'FAILURE!',
      }
    )
    successMsg="error"
    }
    return successMsg;
    
   };
  goBack = () => {
    const {navigation} = this.props;
    if(this.state.successAction)
    navigation.goBack();
  };
  validateInput =  () => {
   
    let isUserExists = true;
    let errorMsg="";
    
    if(this.state.cardNumber=="")
    {
      errorMsg= "Please enter card number."+"\n";
      isUserExists = false;
      
    }
    else
    {
      
      if(!this.state.isValidCard)
      {
        errorMsg= "Please enter valid card number."+"\n";
        isUserExists = false;
      }
      
    }
    
  
    if(this.state.cardHolder=="")
    {
      errorMsg= errorMsg+"Please enter card holder name."+"\n";
     // alert("Please enter card holder name.")
     isUserExists = false;
    }
    
    if(this.state.expiry=="")
    {
      errorMsg= errorMsg+"Please enter expiry date."+"\n";
      //alert("Please enter expiry date.")
      isUserExists = false;
        // alert("Please enter valid password.")
    }
    
    
    if (this.state.cvc == "") {
     // this.openAlertModal("Please enter valid email address.")
     errorMsg= errorMsg+"Please enter cvv."+"\n";
      
     isUserExists = false;
    }
    this.setState
    (
      {
        msg:errorMsg
      }
    )
return isUserExists;

  }
  onSubmit = async () => {
   
let success = this.validateInput()

if(success){
const { navigation } = this.props;
// Disable the Submit button after the request is sent
this.setState({ submitted: true,loading:true });
let exp_month="";
let exp_year="";
if(this.state.expiry.includes('/')){
  exp_month=this.state.expiry.substring(0,2)
  exp_year=this.state.expiry.substring(4,this.state.expiry.length.toString())
  
}
let requestJson= {
number: this.state.cardNumber,
exp_month: parseInt(exp_month),
exp_year: parseInt(exp_year),
cvc: this.state.cvc,
name: this.state.cardHolder,
currency: 'CAD'

}
let creditCardToken;

try {
// Create a credit card token
this.setState(
  {
    modalVisible: true,
  },
)
creditCardToken = await this.getCreditCardToken(requestJson);

if (creditCardToken!="error") {

this.setState({ submitted: false, error: null,loading:false });
const { dispatch } = this.props; 
dispatch({ type: 'CART.EMPTY',
payload: 0});

this.setState(
  {
    modalVisible: false,
    infoModalVisible:true,
    
    successAction:true
  })
//navigation.navigate('ThankYou',creditCardToken.orderSuccessResponse)
}
else
{
this.setState({ submitted: false, error: "" ,loading:false});
this.setState(
  {
    modalVisible: false,
    infoModalVisible:true,
    infoModalTitle:'FAILURE!',
    msg:"Your payment was not successful. Please try again.",
    icon:ERROR_ICON,
    successAction:false
  },
)
return;
}
} catch (e) {

this.setState({ submitted: false, error: "",loading:false });
this.setState(
  {
    modalVisible: false,
    infoModalVisible:false,
    infoModalTitle:'FAILURE!',
    msg:"Your payment was not successful. Please try again Please.",
    icon:ERROR_ICON,
    successAction:false
  },
)
return;
}
this.setState(
  {
    modalVisible: false,
  },
)
}
else
{
  this.setState({
    infoModalVisible: true,
    icon:ERROR_ICON,
    infoModalTitle:'VALIDATION FAILURE!',
    successAction:false
  });
}
    
};

  flipCreditCard = () => {
    const {frontCardVisible} = this.state;

    if (frontCardVisible) {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    }

    this.setState({
      frontCardVisible: !frontCardVisible,
    });
  };

  onKeyPress = ({nativeEvent}) => {
    if (nativeEvent.key === 'Backspace') {
      this.setState({
        backspacePress: true,
      });
    }
  };

  // TODO: Find a more elegant solution, maybe with template string
  changeCardNumber = (text) => {
    const {backspacePress} = this.state;
    let {cardNumber} = this.state;

    let char;
    const lastCharIndex = text.length - 1;

    // type logic
    if (lastCharIndex > -1) {
      char = text.charAt(lastCharIndex);

      if (char.match(/^[0-9]$/)) {
        if (
          lastCharIndex === 4 ||
          lastCharIndex === 9 ||
          lastCharIndex === 14
        ) {
          cardNumber = cardNumber + ' ' + char;
        } else {
          cardNumber = cardNumber + char;
        }

        if (lastCharIndex === 3) {
          cardNumber = cardNumber + ' ';
        } else if (lastCharIndex === 8) {
          cardNumber = cardNumber + ' ';
        } else if (lastCharIndex === 13) {
          cardNumber = cardNumber + ' ';
        }

        this.setState({
          cardNumber,
          backspacePress: false,
        }
        , () => {
          try {
          var valid = require("card-validator");
          let cardType='';
          const numberValidation = valid.number(this.state.cardNumber);
          if (numberValidation.isValid) {
          this.setState({ isValidCard: true })
          } else {
          this.setState({ isValidCard: false })
          }
          if(text.length.toString() == 0)
          {
          console.log(text.length.toString())
          this.setState({
          cardType:"placeholder"
          })
          }
          else
          {
          if (numberValidation.card) {
          
          
          if(numberValidation.card.type == "american-express")
          {
          cardType='amex';
          
          }
          else if(numberValidation.card.type == "diners-club")
          {
          cardType='diners-club';
          
          }
          else if(numberValidation.card.type == "mastercard")
          {
          cardType='mastercard';
          
          }
          else{
          cardType=numberValidation.card.type
          
          }
          console.log("cvc "+numberValidation.card.code.size)
          console.log("lengths "+numberValidation.card.lengths)
          this.setState({ 
          cardType: cardType ,
          cvvSize: numberValidation.card.code.size })
          }
          }
         
          
          
          }
          catch (error) {
          console.log(error)
          this.setState({ isValidCard: false })
          }
          }
        );
      }
    }

    // delete logic
    if (backspacePress) {
      this.setState({
        cardNumber: text,
        backspacePress: false,
      }
      );
    }
  };

  changeCardHolder = (text) => {
    if (text === '') {
      this.setState({
        cardHolder: '',
      });
    } else {
      this.setState({
        cardHolder: text,
      });
    }
  };

  // TODO: Find a more elegant solution, maybe with template string
  changeExpiry = (text) => {
    const {backspacePress} = this.state;
    let {expiry} = this.state;

    let char;
    const lastCharIndex = text.length - 1;

    // type logic
    if (lastCharIndex > -1) {
      char = text.charAt(lastCharIndex);

      if (char.match(/^[0-9]$/)) {
        if (lastCharIndex === 2) {
          expiry = expiry + ' / ' + char;
        } else if (lastCharIndex === 3) {
          expiry = expiry + '/ ' + char;
        } else if (lastCharIndex === 4) {
          expiry = expiry + ' ' + char;
        } else {
          expiry = expiry + char;
        }

        this.setState({
          expiry,
        });
      }
    }

    // delete logic
    if (backspacePress) {
      this.setState({
        expiry: text,
        backspacePress: false,
      });
    }
  };

  changeCVC = (text) => {
    this.setState({
      cvc: text,
    },
     () => {
      try {
      var valid = require("card-validator");
      const cvvValidation = valid.cvv(this.state.cvc, this.state.cvvSize)
      if (cvvValidation.isPotentiallyValid) {
      this.setState({ isValidCVV: true })
      } else {
      this.setState({ isValidCVV: false })
      }
      console.log(this.state.isValidCVV)
      } catch (error) {
      console.log(error)
      }
      }
    );
  };

  onFocus = (key) => () => {
    const {frontCardVisible} = this.state;
    let focusedInputs = {
      cardNumberFocused: false,
      cardHolderFocused: false,
      expiryFocused: false,
      cvcFocused: false,
    };
    focusedInputs[key] = true;

    if (key === 'cvcFocused' && frontCardVisible) {
      this.setState(
        {
          frontCardVisible: false,
        },
        this.flipCreditCard(),
      );
    } else if (key != 'cvcFocused' && !frontCardVisible) {
      this.flipCreditCard();
    }

    this.setState({
      ...focusedInputs,
    });
  };

  focusOn = (nextFiled) => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  render() {
    const {
      cardNumber,
      cardNumberFocused,
      cardHolder,
      cardHolderFocused,
      expiry,
      expiryFocused,
      cvc,
      cvcFocused,
      totalAmt,
      modalVisible,
      infoModalVisible,
      msg,
      isValidCard
    } = this.state;

    const frontAnimatedStyle = {
      transform: [{rotateY: this.frontInterpolate}],
    };
    const backAnimatedStyle = {
      transform: [{rotateY: this.backInterpolate}],
    };

    return (
      
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />
<KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
        <ScrollView>
          <View style={styles.cardContainer}>
            <Animated.View style={[styles.creditCard, frontAnimatedStyle]}>
              <GradientContainer
                colors={['#784BA0', '#2B86C5']}
                containerStyle={styles.creditCardContent}>
                <View style={styles.cardInfo}>
                  <View style={styles.cardBrand}>
                    {/* TODO: Add logic to recognize the brand: cc-visa | cc-mastercard | cc-discover | cc-amex */}
                    <FAIcon name={'cc-'+this.state.cardType} size={36} color={Colors.white} />
                  </View>
                </View>

                <View style={styles.cardNumberContainer}>
                  <View style={styles.digitsGroup}>
                    {[0, 1, 2, 3].map((i) => (
                      <Heading6
                        key={i}
                        style={[
                          styles.digit,
                          !cardNumber[i] && styles.lowOpacity,
                        ]}>
                        {cardNumber[i] || 'X'}
                      </Heading6>
                    ))}
                  </View>

                  <View style={styles.digitsGroup}>
                    {[5, 6, 7, 8].map((i) => (
                      <Heading6
                        key={i}
                        style={[
                          styles.digit,
                          !cardNumber[i] && styles.lowOpacity,
                        ]}>
                        {cardNumber[i] || 'X'}
                      </Heading6>
                    ))}
                  </View>

                  <View style={styles.digitsGroup}>
                    {[10, 11, 12, 13].map((i) => (
                      <Heading6
                        key={i}
                        style={[
                          styles.digit,
                          !cardNumber[i] && styles.lowOpacity,
                        ]}>
                        {cardNumber[i] || 'X'}
                      </Heading6>
                    ))}
                  </View>

                  <View style={styles.digitsGroup}>
                    {[15, 16, 17, 18].map((i) => (
                      <Heading6
                        key={i}
                        style={[
                          styles.digit,
                          !cardNumber[i] && styles.lowOpacity,
                        ]}>
                        {cardNumber[i] || 'X'}
                      </Heading6>
                    ))}
                  </View>
                </View>

                <View style={styles.cardInfo}>
                  <View style={styles.cardHolder}>
                    <Caption style={styles.caption}>Card Holder</Caption>
                    <Heading6
                      style={[
                        styles.whiteText,
                        styles.cardHolderName,
                        cardHolder === 'Full Name' && styles.lowOpacity,
                      ]}
                      numberOfLines={1}>
                      {cardHolder}
                    </Heading6>
                  </View>

                  <View>
                    <Caption style={styles.caption}>Expires</Caption>
                    <View style={styles.expiryDate}>
                      <View style={styles.expiry}>
                        {[0, 1].map((i) => (
                          <Heading6
                            key={i}
                            style={[
                              styles.whiteText,
                              !expiry[i] && styles.lowOpacity,
                            ]}>
                            {expiry[i] || 'M'}
                          </Heading6>
                        ))}

                        <Heading6
                          style={[
                            styles.whiteText,
                            !expiry[2] && styles.lowOpacity,
                          ]}>
                          {` / `}
                        </Heading6>

                        {[5, 6].map((i) => (
                          <Heading6
                            key={i}
                            style={[
                              styles.whiteText,
                              !expiry[i] && styles.lowOpacity,
                            ]}>
                            {expiry[i] || 'Y'}
                          </Heading6>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              </GradientContainer>
            </Animated.View>

            <Animated.View
              style={[
                styles.creditCard,
                styles.creditCardBack,
                backAnimatedStyle,
              ]}>
              <GradientContainer
                colors={['#2B86C5', '#784BA0']}
                containerStyle={styles.creditCardBackContent}>
                <View style={styles.magneticStripe} />

                <View style={styles.cvcRow}>
                  <View style={styles.cvcContainer}>
                    <Heading6 style={styles.cvc}>{cvc}</Heading6>
                  </View>
                </View>
              </GradientContainer>
            </Animated.View>
          </View>

          <View style={styles.form}>
            <ScrollView
              vertical
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalForm}>
              <View style={styles.inputWrapper}>
                <Subtitle2 style={styles.overline}>Card Number</Subtitle2>
                <UnderlineTextInput
                  onChangeText={this.changeCardNumber}
                  onKeyPress={this.onKeyPress}
                  onFocus={this.onFocus('cardNumberFocused')}
                  inputFocused={cardNumberFocused}
                  onSubmitEditing={this.focusOn(this.cardHolder)}
                  blurOnSubmit={false}
                  keyboardType="numeric"
                  maxLength={19}
                  returnKeyType="next"
                  value={cardNumber}
                  borderColor={isValidCard? 'rgba(0, 0, 0, 0.2)':INPUT_ERROR_BORDER_COLOR}
                  focusedBorderColor={isValidCard? INPUT_FOCUSED_BORDER_COLOR:INPUT_ERROR_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainerStyle}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Subtitle2 style={styles.overline}>
                  Card Holder's Name
                </Subtitle2>
                <UnderlineTextInput
                  onRef={(r) => {
                    this.cardHolder = r;
                  }}
                  onChangeText={this.changeCardHolder}
                  onFocus={this.onFocus('cardHolderFocused')}
                  inputFocused={cardHolderFocused}
                  onSubmitEditing={this.focusOn(this.expiry)}
                  blurOnSubmit={false}
                  autoCapitalize="words"
                  returnKeyType="next"
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainerStyle}
                />
              </View>

              <View style={styles.smallInputWrapper}>
                <Subtitle2 style={styles.overline}>Expiry</Subtitle2>
                <UnderlineTextInput
                  onRef={(r) => {
                    this.expiry = r;
                  }}
                  onChangeText={this.changeExpiry}
                  onKeyPress={this.onKeyPress}
                  onFocus={this.onFocus('expiryFocused')}
                  inputFocused={expiryFocused}
                  onSubmitEditing={this.focusOn(this.cvc)}
                  blurOnSubmit={false}
                  keyboardType="numeric"
                  maxLength={7}
                  returnKeyType="next"
                  value={expiry}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainerStyle}
                />
              </View>

              <View style={styles.smallInputWrapper}>
                <Subtitle2 style={styles.overline}>CVC</Subtitle2>
                <UnderlineTextInput
                  onRef={(r) => {
                    this.cvc = r;
                  }}
                  onChangeText={this.changeCVC}
                  onFocus={this.onFocus('cvcFocused')}
                  inputFocused={cvcFocused}
                  onSubmitEditing={this.flipCreditCard}
                  keyboardType="numeric"
                  maxLength={this.state.cvvSize}
                  returnKeyType="done"
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                  inputContainerStyle={styles.inputContainerStyle}
                />
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        </KeyboardAwareScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.85} onPress={this.flipCreditCard}>
            <View style={styles.flipButton}>
              <FAIcon name={'exchange'} size={22} color={Colors.primaryColor} />
            </View>
          </TouchableOpacity>
          <Button
            onPress={this.onSubmit}
            title={"Pay $"+totalAmt.toFixed(2)}
            buttonStyle={styles.button}
            rounded
          />
        </View>
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
            iconName={this.state.icon}
            iconColor={Colors.primaryColor}
            title={this.state.infoModalTitle.toUpperCase()}
            message={this.state.msg}
            buttonTitle="OK"
            onButtonPress={this.closeInfoModal(false)}
            onRequestClose={this.closeInfoModal(false)}
            visible={infoModalVisible}
          />
      </SafeAreaView>
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
export default connect(mapStateToProps)(AddCreditCardB)