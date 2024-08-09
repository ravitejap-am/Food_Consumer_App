/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import { StyleSheet, View, Text, Touchable } from 'react-native';
import Color from 'color';

// import components
import Button from '../buttons/Button';
import { Caption, Subtitle1, Subtitle2 } from '../text/CustomText';
import TouchableItem from '../TouchableItem';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// LastOrderItemA Config

// LastOrderItemA Styles
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
    title: {
        flex: 1,
        fontWeight: '500',
        fontSize: 14,
        color: Color(Colors.secondaryText).alpha(0.9),
        letterSpacing: 0.15,
        textAlign: 'left',
    },
    taxAndTip: {
        flex: 1,
        fontWeight: '500',
        fontSize: 14,
        color: Color(Colors.secondaryText).alpha(0.9),
        letterSpacing: 0.15,
        textAlign: 'left',
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
        width: 146,
        height: 40,
        borderRadius: 24,
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
    tipButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        height: 35, width: 50,
        borderRadius: 5,
        marginLeft: 5
    },
    textResultStyle: {
        textAlign: 'center',
        padding: 12,
        // textTransform: 'capitalize'
      },
});

const renderOrderItemsTotal = items => {
    const total = items.reduce((prev, next) => prev + next.price * next.quantity, 0);
    return total;
};

// LastOrderItemA Props
type Props = {
    onPress: () => {},
    onPressCancel: () => {},
    onPressPay: () => void,
    onGroupPayBtn: () => void,
    onPressTrack: () => void,
    // tipChangeColor:() => void,
    activeOpacity: number,
    orderNumber: number,
    orderDate: string,
    orderItems: Array,
    orderStatus: string,
    groupCount: number,
    // addTip: Array
};

