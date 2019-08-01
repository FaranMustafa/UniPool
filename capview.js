import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ImageBackground,
    Linking,
    TouchableHighlight,
    Alert
} from "react-native";
import firebase from 'firebase'

class CapView extends Component {

    constructor(props) {
        super(props);
        this.state={
            loading:true,
            first_name: '',
            last_name: '',
            phone: '',
            id:'',
            avail: false
        }
    }


    removeInfo =() => {
        var userId = firebase.auth().currentUser.uid;
        var per = firebase.database().ref('confirm/'+userId);
        per.remove()
    .then(function() {
      console.log("Remove succeeded.")
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
    });
    }
    componentDidMount(){ 
        var userId = firebase.auth().currentUser.uid;
        var personRef = firebase.database().ref('/conf/'+userId);
        personRef.once('value').then(snapshot=>{this.setState({
            id: snapshot.val().user
        })
        }); 
        
        
        setTimeout(() => {
            var personRef = firebase.database().ref('/users/'+this.id);
        personRef.once('value').then(snapshot=>{this.setState({
            first_name: snapshot.val().first_name, 
            last_name: snapshot.val().last_name,
            phone: snapshot.val().phone,
            loading: false, 
            avail:true
        })
        this.removeInfo
        });
            
        }, 5000);

if(this.state.loading==false){
    personRef.remove()
    .then(function() {
      console.log("Remove succeeded.")
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
    });}

    setTimeout(function(){

        if(avail==false)
        {
            var del = firebase.database().ref('markers');
            del.remove()
  .then(function() {
    console.log("Remove succeeded.")
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });
        }

   
      }, 300000);
    }


    render() {
    if(this.state.loading)
    {

        return(
            <ImageBackground source={require('./mainpic.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={styles.containers}>
            <Text style={{
                color: 'white'
            }}>Please wait until captain accepts your Ride. If no captain is available then your location information will automatically be deleted after 5 minutes.</Text>
            <ActivityIndicator size="large" />
          </View>
          </ImageBackground>
        )
    }

    return(
    <ImageBackground source={require('./mainpic.jpg')} style={{width: '100%', height: '100%'}}>
    <View style={styles.container}>
      <View>
          <Text style={styles.maintext}> {this.state.first_name} {this.state.last_name}</Text>
      </View>
          
          <TouchableHighlight onPress={this.call}>
        
          <Text style={{
              color: 'blue',
              textDecorationLine: 'underline',
        fontSize: 24,
        fontWeight: 'bold',
          }}> {this.state.phone}</Text>
    </TouchableHighlight>
         
    </View>
    </ImageBackground>
  );
}
}

export default CapView;

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