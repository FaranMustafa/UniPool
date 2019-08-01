import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import firebase from 'firebase';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import CaptainPage from './captain';
import Passenger from './passenger';

class Main extends Component {

constructor(props)
{
  super(props)
  this.state={
    stores:[],
    loading: true
  }
}

logout = () => {
  firebase.auth().signOut()
.then(
  ()=>{this.props.navigation.popToTop()}
)
.catch(function(error) {
  console.log(error);
  
});
}
  componentDidMount() {
  
   var userId = firebase.auth().currentUser.uid;
   var recentPostsRef = firebase.database().ref('users/'+userId);
recentPostsRef.once('value').then(snapshot => {
  this.setState({ stores: snapshot.val(),loading: false })
});
}

 

  render() {


    if(this.state.loading)
    {
      return(
        <ImageBackground source={require('./mainpic.jpg')} style={{width: '100%', height: '100%'}}>

<View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
        </ImageBackground>
      )
    }

    return (
      <ImageBackground source={require('./mainpic.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <View>
            <Text style={styles.maintext}>Hello {this.state.stores.first_name}</Text>
        </View>
        <TouchableHighlight style={[styles.buttonContainer,styles.down]} onPress={() => this.props.navigation.navigate('Captain')}>
          <Text style={styles.buttontext}>Captain</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Passenger')}>
            <Text style={styles.buttontext}>Passenger</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.logoutButton]} onPress={this.logout}>
            <Text  style={styles.buttontext}>Logout</Text>
        </TouchableHighlight>
      </View>
      </ImageBackground>
    );
  }
}
const Apps = createStackNavigator(
  {
    Main: Main,
    Captain: CaptainPage,
    Passenger: Passenger
  },
  {
    headerMode: 'none'
  },
  {
    initialRouteName: 'Main'
  }
);

export default createAppContainer(Apps);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor: 'black',
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
  maintext:{
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',

  },
  buttontext: {
        color: 'white',
        fontSize:15
  },
  logoutButton: {
    backgroundColor: "#00b5ec",
    marginTop: 100
  },
  text: {
      flex:2,
      justifyContent: 'center',
      alignItems:'center',

  },
  down: {
      marginTop: 50,
  }
});
 