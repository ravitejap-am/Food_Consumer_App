/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component,Fragment} from 'react';
import {
  I18nManager,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import Color from 'color';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Swiper from 'react-native-swiper';
import TouchableItem from '../../components/TouchableItem';
// import components
import Button from '../../components/buttons/Button';
import { CommonActions } from "@react-navigation/native";

import OrderItem from '../../components/cards/OrderItemAtCheckOutB';
import InfoModal from '../../components/modals/InfoModal';
import LinkButton from '../../components/buttons/LinkButton';
import {Caption, Subtitle1, Subtitle2} from '../../components/text/CustomText';
import EmptyState from '../../components/emptystate/EmptyState';
import Divider from '../../components/divider/Divider';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import { connect } from 'react-redux';
// import colors
import Colors from '../../theme/colors';
//api
import * as productApi from '../../api/ProductService'
import * as txnApi from '../../api/TransactionService'
// CheckoutB Config
const isRTL = I18nManager.isRTL;
const INPUT_FOCUSED_BORDER_COLOR = Colors.primaryColor;
const EMPTY_STATE_ICON = 'cart-remove';
const CHECKMARK_ICON =
  Platform.OS === 'ios'
    ? 'ios-checkmark-circle-outline'
    : 'md-checkmark-circle-outline';

// CheckoutB Styles
const styles = StyleSheet.create({
  pt16: {paddingTop: 16},
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  productsContainer: {
    paddingVertical: 8,
  },
  headerContainer: {
    backgroundColor: Colors.primaryColor,
    elevation: 1,
    ...Platform.select({
      ios: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#a7a7aa',
      },
    }),
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  stepContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontWeight: '700',
    color: Color(Colors.onPrimaryColor).alpha(0.64),
  },
  activeStepText: {
    color: Colors.onPrimaryColor,
  },
  line: {
    width: 48,
    height: 2,
    backgroundColor: Color(Colors.onPrimaryColor).alpha(0.32),
  },
  activeLine: {
    backgroundColor: Colors.onPrimaryColor,
  },
  swiperContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },
  form: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  overline: {
    
    textAlign: 'left',
  },
  inputContainerStyle: {
    marginTop: 0,
    marginBottom: 18,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  actionButton: {
    color: Colors.accentColor,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: Colors.background,
  },
  linkButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  linkButton: {
    color: Colors.black,
  },
  orderInfo: {
    paddingVertical: 8,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
  },
  pv8: {
    paddingVertical: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 36,
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
// CheckoutB
class CheckoutB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      address: '455 Larkspur Dr.',
      city: 'Baviera',
      zip: '92908',
      addressFocused: false,
      cityFocused: false,
      zipFocused: false,
      infoModalVisible: false,
      modalVisible: false,
      total: 0.0,
      grandTotal: 0.0,
      loggedInUser:userProfile,
      restaurant:restaurantData,
      userGroup:userGroup,
      products: [
       
      ],
      individualOrders: [
       
      ],
      groupOrders: [
       
      ],
      userCartId:"",
    };
  }

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };
  updateTotalAmount = () => {
    const {products} = this.state;
    let total = 0.0;

    products.forEach(product => {
      let {price} = product;
      const {discountPercentage, quantity} = product;

      if (typeof discountPercentage !== 'undefined') {
        price -= price * discountPercentage * 0.01;
      }
      total += price * quantity;
    });

    this.setState({
      total,
    });
  };
  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };
  componentDidMount () {
    
    this.unsubscribe= this.props.navigation.addListener('focus', () => {
      
      this.updateTotalAmount();
      this.updateCart('');
    })
  }
  
  componentWillUnmount () {
    this.unsubscribe()
  }
  clearInputs = () => {
    this.address.clear();
    this.city.clear();
    this.zip.clear();
  };

  addressChange = text => {
    this.setState({
      address: text,
    });
  };

  addressFocus = () => {
    this.setState({
      addressFocused: true,
      cityFocused: false,
      zipFocused: false,
    });
  };

  cityChange = text => {
    this.setState({
      city: text,
    });
  };

  cityFocus = () => {
    this.setState({
      addressFocused: false,
      cityFocused: true,
      zipFocused: false,
    });
  };

  zipChange = text => {
    this.setState({
      zip: text,
    });
  };

  zipFocus = () => {
    this.setState({
      addressFocused: false,
      cityFocused: false,
      zipFocused: true,
    });
  };

  focusOn = nextFiled => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  onIndexChanged = index => {
    let activeIndex;
    if (isRTL) {
      activeIndex = 2 - index; // 2 = 3 steps - 1
    } else {
      activeIndex = index;
    }
    this.setState({
      activeIndex: activeIndex,
    });
  };

  nextStep = () => {
    this.swiper.scrollBy(1, true);
  };
  getCartItems = (cart,activeIndex) => {
    let orders=[];
    let activeProducts=[];
   let order={};
   let total=0.0;
   let userCartId="";
   if (cart.hasOwnProperty("cartId") && cart.cartId !=null) {
    const { dispatch } = this.props; 
    
    dispatch({ type: 'CART.ID' , payload:cart.cartId});
    userCartId=cart.cartId
  }
  if (cart.hasOwnProperty("total") && cart.total !=null) {
   
   total=cart.total;
   
  }
  
  if (cart.hasOwnProperty("productList") && cart.productList !=null) {
    
    let productsLists=cart.productList;
    productsLists.map((product,index) => {
      let p=product;
     // p.quantity=1;
      if(p.status=="ACTIVE")
        activeProducts.push(p);
        
    })
        
      order.id=1;
      if(activeIndex==0)
      order.items=activeProducts
      else
      order.items=productsLists
      if(activeProducts.length>0)
      orders.push(order)

  }
 
  this.setState({
    total,
    products: orders,
    activeIndex:activeIndex,
    userCartId:userCartId
    
  });
  //show to current order page if no new order
  if(orders.length==0)
  {
    const {navigation} = this.props;
   //navigation.dispatch('HomeNavigator');
  
 
  }
  }
  getIndividualOrders = () => {
   // this.swiper.scrollBy(0, true);
   let mycartList=this.state.individualOrders.filter(it => it.userId.includes(this.state.loggedInUser.id));
   let userCart = {};
   
          if(mycartList.length>0)
          {
            userCart=mycartList[0];
          }
          this.getCartItems(userCart,0);
         
            
  };
  getGroupOrders = () => {
    // this.swiper.scrollBy(0, true);
    
    let userCart = {};
    
           if(this.state.groupOrders.length>0)
           {
             
             userCart.productList=this.state.groupOrders
             userCart.total=this.state.grandTotal
           }
           this.getCartItems(userCart,1);
           
             
   };
  showInfoModal = value => async() => {
  try
    {
      let response={}
      let orderJson={}
      orderJson.userId=this.state.loggedInUser.id
      orderJson.cartId=this.state.userCartId;
      if(this.state.userGroup)
      {
        
        orderJson.groupNumber=this.state.userGroup.groupNumber;
        
      }
      orderJson.groupOrder=false;
      if(this.state.activeIndex===1)
      {
        orderJson.groupOrder=true;
      }
      
      orderJson.resId=this.state.restaurant.id
     
      response = await txnApi.placeOrder(orderJson);
     
      if(response.errorOrderResponse==null)
      {
        const { dispatch } = this.props; 
        dispatch({ type: 'CART.EMPTY' });
        this.setState({
          infoModalVisible: value,
        });
      }
      else
      {
        alert(JSON.stringify(response.errorOrderResponse))
      }
      

    }
    catch(e)
    {
      alert("There is some problem. Please try it again. ")
    }
    
  };

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
  goToMyOrders = value => () => {
    this.setState(
      {
        infoModalVisible: value,
      }
    );
    const {navigation} = this.props;
    navigation.navigate('Orders');
  };
  updateCart = async (productId) => {
    
    
    let groupCartList=[];
    let usercartList=[];
    let addCartJson = {};
    let total=0.0;

    addCartJson.customerId = this.state.loggedInUser.id;

    try {
        //let response = await txnApi.getCart(addCartJson);
        let grpNum='';
        let response={}
        this.setState(
          {
            modalVisible: true,
          },
        )
        if(this.state.userGroup)
        {
         grpNum=this.state.userGroup.groupNumber;
        response = await txnApi.getGroupCart(grpNum);
        }
        else{
           response = await txnApi.getUserCart(this.state.loggedInUser.id);
        }
        
        if (response.hasOwnProperty("data") && response.data !=null) {
           groupCartList=response.data.productList;
           usercartList=response.data.allCarts;
           total=response.data.grandTotal
        }
        this.setState({
         
          groupOrders:groupCartList,
          individualOrders:usercartList,
          grandTotal:total
        });
        this.getIndividualOrders();
    }
    catch (e) {
        alert(e)
    }
    this.setState(
      {
        modalVisible: false,
      },
    )
}
keyExtractor = item => item.id.toString();