// LastOrderItemA
const LastOrderItemA = ({
    onPress,
    onPressCancel,
    onGroupPayBtn,
    onPressPay,
    // tipChangeColor,
    activeOpacity,
    orderNumber,
    orderDate,
    orderItems,
    orderStatus,
    activeIndex,
    total,
    groupCount,
    salesTax,
    tip,
    // addTip,
    children,
    // tipPressed
}: Props) => (
    <View style={styles.container}>
        <View style={styles.content}>
            <View style={styles.header}>
                <View>
                    <Subtitle2
                        style={styles.orderNumber}>{`Order #${orderNumber}`}</Subtitle2>
                    <Caption>{orderDate}</Caption>
                    {orderStatus === 'PENDING' && (
                        <Subtitle2 style={styles.pending}>Pending waiter confirmation</Subtitle2>
                    )}
                    {orderStatus === 'CONFIRMED' && (
                        <Subtitle2 style={styles.onTheWay}>Pending delivery</Subtitle2>
                    )}
                    {orderStatus === 'DELIVERED' && (
                        <Subtitle2 style={styles.delivered}>Delivered</Subtitle2>
                    )}
                    {orderStatus === 'PAID' && (
                        <Subtitle2 style={styles.pending}>Paid & Pending waiter confirmation</Subtitle2>
                    )}
                    {orderStatus === 'COMPLETED' && (
                        <Subtitle2 style={styles.delivered}>Delivered & Paid</Subtitle2>
                    )}
                </View>
                <View style={styles.flexEnd}>
                    <Subtitle1>{`$ ${total.toFixed(2)}`}</Subtitle1>
                    <Caption>{`${orderItems.length} items`}</Caption>
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
                                <Text numberOfLines={2} style={styles.title}>
                                    {item.name}
                                </Text>

                                <Subtitle2 >{`$${activeIndex == 0 ? (item.price * item.quantity).toFixed(2) : item.price.toFixed(2)}`}</Subtitle2>
                            </View>
                        </TouchableItem>
                    </View>
                ))}
            </View>

            <View style={styles.divider}>
                <View style={[styles.circleMask, styles.leftCircle]} />
                <View style={styles.dividerLine} />
                <View style={[styles.circleMask, styles.rightCircle]} />
            </View>
            <View style={styles.pv8}>
                {salesTax ? (

                    <View style={styles.item}>
                        <Text numberOfLines={2} style={styles.orderNumber}>
                            {'Sales Tax'}
                        </Text>

                        <Subtitle1 >{`$${activeIndex == 0 ? salesTax : salesTax.toFixed(2)}`}</Subtitle1>
                    </View>


                ) : (
                    <View style={styles.item}><Text numberOfLines={2} style={styles.orderNumber}>
                        {'Sales Tax will be updated once bill generated by waiter.'}
                    </Text></View>)}
            </View>
            <View >
                {tip ? (

                    <View style={styles.item}>
                        <View>
                            <Text numberOfLines={2} style={styles.orderNumber}>
                                {'Waiter added tip'}
                            </Text>
                        </View>

                        <Subtitle1 >{`$${activeIndex == 0 ? tip : tip}`}</Subtitle1>
                    </View>


                ) : (<Text></Text>)}
            </View>
            {orderStatus !== 'PENDING' && (
                <View>
                    {children}
                </View>
            )}

            {/* <View>
                {children}
            </View> */}

            {orderStatus === 'CONFIRMED' && (
                <View style={styles.footer}>
                    <View>
                        <Subtitle2 style={styles.status}>Status</Subtitle2>
                        <Subtitle2 style={styles.onTheWay}>Pending delivery</Subtitle2>
                    </View>
                    {/*<Button
                        color={Color(Colors.primaryColor).alpha(0.16)}
                        title="Track"
                        titleColor={Colors.primaryColor}
                        buttonStyle={styles.extraSmallButton}
                    />*/}
                </View>
            )}

            {orderStatus === 'PENDING' && (
                <View style={styles.footer}>

                    {activeIndex == 0 && groupCount > 1 ? (<Button
                        color={Color(Colors.primaryColor).alpha(0.16)}
                        title={groupCount > 1 ? "Pay For Yourself" : "Pay"}
                        titleColor={Colors.primaryColor}
                        buttonStyle={styles.extraSmallButton}
                        onPress={onPressPay}
                    />) :
                        (
                            <View>
                                <Subtitle2 style={styles.status}>{""}</Subtitle2>
                                <Subtitle2 style={styles.pending}>{""}</Subtitle2>
                            </View>
                        )
                    }
                    {groupCount > 1 ?
                        <Button
                            color={Color(Colors.primaryColor).alpha(0.16)}
                            title="Pay For Group"
                            titleColor={Colors.primaryColor}
                            buttonStyle={styles.extraSmallButton}
                            onPress={activeIndex == 1 ? onPressPay : onGroupPayBtn}
                        />
                        :
                        <Button
                            color={Color(Colors.primaryColor).alpha(0.16)}
                            title={groupCount > 1 ? "Pay For Yourself" : "Pay"}
                            titleColor={Colors.primaryColor}
                            buttonStyle={styles.extraSmallButton}
                            onPress={onPressPay}
                        />
                    }
                </View>
            )}

            {orderStatus === 'DELIVERED' && (
                <View style={styles.footer}>

                    {activeIndex == 0 && groupCount > 1 ? (<Button
                        color={Color(Colors.primaryColor).alpha(0.16)}
                        title={groupCount > 1 ? "Pay For Yourself" : "Pay"}
                        titleColor={Colors.primaryColor}
                        buttonStyle={styles.extraSmallButton}
                        onPress={onPressPay}
                    />) :
                        (
                            <View>
                                <Subtitle2 style={styles.status}>{""}</Subtitle2>
                                <Subtitle2 style={styles.pending}>{""}</Subtitle2>
                            </View>
                        )
                    }
                    {groupCount > 1 ?
                        <Button
                            color={Color(Colors.primaryColor).alpha(0.16)}
                            title="Pay For Group"
                            titleColor={Colors.primaryColor}
                            buttonStyle={styles.extraSmallButton}
                            onPress={activeIndex == 1 ? onPressPay : onGroupPayBtn}
                        />
                        :
                        <Button
                            color={Color(Colors.primaryColor).alpha(0.16)}
                            title={groupCount > 1 ? "Pay For Yourself" : "Pay"}
                            titleColor={Colors.primaryColor}
                            buttonStyle={styles.extraSmallButton}
                            onPress={onPressPay}
                        />
                    }
                </View>
            )}
            { /* {orderStatus === 'PAID' && (
        <View style={styles.footer}>
          <View>
            <Subtitle2 style={styles.status}>Status</Subtitle2>
            <Subtitle2 style={styles.pending}>Paid & Pending waiter confirmation</Subtitle2>
          </View>
          
        </View>
      )}
      {orderStatus === 'COMPLETED' && (
        <View style={styles.footer}>
          <View>
            <Subtitle2 style={styles.status}>Status</Subtitle2>
            <Subtitle2 style={styles.delivered}>Delivered & Paid</Subtitle2>
          </View>
          
        </View>
      )} */}
        </View>
    </View>
);

export default LastOrderItemA;
