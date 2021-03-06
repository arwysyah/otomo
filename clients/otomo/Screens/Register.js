import React, {Component} from 'react';
import {StyleSheet,Image, ToastAndroid} from 'react-native';
import {
  Text,
  Button,
  Input,
  Layout,
} from '@ui-kitten/components';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios'
export default class Register extends Component {
  state = {
    username:'',
    email:'',
    password:''
  };
SignUp=async()=>{
    
    const{username,email,password}=this.state
    const formUser={
        username,email,password
    }

    axios.post('http://107.22.93.157:5080/user/register',formUser)
    .then(res => {
  ToastAndroid.show("Register succes",ToastAndroid.SHORT)
     
    this.props.navigation.navigate('Login')
      })
      .catch(error=>{
          console.log(error)
      })
  }

  render() {
      const{username,email,password}=this.state
   
    return (
      <Layout style={{flex: 1, paddingHorizontal: 20}}>
       
        <Layout style={{alignItems:'center'}}>
        <Image
              source={require('./Assets/logoscreen.jpg')}
              style={{maxWidth: '100%', maxHeight: '100%'}}
            />
          <Text category="h5" style={{textAlign: 'center'}}>
           Register
          </Text>
        </Layout>
        
        <ScrollView>
          <Layout>
            <Text category="s2">Username</Text>
            <Input
              style={styles.input}
              size="small"
              value={username}
              placeholder="username"
              onChangeText={username => this.setState({username})}
            />
            <Text category="s2">Email</Text>
            <Input
              style={styles.input}
              value={email}
              size="small"
              placeholder="email"
              onChangeText={email => this.setState({email})}
            />
            <Text category="s2">Password</Text>
            <Input
              style={styles.input}
              size="small"
              value={password}
              placeholder="password"
              onChangeText={password => this.setState({password})}
            />
           
            <Button onPress={()=>{this.SignUp()
            this.setState({username:'',password:'',email:''})
            }}>Sign Up </Button>
          </Layout>
          <Layout style={{height:50,top:8}}>
              <Button onPress={()=>this.props.navigation.navigate('Login')}>
             Sign In
              </Button>
          </Layout>
        </ScrollView>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    margin: 8,
  }
});
