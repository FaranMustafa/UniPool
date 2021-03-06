import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import firebase from 'firebase';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Main from './main';
import SignUpView from './signup';
class LoginView extends Component {

  renderButton() {
    if (this.state.loading) {
      return(
          <View style={styles.spinnerStyle}>
             <ActivityIndicator size={"small"} />
          </View>
      );
    }
    return (
      
         <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
    );
  }

  constructor(props) {
    
    super(props);
    this.state = { email: '', password: '', error: ''};
  }

  onClickListener = (viewId) => {
    if(viewId=='restore_password')
    {
      Alert.alert("This feature will be available in next version. Contact admin at aashir_iftikhar@live.com")
    }
    else
    {
    this.props.navigation.navigate(viewId);
    }
  }
  handleLogin = () => {
      this.setState({ errorMessage: '', loading: true })
      const { email, password } = this.state;
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch((error) => {
          let errorCode = error.code
          let errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            this.onLoginFailure.bind(this)('Weak password!')
          } else {
            this.onLoginFailure.bind(this)(errorMessage)
          }
        });
    }
    onLoginSuccess() {
      this.setState({loading:false});
      this.props.navigation.navigate('Main');
      // this.setState({
      //   email: '', password: '', error: '', loading: false
      // })
    }
    onLoginFailure(errorMessage) {
      this.setState({ error: errorMessage, loading: false })
    }

  render() {
    return (
      <ImageBackground source={require('./mainpic.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <View>
            <Image style={styles.logo}
                source={require('./unipoollogo.png')}>
            </Image>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        {this.renderButton()}

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text style={styles.loginText}>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('SignUp')}>
            <Text  style={styles.loginText}>Register</Text>
        </TouchableHighlight>
        
      <Text style={styles.errorTextStyle}>
   { this.state.error }
</Text>
      </View>
      </ImageBackground>
    );
  }
}


const AppNavigator = createStackNavigator(
  {
    Login: LoginView,
    Main: Main,
    SignUp: SignUpView
  },
  {
    headerMode: 'none'
  },
  {
      initialRouteName: 'Login'
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor: 'black',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
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
  loginText: {
    color: 'white',
  },
  logo: {
      width: 150,
      height: 60,
      bottom: 40,
  },
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red',
    justifyContent: 'center'
  }
});
 