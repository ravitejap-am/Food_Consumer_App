/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {StyleSheet, View,I18nManager,Platform} from 'react-native';
import Color from 'color';

// import components
import Button from '../buttons/Button';
import {Caption, Subtitle1, Subtitle2} from '../text/CustomText';
import TouchableItem from '../TouchableItem';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// OrderItemB Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const DELETE_ICON = IOS ? 'ios-close' : 'md-close';
// OrderItemB Styles
const styles = StyleSheet.create({
  container: {
   
    borderRadius: 16,
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
  orderNumber: {
    paddingBottom: 2,
    fontWeight: 'bold',
    color: Colors.primaryColorDark,
    textAlign: 'left',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  divider: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#efefef',
  },
  circleMask: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#efefef',
  },
  leftCircle: {
    left: -9,
  },
  rightCircle: {
    right: -9,
  },
  pv8: {
    paddingVertical: 8,
  },
  itemContainer: {
    marginVertical: 4,
    backgroundColor: Colors.background,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    height: 36,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  extraSmallButton: {
    width: 116,
    height: 34,
    borderRadius: 17,
  },
  status: {
    textAlign: 'left',
  },
  onTheWay: {
    color: Colors.tertiaryColor,
  },
  pending: {
    color: Colors.secondaryColor,
  },
  delivered: {
    color: Colors.primaryColor,
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
}: Props) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.header}>
        <View>
          <Subtitle2
            style={styles.orderNumber}>{`Order #${orderNumber}`}</Subtitle2>
          <Caption>{orderDate}</Caption>
        </View>
        <View style={styles.flexEnd}>
          <Subtitle1>{`$ ${100}`}</Subtitle1>
          <Caption>{`${10} items`}</Caption>
        </View>
      </View>

      <View style={styles.divider}>
        <View style={[styles.circleMask, styles.leftCircle]} />
        <View style={styles.dividerLine} />
        <View style={[styles.circleMask, styles.rightCircle]} />
      </View>

      <View style={styles.pv8}>
        {orderItems.map((item, index) => (
          <View key={index.toString()} style={styles.itemContainer}>
            <TouchableItem onPress={onPress} activeOpacity={activeOpacity}>
              <View style={styles.item}>
                <Subtitle2>{item.name}</Subtitle2>
                <Subtitle2>{item.shared?'' : item.sharedUsers[0].firstName + ` (${item.quantity} X ${item.price})` +`$ ${item.price}`}</Subtitle2>
                
              </View>
            </TouchableItem>
          </View>
        ))}
      </View>


    </View>
  </View>
);

export default OrderItemAtCheckOutB;
