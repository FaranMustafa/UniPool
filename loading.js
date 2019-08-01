import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button, ImageBackground } from 'react-native';

import Main from './main';
import LoginView from './login';
import {createStackNavigator,createAppContainer,createSwitchNavigator} from 'react-navigation';
import firebase from 'firebase';
import CapView from './capview'
class Loading extends React.Component {

  

    componentDidMount() {
        // firebase.auth().onAuthStateChanged(user => {
        //   this.props.navigation.navigate(user ? 'Main' : 'LoginView')
        // })

        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            if(global.setScreen=="CapView")
            {
              this.props.navigation.navigate('CapView');
              
            }
            else
            {
              this.props.navigation.navigate('Main')
            }
          } else {
            this.props.navigation.navigate('LoginView')
          }
        });
      }

  render() {
    return (
      <ImageBackground source={require('./mainpic.jpg')} style={{width: '100%', height: '100%'}}>

<View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
        </ImageBackground>
    )
  }
}




const App = createStackNavigator(
  {
    Loading: Loading,
    Main: Main,
    LoginView: LoginView,
    CapView: CapView
  },
  {
    headerMode: 'none'
  },
  {
    initialRouteName: 'Loading'
  }
);
export default createAppContainer(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})