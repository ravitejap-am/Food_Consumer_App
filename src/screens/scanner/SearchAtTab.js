import React, { Component } from 'react'
import { View, StyleSheet, I18nManager, Text, TextInput, FlatList, StatusBar, ScrollView } from 'react-native'
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-vision-camera';
import * as productApi from '../../api/ProductService'
import * as api from '../../api/CommonService'
import { connect } from 'react-redux';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import ContainedButton from '../../components/buttons/ContainedButton';
import { Paragraph } from '../../components/text/CustomText';
import Color from 'color';
import Button from '../../components/buttons/Button';
import Colors from '../../theme/colors';
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RestaurantCard from '../../components/cards/SimpleRestaurantCard';
import TouchableItem from '../../components/TouchableItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SafeAreaView from '../../components/SafeAreaView';
import { Heading6 } from '../../components/text/CustomText';
const isRTL = I18nManager.isRTL;
const FILTER_ICON = 'filter-variant';
const PLACEHOLDER_TEXT_COLOR = 'rgba(0, 0, 0, 0.4)';
const INPUT_BORDER_COLOR = 'rgba(0, 0, 0, 0.2)';
const styles = StyleSheet.create({
  centerText: {

    marginLeft: 150,
    marginBottom: 40,
    fontSize: 21,
    justifyContent: "center",
    fontWeight: '500',
    color: '#fff'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  buttonText: {
    fontSize: 21,

  },
  titleContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  memberText: {

    fontWeight: '300',
    color: Colors.primaryColor,
  },
  errorHeading: {
    fontWeight: '700',
    paddingHorizontal: 16,
    color: Colors.error,

  },
  separator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {
    top: -2,
    paddingHorizontal: 8,
    color: PLACEHOLDER_TEXT_COLOR,
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 8,
    fontWeight: '700',
    textAlign: 'left',
  },
  inputContainer: {
    marginHorizontal: 16,
    paddingBottom: 8,
  },
  line: {
    width: 64,
    height: 1,
    backgroundColor: INPUT_BORDER_COLOR,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    width: '100%',
    padding: 16,

  },
  button: {
    width: '98%',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    paddingLeft: 8,
    paddingRight: 51,
    height: 46,
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: isRTL ? 'right' : 'left',
  },
  searchButtonContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
    borderRadius: 4,
    backgroundColor: Colors.primaryColor,
    overflow: 'hidden',
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
    height: 38,
  },
  scannerContainer: {
    paddingTop: 70,


  },
});
let userProfile = {

};
let restaurantData = {

};
let userCart = {

};
let userGroup = {

};
class QRScanner extends Component {

  constructor(props) {
    super(props);
    // this.props.navigation.setOptions({title: this.props.route.params.name});
    this.state = {
      url: '',
      searchTerm: '',
      restaurantList: [],
      isSearchBtnCliked: false,
      noResultFound: false,
      modalVisible: false,
      loggedInUser: userProfile,
      restaurant: restaurantData,
      userGroup: userGroup,
    }
  }
  restaurantNameChange = text => {
    this.setState({
      searchTerm: text,
      noResultFound: false
    });
  };


