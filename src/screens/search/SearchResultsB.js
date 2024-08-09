/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, Fragment} from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import Color from 'color';
// import components
import Divider from '../../components/divider/Divider';
import ProductCard from '../../components/cards/ProductCard';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
//api
import * as productApi from '../../api/ProductService'
import * as txnApi from '../../api/TransactionService'
// import colors
import Colors from '../../theme/colors';

// SearchResultsB Styles
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
// SearchResultsB
class SearchResultsB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCatId:'',
      loggedInUser:userProfile,
      restaurant:restaurantData,
      modalVisible: false,
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
      ],
    };
  }
  componentDidMount = () => {
    this._bootstrap();
   };
 
   _bootstrap = async () => {
    let restaurantId = this.state.restaurant.id;
     let products=[];
    // let restaurantId = this.props.navigation.state.params;
     try {
       this.setState(
         {
           modalVisible: true,
         },
       )
      let catResp=await productApi.getAllCategories(restaurantId)
      let response=await productApi.getAllMenu(restaurantId)
      
 
        response.map((product,index) => {
         let p=product;
         p.quantity=0;
         
         
         products.push(p);
       })
         this.setState({
         products: products,
        categories:catResp
       });
   } catch (error) {
     alert(" =error="+error);
       // Error retrieving data
   }
   this.setState(
     {
       modalVisible: false,
     },
   )
 };
  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  onPressRemove = item => () => {
    let {quantity} = item;
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
  };

  onPressAdd = item => () => {
    const {quantity} = item;
    const {products} = this.state;

    const index = products.indexOf(item);
    products[index].quantity = quantity + 1;

    this.setState({
      products: [...products],
    });
  };

  keyExtractor = (item, index) => index.toString();

  renderProductItem = ({item, index}) => (
    <ProductCard
      onPress={this.navigateTo('Product')}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      key={index}
      activeOpacity={0.7}
      imageUri={require('../../assets/img/cake_1.jpg')}
      title={item.test}
      price={item.price}
      description={item.description}
      quantity={item.quantity}
      swipeoutDisabled
    />
  );

  renderSeparator = () => <Divider />;

  render() {
    const {products,modalVisible} = this.state;

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
export default connect(mapStateToProps)(SearchResultsB)