renderItem = ({item, index}) => (
  <OrderItem
    key={index}
    activeOpacity={0.8}
   // orderNumber={item.orderNumber}
   // orderDate={item.orderDate}
    orderItems={item.items}
    activeIndex={this.state.activeIndex}
   // orderStatus={item.orderStatus}
    onPress={this.navigateTo('Product')}
  />
);

 
  render() {
    const {
      activeIndex,
      address,
      addressFocused,
      city,
      cityFocused,
      zip,
      zipFocused,
      modalVisible,
      infoModalVisible,
      products
    } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />

        <View style={styles.container}>
         
        <View style={styles.headerContainer}>
            <View style={styles.stepIndicator}>
            <TouchableItem onPress={this.getIndividualOrders} borderless>
              <View style={styles.stepContainer}>
                <Caption
                  style={[
                    styles.stepText,
                    activeIndex === 0 && styles.activeStepText,
                  ]}>
                  Your Order 
                </Caption>
                
                  
              </View>
              </TouchableItem>
              <View
                style={[styles.line, activeIndex > 0 && styles.activeLine]}
              />
              <TouchableItem onPress={this.getGroupOrders} borderless>
              <View style={styles.stepContainer}>
                <Caption
                  style={[
                    styles.stepText,
                    activeIndex === 1 && styles.activeStepText,
                  ]}>
                  Group Order
                </Caption>
                
              </View>

              </TouchableItem>

              
            </View>
          </View>

          {products.length === 0 ? (
          <EmptyState
            showIcon
            iconName={EMPTY_STATE_ICON}
            title="Your Cart is Empty"
            message="Looks like you haven't added new items to your cart yet"
          />
        ) :(
          <View style={styles.swiperContainer}>
            <Swiper
              ref={r => {
                this.swiper = r;
              }}
              index={isRTL ? 2 : 0}
              onIndexChanged={this.onIndexChanged}
              loop={false}
              showsPagination={false}
              // scrollEnabled={false}
            >
              {/* STEP 1 */}
             

              {/* STEP 2 */}
              

              <KeyboardAwareScrollView>
                <View style={styles.form}>
                  

                  <Subtitle1 style={[styles.overline, styles.pt16]}>
                    New Items
                  </Subtitle1>
                  
                  <View style={styles.container}>
                  <FlatList
                  data={products}
                  renderItem={this.renderItem}
                  keyExtractor={this.keyExtractor}
                  contentContainerStyle={styles.productsContainer}
                  />
                  </View>
                  <View style={styles.row}>
                    <Subtitle1 style={styles.orderInfo}>Total Ordered Amount</Subtitle1>
                    <Subtitle1 style={styles.amount}>$ {this.state.total.toFixed(2)}</Subtitle1>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </Swiper>

            <View style={styles.buttonContainer}>
              <View style={styles.backButtonContainer} />
              

              {activeIndex === 0 && (
                <Button
                  onPress={this.showInfoModal(true)}
                  title="Place Order"
                  rounded
                />
              )}
              {activeIndex === 1 && (
                <Button
                  onPress={this.showInfoModal(true)}
                  title="Place Group Order"
                  rounded
                />
              )}      
              
                <View style={styles.linkButtonContainer}>
                  <LinkButton
                    onPress={this.goBack}
                    title="Cancel"
                    titleStyle={styles.linkButton}
                  />
                </View>
              

             
            </View>
          </View>)}
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
            message="Go to My Current Orders and confirm with Waiter."
            buttonTitle="Sure!"
            onButtonPress={this.goToMyOrders(false)}
            onRequestClose={this.closeInfoModal(false)}
            visible={infoModalVisible}
          />
        </View>
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
export default connect(mapStateToProps)(CheckoutB)