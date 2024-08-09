/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, Fragment} from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Color from 'color';

// import utils
import getImgSource from '../../utils/getImgSource.js';
import { connect } from 'react-redux';
// import components
import Button from '../../components/buttons/Button';
import {Caption, Heading5, SmallText} from '../../components/text/CustomText';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import Icon from '../../components/icon/Icon';
import TouchableItem from '../../components/TouchableItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import colors
import Colors from '../../theme/colors';
//api
import * as productApi from '../../api/ProductService'
import * as txnApi from '../../api/TransactionService'
// ProductB Config
const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const FAVORITE_ICON = IOS ? 'ios-heart' : 'md-heart';
const CLOSE_ICON = IOS ? 'ios-close' : 'md-close';
const imgHolder = require('../../assets/img/imgholder.png');

// ProductB Styles
const styles = StyleSheet.create({
  topArea: {flex: 0, backgroundColor: Colors.primaryColor},
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    width: '100%',
    height: 236,
  },
  productImg: {
    width: '100%',
    height: 236,
    resizeMode: 'cover',
  },
  bottomOverlay: {flex: 1},
  topButton: {
    position: 'absolute',
    top: 16,
    borderRadius: 18,
    backgroundColor: Colors.background,
  },
  left: {left: 16},
  right: {right: 16},
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
  },
  favorite: {
    backgroundColor: Colors.secondaryColor,
  },
  productDescription: {
    marginTop: -22,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    backgroundColor: Colors.surface,
  },
  productTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 10,
  },
  productTitle: {
    fontWeight: '700',
    fontSize: 18,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    
    
  },
  priceText: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.black,
  },
  shortDescription: {
    paddingVertical: 8,
    textAlign: 'left',
  },
  caption: {
    padding: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
  dishContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    height: 50,
  },
  indicator: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emptyIndicator: {
    marginRight: 24,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Color(Colors.black).alpha(0.4),
    backgroundColor: Colors.background,
  },  
  filledIndicator: {
    marginRight: 24,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primaryColor,
  },
  dishName: {
    top: -1,
    lineHeight: 22,
  },
  dishPrice: {
    color: Colors.secondaryText,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  quantity: {
    top: -1,
    paddingHorizontal: 18,
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Color(Colors.primaryColor).alpha(0.88),
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
  bottomArea: {flex: 0, backgroundColor: '#efefef'},
});
let userProfile={
  
};
let restaurantData={
  
};
let userCart={
  
};
let product={
  
};
let userGroup=[{
  
}];
// ProductB
class GroupDetailB extends Component {
  constructor(props) {
    super(props);
    let members=userGroup?( userGroup.hasOwnProperty("members")?userGroup.members:[]):[];
    this.state = {
      selectedCatId:'',
      loggedInUser:userProfile,
      restaurant:restaurantData,
      userGroup:userGroup,
      groupNumber:'',
      product: product,
      extras: members,
      favorite: false,
      sharedPeople: [],
      allUserCarts: [],
      modalVisible: false,
      total:product.price,
      quantity:1,
    };
  }
  componentDidMount = () => {
    this._bootstrap();
   };

