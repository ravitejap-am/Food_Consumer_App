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
} from 'react-native';

// import components
import BillingItem from '../../components/cards/BillingItemB';
import { connect } from 'react-redux';
// import colors
import Colors from '../../theme/colors';
//api
import * as productApi from '../../api/ProductService'
import * as txnApi from '../../api/TransactionService'
// OrdersB Styles
const styles = StyleSheet.create({
  topArea: {flex: 0, backgroundColor: Colors.primaryColor},
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  productsContainer: {
    paddingVertical: 8,
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
class BillingB extends Component {
  constructor(props) {
    super(props);
    let members=userGroup?( userGroup.hasOwnProperty("members")?userGroup.members:[]):[];
    this.state = {
      loggedInUser:userProfile,
      restaurant:restaurantData,
      userGroup:userGroup,
      payeeList: [],
      userOrderList: [],
      members:members,
      totalAmt:0.0,
      payment: [
        
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
  onPressPay =screen =>() => {
    
    const {navigation} = this.props;
    if(this.state.payeeList.length>0)
    navigation.navigate(screen,{"amount":this.state.totalAmt,"orderNumber":this.state.payeeList});
    else
    {
      alert(" please select members")
    }
    
    
  };
  getOrders = async (productId) => {
    
    
    let groupCartList=[];
    let usercartList=[];
    let orderReq = '';
    let total=0.0;

    

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
         orderReq=grpNum+"?status=PENDING,CONFIRMED,DELIVERED,PAID,COMPLETED&resId="+this.state.restaurant.id
         response = await txnApi.getOrderDetailForGroup(orderReq);
         //response = await txnApi.getOrderDetailForUser(this.state.loggedInUser.id);
         
        }
        else{
           response = await txnApi.getOrderDetailForUser(this.state.loggedInUser.id);
        }
        
        if (response.hasOwnProperty("orderResponseList") && response.orderResponseList !=null) {
            let payment=[];
            let allUserPayments={};
            allUserPayments.orderNumber=this.state.userGroup.groupNumber;
            allUserPayments.orderStatus=response.groupOrderStatus;
            let grandTotal=response.grandTotal
            let myOrderList=response.orderResponseList;
            let userCarts=[];
            myOrderList.map((item,index) => {
            let cart={};
            let member=this.state.members.filter(it => it.id.includes(item.userId));
            cart.name=member.length>0?member[0].firstName:"";

            cart.price=item.total+item.tip;
           
            console.log("  total=="+item.total)
            console.log("  salesTax=="+item.salesTax)
            console.log("  salesTax=="+item.tip)
            cart.userId=item.userId
            cart.orderNumber=item.orderNumber
            cart.orderId=item.id
            cart.orderStatus=item.orderStatus
            userCarts.push(cart);
          })
          allUserPayments.cartList=userCarts;
          payment.push(allUserPayments)
          
          this.setState({
         
            //groupOrders:groupCartList,
            payment:payment,
            totalAmt:0.0,
            userOrderList:userCarts
          });
           
        }
        
        
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
selectMember = (item) => () => {


let total=this.state.totalAmt;
 let peopleList=this.state.payeeList;
  const {payment,payeeList,userOrderList} = this.state;
  const index = userOrderList.indexOf(item);
  const picked = userOrderList[index].picked;
  
  if (picked) {
    var index1 = peopleList.indexOf(item.orderId)
    if (index1 !== -1) {
      peopleList.splice(index1, 1);
      total-=item.price
    }
  } else {
    peopleList= peopleList.concat([item.orderId])
    total+=item.price
    //product.price += item.price;
   // product.total += product.quantity * item.price;
  }

  userOrderList[index].picked = !picked;
  let changedPaymentObj=[];
  
  let allUserPayments={};
  allUserPayments.orderNumber=this.state.userGroup.groupNumber;
  allUserPayments.orderStatus=userOrderList[index].orderStatus;
 
 allUserPayments.cartList=userOrderList;
  changedPaymentObj.push(allUserPayments)
 
  this.setState({
    payeeList:peopleList,
    payment:changedPaymentObj,
    userOrderList: [...userOrderList],
    totalAmt:total
  });
};
  keyExtractor = item => item.orderNumber.toString();

  renderItem = ({item, index}) => (
    <BillingItem
      key={index}
      activeOpacity={0.8}
      orderNumber={item.orderNumber}
      orderDate={item.orderPlacedDate}
      userCarts={item.cartList}
      orderStatus={item.orderStatus.trim()}
      selectMember={this.selectMember}
      onPressPay={this.onPressPay('AddCreditCard')}
    />
  );

  render() {
    const {payment} = this.state;

    return (
      <Fragment>
        <SafeAreaView style={styles.topArea} />
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <View style={styles.container}>
            <FlatList
              data={payment}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              contentContainerStyle={styles.productsContainer}
            />
          </View>
        </SafeAreaView>
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
export default connect(mapStateToProps)(BillingB)