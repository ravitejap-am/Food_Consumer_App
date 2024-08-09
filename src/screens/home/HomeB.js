/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  Keyboard,
  ImageBackground,
  ScrollView,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Animated,
  Modal,
  Platform
} from 'react-native';
import Color from 'color';
// import utils
import getImgSource from '../../utils/getImgSource.js';
import { connect } from 'react-redux';
import GroupIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
// import components
import Divider from '../../components/divider/Divider';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Heading6,Caption,Heading5, Subtitle1} from '../../components/text/CustomText';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import LinkButton from '../../components/buttons/LinkButton';
import ProductCard from '../../components/cards/ProductCard';
import SafeAreaView from '../../components/SafeAreaView';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import BottomSheet from '../../components/bottomsheet/BottomSheet';
import JoinGroupModal from '../../components/bottomsheet/JoinGroupSheet';
import TouchableItem from '../../components/TouchableItem';
import Icon from '../../components/icon/Icon';
import Button from '../../components/buttons/Button';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
// import Orders screen
import LastOrder from '../orders/LastOrder';
import ContainedButton from '../../components/buttons/ContainedButton';
import Layout from '../../theme/layout';
// import colors
import Colors from '../../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
// HomeB Config
const imgHolder = require('../../assets/img/imgholder.png');
//api
import * as productApi from '../../api/ProductService'
import * as txnApi from '../../api/TransactionService'
// PaymentMethodB Config
const IOS = Platform.OS === 'ios';
const MORE_ICON = IOS ? 'ios-more' : 'md-more';
const SAVE_ICON = IOS ? 'ios-people' : 'md-people';
const EDIT_ICON = IOS ? 'ios-beer' : 'md-beer';
const REMOVE_ICON = IOS ? 'ios-remove-circle' : 'md-remove-circle';
const BOTTOM_SHEET_PB = IOS ? 16 : 0;

