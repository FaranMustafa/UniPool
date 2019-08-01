import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight
} from "react-native";
import firebase from 'firebase';

class TempPage extends Component {

constructor(props)
{
    super(props);
    this.state={
        title: '',
        
        longitude: '',
        latitude: '',
        coordinates:{
            longitude: '',
            latitude: ''
        }
    }
}

check = () => {
    var check=this.state.coordinates
    var tit=this.state.title
    check.longitude=this.state.longitude
    check.latitude=this.state.latitude
    const database = firebase.database().ref('markers/').push({
        name: this.state.title,
        coordinates: this.state.coordinates
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
}


    render() {
        return (
            <View style={styles.container}>
            <TextInput
            placeholder="title"
          onChangeText={(title) => this.setState({title})}/>
                <TextInput
                
            placeholder="lon"
              onChangeText={(longitude) => this.setState({longitude})}/>
                <TextInput
                
            placeholder="lat"
              onChangeText={(latitude) => this.setState({latitude})}/>
              
        <TouchableHighlight onPress={this.check}>
        <Text >Sign up</Text>
      </TouchableHighlight>
            </View>
        );
    }
}
export default TempPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});