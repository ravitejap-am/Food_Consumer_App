/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, Fragment} from 'react';
import {StatusBar, StyleSheet, View, FlatList} from 'react-native';
import remove from 'lodash/remove';
import Color from 'color';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import components
import Button from '../../components/buttons/Button';
import Divider from '../../components/divider/Divider';
import {Heading6, Subtitle1} from '../../components/text/CustomText';
import EmptyState from '../../components/emptystate/EmptyState';
import ProductCard from '../../components/cards/ProductCard';
import SafeAreaView from '../../components/SafeAreaView';
import { connect } from 'react-redux';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
// import colors
import Colors from '../../theme/colors';

// CartB Config
const EMPTY_STATE_ICON = 'cart-remove';
//api
import * as productApi from '../../api/ProductService'
import * as txnApi from '../../api/TransactionService'
// CartB Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  titleText: {
    fontWeight: '700',
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  subTotalText: {
    top: -2,
    fontWeight: '500',
    color: Colors.onSurface,
  },
  subTotalPriceText: {
    fontWeight: '700',
    color: Colors.primaryColor,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    width: '100%',
    padding: 16,
    backgroundColor: '#efefef',
  },
  button: {
    width: '48%',
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
// CartB
class CartB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0.0,
      modalVisible: false,
      loggedInUser:userProfile,
      restaurant:restaurantData,
      userGroup:userGroup,
      products: [
       
      ],
      allCarts:[],
    };
  }

 
  componentDidMount () {
    
    this.unsubscribe= this.props.navigation.addListener('focus', () => {
      //Will execute when screen is focused
      
      this.updateTotalAmount();
      this.updateCart('');
    })
  }
  
  componentWillUnmount () {
    this.unsubscribe()
  }

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };
  deleteItemFromCart = async (item) => {
    // alert("deleteItemFromCart")
    let userIds=[];
    let groupCartIds=[item.groupCartPrdId];
    
    if(item.sharedUsers)
    {
      item.sharedUsers.map((user,index) => {
        if(this.state.loggedInUser.id!=user.id)
        userIds.push(user.id)
      })
    }

    let addCartJson = {};

    try
    {
    console.log(" hello",item.sharedUsers.length)
    if(item.shared && item.sharedUsers.length>1)
    {
    
        let shared=item.shared;
        addCartJson.productId = item.id;
        addCartJson.quantity=item.quantity*item.sharedUsers.length;
        addCartJson.userIds = userIds;
        if(this.state.userGroup)
        addCartJson.groupNumber=this.state.userGroup.groupNumber

        addCartJson.ownerId=this.state.loggedInUser.id;
      // addCartJson.groupCartIds = [this.state.product.groupCartPrdId];
        addCartJson.shared=shared;
        let groupCartIds=[]
      
        this.state.allCarts.map((cart,index) => {
        // alert(" hello "+JSON.stringify(cart))
        let productIncart=cart.productList.filter(it => it.id.includes(item.id));
        
        productIncart.map((product,index) => {
          if(product.shared)
            groupCartIds.push(product.groupCartPrdId)
        })
        })
        addCartJson.groupCartIds=groupCartIds
        console.log(" hello r u thr",addCartJson)
        let response = await txnApi.updateCartGroup(addCartJson);
          
        const { dispatch } = this.props; 
          
        dispatch({ type: 'CART.ID' , payload:response.data.cartId});
          
      
    }
    else
    {
      addCartJson.userIds = [this.state.loggedInUser.id];
      addCartJson.groupCartIds=[item.groupCartPrdId]
      let response = await txnApi.deleteFromCart(addCartJson);
    }
    const { dispatch } = this.props; 
    dispatch({ type: 'CART.DECREMENT' });
    }
    catch(e)
    {
      alert(" There is some problem. Please try again"+JSON.stringify(e))
    }
    }


    swipeoutOnPressRemove = item => () => {
        let {products} = this.state;
        const index = products.indexOf(item);
        
    try
    {
    this.deleteItemFromCart(item);
      products = remove(products, n => products.indexOf(n) !== index);
      this.setState(
        {
          products: [...products],
        },
        () => {
          this.updateTotalAmount();
        },
      );
    }
    catch(e)
    {
      alert(" There is some problem. Please try again")
    }

};

  onPressRemove = item => () => {
    let {quantity} = item;
    quantity -= 1;

    let {products} = this.state;
    const index = products.indexOf(item);

    if (quantity === 0) {
      products = remove(products, n => products.indexOf(n) !== index);
    } else {
      products[index].quantity = quantity;
    }

    this.setState(
      {
        products: [...products],
      },
      () => {
        this.updateTotalAmount();
      },
    );
  };
  updateCart = async (productId) => {
    // alert("updateCart")
    let isProductListInCart = false;
    let products=[];
    let addCartJson = {};
    let total=0.0;
    let allCarts=[];
    let userGroup = await AsyncStorage.getItem('userGroup');
    let group=JSON.parse(userGroup)
    if(group)
    {
     this.setState(
       {
         userGroup:group,
        
       }
     )
    }
   
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


       //let response = await txnApi.getGroupCart(grpNum);
       // let response = await txnApi.getUserCart(grpNum);
        
        if (response.hasOwnProperty("data") && response.data !=null) {
          
          let usercartList=response.data.allCarts;
          
          let userCart = {};
          let mycartList=usercartList.filter(it => it.userId.includes(this.state.loggedInUser.id));
          allCarts=response.data.allCarts;
          if(mycartList.length>0)
          {
            userCart=mycartList[0];
          }
          
         
            if (userCart.hasOwnProperty("cartId") && userCart.cartId !=null) {
              const { dispatch } = this.props; 
              
              dispatch({ type: 'CART.ID' , payload:userCart.cartId});
            }
            if (userCart.hasOwnProperty("total") && userCart.total !=null) {
             
             total=userCart.total;
             
            }
            
            if (userCart.hasOwnProperty("productList") && userCart.productList !=null) {

                if (userCart.productList == null) {
                    isProductListInCart = false;
                }
                else {

                    isProductListInCart = true;
                    const length=userCart.productList.length
                    let productsLists=userCart.productList;
                    productsLists.map((product,index) => {
                      let p=product;
                     products.push(p);
                    })
                    

                }
                

            }
            else {
                isProductListInCart = false;
            }
            
          
        }
        this.setState({
          total,
          products: products,
          allCarts:allCarts
        });
        const { dispatch } = this.props; 
        dispatch({ type: 'SAVE_CART_COUNT_DATA',
        payload: products.length});
        

    }
    catch (e) {
        alert("error:"+JSON.stringify(e))
    }
    this.setState(
      {
        modalVisible: false,
      },
    )

}
  onPressAdd = item => async() => {
    // alert("onPressAdd");
    const {quantity} = item;
    const {products} = this.state;
   
    let addCartJson = {};
    
    addCartJson.userId = this.state.loggedInUser.id;

    addCartJson.productIds = [item.id];
    try {
      
        this.setState(
          {
            modalVisible: true,
          },
        )
        
        let response = await txnApi.addToCart(addCartJson);
      // alert(" json "+JSON.stringify(response.data.id))
      // await AsyncStorage.setItem('cartId', response.data.data.token);
       
        const { dispatch } = this.props; 
        dispatch({ type: 'CART.INCREMENT' });
        dispatch({ type: 'CART.ID' , payload:response.data.id});
        const index = products.indexOf(item);
        products[index].quantity = quantity + 1;
        this.setState(
          {
            products: [...products],
          },
          () => {
            this.updateTotalAmount();
          },
        );

    }
    catch (e) {
        alert(e)
    }
    this.setState(
      {
        modalVisible: false,
      },
    )
    
  };
  selectMember = (screen,item,flag) => () => {
    
    const {navigation} = this.props;
    const { dispatch } = this.props; 
    dispatch({ type: 'PRODUCT_DATA',payload: item});
    navigation.navigate(screen,{"action":flag,"allCarts":this.state.allCarts});
    
  };
  goToCheckOut =  () => {

    
    let activeProducts=[];
  
   let productList=this.state.products
  
    productList.map((product,index) => {
      let p=product;
     // p.quantity=1;
      if(p.status=="ACTIVE")
        activeProducts.push(p);
        
    })
  
  //show to current order page if no new order
  const {navigation} = this.props;
  if(activeProducts.length==0)
  {
    
   navigation.navigate('Orders');
  
 
  }
  else
  {
    navigation.navigate("Checkout");
  }
    
   
    
    
    
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

  keyExtractor = item => item.id.toString();

  renderProductItem = ({item}) => (
    <ProductCard
      key={item.id}
     // onPress={this.navigateTo('Product')}
      selectMember={this.selectMember('GroupDetail',item,'U')}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      activeOpacity={0.7}
      
     status={item.status}
      title={item.name}
      price={parseFloat(item.price)}
      quantity={item.quantity}
      description={item.description}
      showQuantity={true}
      showProdImage={false}
      shared={item.shared}
      swipeoutOnPressRemove={this.swipeoutOnPressRemove(item)}
    />
  );

  renderSeparator = () => <Divider />;

  render() {
    const {total, products,modalVisible} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Cart</Heading6>

          {products.length > 0 && (
            <View style={styles.inline}>
              <Subtitle1 style={styles.subTotalText}> Subtotal: </Subtitle1>
              <Heading6 style={styles.subTotalPriceText}>
                {`$ ${parseFloat(Math.round(total * 100) / 100).toFixed(2)}`}
              </Heading6>
            </View>
          )}
        </View>

        {products.length === 0 ? (
          <EmptyState
            showIcon
            iconName={EMPTY_STATE_ICON}
            title="Your Cart is Empty"
            message="Looks like you haven't added anything to your cart yet"
          />
        ) : (
          <Fragment>
            <FlatList
              data={products}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderProductItem}
              ItemSeparatorComponent={this.renderSeparator}
            />

            <View style={styles.bottomButtonsContainer}>
              <Button
                onPress={this.navigateTo('Home')}
                buttonStyle={styles.button}
                color={Colors.tertiaryColor}
                rounded
                title="Add More"
              />
              <Button
                onPress={this.goToCheckOut}
                buttonStyle={styles.button}
                rounded
                title="Checkout"
              />
            </View>
          </Fragment>
        )}
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
export default connect(mapStateToProps)(CartB)