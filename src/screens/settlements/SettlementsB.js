/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, Fragment} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import Color from 'color';
// import components
import Item from '../../components/cards/SettlementIemB';
import TouchableItem from '../../components/TouchableItem';
import { connect } from 'react-redux';
import {Caption, Subtitle1, Subtitle2} from '../../components/text/CustomText';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import EmptyState from '../../components/emptystate/EmptyState';
// import colors
import Colors from '../../theme/colors';
//api
import * as productApi from '../../api/ProductService'
import * as txnApi from '../../api/TransactionService'
// OrdersB Styles
const EMPTY_STATE_ICON = 'cash-refund';
const styles = StyleSheet.create({
  topArea: {flex: 0, backgroundColor: Colors.primaryColor},
  container: {
    flex: 1,
    backgroundColor: '#efefef',
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
});

// OrdersB
let userProfile={
  
};
let restaurantData={
  
};
let userCart={
  
};
let userGroup={
  
};
class SettlementsB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser:userProfile,
      activeIndex: 0,
      restaurant:restaurantData,
      userGroup:userGroup,
      totalAmt:40,
      modalVisible: false,
      iconName:"cash-refund",
      title:"",
      message:"",
      individualOrders: [
        
      ],
      groupOrders: [
       
      ],
      orders: [
        {
          orderNumber: '11',
          orderDate: '22 July, 2019',
          orderStatus: 'on-the-way',
          orderItems: [
            {
              name: 'Pizza',
              price: 4.99,
            },
            {
              name: 'Grill',
              price: 8.99,
            },
            {
              name: 'Pasta',
              price: 5.99,
            },
          ],
        },
        {
          orderNumber: '10',
          orderDate: '10 July, 2019',
          orderStatus: 'pending',
          orderItems: [
            {
              name: 'Pizza One',
              price: 7.99,
            },
            {
              name: 'Pizza Mozzarella',
              price: 8.99,
            },
            {
              name: 'Pizza Gorgonzola',
              price: 6.99,
            },
            {
              name: 'Pizza Funghi',
              price: 9.99,
            },
          ],
        },
        {
          orderNumber: '09',
          orderDate: '05 July, 2019',
          orderStatus: 'delivered',
          orderItems: [
            {
              name: 'Pizza Mozzarella',
              price: 8.99,
            },
            {
              name: 'Pizza Gorgonzola',
              price: 6.99,
            },
            {
              name: 'Pizza Funghi',
              price: 9.99,
            },
          ],
        },
      ],
    };
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };
  componentDidMount () {
    
    this.unsubscribe= this.props.navigation.addListener('focus', () => {
      
      
      this.getPayables('');
    })
  }
  
  componentWillUnmount () {
    this.unsubscribe()
  }
  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };
  onPressCancel = item => () => {
    
    alert(" cancelled"+JSON.stringify(item))
    
    
  };
  onPressTrack = item => () => {
    
    alert(" cancelled"+JSON.stringify(item))
    
    
  };
  onPressPay =(screen,orderNum) =>() => {
    
    const {navigation} = this.props;
    navigation.navigate(screen,{"amount":this.state.totalAmt,"orderNumber":orderNum,"activeIndex":this.state.activeIndex});
    
    
  };
  getPayables = async (productId) => {
   
    let orderReq = '';
  
    try {
        //let response = await txnApi.getCart(addCartJson);
        let grpNum='';
        let response={}
        this.setState(
          {
            modalVisible: true,
          },
        )
       
      response = await txnApi.toPay(this.state.loggedInUser.id);
      if (response.hasOwnProperty("data") && response.data !=null) {
        let myOrderList=response.data;
        
        let orders=[];
            let order={};
            order.orderNumber="Your Total Payables";
            order.orderStatus="response.groupOrderStatus";
         
          
          order.productList=myOrderList;
          orders.push(order)
       
        this.setState({
       
          //groupOrders:groupCartList,
          individualOrders:orders,
          activeIndex:0,
          
        });
         
      }
      else
        {
          this.setState({
         
            //groupOrders:groupCartList,
            iconName:EMPTY_STATE_ICON,
            title:"You don't have any payables.",
            message:"",
            activeIndex:0,
            individualOrders:[]
          });
        }
        
        
    }
    catch (e) {
      this.setState({
         
        //groupOrders:groupCartList,
        iconName:EMPTY_STATE_ICON,
        title:"You don't have any payables.",
        message:"",
        activeIndex:0,
        individualOrders:[]
      });
    }
    this.setState(
      {
        modalVisible: false,
      },
    )
}
getRecieveavles = async (productId) => {
   
  let orderReq = '';

  try {
      //let response = await txnApi.getCart(addCartJson);
      let grpNum='';
      let response={}
      this.setState(
        {
          modalVisible: true,
        },
      )
      response = await txnApi.toRecieve(this.state.loggedInUser.id);
    //  alert(JSON.stringify(response))
      
      if (response.hasOwnProperty("data") && response.data !=null) {
        let myOrderList=response.data;
        
        let orders=[];
            let order={};
            order.orderNumber="Your Total Receivables";
            order.orderStatus="response.groupOrderStatus";
         
          
          order.productList=myOrderList;
          orders.push(order)
       
        this.setState({
       
          //groupOrders:groupCartList,
          individualOrders:orders,
          activeIndex:1,
          
        });
         
      }
      else
        {
          this.setState({
         
            //groupOrders:groupCartList,
            iconName:EMPTY_STATE_ICON,
            title:"You don't have any receivables.",
            message:"",
            activeIndex:1,
            individualOrders:[]
          });
        }
      
      
  }
  catch (e) {
    this.setState({
         
      //groupOrders:groupCartList,
      iconName:EMPTY_STATE_ICON,
      title:"You don't have any receivables.",
      message:"",
      activeIndex:1,
      individualOrders:[]
    });
  }
  this.setState(
    {
      modalVisible: false,
    },
  )
}
  keyExtractor = item => item.orderNumber.toString();

  renderItem = ({item, index}) => (
    <Item
      key={index}
      activeOpacity={0.8}
      orderNumber={item.orderNumber}
      orderDate={item.orderPlacedDate}
      orderItems={item.productList}
      orderStatus={item.orderStatus.trim()}
      activeIndex={this.state.activeIndex}
      onPressCancel={this.onPressCancel(item)}
      total={this.state.totalAmt}
      onPressPay={this.onPressPay(this.state.activeIndex==1?'Billing':'AddCreditCard',item.id)}
    />
  );

  render() {
    const {orders,individualOrders, activeIndex, modalVisible} = this.state;

    return (
      <Fragment>
        <SafeAreaView style={styles.topArea} />
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <View style={styles.container}>
          <View style={styles.headerContainer}>
          <View style={styles.stepIndicator}>
            <TouchableItem onPress={this.getPayables} borderless>
              <View style={styles.stepContainer}>
                <Caption
                  style={[
                    styles.stepText,
                    activeIndex === 0 && styles.activeStepText,
                  ]}>
                  Payables
                </Caption>
                
                  
              </View>
              </TouchableItem>
              <View
                style={[styles.line,  styles.activeLine]}
              />
              <TouchableItem onPress={this.getRecieveavles} borderless>
              <View style={styles.stepContainer}>
                <Caption
                  style={[
                    styles.stepText,
                    activeIndex === 1 && styles.activeStepText,
                  ]}>
                  Receivables
                </Caption>
                
              </View>

              </TouchableItem>

              
            </View>
            </View>
            {individualOrders.length === 0 ? (
          <EmptyState
            showIcon
            iconName={this.state.iconName}
            title={this.state.title}
            message={this.state.message}
          />
        ):(
            <FlatList
              data={individualOrders}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              contentContainerStyle={styles.productsContainer}
            />)}
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
export default connect(mapStateToProps)(SettlementsB)