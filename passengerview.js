import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ImageBackground,
    Linking,
    TouchableHighlight
} from "react-native";
import firebase from 'firebase'

class PassengerView extends Component {


    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state={
            loading:true,
            stores:[]
        }
    }

    call = () =>{
        Linking.openURL(`tel:${this.state.stores.phone}`)
    }

    componentDidMount() {

        var userId = firebase.auth().currentUser.uid;
       
        var personRef = firebase.database().ref('users/'+this.params.id);
        personRef.once('value').then(snapshot=>{
            this.setState({
                stores: snapshot.val(), loading: false
            })
        })


        firebase.database().ref('/conf/'+this.params.id).set({
            
            user: userId
          })


        var rem = firebase.database().ref('markers')

        rem.remove()
  .then(function() {
    console.log("Remove succeeded.")
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });
    }

    render() {
        if(this.state.loading)
        {
            return(
                <ImageBackground source={require('./mainpic.jpg')} style={{width: '100%', height: '100%'}}>
                <View style={styles.containers}>
                <Text>Fetching selected Passenger's details. Please wait.</Text>
                <ActivityIndicator size="large" />
              </View>
              </ImageBackground>
            )
        }

        return(
        <ImageBackground source={require('./mainpic.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View>
              <Text style={styles.maintext}> {this.state.stores.first_name} {this.state.stores.last_name} {"\n\n"} {this.state.stores.uni} {"\n\n"}  
              </Text>
          </View>
              
              <TouchableHighlight onPress={this.call}>
            
              <Text style={{
                  color: 'blue',
                  textDecorationLine: 'underline',
            fontSize: 24,
            fontWeight: 'bold',
              }}> {this.state.stores.phone}</Text>
        </TouchableHighlight>
             
        </View>
        </ImageBackground>
      );
    }
}
export default PassengerView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
      },containers: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
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