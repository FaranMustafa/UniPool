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
import {createStackNavigator, createAppContainer} from 'react-navigation';
import firebase from 'firebase';
import Main from './main';
class SignUpView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email   : '',
      password: '',
      phone: '',
      university: '',
      //loading: false,
      errorMessage: null
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }
  handleSignUp = () => {
    
    this.setState({ errorMessage: '', loading: true })
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        firebase.database().ref('users/' + res.user.uid).set({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            university: this.state.university
        })
        })
        .then(this.onSignupSuccess.bind(this))
        
      .catch(error => this.setState({ errorMessage: error.message }))
      }
      onSignupSuccess() {
        this.props.navigation.navigate('Main');
      }


      renderButton() {
        if (this.state.loading) {
          return(
              <View style={styles.spinnerStyle}>
                 <ActivityIndicator size={"small"} />
              </View>
          );
        }
        return (
          
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.handleSignUp}>
        <Text style={styles.signUpText}>Sign up</Text>
      </TouchableHighlight>
        );
      }

  render() {
    return (
      <ImageBackground source={require('./mainpic.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>

      <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="First Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              autoCapitalize="none"
              onChangeText={(first_name) => this.setState({first_name})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Last Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              autoCapitalize="none"
              onChangeText={(last_name) => this.setState({last_name})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./university.png')} />
          <TextInput style={styles.inputs}
              placeholder="University"
              autoCapitalize="none"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(university) => this.setState({university})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('./phone.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              underlineColorAndroid='transparent'
              onChangeText={(phone) => this.setState({phone})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        
      {this.renderButton()}

      </View>
      </ImageBackground>
    );
  }
}

const AppStack = createStackNavigator(
  {
    Signup: SignUpView,
    Main: Main
  },
  {
    headerMode: 'none'
  },
  {
    initialRouteName: 'Signup'
  }
)

export default createAppContainer(AppStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  //  backgroundColor: 'black',
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
      alignItems:'center'
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
  signupButton: {
    backgroundColor: "#00b5ec",
  },
  signUpText: {
    color: 'white',
  }
});