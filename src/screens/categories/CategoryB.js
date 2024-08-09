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
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
// import components
import Divider from '../../components/divider/Divider';
import ProductCard from '../../components/cards/ProductCard';

// import colors
import Colors from '../../theme/colors';
//api
import * as productApi from '../../api/ProductService'
import * as txnApi from '../../api/TransactionService'
// CategoryB Config

// CategoryB Styles
const styles = StyleSheet.create({
  topArea: {flex: 0, backgroundColor: Colors.primaryColor},
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  productList: {
    paddingVertical: 8,
  },
});
let userProfile={
  
};
let restaurantData={
  
};
let userCart={
  
};
class CategoryB extends Component {
  constructor(props) {
    super(props);
    this.props.navigation.setOptions({title: this.props.route.params.name});
    this.state = {
      loggedInUser:userProfile,
      restaurant:restaurantData,
      products: [
        {
          imageUri: require('../../assets/img/sandwich_2.jpg'),
          name: 'Subway sandwich',
          price: 8.49,
          quantity: 0,
          discountPercentage: 10,
        },
        {
          imageUri: require('../../assets/img/pizza_1.jpg'),
          name: 'Pizza Margarita 35cm',
          price: 10.99,
          quantity: 0,
        },
        {
          imageUri: require('../../assets/img/cake_1.jpg'),
          name: 'Chocolate cake',
          price: 4.99,
          quantity: 0,
        },
        {
          imageUri: require('../../assets/img//sandwich_2.jpg'),
          name: 'Subway sandwich',
          price: 8.49,
          quantity: 0,
          discountPercentage: 10,
        },
        {
          imageUri: require('../../assets/img/pizza_1.jpg'),
          name: 'Pizza Margarita 35cm',
          price: 10.99,
          quantity: 0,
        },
        {
          imageUri: require('../../assets/img/cake_1.jpg'),
          name: 'Chocolate cake',
          price: 4.99,
          quantity: 0,
        },
      ],
    };
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  onPressRemove = item => async() => {
    let {quantity} = item;
    let cartId=''
    if(userCart)
    {
    if(userCart.cartId)
    {
      cartId=userCart.cartId;
    }
    }
  try{
    let deleteCartJson = {};
        deleteCartJson.productId = item.id;
        deleteCartJson.cartId = cartId
        let response = await txnApi.deleteFromCart(deleteCartJson);
        const { dispatch } = this.props; 
            dispatch({ type: 'CART.DECREMENT' });
            quantity -= 1;

            const {products} = this.state;
            const index = products.indexOf(item);
        
            if (quantity < 0) {
              return;
            }
            products[index].quantity = quantity;
        
            this.setState({
              products: [...products],
            });
  }
  catch(error)
  {
    alert(error)
  }
    
  };
  componentDidMount = () => {
    this._bootstrap();
   };
 
   _bootstrap = async () => {
   
   let catId=this.props.route.params.id

     try {
      
        let response=await productApi.getProductsByCategoryId(catId)
         this.setState({
         products: response
         
       });
   } catch (error) {
     alert(" =error="+error);
       // Error retrieving data
   }
 };
 onPressAdd = item => async() => {
  const {quantity} = item;
  const {products} = this.state;
 
  let addCartJson = {};
  
  addCartJson.userId = this.state.loggedInUser.id;

  addCartJson.productIds = [item.id];
  try {
     /* this.setState({
          btnTxt: 'Please wait...'
      })*/
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

      this.setState({
        products: [...products],
      });

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

  keyExtractor = (item, index) => index.toString();

  renderProductItem = ({item, index}) => (
    <ProductCard
      onPress={this.navigateTo('Product')}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      key={index}
      activeOpacity={0.7}
      imageUri={item.imageUri}
      title={item.test}
      price={item.price}
      quantity={item.quantity}
      swipeoutDisabled
    />
  );

  /*renderProductItem = ({item, index}) => (
    <ProductCard
      onPress={this.navigateTo('Product')}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      key={index}
      activeOpacity={0.7}
      imageUri={item.imageUri}
      title={item.name}
      price={item.price}
      quantity={item.quantity}
      swipeoutDisabled
    />
  );*/

  renderSeparator = () => <Divider type="inset" marginLeft={0} />;

  render() {
    const {products} = this.state;

    return (
      <Fragment>
        <SafeAreaView style={styles.topArea} />
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <FlatList
            data={products}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderProductItem}
            ItemSeparatorComponent={this.renderSeparator}
            contentContainerStyle={styles.productList}
          />
        </SafeAreaView>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
 
  userProfile=state.postLoginData;
  restaurantData=state.restarauntData;
  userCart=state.cart;
  return {
    registeruser: state.postLoginData
  };
};
export default connect(mapStateToProps)(CategoryB)