  navigateTo = restaurant => () => {
    const { navigation, dispatch } = this.props;
    dispatch({
      type: 'SAVE_RESTARAUNT_DATA',
      payload: restaurant
    });

    dispatch({
      type: 'SAVE_GROUP_DATA',
      payload: null
    });
    AsyncStorage.removeItem("userGroup");
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "HomeNavigator" }],
      })
    );

    // navigation.navigate(screen);
  };
  skip = e => {
    const { navigation } = this.props;
    // navigation.navigate('HomeNavigator',{"groupNotCreated":true,"isScanDone":true});
    navigation.navigate('Home');

  };
  handleSearch = async () => {
    try {
      this.setState(
        {
          modalVisible: true,
        },
      )
      let catResp = await api.searchRestaurant(this.state.searchTerm);

      this.setState(
        {
          restaurantList: catResp.data.data,
          isSearchBtnCliked: true,
          modalVisible: false,
          noResultFound: false,

        }
      )
      //  alert(JSON.stringify(catResp))
    }
    catch (e) {
      this.setState(
        {
          modalVisible: false,
          noResultFound: true,
          restaurantList: []
        },
      )
      // alert(e)
    }


  };
  getRestrauntByUrl = async () => {
    let restaurantId = 1;
    let name = ''
    let group = {}
    try {

      if (this.state.url != '') {
        let existingrestaurantId = this.state.restaurant ? this.state.restaurant.id : '';
        // alert(existingrestaurantId)
        this.setState(
          {
            modalVisible: true,
          },
        )
        let response = await productApi.getRestrauntByUrl(this.state.url)
        restaurantId = response.id
        name = response.name

        if (response.id) {
          const { dispatch } = this.props;
          dispatch({
            type: 'SAVE_RESTARAUNT_DATA',
            payload: response
          });
          dispatch({
            type: 'SAVE_GROUP_DATA',
            payload: null
          });
          AsyncStorage.removeItem("userGroup");
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "HomeNavigator" }],
            })
          );
          this.setState(
            {
              modalVisible: false,
            },
          )
        }
      }


      // alert("link====="+this.state.url+"==="+JSON.stringify(response))
    } catch (error) {
      alert(" =error= hello " + error);
      // Error retrieving data
    }
    /*this.navigateTo('HomeNavigator',{
     "id": restaurantId,
     "name":name
   });*/

    this.setState(
      {
        modalVisible: false,
      },
    )
  };
  onSuccess = e => {
    let link = e.data;

    this.setState(
      {
        url: link,
      }
    )
    if (link.trim() !== '') {
      this.getRestrauntByUrl();
    }
    // 
    // alert(JSON.stringify(restaurant))

  };
  renderRestaurantItem = ({ item, index }) => (
    <RestaurantCard
      onPress={this.navigateTo(item)}
      key={index}
      imageUri={item.imageUri}
      name={item.name}
      rating={5}
      price={item.price}
      cuisines={item.url}
    />
  );
  showScanner = screen => () => {
    this.setState(
      {
        isSearchBtnCliked: false,
        noResultFound: false,
        restaurantList: []
      },
    )

  };
  render() {
    const { modalVisible } = this.state;
    return (
      <SafeAreaView style={styles.screenContainer}>
        <ScrollView>
          <StatusBar
            backgroundColor={Colors.statusBarColor}
            barStyle="dark-content"
          />
          <View style={styles.titleContainer}>
            <Heading6 style={styles.titleText}>Search or Scan</Heading6>


          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Search Restaurant"
              returnKeyType="search"
              maxLength={50}
              style={styles.textInput}
              onChangeText={(text) => { this.restaurantNameChange(text) }}
            />
            <View style={styles.searchButtonContainer}>
              <TouchableItem onPress={this.handleSearch}>
                <View style={styles.searchButton}>
                  <Icon
                    name={FILTER_ICON}
                    size={23}
                    color={Colors.onPrimaryColor}
                  />
                </View>
              </TouchableItem>
            </View>
          </View>
          <View style={styles.separator}>

            <View style={styles.line} />

            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>


          <View style={styles.bottomButtonsContainer}>


            <Button
              onPress={this.showScanner}
              color={Colors.primaryColor}
              buttonStyle={styles.addButton}

              title={'Scan any QR Code'}
              titleColor={Colors.onPrimaryColor}
            />

          </View>
          <View style={styles.scannerContainer}>
            {!this.state.isSearchBtnCliked &&
            <></>
              // <QRCodeScanner
              //   onRead={this.onSuccess}
              //   reactivate={true}
              //   reactivateTimeout={2000}
              //   flashMode={RNCamera.Constants.FlashMode.auto}
              //   showMarker={true}
              //   markerStyle={{ borderColor: "#FFF", borderRadius: 10 }}

              // />

            }
          </View>

          <View >
            {this.state.restaurantList.length > 0 && (

              <Paragraph style={styles.titleContainer}>
                { "Please select restaurant: "}
              </Paragraph>

            )}
            {this.state.noResultFound && (

              <Heading6 style={styles.errorHeading}>
                { "No Restaraunt Found with name or link " + this.state.searchTerm}
              </Heading6 >

            )}

            <FlatList
              data={this.state.restaurantList}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderRestaurantItem}
              contentContainerStyle={styles.restauratnsList}
            />
          </View>
        </ScrollView>
        <ActivityIndicatorModal
          statusBarColor={Color(Colors.primaryColor)
            .darken(0.52)
            .rgb()
            .string()}
          message="Please wait . . ."
          onRequestClose={this.closeModal}
          title="Loading"
          visible={modalVisible}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {

  userProfile = state.postLoginData;
  restaurantData = state.restarauntData;
  userCart = state.cart;
  userGroup = state.groupData;
  return {
    registeruser: state.postLoginData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps)(QRScanner)