const PLACEHOLDER_TEXT_COLOR = 'rgba(255, 255, 255, 0.7)';
const INPUT_TEXT_COLOR = '#fff';
const INPUT_BORDER_COLOR = 'rgba(255, 255, 255, 0.4)';
const INPUT_FOCUSED_BORDER_COLOR = '#fff';
// HomeB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    backgroundColor: '#efefef',
  },
  joinModalContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: Colors.primaryColor,
  },
  inputStyle: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    
  },
  mainModalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  instructionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Color(Colors.surface).alpha(0.96),
  },
  topArea: {flex: 0, backgroundColor: Colors.primaryColor},
 
  contentContainerStyle: {
    paddingBottom: 8,
  },
  cardContainer: {
    width: '100%',
    height: 232,
  },
  button: {
    width: '98%',
  },
  negativeMargin: {
    marginTop: -16,
  },
  editButtonContainer: {
    position: 'absolute',
    top: 32,
    right: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
  },
  whiteText: {
    color: Colors.white,
  },
  buttonContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  bottomSheetItem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    height: 64,
  },
  bottomSheetCaption: {paddingVertical: 4,
    fontWeight: '400',
   
    color: Colors.tertiaryColor,
    textAlign: 'left'
  },
  bottomSheetAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    height: 56,
  },
  bottomSheetIconContainer: {
    marginRight: IOS ? 24 : 32,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    width: '100%',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  categoriesContainer: {
    paddingBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  titleText: {
    fontWeight: '700',
  },
  viewAllText: {
    color: Colors.primaryColor,
  },
  categoriesList: {
    paddingTop: 4,
    paddingRight: 16,
    paddingLeft: 6,
  },
  categoryContainer: {
    marginLeft: 10,
    width: 112,
    height: 60,
  },
  categoryThumbnail: {
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
  categoryImg: {
    borderRadius: 8,
  },
  categoryName: {
    position: 'absolute',
    top: 6,
    left: 6,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    width:105,
    height:52,
    backgroundColor: Colors.primaryColor,
    
  },
  categoryNameText: {
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.6,
    textAlign: 'center',
    alignContent:"center"
  },
  grpNumText: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.primaryColor,
    textAlign: 'left',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.52)',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: Layout.SCREEN_WIDTH - 3 * Layout.MEDIUM_MARGIN,
    borderRadius: 4,
    backgroundColor: Colors.primaryColor,
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
var BUTTONS = ["Male", "Female", "Other", "Close"];
// HomeB
class HomeB extends Component {
  constructor(props) {
    super(props);
    let user=userProfile
    this.state = {
      selectedCatId:'',
      loggedInUser:user,
      restaurant:restaurantData,
      userGroup:userGroup,
      groupNumber:'',
      modalVisible: false,
      categoryName:"",
      categories: [
       
      ],
      products: [
        
      ],
      groupNotCreated:true,
      selectedCatId:"",
      joinGroupFlag:false,
      emailFocused: false,
      phoneno:'',
      mainModal:true
    };
  }

  navigateTo = screen => () => {
    
    const {navigation} = this.props;
    navigation.navigate(screen);
    
    
  };
  selectMember = (screen,item,flag) => () => {
    
    const {navigation} = this.props;
    const { dispatch } = this.props; 
    dispatch({ type: 'PRODUCT_DATA',
            payload: item});
    navigation.navigate(screen,{"action":flag,"categoryId":this.state.selectedCatId});
    
    
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
        this.setState(
          {
            modalVisible: true,
          },
        )
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
   
  this.setState(
    {
      modalVisible: false,
    },
  )
  };
 
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
    let groupNotCreated=true;
    let catName="";
    let groupNumber=this.state.groupNumber;
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

    if(this.state.userGroup)
    {
     
      let length=this.state.userGroup.members.length
      if(length>1)
      groupNotCreated=false

      groupNumber=this.state.userGroup.groupNumber
    }
    else
    {
      this.setState(
        {
          mainModal:true,
          
        })
      this.openBottomSheet();
    }
    
    let products=[];
    let restaurantId ='';
    

    if(this.state.restaurant)
    restaurantId = this.state.restaurant.id;
    else
    {
    
      this.setState({
        
       groupNotCreated:groupNotCreated,
       groupNumber:groupNumber
      });
      return
    }
   
    try {
      this.setState(
        {
          modalVisible: true,
        },
      )
      
        let catResp=await productApi.getAllCategories(restaurantId)
        if(catResp.length>0)
        {
          let catId=catResp[0].id
          if(this.props.route.params)
          {
            console.log(" params ",this.props.route.params)
            if(this.props.route.params.categoryId)
            catId=this.props.route.params.categoryId;
            
          }
        
          let response=await productApi.getProductsByCategoryId(catId)
          
        //let response=await productApi.getAllMenu(restaurantId)

        response.map((product,index) => {
        let p=product;
        p.quantity=1;
        products.push(p);
      })
      let category=catResp.filter(it => it.id.includes(catId));
      catName=category.length>0?category[0].name:'NA';
        this.setState({
        products: products,
       categories:catResp,
       categoryName:catName,
       selectedCatId:catId,
       groupNotCreated:groupNotCreated,
       groupNumber:groupNumber
      });
        }
        
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
 onCategorySelect= (id,name)=>async()=>{
  let products=[];
  this.setState(
    {
      modalVisible: true,
    },
  )
   try{
    let response=await productApi.getProductsByCategoryId(id)
    response.map((product,index) => {
      let p=product;
      p.quantity=1;
      products.push(p);
    })
    this.setState({
    products: products,
    categoryName:name,
    selectedCatId:id,
    modalVisible:false
    
  });
   }
   catch (error) {
    this.setState(
      {
        modalVisible: false,
      },
    )
    alert(" =error="+error);
      // Error retrieving data
  }
  
 
 }
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
  openBottomSheet =  () => {
    
      this.bottomSheet.open()
  };
  openJoinGroupSheet =  () => {
    
    this.joinGroupModal.open()
};
  closeBottomSheet =  () => {
    
    this.bottomSheet.close()
};
  createGroup = async() => {
    // for demo purpose after 3s close modal
    let jsonData = {};
    let response ={};
    if(!this.state.restaurant)
    {
     // alert(" Please Scan Restaraunt Menu QR Code or Join Group")
      Alert.alert(
        'Create group',
        'Please Scan Restaraunt Menu QR Code or Join Group.',
        [
          {text: 'Cancel', onPress: () => {}, style: 'cancel'},
          {
            text: 'OK',
            onPress: () => {
              //const {navigation} = this.props;
              //navigation.navigate('SignIn');
            },
          },
        ],
        {cancelable: false},
      );
      //return;
    }
    else
    {
    jsonData.userId=this.state.loggedInUser.id;
    jsonData.resId=this.state.restaurant.id;
    var isEmailSent=false;
    try
    {
      response = await txnApi.addGroup(jsonData);
      
      isEmailSent=true;
    }
    catch(error)
    {
      alert(JSON.stringify(error))
    }
    
    if(isEmailSent)
    {
      
    // alert("Group successfully created. Your group number is "+ response.groupNumber+". You can find it on right top corner.")
     Alert.alert(
      'Group Created',
      'Group successfully created. Your group number is '+ response.groupNumber+'. You can find it on right top corner.',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {
          text: 'OK',
          onPress: async() => {
            await AsyncStorage.removeItem('userGroup');
            await AsyncStorage.setItem('userGroup', JSON.stringify(response));
            const { dispatch } = this.props; 
            dispatch({ type: 'SAVE_GROUP_DATA',
            payload: response});
      
            this.setState(
            { 
              userGroup:response,
              groupNotCreated:false,
              groupNumber:response.groupNumber
            }
      ) 
            this.navigateTo('HomeNavigator');
          },
        },
      ],
      {cancelable: false},
    );
     
   
    }
    
  }
    return response
  };
  
  createGroupForSingleUser = async() => {
    let jsonData = {};
    let response ={};
    if(!this.state.restaurant)
    {
      //alert(" Please Scan Restaraunt Menu QR Code or Join Group")
      //return;
    }
    else
    {
    jsonData.userId=this.state.loggedInUser.id;
    jsonData.resId=this.state.restaurant.id;
    var isEmailSent=false;
    try
    {
      response = await txnApi.addGroup(jsonData);
      
      isEmailSent=true;
    }
    catch(error)
    {
      alert(JSON.stringify(error))
    }
    
    if(isEmailSent)
    {
      
    // alert("Group successfully created.")
     await AsyncStorage.removeItem('userGroup');
     await AsyncStorage.setItem('userGroup', JSON.stringify(response));
     const { dispatch } = this.props; 
      dispatch({ type: 'SAVE_GROUP_DATA',
      payload: response});
      
      this.setState(
        { 
          userGroup:response,
          groupNotCreated:true,
          groupNumber:response.groupNumber
        }
      )
   
    }
    else
    {
      this.closeModal();
      
       
    }
  }
    return response 
  };
  addGroup = () => {
    this.closeBottomSheet()
   this.createGroup()
   
  //  this.navigateTo('HomeNavigator',{"groupNotCreated":false,"isScanDone":false});
    
    //this.navigateTo('HomeNavigator');
  };
  skipGroupModal = () => {
   
    this.createGroupForSingleUser()
    
   //  this.navigateTo('HomeNavigator',{"groupNotCreated":false,"isScanDone":false});
     this.closeBottomSheet()
     //this.navigateTo('HomeNavigator');
   };
  joinGroup = () => {
    
    this.setState(
      {
        mainModal:false
      }
      
    )
    
   this.openBottomSheet()
     
  };
  goToHome=()=>
  {

  }
  addMemberToGroup = async() => {
    // for demo purpose after 3s close modal
    Keyboard.dismiss();
    let jsonData = {};
    let response ={};
    let group={};
    jsonData.userIds=[this.state.loggedInUser.id];
    jsonData.groupNumber=this.state.phoneno;
    group.groupNumber=this.state.phoneno;
    var isMemberAdded=false;
    try
    {
     
      response = await txnApi.addMemberToGroup(jsonData);
      
      isMemberAdded=true;
    }
    catch(error)
    {
      Alert.alert(
        'Join group',
        'Invalid Group Number. Please try again.',
        [
          {text: 'Cancel', onPress: () => {}, style: 'cancel'},
          {
            text: 'OK',
            onPress: () => {
              //const {navigation} = this.props;
              //navigation.navigate('SignIn');
            },
          },
        ],
        {cancelable: false},
      );
    // alert("Invalid Group Number. Please try again.")
     isMemberAdded=false;
    }
    
    if(isMemberAdded)
    {
      
      Alert.alert(
        'Join group',
        response.data.result,
        [
          {text: 'Cancel', onPress: () => {}, style: 'cancel'},
          {
            text: 'OK',
            onPress: async() => {
              this.bottomSheet.close();
              if(response.data.hasOwnProperty("users") && response.data.users!=null)
              {
                group.members=response.data.users;
              }
              await AsyncStorage.removeItem('userGroup');
              await AsyncStorage.setItem('userGroup', JSON.stringify(group));
              const { dispatch } = this.props; 
              dispatch({ type: 'SAVE_GROUP_DATA',
                    payload: group});
              dispatch({ type: 'SAVE_RESTARAUNT_DATA',
              payload: response.data.restraunt}); 
              dispatch({ type: 'CART.EMPTY' });
              
              this.setState(
              { 
                userGroup:group,
                groupNotCreated:false,
                groupNumber: group.groupNumber,
                restaurant:response.data.restraunt
              }
              )
              this._bootstrap()
             
            },
          },
        ],
        {cancelable: false},
      );
      
    }
    
    return
  };
  
  phoneChange = text => {
    this.setState({
      phoneno: text,
    });
  };
  keyExtractor = (item, index) => index.toString();

  

  renderProductItem = ({item, index}) => (
    <ProductCard
     // onPress={this.navigateTo('Product')}
      selectMember={this.selectMember('GroupDetail',item,'A')}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      key={index}
      activeOpacity={0.7}
      imageUri={require('../../assets/img/cake_1.jpg')}
      title={item.test}
      price={item.price}
      description={item.description}
      quantity={item.quantity}
      showProdImage={false}
      swipeoutDisabled
    />
  );

  renderSeparator = () => <Divider />;

  render() {
    const {categories, products,modalVisible,emailFocused,joinGroupFlag} = this.state;
   
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <ScrollView>
            <View style={styles.categoriesContainer}>
              <View style={styles.titleContainer}>
                <Heading6 style={styles.titleText}>{this.state.restaurant?this.state.restaurant.name:"Home"}</Heading6>
                {
                !this.state.groupNotCreated?(
                <View style={styles.titleContainer}><GroupIcon
                  name="account-group-outline"
                  size={20}
                  color={Colors.primaryColor}
                /><Text style={styles.grpNumText}>{" "+this.state.groupNumber}</Text></View>)
                :
                (<Text style={styles.grpNumText}>{this.state.groupNumber}</Text>)
                }
               
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}>
                {categories.map(category => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    key={category.name}
                    onPress={this.onCategorySelect(category.id,category.name)}>
                    <View style={styles.categoryContainer}>
                     {/* <ImageBackground
                        defaultSource={imgHolder}
                        source={getImgSource(require('../../assets/img/pizza_3.jpg'))}
                        style={styles.categoryThumbnail}
                        imageStyle={styles.categoryImg}>*/}
                        <View style={styles.categoryName}>
                          <Text style={styles.categoryNameText}>
                            {category.name}
                          </Text>
                        </View>
                      
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {this.state.restaurant&&<View style={styles.titleContainer}>
              <Heading6 style={styles.titleText}>{categories.length>0 ?this.state.categoryName:""}</Heading6>
             
            </View>}
            {this.state.restaurant? (
            <FlatList
              data={products}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderProductItem}
              ItemSeparatorComponent={this.renderSeparator}
            />):
            <View style={{height:'100%'}}><LastOrder/></View>}
          </ScrollView>
        </View>
        <BottomSheet
            ref={ref => {
              this.bottomSheet = ref;
            }}
            mainModal={this.state.mainModal}
           // onClose={alert(" closed")}
            // FIX: closeOnSwipeDown need height to work properly
            height={272 + BOTTOM_SHEET_PB} // height of BottomSheet = 64 + 3 * 56 + 16
            rounded
            modalContainerStyle={this.state.mainModal?styles.mainModalContainer:styles.joinModalContainer}
            statusBarColor={Color(Colors.primaryColor)
              .darken(0.52)
              .rgb()
              .string()}>
       {this.state.mainModal?( <View
            >
            <View style={styles.bottomSheetItem}>
              <Heading5 style={styles.bottomSheetCaption}>
                {this.state.loggedInUser?"Hello "+this.state.loggedInUser.firstName:""}
              </Heading5>
              <Subtitle1>What do you want to do? </Subtitle1>
            </View>

            <TouchableItem onPress={this.addGroup}>
              <View style={styles.bottomSheetAction}>
                <View style={styles.bottomSheetIconContainer}>
                  <Icon name={EDIT_ICON} size={22} color={Colors.primaryColor} />
                </View>
                <Subtitle1>Start a new group</Subtitle1>
              </View>
            </TouchableItem>

            <TouchableItem onPress={this.joinGroup}>
              <View style={styles.bottomSheetAction}>
                <View style={styles.bottomSheetIconContainer}>
                  <Icon name={SAVE_ICON} size={22} color={Colors.primaryColor} />
                </View>
                <Subtitle1>Join a group</Subtitle1>
              </View>
            </TouchableItem>
              
            <TouchableItem onPress={this.skipGroupModal}>
              <View style={styles.bottomSheetAction}>
                <View style={styles.bottomSheetIconContainer}>
                  <Icon
                    name={REMOVE_ICON}
                    size={22}
                    color={Colors.primaryColor}
                  />
                </View>
                <Subtitle1>No, Thanks.</Subtitle1>
              </View>
            </TouchableItem>
          </View>)
          :
          (<View>
          <View style={styles.instructionContainer}>
              <View style={styles.iconContainer}>
                <GroupIcon
                  name="account-group-outline"
                  size={30}
                  color={Colors.primaryColor}
                />
              </View>
              
            </View>
            <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={{ marginBottom:20 }}>
              <UnderlineTextInput
              value={this.state.phoneno}
              keyboardType='numeric'
              onChangeText={this.phoneChange}
              inputFocused={emailFocused}
              onSubmitEditing={this.addMemberToGroup}
              returnKeyType="done"
              blurOnSubmit={false}
  
              placeholder="Group Number"
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              inputTextColor={INPUT_TEXT_COLOR}c
              borderColor={INPUT_BORDER_COLOR}
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputStyle={styles.inputStyle}
              />

            </View>
            <View style={styles.bottomButtonsContainer}>
                  <ContainedButton
                    onPress={this.addMemberToGroup}
                    color={Colors.surface}
                    buttonStyle={styles.button}
                    iconColor="#3b5998"
                    title="Join Group"
                    titleColor="#3b5998"
                  />
                  
            </View>
            </KeyboardAwareScrollView>
        </View>)}
        </BottomSheet>
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
  console.log("Home redux user data :",state.postLoginData);
  userProfile=state.postLoginData;
  restaurantData=state.restarauntData;
  userCart=state.cart;
  userGroup=state.groupData;
  
  return {
    registeruser: state.postLoginData
  };
};
export default connect(mapStateToProps)(HomeB)