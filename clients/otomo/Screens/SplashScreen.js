
import React, {Component} from 'react';
import { StyleSheet, Image} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { Layout,Spinner,Text } from '@ui-kitten/components';

export default class SplashScreen extends Component {
  async componentDidMount() {
    {
      try {
        if (await AsyncStorage.getItem('jwt')) {
          setTimeout(() => {
            // go to Home page
            this.props.navigation.navigate('App');
          }, 3000);
        } else {
          setTimeout(() => {
            // go to Login page
            this.props.navigation.navigate('AuthScreen');
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
      <Layout style={{flex: 1}}>
       
          <Layout style={styles.secondContainer}>
            
          </Layout>
          <Layout style={{alignItems:"center"}}>
         <Text category="h4">Otomo</Text>
          <Image source={require('./Assets/logoscreen.jpg')} />
          <Spinner size="large" color="#FF5A5F" />
        </Layout>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },  secondContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height:40
  },

});