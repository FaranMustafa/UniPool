import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableHighlight,
    ActivityIndicator,
    Image
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Marker} from 'react-native-maps';
import firebase from 'firebase';
import PassengerView from './passengerview';
import {createStackNavigator,createAppContainer} from 'react-navigation';


class CaptainPage extends Component {

  constructor(props)
  {
    super(props);
    this.state={
        loading: true,
        stores: []
    }
    
  
  }

markerClick()
{
  console.log("Marker pressed");
  Alert.alert("Marker Clicked");
}
componentDidMount() {
  var recentPostsRef = firebase.database().ref('markers/');
recentPostsRef.once('value').then(snapshot => {
  this.setState({ stores: snapshot.val() })
  if(this.state.stores.longitude==0)
  {
    this.setState({loading:true})
  }
  else
  {
    this.setState({loading:false})
  }
})
}


markerClick =() =>{
  this.props.navigation.navigate('Pass',{
    
id: this.state.stores.id

  })
}
    
    render() {
     if(this.state.loading)
     {
       return(
        <View style={styles.containers}>
        <Text>Searching for Passengers, Please wait. You will be automatically logged out after 5 minutes if no passenger is available.</Text>
        <ActivityIndicator size="large" />
      </View>
       )
     }
     

        return (
            <View style={styles.container}>
            <MapView
            provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled = {true}
              style={styles.map}
              initialRegion={{
                latitude: 24.814646,
                longitude: 67.079811,
                latitudeDelta: 0.0151,
                longitudeDelta: 0.0121
              }}
            >
          <MapView.Marker
   coordinate={{
                latitude: this.state.stores.latitude,
                longitude: this.state.stores.longitude
                }}
                onPress={this.markerClick}

   >
   <Image source={require('./man.png')} style={{height: 40, width:40, }} />
   {/* <MapView.Callout tooltip >
                                      <TouchableHighlight onPress={this.markerClick}
                                                title="Chat with Lucy"
                                            underlayColor='#dddddd'>
                                            <Text>We must go derper</Text>
                                      </TouchableHighlight>
                </MapView.Callout> */}
   </MapView.Marker>

  
            </MapView>
          </View>
);
    }
}


const Apps = createStackNavigator(
  {
    CaptainPage: CaptainPage,
    Pass: PassengerView
  },
  {
    headerMode: 'none'
  },
  {
    initialRouteName: 'CaptainPage'
  }
)

export default createAppContainer(Apps);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },containers: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
      map: {
        ...StyleSheet.absoluteFillObject,
      }
});