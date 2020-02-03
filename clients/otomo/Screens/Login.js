import React, {Component} from 'react';
import {StyleSheet, Image, ToastAndroid} from 'react-native';
import {Text, Button, Input, Layout} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
export default class Login extends Component {
  state = {
    email: '',
    password: '',
    loginKey: false,
  };

  componentDidMount() {}
  SignIn = async () => {
    const {email, password} = this.state;
    const formUser = {email, password};
    axios
      .post(`http://107.22.93.157:5080/user/login`, formUser)
      .then(res => {
        console.log(
          'ini res, response,token',
          res,
          res.data.message,
          res.data.succes,
          res.data.token,
        );
        if (res.data.succes === 1) {
          AsyncStorage.setItem('jwt', res.data.token);
          this.setState({
            loginKey: true,
          })(ToastAndroid.show('Login Success', ToastAndroid.SHORT));
        } else {
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }
        console.log('async', AsyncStorage);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {email, password, loginKey} = this.state;
    if (loginKey === true) {
      return this.props.navigation.navigate('Home');
    }
    return (
      <Layout style={{flex: 1, paddingHorizontal: 20}}>
        <Layout style={{alignItems: 'center'}}>
          <Image
            source={require('./Assets/logoscreen.jpg')}
            style={{maxWidth: '100%', maxHeight: '100%'}}
          />
          <Text category="h5" style={{textAlign: 'center'}}>
            Login
          </Text>
        </Layout>

        <ScrollView>
          <Layout>
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

            <Button
              onPress={() => {
                this.SignIn();
                this.setState({umail: '', password});
              }}>
              Sign In{' '}
            </Button>
          </Layout>
          <Layout style={{height: 50, top: 8}}>
            <Button onPress={() => this.props.navigation.navigate('Register')}>
              Sign Up
              {/* <Text category="h6">Sign Up</Text> */}
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
  },
});
