/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {StyleSheet, View,I18nManager,Platform,Text} from 'react-native';
import Color from 'color';

// import components
import Button from '../buttons/Button';
import {Caption, Subtitle1, Subtitle2} from '../text/CustomText';
import TouchableItem from '../TouchableItem';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// OrderItemB Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'account-group-outline' : 'account-group-outline';
const DELETE_ICON = IOS ? 'ios-close' : 'md-close';
// OrderItemB Styles
const styles = StyleSheet.create({
  swipeRow: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  cardBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 1,
    borderRadius: 4,
    backgroundColor: Color(Colors.error).alpha(0.12).string(),
  },
  deleteButtonContainer: {
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    width: 88,
    overflow: 'hidden',
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    backgroundColor: Colors.background,
  },
  
  content: {
    //width: Layout.SCREEN_WIDTH ,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
  },
  container: {
    margin: 4,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 4,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: Colors.surface,
  },
  productImg: {
    width: 116,
    height: 126,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    flex: 1,
    fontWeight: '500',
    fontSize: 14,
    color: Color(Colors.secondaryText).alpha(0.6),
    letterSpacing: 0.15,
    textAlign: 'left',
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  oldPrice: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8e8e8e',
  },
  hr: {
    position: 'absolute',
    top: 10,
    width: '82%',
    height: 1,
    backgroundColor: '#8e8e8e',
  },
  price: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors.primaryColor,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  quantity: {
    top: -1,
    paddingHorizontal: 20,
    fontSize: 14,
    color: Color(Colors.secondaryText).alpha(0.6),
    textAlign: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.secondaryColor,
  },
  newLabelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomRightRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.primaryColor,
  },
  label: {
    fontSize: 12,
    color: Colors.onPrimaryColor,
  },
});

const renderOrderItemsTotal = items => {
  const total = items.reduce((prev, next) => prev + next.price, 0);
  return total;
};

// OrderItemB Props
type Props = {
  onPress: () => {},
  activeOpacity: number,
  orderNumber: number,
  orderDate: string,
  orderItems: Array,
  orderStatus: string,
};

// OrderItemAtCheckOutB
const OrderItemAtCheckOutB = ({
  onPress,
  activeOpacity,
  orderNumber,
  orderDate,
  orderItems,
  orderStatus,
  activeIndex
}: Props) => (
  <View style={styles.bg}>
    <View style={styles.content}>
      

      <View style={styles.divider}>
        <View style={[styles.circleMask, styles.leftCircle]} />
        <View style={styles.dividerLine} />
        <View style={[styles.circleMask, styles.rightCircle]} />
      </View>

      <View style={styles.pv8}>
        {orderItems.map((item, index) => (
          <View style={styles.container}>
            <TouchableItem
              activeOpacity={activeOpacity}
              
              useForeground>
              <View style={styles.innerContainer}>
                

                <View style={styles.productInfo}>
                  <View style={styles.productDetails}>
                    <Text numberOfLines={2} style={styles.title}>
                      {item.name}
                    </Text>
                    <Text style={styles.quantity}>{` (${activeIndex==0?(item.quantity*item.sharedUsers.length)+"/"+item.sharedUsers.length:item.quantity})`}</Text>
                      <View style={styles.priceContainer}>
                        <Text style={styles.price}>
                          {`$${activeIndex==0?(item.price*item.quantity).toFixed(2):item.price.toFixed(2)}`}
                        </Text>
                      </View>
                     {/* <TouchableItem onPress={this.onPressAdd} borderless>
                     
                      {item.shared?(
                        <View style={styles.header}>
                       
                       <Icon
                  name="account-group-outline"
                  size={24}
                  color={Colors.primaryColor}
                />
                       </View>) : (
                          <Text style={styles.quantity}>{item.sharedUsers[0].firstName }</Text>
                          ) }
                        
                      
                       </TouchableItem> */}
                    
                  </View>

                </View>

                
              </View>
            </TouchableItem>
          </View>

          
        ))}
      </View>


    </View>
  </View>
);

export default OrderItemAtCheckOutB;
