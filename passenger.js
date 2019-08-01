import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    TextInput,
    ActivityIndicator,
    ImageBackground,
    Alert
} from "react-native";
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
//import MapViewDirections from 'react-native-maps-directions';
import firebase from 'firebase';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import CapView from './capview'


class Passenger extends Component {
    state = {
      initial: 0,
      loading: true,
      longitude: '',
      latitude: '',
      search: '',
      stores:[]

    };


    updateSearch = search => {
       this.setState({ search });
    };

    searchArea = () => {
      this.setState({initial:1})
      var userId = firebase.auth().currentUser.uid;
   var recentPostsRef = firebase.database().ref('users/'+userId);
recentPostsRef.once('value').then(snapshot => {
  this.setState({ stores: snapshot.val()})
  if(this.state.stores.latitude!=null)
  {
    this.setState({loading:false})
  }
});
    }
 
    confirm =() => {
      
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('markers/').set({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        id: userId
      })
      this.props.navigation.navigate('CapView')
    }
    
    render() {
      const { search } = this.state;

      if(this.state.initial==0)
      {
        return(
          <ImageBackground source={require('./map.png')} style={{width: '100%', height: '100%'}}>
          <View style={styles.containers}>
          <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/color/48/000000/search.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Enter place nearest to your location"
              autoCapitalize="none"
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.searchArea}>
          <Text style={styles.loginText}>Search</Text>
        </TouchableHighlight>
        </View>
        </ImageBackground>
        )
      }
      if(this.state.loading)
      {
        return(
          
          <ImageBackground source={require('./map.png')} style={{width: '100%', height: '100%'}}>
          <View style={styles.container}>
        <Text>Searching Area, Please wait.</Text>
        <ActivityIndicator size="large" />
      </View>
      </ImageBackground>
        )
      }


        return(
          <View style={styles.container}>
          <MapView 
          showsUserLocation={true}
          zoomEnabled={true}
          style={styles.map}
          initialRegion={{
            latitude: this.state.stores.latitude,
            longitude: this.state.stores.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}>
  <Marker draggable
    coordinate={{
            latitude: this.state.stores.latitude,
            longitude: this.state.stores.longitude,}}
    onDragEnd={(e) => this.setState({latitude:e.nativeEvent.coordinate.latitude,longitude:e.nativeEvent.coordinate.longitude})}
  />
  {/* <MapViewDirections
      origin={{
        latitude: 24.814646,
        longitude: 67.079811,
      }}
      destination={{
            latitude: this.state.stores.latitude,
            longitude: this.state.stores.longitude,}}
      apikey={AIzaSyBZlmnrxwnzVNc_971bzgqHJBm3RCyo1i4}
      strokeWidth={10}
      strokeColor='lightblue'
      onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);}}
              onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
              console.log(`Fare: ${result.distance * 30} Rs`)   
               distance = result.distance
               time = result.time
               fare = result.fare   
              }}        
      />  */}
</MapView>

<TouchableHighlight style={[styles.buttonContainer, styles.inButton]} onPress={this.confirm}>
          <Text style={styles.loginText}>DONE</Text>
        </TouchableHighlight>
</View>
        );
      }
}

const App = createStackNavigator(
  {
    Passenger: Passenger,
    CapView: CapView
  },
  {
    headerMode: 'none'
  },
  {
    initialRouteName: 'Passenger'
  }
)
export default createAppContainer(App);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width:'100%',
    height:'100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  search: {
    flex: 1,
  justifyContent: 'flex-end',
  marginBottom: 500
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  inButton: {
    backgroundColor: "#000000",
  },
  loginText: {
    color: 'white',
  },
  searchs: {
    //flex: 1,
  alignItems: 'center',
  marginBottom: 400
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    top: 0,
},
inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
},
inputIcon:{
  width:30,
  height:30,
  marginLeft:15,
  justifyContent: 'center'
},
containers: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 // backgroundColor: 'black',
},
});