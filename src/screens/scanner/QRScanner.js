import React, { Component } from 'react'
import {View,StyleSheet,Text,TouchableOpacity,BackHandler} from 'react-native'
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-vision-camera';
import * as productApi from '../../api/ProductService'
import { connect } from 'react-redux';
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import ContainedButton from '../../components/buttons/ContainedButton';
import Color from 'color';
import Colors from '../../theme/colors';
const styles = StyleSheet.create({
    centerText: {
      
        marginLeft: 150,
        marginBottom:40,
        fontSize: 21,
      justifyContent: "center",
      fontWeight: '500',
      color: '#fff'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      
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
  });
  let userProfile={
  
  };
  let restaurantData={
    
  };
  let userCart={
    
  };
  let userGroup={
    
  };
 class QRScanner extends Component {

  constructor(props) {
    super(props);
   // this.props.navigation.setOptions({title: this.props.route.params.name});
    this.state = {
      url:'',
      modalVisible: false,
      loggedInUser:userProfile,
      restaurant:restaurantData,
      userGroup:userGroup,
    }
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  }
  /*componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton = () => {
   BackHandler.exitApp()  
  }*/
    navigateTo = screen  => {
        const {navigation} = this.props;
        
        navigation.navigate(screen);
        
        
      };
    skip = e => {
        
       
        const {navigation} = this.props;
       // navigation.navigate('HomeNavigator',{"groupNotCreated":true,"isScanDone":true});
       navigation.navigate('HomeNavigator');
        
    };

    getRestrauntByUrl = async() => {
      let restaurantId=1;
      let name='' 
      try {
       
       if(this.state.url!='')
       {
        
        this.setState(
          {
            modalVisible: true,
          },
        )
        let response=await productApi.getRestrauntByUrl(this.state.url)
        alert(JSON.stringify(response))
        restaurantId=response.id
        name=response.name
       
        if(response.id)
        {
          const { dispatch } = this.props; 
            dispatch({ type: 'SAVE_RESTARAUNT_DATA',
            payload: response});
            
            this.navigateTo('HomeNavigator');
            this.setState(
              {
                modalVisible: false,
              },
            )
        }
      }
        
            
       // alert("link====="+this.state.url+"==="+JSON.stringify(response))
   } catch (error) {
     alert(" =error= hello "+error);
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
        let link=e.data;
        
        this.setState(
          {
            url:link,
          }
        )
        
        if(link.trim()!=='')
        {
          this.getRestrauntByUrl();
        }
        // 
      // alert(JSON.stringify(restaurant))
        
    };
    render() {
      const { modalVisible} = this.state;
        return (
            <View style={{ flex: 1 }}>
            {/* <QRCodeScanner
                onRead={this.onSuccess}
                reactivate={true}
                reactivateTimeout={2000}
                flashMode={RNCamera.Constants.FlashMode.auto}
                showMarker={true}
                markerStyle={{borderColor:"#FFF",borderRadius:10}}
               
            /> */}
             <View >
             <View style={styles.bottomButtonsContainer}>
                  <ContainedButton
                    onPress={this.skip}
                    buttonStyle={styles.button}
                    color={Colors.accentColor}
                    
                    title="Skip"
                  />
            </View>



</View>
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
        </View>
        )
    }
}

const mapStateToProps = (state) => {
 
  userProfile=state.postLoginData;
  restaurantData=state.restarauntData;
  userCart=state.cart;
  userGroup=state.groupData;
  return {
    registeruser: state.postLoginData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(mapStateToProps)(QRScanner)