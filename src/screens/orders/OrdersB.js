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
  Text,
  TextInput
} from 'react-native';
import Color from 'color';
// import components
import OrderItem from '../../components/cards/OrderItemB';
import TouchableItem from '../../components/TouchableItem';
import { connect } from 'react-redux';
import {Caption, Subtitle1, Subtitle2} from '../../components/text/CustomText';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import EmptyState from '../../components/emptystate/EmptyState';
// import colors
import Colors from '../../theme/colors';

import * as txnApi from '../../api/TransactionService'
// OrdersB Styles
const EMPTY_STATE_ICON = 'food-fork-drink';
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
  tipButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    height: 40, width: 60,
    borderRadius: 5,
    marginLeft: 10,
  },
  textResultStyle: {
    textAlign: 'center',
    padding: 12,
    // textTransform: 'capitalize'
  },
  orderNumber: {
    paddingBottom: 2,
    fontWeight: 'bold',
    color: Colors.primaryColorDark,
    textAlign: 'left',
  },
  textInputTip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height:40,
    marginTop:5
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
class OrdersB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser:userProfile,
      activeIndex: 0,
      restaurant:restaurantData,
      userGroup:userGroup,
      members:userGroup?userGroup.members:[],
      totalAmt:40,
      salesTax:0.0,
      tip:0.0,
      iconName:"food-fork-drink",
      title:"",
      message:"",
      modalVisible: false,
      individualOrders: [
        
      ],
      groupOrders: [
       
      ],
      tipPressed: null,
      addTip: [
        { tip: 5 },
        { tip: 8 },
        { tip: 10 },
        { tip: 12 }
      ],
      othertip: '',
      bg: Colors.primaryColor,
      bg2: Colors.onPrimaryColor,
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
      
      
      this.getOrders('');
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
  getOrders = async (productId) => {
   
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
        if(this.state.userGroup)
        {
         grpNum=this.state.userGroup.groupNumber;
         this.setState(
           {
             members:this.state.userGroup.members
           }
         )
         orderReq=grpNum+"?status=PENDING,CONFIRMED,DELIVERED,PAID,COMPLETED&resId="+this.state.restaurant.id
         
         response = await txnApi.getOrderDetailForGroup(orderReq);
         console.log(response)
         //response = await txnApi.getOrderDetailForUser(this.state.loggedInUser.id);
         
        }
        /*else{
           response = await txnApi.getOrderDetailForUser(this.state.loggedInUser.id);
        }*/
        
        if (response.hasOwnProperty("orderResponseList") && response.orderResponseList !=null) {
          
          let myOrderList=response.orderResponseList.filter(it => it.userId.includes(this.state.loggedInUser.id));
          
          if(myOrderList.length>0)
          {
         let amount=myOrderList.length>0?myOrderList[0].total:0;
         let salesTax=myOrderList.length>0?myOrderList[0].salesTax:0;
         let tip=myOrderList.length>0?myOrderList[0].tip:0;
         
         
          this.setState({
         
            //groupOrders:groupCartList,
            individualOrders:myOrderList,
            activeIndex:0,
            totalAmt:amount+tip,
            salesTax:salesTax,
            tip:tip
          });
         }
         else
         {
          this.setState({
            activeIndex:0,
            //groupOrders:groupCartList,
            individualOrders:[],
            iconName:EMPTY_STATE_ICON,
            title:"Your Current Order is Empty.",
            message:"Looks like you haven't added new items recently."
          });
         }
           
        }
        else
        {
          this.setState({
            activeIndex:0,
            //groupOrders:groupCartList,
            individualOrders:[],
            iconName:EMPTY_STATE_ICON,
            title:"Your Current Order is Empty.",
            message:"Looks like you haven't added new items recently."
          });
        }
        
        
    }
    catch (e) {
      if(e.message.indexOf("404")!=1)
      {
        this.setState({
          activeIndex:0,
          //groupOrders:groupCartList,
          iconName:EMPTY_STATE_ICON,
          title:"Your Current Order is Empty.",
          message:"Looks like you haven't added new items recently."
        });
      }
      else
        alert(e)
    }
    this.setState(
      {
        modalVisible: false,
      },
    )
}
getGroupOrders = async (productId) => {
   
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
      if(this.state.userGroup)
      {
       grpNum=this.state.userGroup.groupNumber;
       orderReq=grpNum+"?status=PENDING,CONFIRMED,PAID,DELIVERED,COMPLETED&resId="+this.state.restaurant.id
       response = await txnApi.getOrderDetailForGroup(orderReq);
       //response = await txnApi.getOrderDetailForUser(this.state.loggedInUser.id);
       
      }
      /*else{
         return
      }*/
      
      if (response.hasOwnProperty("productList") && response.productList !=null) {
        let myOrderList=response.productList;
        let amount=response.grandTotal
        let salesTax=response.grandTotalSalesTax;
        let tip=response.grandTotalTip;
        let orders=[];
        let order={};
            order.orderNumber=this.state.userGroup.groupNumber;
            order.orderStatus=response.groupOrderStatus;
         
          
          order.productList=myOrderList;
          orders.push(order)
       
        this.setState({
       
          //groupOrders:groupCartList,
          individualOrders:orders,
          activeIndex:1,
          totalAmt:amount+tip,
          salesTax:salesTax,
          tip:tip
        });
         
      }
      else
      {
          this.setState({
            activeIndex:1,
            //groupOrders:groupCartList,
            individualOrders:[],
            iconName:EMPTY_STATE_ICON,
            title:"Your Group Order is Empty.",
            message:"Looks like you haven't added new items recently."
          });
      }
      
      
  }
  catch (e) {
    if(e.message.indexOf("404")!=1)
    {
      this.setState({
        activeIndex:1,
        //groupOrders:groupCartList,
        individualOrders:[],
        iconName:EMPTY_STATE_ICON,
        title:"Your Current Order is Empty.",
        message:"Looks like you haven't added new items recently."
      });
    }
    else
      alert(e)
  }
  this.setState(
    {
      modalVisible: false,
    },
  )
}
  keyExtractor = item => item.orderNumber.toString();
  tipChangeColor = async (id, type) => {
    let orderReq = '';
    try {
      let grpNum = '';
      let response = {}
      this.setState(
        {
          // modalVisible: true,
          tipPressed: id,
          othertip: ''
        },
      )
      if (this.state.userGroup) {
        grpNum = this.state.userGroup.groupNumber;
        this.setState(
          {
            members: this.state.userGroup.members
          }
        )
        orderReq = grpNum + "?status=PENDING,CONFIRMED,DELIVERED,PAID,COMPLETED&resId=" + this.state.restaurant.id
        response = await txnApi.getOrderDetailForGroup(orderReq);

      }

      if (response.hasOwnProperty("orderResponseList") && response.orderResponseList != null) {

        let myOrderList = response.orderResponseList.filter(it => it.userId.includes(this.state.loggedInUser.id));

        if (myOrderList.length > 0) {
          let amount = myOrderList.length > 0 ? myOrderList[0].total : 0;
          let salesTax = myOrderList.length > 0 ? myOrderList[0].salesTax : 0;
          // let tip = myOrderList.length > 0 ? myOrderList[0].tip : 0;


          this.setState({
            individualOrders: myOrderList,
            activeIndex: 0,
            totalAmt: amount + this.state.addTip[id].tip,
            salesTax: salesTax,
            tip: this.state.addTip[id].tip,
          });
        }
      }
      if (response.hasOwnProperty("productList") && response.productList != null) {
        let myOrderList = response.productList;
        let amount = response.grandTotal
        let salesTax = response.grandTotalSalesTax;
        let tip = response.grandTotalTip;
        let orders = [];
        let order = {};
        order.orderNumber = this.state.userGroup.groupNumber;
        order.orderStatus = response.groupOrderStatus;


        order.productList = myOrderList;
        orders.push(order)

        this.setState({

          //groupOrders:groupCartList,
          individualOrders: orders,
          activeIndex: 1,
          totalAmt: amount + this.state.addTip[id].tip,
          salesTax: salesTax,
          tip: this.state.addTip[id].tip,
        });

      }

    }
    catch (e) {
      console.log(e);
    }
  }
  otherTip = async (input) => {
    this.setState({
      // ...othertip,
      othertip: input,
      tipPressed: null
    }); 
    this.addOtherTip();
  }

  addOtherTip = async() =>{
    let orderReq = '';
    try {
      let grpNum = '';
      let response = {}
      if (this.state.userGroup) {
        grpNum = this.state.userGroup.groupNumber;
        this.setState(
          {
            members: this.state.userGroup.members
          }
        )
        orderReq = grpNum + "?status=PENDING,CONFIRMED,DELIVERED,PAID,COMPLETED&resId=" + this.state.restaurant.id
        response = await txnApi.getOrderDetailForGroup(orderReq);

      }

      if (response.hasOwnProperty("orderResponseList") && response.orderResponseList != null) {

        let myOrderList = response.orderResponseList.filter(it => it.userId.includes(this.state.loggedInUser.id));

        if (myOrderList.length > 0) {
          let amount = myOrderList.length > 0 ? myOrderList[0].total : 0;
          let salesTax = myOrderList.length > 0 ? myOrderList[0].salesTax : 0;
          // let tip = myOrderList.length > 0 ? myOrderList[0].tip : 0;


          this.setState({
            individualOrders: myOrderList,
            activeIndex: 0,
            totalAmt: amount + Math.round(this.state.othertip),
            salesTax: salesTax,
            tip: Math.round(this.state.othertip)
          });
        }
      }
      if (response.hasOwnProperty("productList") && response.productList != null) {
        let myOrderList = response.productList;
        let amount = response.grandTotal
        let salesTax = response.grandTotalSalesTax;
        let tip = response.grandTotalTip;
        let orders = [];
        let order = {};
        order.orderNumber = this.state.userGroup.groupNumber;
        order.orderStatus = response.groupOrderStatus;


        order.productList = myOrderList;
        orders.push(order)

        this.setState({

          //groupOrders:groupCartList,
          individualOrders: orders,
          activeIndex: 1,
          totalAmt: amount + Math.round(this.state.othertip),
          salesTax: salesTax,
          tip: Math.round(this.state.othertip)
        });

      }

    }
    catch (e) {
      console.log(e);
    }
  }
  renderItem = ({item, index}) => (
    <OrderItem
      key={index}
      activeOpacity={0.8}
      orderNumber={item.orderNumber}
      orderDate={item.orderPlacedDate}
      orderItems={item.productList}
      orderStatus={item.orderStatus.trim()}
      activeIndex={this.state.activeIndex}
      onPressCancel={this.onPressCancel(item)}
      total={this.state.totalAmt}
      onGroupPayBtn={this.getGroupOrders}
      salesTax={this.state.salesTax}
      tip={this.state.tip}
      groupCount={this.state.members.length}
      onPressPay={this.onPressPay(this.state.activeIndex==1?'Billing':'AddCreditCard',item.id)}
    >
      <View style={{ flexDirection: 'row', marginLeft: 5 }}>
        {this.state.addTip.length > 0 && this.state.addTip.map((item, index) => {
          return (
            <TouchableItem onPress={() => this.tipChangeColor(index)}
              style={[styles.tipButton, { backgroundColor: this.state.tipPressed === index ? this.state.bg : this.state.bg2 }]}
            >
              <Text
                key={`addTips-${index}`}
                style={styles.textResultStyle}>
                ${item.tip}
              </Text>
            </TouchableItem>
          );
        })}
      </View>
      <View style={{ padding: 15 }}>
        <Text style={styles.orderNumber}>Other Tip</Text>
          
          <View style={styles.textInputTip}>
            <Text style={{ marginLeft: 10 }}>$</Text>
            <TextInput
              onChangeText={(input) => this.otherTip(input)}
              placeholder="You can edit waiter added tip"
              keyboardType="numeric"
              defaultValue={this.state.othertip}
            />
          </View>
      </View>
    </OrderItem>
  );

  render() {
    const {orders,individualOrders, activeIndex,modalVisible} = this.state;

    return (
      <Fragment>
        <SafeAreaView style={styles.topArea} />
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <View style={styles.container}>
          {this.state.members.length>1 && 
          <View style={styles.headerContainer}>
          <View style={styles.stepIndicator}>
            <TouchableItem onPress={this.getOrders} borderless>
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
                style={[styles.line,  styles.activeLine]}
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
            }
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
export default connect(mapStateToProps)(OrdersB)