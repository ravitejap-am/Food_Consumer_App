/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from 'react';
import {
  FlatList,
  I18nManager,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from 'color';
import Button from '../../components/buttons/Button';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-vision-camera';
import ContainedButton from '../../components/buttons/ContainedButton';

// import components
import Divider from '../../components/divider/Divider';
import { Paragraph } from '../../components/text/CustomText';
import { Heading6 } from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import SafeAreaView from '../../components/SafeAreaView';
import SimpleProductCard from '../../components/cards/SimpleProductCard';
import RestaurantCard from '../../components/cards/SimpleRestaurantCard';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
// import colors
import Colors from '../../theme/colors';
import { connect } from 'react-redux';
import * as api from '../../api/CommonService'
import * as productApi from '../../api/ProductService'
// SearchB Config
const isRTL = I18nManager.isRTL;
const FILTER_ICON = 'filter-variant';
const PLACEHOLDER_TEXT_COLOR = 'rgba(0, 0, 0, 0.4)';
const INPUT_BORDER_COLOR = 'rgba(0, 0, 0, 0.2)';

// SearchB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    paddingHorizontal: 16,
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
  scannerContainer: {
    paddingTop: 70,


  },
  line: {
    width: 64,
    height: 1,
    backgroundColor: INPUT_BORDER_COLOR,
  },
  bottomButtonsContainer: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    width: '100%',
    padding: 16,

  },
  addButton: {
    width: '52%',
    padding: 16,
  },
  joinButton: {
    width: '46%',
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
  deleteIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Color(Colors.surface).alpha(0.96),
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
    borderRadius: 4,
    backgroundColor: Colors.primaryColor,
    overflow: 'hidden',
  },
  memberText: {

    fontWeight: '300',
    color: Colors.primaryColor,
  },
  membersContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5,

  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
    height: 38,
  },
  filtersList: {
    paddingVertical: 8,
    paddingRight: isRTL ? 0 : 16,
    paddingLeft: isRTL ? 16 : 0,
  },
  filterItemContainer: {
    marginRight: isRTL ? 16 : 0,
    marginLeft: isRTL ? 0 : 16,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(35, 47, 52, 0.08)',
    overflow: 'hidden',
  },
  filterItem: { flex: 1, justifyContent: 'center' },
  filterName: {
    top: -1,
    fontWeight: '700',
    color: 'rgb(35, 47, 52)',
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
  },

  restauratnsList: {
    // spacing = paddingHorizontal + RestaurantCard margin = 12 + 4 = 16
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
});
let userProfile = {

};
let restaurantData = {

};
let userCart = {

};
let userGroup = {

}
// SearchB
class SearchOrScan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      url: '',
      restaurantList: [],
      isSearchBtnCliked: false,
      noResultFound: false,
      modalVisible: false,
      loggedInUser: userProfile,
      restaurant: restaurantData,
      userGroup: userGroup,
      filters: [
        { name: 'Special offers', picked: true },
        { name: 'Dessert', picked: false },
        { name: 'Grill', picked: false },
        { name: 'Pasta', picked: false },
        { name: 'Pizza', picked: false },
        { name: 'Salad', picked: false },
        { name: 'Soup', picked: false },
      ],
      restauratns: [
        {
          imageUri: require('../../assets/img/about_2.jpg'),
          name: 'The Glass Onion',
          rating: 5.0,
          price: 3,
          cuisines: 'Japanese, Sushi, Thai, Italian, Pizza',
        },
        {
          imageUri: require('../../assets/img/about_1.jpg'),
          name: 'Jekyll & Hyde Club',
          rating: 4.9,
          price: 4,
          cuisines: 'Soups, BBQ, Wings, Hamburger',
        },
        {
          imageUri: require('../../assets/img/about_3.jpg'),
          name: '2 Dudes Brew & Que',
          rating: 4.8,
          price: 3,
          cuisines: 'Italian, Mediterranean, European',
        },
      ]

    };
  }
  getRestrauntByUrl = async () => {
    let restaurantId = 1;
    let name = ''
    try {

      if (this.state.url != '') {

        this.setState(
          {
            modalVisible: true,
          },
        )
        let response = await productApi.getRestrauntByUrl(this.state.url)
        restaurantId = response.id
        name = response.name

        if (response.id) {
          const { dispatch, navigation } = this.props;
          dispatch({
            type: 'SAVE_RESTARAUNT_DATA',
            payload: response
          });

          navigation.navigate('HomeNavigator');
          this.setState(
            {
              modalVisible: false,
            },
          )
        }
      }


      // alert("link====="+this.state.url+"==="+JSON.stringify(response))
    } catch (error) {
      alert(" Please try again");
      // Error retrieving data
    }


    this.setState(
      {
        modalVisible: false,
      },
    )
  };
  skip = e => {


    const { navigation } = this.props;
    // navigation.navigate('HomeNavigator',{"groupNotCreated":true,"isScanDone":true});
    navigation.navigate('HomeNavigator');

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
  navigateTo = restaurant => () => {
    const { navigation, dispatch } = this.props;

    Keyboard.dismiss();

    dispatch({
      type: 'SAVE_RESTARAUNT_DATA',
      payload: restaurant
    });

    navigation.navigate('HomeNavigator');

    // navigation.navigate(screen);
  };

  navigateToScanner = screen => () => {
    const { navigation, dispatch } = this.props;
    navigation.navigate(screen);

  };
  showScanner = screen => () => {
    this.setState(
      {
        isSearchBtnCliked: false,
        noResultFound: false,
        restaurantList: []
      },
    )

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

  keyExtractor = (item, index) => index.toString();

  renderFilterItem = ({ item, index }) => (
    <View style={styles.filterItemContainer}>
      <TouchableItem
        onPress={this.handleFilterPress(item)}
        style={[
          styles.filterItem,
          item.picked && { backgroundColor: Colors.primaryColor },
        ]}>
        <Text
          style={[
            styles.filterName,
            item.picked && { color: Colors.onPrimaryColor },
          ]}>
          {item.name}
        </Text>
      </TouchableItem>
    </View>
  );
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
  renderProductItem = ({ item, index }) => (
    <SimpleProductCard
      key={index}
      onPress={this.navigateTo('Product')}
      activeOpacity={0.7}
      imageUri={item.imageUri}
      title={item.name}
      price={item.price}
      description={item.description}
    />
  );
  restaurantNameChange = text => {
    this.setState({
      searchTerm: text,
      noResultFound: false
    });
  };
  renderSeparator = () => <Divider />;

  onIndexChanged = index => {
    const { filters } = this.state;
    const filtersLength = filters.length - 1;
    const filtersActiveIndex = filters.findIndex(e => e.picked === true);

    if (filtersActiveIndex !== index) {
      filters[filtersActiveIndex].picked = false;

      if (isRTL) {
        filters[filtersLength - index].picked = true;
      } else {
        filters[index].picked = true;
      }

      this.setState(
        {
          filters: [...filters],
        },
        () => {
          if (isRTL) {
            this.filtersList.scrollToIndex({
              animated: true,
              index: filtersLength - index,
            });
          } else {
            this.filtersList.scrollToIndex({ animated: true, index: index });
          }
        },
      );
    }
  };

  render() {
    const {

      modalVisible
    } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <ScrollView>
          <StatusBar
            backgroundColor={Colors.statusBarColor}
            barStyle="dark-content"
          />
          <Text style={styles.orText}></Text>
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
              onPress={this.showScanner('Scanner')}
              color={Colors.primaryColor}
              buttonStyle={styles.addButton}

              title={'Scan any QR Code'}
              titleColor={Colors.onPrimaryColor}
            />
            <ContainedButton
              onPress={this.skip}
              buttonStyle={styles.joinButton}
              color={Colors.accentColor}

              title="Skip"
            />
          </View>
          {/* <View style={styles.scannerContainer}>
            {!this.state.isSearchBtnCliked &&
              <QRCodeScanner
                onRead={this.onSuccess}
                reactivate={true}
                reactivateTimeout={2000}
                flashMode={RNCamera.Constants.FlashMode.auto}
                showMarker={true}
                markerStyle={{ borderColor: "#FFF", borderRadius: 10 }}

              />

            }
          </View> */}

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

export default connect(mapStateToProps)(SearchOrScan)