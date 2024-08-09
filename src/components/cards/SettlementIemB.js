/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Color from 'color';

// import components
import Button from '../buttons/Button';
import {Caption, Subtitle1, Subtitle2} from '../text/CustomText';
import TouchableItem from '../TouchableItem';
import EmptyState from '../../components/emptystate/EmptyState';
// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// OrderItemB Config

// OrderItemB Styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 12,
    borderRadius: 16,
    backgroundColor: Colors.background,
  },
  content: {
    width: Layout.SCREEN_WIDTH - 2 * 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
    paddingHorizontal: 16,
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

const renderRecievablesTotal = items => {
  const total = items.reduce((prev, next) => prev + next.amount, 0);
  return total;
};

// OrderItemB Props
type Props = {
  onPress: () => {},
  onPressCancel: () => {},
 onPressPay: () => void,
  onPressTrack:() => void,
  activeOpacity: number,
  orderNumber: number,
  orderDate: string,
  orderItems: Array,
  orderStatus: string,
};

// OrderItemB
const SettlementItemB = ({
  onPress,
  onPressCancel,
  onPressPay,
  activeOpacity,
  orderNumber,
  orderDate,
  orderItems,
  orderStatus,
  activeIndex,
  total
}: Props) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.header}>
        <View>
          <Subtitle2
            style={styles.orderNumber}>{`${orderNumber}`}</Subtitle2>
          <Caption>{orderDate}</Caption>
        </View>
        <View style={styles.flexEnd}>
          <Subtitle1>{`$ ${renderRecievablesTotal(orderItems)}`}</Subtitle1>
          
        </View>
      </View>

      <View style={styles.divider}>
        <View style={[styles.circleMask, styles.leftCircle]} />
        <View style={styles.dividerLine} />
        <View style={[styles.circleMask, styles.rightCircle]} />
      </View>
      {orderItems.length === 0 ? (
          <EmptyState
            showIcon
            iconName={"cash-refund"}
            title={activeIndex==0?"You don't have any payables.":"You don't have any receivables."}
            message={""}
          />
        ):(
      <View style={styles.pv8}>
        {orderItems.map((item, index) => (
          <View key={index.toString()} style={styles.itemContainer}>
            <TouchableItem onPress={onPress} activeOpacity={activeOpacity}>
              <View style={styles.item}>
                <Subtitle2>{item.user.firstName}</Subtitle2>
                <Subtitle2>{`$${item.amount}`}</Subtitle2>
              </View>
            </TouchableItem>
          </View>
        ))}
      </View>)}

      {orderStatus === 'CONFIRMED' && (
        <View style={styles.footer}>
          <View>
            <Subtitle2 style={styles.status}>Status</Subtitle2>
            <Subtitle2 style={styles.onTheWay}>Pending delivery</Subtitle2>
          </View>
          <Button
            color={Color(Colors.primaryColor).alpha(0.16)}
            title="Track"
            titleColor={Colors.primaryColor}
            buttonStyle={styles.extraSmallButton}
          />
        </View>
      )}

      {orderStatus === 'PENDING' && (
        <View style={styles.footer}>
          <View>
            <Subtitle2 style={styles.status}>Status</Subtitle2>
            <Subtitle2 style={styles.pending}>Pending waiter confirmation</Subtitle2>
          </View>
          <Button
            color={Color(Colors.secondaryColor).alpha(0.12)}
            title="Pay"
            titleColor={Colors.secondaryColor}
            buttonStyle={styles.extraSmallButton}
            onPress={onPressPay}
          />
        </View>
      )}

      {orderStatus === 'DELIVERED' && (
        <View style={styles.footer}>
          <View>
            <Subtitle2 style={styles.status}>Status</Subtitle2>
            <Subtitle2 style={styles.delivered}>Delivered</Subtitle2>
          </View>
          <Button
            color={Color(Colors.primaryColor).alpha(0.16)}
            title="Pay"
            titleColor={Colors.primaryColor}
            buttonStyle={styles.extraSmallButton}
            onPress={onPressPay}
          />
        </View>
      )}
      
    </View>
  </View>
);

export default SettlementItemB;