   _bootstrap = async () => {
    let groupMembers=[];
    let response={};
   let allUserCarts=[];
    const {price, description, quantity,sharedUsers,shared} = product;
   let groupNumber=''
   let noOfUsers=1
   if(this.state.userGroup)
   groupNumber=this.state.userGroup.groupNumber;
   else
   return
   
  
    try {
      this.setState(
        {
          modalVisible: true,
        },
      )
        let catResp=await txnApi.getGroupDetails(groupNumber);
       /* response = await txnApi.getGroupCart(groupNumber);
        if (response.hasOwnProperty("data") && response.data !=null) {
          
           allUserCarts=response.data.allCarts;
        }*/
        groupMembers=catResp.data.members
        let sharedPeople=[]
        if(sharedUsers)
        {
        sharedUsers.map((user,index) => {
        sharedPeople.push(user.id)
        })
        }
        if(sharedUsers)
        {
              let members=[];
              groupMembers.map((member,index) => {
                let m=member;
                sharedUsers.map((user,index) => {
                  if(m.id==user.id)
                  {
                    m.picked=true;
                    
                    
                  }
                })
              
                members.push(m);
              })
              groupMembers=members;
              noOfUsers=sharedUsers.length
        }
        const { dispatch } = this.props; 
            dispatch({ type: 'SAVE_GROUP_DATA',
            payload: catResp.data});
        await AsyncStorage.removeItem('userGroup');
        await AsyncStorage.setItem('userGroup', JSON.stringify(catResp.data));    
            let catId=''
            if(this.props.route.params)
            catId=this.props.route.params.categoryId
            const total = quantity * product.price*noOfUsers;
        this.setState(
          {
            extras: groupMembers,
            userGroup:catResp.data,
            sharedPeople:sharedPeople,
            selectedCatId:catId,
            quantity:quantity*noOfUsers,
            total:total
          },
        )
       
       // alert(JSON.stringify(catResp))
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
updateToCart=async() => {
  //  alert("updateToCart")
    let addCartJson = {};

    let shared=this.state.product.shared;
    addCartJson.productId = this.state.product.id;
    addCartJson.quantity=this.state.quantity;
    addCartJson.userIds = this.state.sharedPeople;
    if(this.state.userGroup)
    addCartJson.groupNumber=this.state.userGroup.groupNumber

    addCartJson.ownerId=this.state.loggedInUser.id;
   // addCartJson.groupCartIds = [this.state.product.groupCartPrdId];
    addCartJson.shared=this.state.sharedPeople.length>1?shared:false;
    let groupCartIds=[]
    console.log(" this.state.product.quantity"+this.state.product.quantity)
    let allCarts=[];
    if(this.props.route.params)
    allCarts=this.props.route.params.allCarts

    
    allCarts.map((cart,index) => {
     
     let productIncart=cart.productList.filter(it => it.id.includes(this.state.product.id));
     
     productIncart.map((product,index) => {
       if(product.shared)
          groupCartIds.push(product.groupCartPrdId)
        else
        {
          if(cart.userId==this.state.loggedInUser.id)
          {
            if(this.state.sharedPeople.length>1)
            groupCartIds.push(product.groupCartPrdId)
            else if(this.state.sharedPeople.length==1) 
            groupCartIds.push(product.groupCartPrdId)
          }
        }  
        /*
        else if(this.state.sharedPeople.length==1) 
        groupCartIds.push(product.groupCartPrdId)*/
    })
    /* if(productIncart.length>0)
     {
       
        groupCartIds.push(productIncart[0].groupCartPrdId)
     }*/
   })
   addCartJson.groupCartIds=groupCartIds
    
   
    try {
      if(this.state.userGroup)
      {
       if(this.state.sharedPeople.length<=0)
       {
        alert(" Please select member");
        return
       }
      }
      console.log(" this.state.addCartJson."+addCartJson)
      let response = await txnApi.updateCartGroup(addCartJson);
      
      const { dispatch } = this.props; 
       
       dispatch({ type: 'CART.ID' , payload:response.data.cartId});
      
      this.goBack('Cart')
    }
    catch (e) {
        alert(e)
    }
  
}
  addToCart = async() => {
   
  //  alert(" addToCart")
    let addCartJson = {};
    let action ="A";
    if(this.props.route.params)
    action=this.props.route.params.action
    // alert(action)
    if(action=="U")
    {
     
      this.updateToCart();
      return;
    }
    addCartJson.productId = this.state.product.id;
    addCartJson.quantity=this.state.product.quantity;
    addCartJson.userIds = this.state.sharedPeople;
    if(this.state.userGroup)
    addCartJson.groupNumber=this.state.userGroup.groupNumber

    addCartJson.ownerId=this.state.loggedInUser.id;
    try {
      if(this.state.userGroup) 
      { 
        if(this.state.sharedPeople.length<=0) 
        { 
          if(this.state.extras.length==1) {
            addCartJson.userIds=[this.state.loggedInUser.id]
            } 
          else { 
            alert(" Please select member"); 
            return 
            } 
        } 
      }
     console.log(" cart add"+JSON.stringify(addCartJson))
       let response = await txnApi.addToCart(addCartJson);
       
       const { dispatch } = this.props; 
        
       dispatch({ type: 'CART.INCREMENT' });
       dispatch({ type: 'CART.ID' , payload:response.data.cartId});
      
      this.goBack('Home')
    }
    catch (e) {
        alert(e)
    }
    
    
  };
  navigateTo =  () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  goBack = (screen) => {
    const {navigation} = this.props;
    //this.addToCart("");
    navigation.navigate(screen,{"categoryId":this.state.selectedCatId});
    //navigation.goBack();
  };

  onPressAddToFavorites = () => {
    const {favorite} = this.state;

    this.setState({
      favorite: !favorite,
    });
  };

  setExtraDish = (item) => () => {

    
    let peopleList=this.state.sharedPeople;
    const {product, extras,sharedPeople} = this.state;
    const index = extras.indexOf(item);
    const picked = extras[index].picked;
    

    if (picked) {
      var index1 = peopleList.indexOf(item.id)
      if (index1 !== -1) {
        peopleList.splice(index1, 1);
        
      }
    } else {
      peopleList= peopleList.concat([item.id])
      //product.price += item.price;
      product.total += product.quantity * item.price;
    }

    extras[index].picked = !picked;
    
    this.setState({
      sharedPeople:peopleList,
      product,
      extras: [...extras],
    });
  };

  onPressIncreaseAmount = () => {
    const {product} = this.state;
    let {quantity} = this.state;

    quantity += 1;
    console.log(" quantity "+quantity)
    product.quantity = quantity;

    const total = quantity * product.price;
    product.total = total;
   
   
    this.setState({
      total:total,
      quantity:quantity
    });
  };

  onPressDecreaseAmount = () => {
    const {product} = this.state;
    let {quantity} = this.state;

    quantity -= 1;
    quantity = quantity < 1 ? 1 : quantity;
    product.quantity = quantity;

    const total = quantity * product.price;
    product.total = total;
   /* const { dispatch } = this.props; 
    dispatch({ type: 'CART.DECREMENT' });*/
    this.setState({
      total:total,
      quantity:quantity
    });
  };

  render() {
    let {product, favorite, extras} = this.state;
    let sharedPeople=[];
    const {price, description, quantity, total,sharedUsers} = product;
    let members=[];
    
    
    
    return (
      <Fragment>
        <StatusBar
          backgroundColor={Colors.primaryColor}
          barStyle="light-content"
        />
        <SafeAreaView style={styles.topArea} />
        <View style={styles.screenContainer}>
          <ScrollView>
            <View style={styles.header}>
              <ImageBackground
                defaultSource={imgHolder}
                source={getImgSource(product.imageUri)}
                style={styles.productImg}>
                <GradientContainer
                  colors={[Colors.black, 'transparent']}
                  start={{x: 0, y: 1}}
                  end={{x: 0, y: 0.6}}
                  containerStyle={styles.bottomOverlay}
                />
              </ImageBackground>

              <View style={[styles.topButton, styles.left]}>
                <TouchableItem onPress={this.navigateTo} borderless>
                  <View style={styles.buttonIconContainer}>
                    <Icon
                      name={CLOSE_ICON}
                      size={IOS ? 24 : 22}
                      color={Colors.secondaryText}
                    />
                  </View>
                </TouchableItem>
              </View>

              <View
                style={[
                  styles.topButton,
                  styles.right,
                  favorite && styles.favorite,
                ]}>
                <TouchableItem onPress={this.onPressAddToFavorites} borderless>
                  <View style={styles.buttonIconContainer}>
                    <Icon
                      name={FAVORITE_ICON}
                      size={IOS ? 18 : 20}
                      color={
                        favorite
                          ? Colors.onSecondaryColor
                          : Colors.secondaryText
                      }
                    />
                  </View>
                </TouchableItem>
              </View>
            </View>

            <View style={styles.productDescription}>
              <View style={styles.productTitleContainer}>
               
                <Text numberOfLines={2} style={styles.productTitle}>
                {product.test?product.test:product.name}
                </Text>
                <Text style={styles.priceText}>{`$ ${price.toFixed(2)}`}</Text>
              </View>

              <SmallText style={styles.shortDescription}>
                {description}
              </SmallText>
            </View>

            <View>
              <Caption style={styles.caption}>{extras.length>0?"CHOOSE MEMBERS":""}</Caption>
              {
              
              extras.map((item, index) => (
                
                <TouchableItem
                  key={index.toString()}
                  onPress={this.setExtraDish(item)}
                  useForeground>
                  <View style={styles.dishContainer}>
                    <View style={styles.indicator}>
                      <View>
                        {item.picked||extras.length==1? (
                          <View style={styles.filledIndicator} />
                        ) : (
                          <View style={styles.emptyIndicator} />
                        )}
                      </View>

                      <Text style={styles.dishName}>For {this.state.loggedInUser.id==item.id?"me":item.firstName}</Text>
                    </View>

                    <Text style={styles.dishPrice}>
                      
                    </Text>
                  </View>
                </TouchableItem>
              ))}
            </View>
          </ScrollView>

          <View style={styles.bottomButtonsContainer}>
            <View style={styles.amountContainer}>
              <View style={styles.amountButtonsContainer}>
                <TouchableItem onPress={this.onPressDecreaseAmount} borderless>
                  <View style={styles.iconContainer}>
                    <Icon
                      name={MINUS_ICON}
                      size={20}
                      color={Colors.onPrimaryColor}
                    />
                  </View>
                </TouchableItem>

                <Text style={styles.quantity}>{this.state.quantity}</Text>

                <TouchableItem onPress={this.onPressIncreaseAmount} borderless>
                  <View style={styles.iconContainer}>
                    <Icon
                      name={PLUS_ICON}
                      size={20}
                      color={Colors.onPrimaryColor}
                    />
                  </View>
                </TouchableItem>
              </View>
            </View>

            <Button
              onPress={this.addToCart}
              title={`Add $${this.state.total.toFixed(2)}`}
              titleColor={Colors.onPrimaryColor}
              height={44}
              color={Colors.primaryColor}
              small
              rounded
            />
          </View>
        </View>
        <SafeAreaView style={styles.bottomArea} />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
 
  userProfile=state.postLoginData;
  restaurantData=state.restarauntData;
  userCart=state.cart;
  userGroup=state.groupData;
  product=state.product
  return {
    registeruser: state.postLoginData
  };
};
export default connect(mapStateToProps)(GroupDetailB)